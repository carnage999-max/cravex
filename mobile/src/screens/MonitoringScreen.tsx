import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SignalStabilityAnimation from '../animations/SignalStabilityAnimation';
import { COLORS, API_URL } from '../constants';
import { usePreferences } from '../context/PreferencesContext';

interface Props {
    navigation: any;
}

export default function MonitoringScreen({ navigation }: Props) {
    const { userToken, pairedDeviceId } = usePreferences();
    const [heartRate, setHeartRate] = React.useState(72);
    const [skinConductance, setSkinConductance] = React.useState(0.5);
    const [signalStrength, setSignalStrength] = React.useState(85);

    // Redirect to pairing if no device is connected
    React.useEffect(() => {
        if (!pairedDeviceId) {
            Alert.alert(
                "No Device Connected",
                "You need to pair a CRAVEX® device to view live biometric monitoring.",
                [{ text: "Go to Pairing", onPress: () => navigation.navigate('DevicePairing') }]
            );
        }
    }, [pairedDeviceId]);

    // Simulate real-time data updates
    React.useEffect(() => {
        if (!pairedDeviceId) return;
        const interval = setInterval(() => {
            setHeartRate(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 5)));
            setSkinConductance(prev => Math.max(0, Math.min(1, prev + (Math.random() - 0.5) * 0.1)));
            setSignalStrength(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 10)));
        }, 2000);

        return () => clearInterval(interval);
    }, [pairedDeviceId]);

    // Post data to API every 10 seconds
    React.useEffect(() => {
        const postData = async () => {
            if (!userToken || !pairedDeviceId) return;

            try {
                await fetch(`${API_URL}/api/events`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    },
                    body: JSON.stringify({
                        deviceId: pairedDeviceId,
                        events: [{
                            type: 'biometrics',
                            payload: {
                                heartRate: Math.round(heartRate),
                                skinConductance: parseFloat(skinConductance.toFixed(2)),
                                signalStrength: Math.round(signalStrength)
                            },
                            createdAt: new Date().toISOString()
                        }]
                    })
                });
            } catch (error) {
                console.error('Failed to post biometrics', error);
            }
        };

        const interval = setInterval(postData, 10000);
        return () => clearInterval(interval);
    }, [userToken, pairedDeviceId, heartRate, skinConductance, signalStrength]);

    if (!pairedDeviceId) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 40 }]}>
                <View style={styles.iconCircle}>
                    <Ionicons name="bluetooth" size={64} color={COLORS.border} />
                </View>
                <Text style={styles.statusTitle}>Device Required</Text>
                <Text style={[styles.statusText, { textAlign: 'center' }]}>
                    Connect your CRAVEX® hardware to begin secure biometric monitoring.
                </Text>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('DevicePairing')}
                >
                    <Text style={styles.buttonText}>Pair Device</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Monitoring</Text>
                    <Text style={styles.subtitle}>Secure biometric stream active</Text>
                </View>

                <View style={styles.animationContainer}>
                    <SignalStabilityAnimation stability={signalStrength / 100} />
                    <View style={styles.floatingTag}>
                        <View style={styles.statusDot} />
                        <Text style={styles.tagText}>LIVE</Text>
                    </View>
                </View>

                <View style={styles.metricsGrid}>
                    <View style={styles.metricCard}>
                        <View style={styles.metricHeader}>
                            <Ionicons name="heart" size={16} color="#ef4444" />
                            <Text style={styles.metricLabel}>Heart Rate</Text>
                        </View>
                        <Text style={styles.metricValue}>{Math.round(heartRate)}</Text>
                        <Text style={styles.metricUnit}>bpm</Text>
                    </View>

                    <View style={styles.metricCard}>
                        <View style={styles.metricHeader}>
                            <Ionicons name="water" size={16} color="#06b6d4" />
                            <Text style={styles.metricLabel}>Conductance</Text>
                        </View>
                        <Text style={styles.metricValue}>{skinConductance.toFixed(2)}</Text>
                        <Text style={styles.metricUnit}>μS</Text>
                    </View>
                </View>

                <View style={styles.statusCard}>
                    <View style={styles.statusHeader}>
                        <Text style={styles.statusTitle}>System State</Text>
                        <View style={styles.safeBadge}>
                            <Text style={styles.safeBadgeText}>SAFE</Text>
                        </View>
                    </View>
                    <Text style={styles.statusText}>
                        Your nervous system signals are balanced. Continue with your current activity.
                    </Text>
                    <View style={styles.deviceInfo}>
                        <Ionicons name="phone-portrait-outline" size={14} color={COLORS.subtext} />
                        <Text style={styles.deviceInfoText}>Paired: {pairedDeviceId}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.secondaryButtonText}>Return to Dashboard</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        padding: 24,
    },
    header: {
        paddingTop: 40,
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.text,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.subtext,
        marginTop: 4,
    },
    animationContainer: {
        height: 300,
        marginBottom: 24,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
        position: 'relative',
    },
    floatingTag: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
        marginRight: 6,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#1e293b',
        letterSpacing: 1,
    },
    metricsGrid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    metricCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    metricHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    metricLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748b',
        marginLeft: 6,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    metricValue: {
        fontSize: 36,
        fontWeight: '900',
        color: COLORS.text,
        letterSpacing: -1,
    },
    metricUnit: {
        fontSize: 14,
        fontWeight: '600',
        color: '#94a3b8',
        marginTop: 2,
    },
    statusCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.text,
    },
    safeBadge: {
        backgroundColor: '#f0fdf4',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    safeBadgeText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#16a34a',
    },
    statusText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#64748b',
        marginBottom: 20,
    },
    deviceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    deviceInfoText: {
        fontSize: 12,
        color: COLORS.subtext,
        marginLeft: 6,
        fontWeight: '500',
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        width: '100%',
        padding: 18,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    secondaryButton: {
        backgroundColor: '#f1f5f9',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#475569',
        fontSize: 14,
        fontWeight: '700',
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    }
});
