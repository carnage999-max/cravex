import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SignalStabilityAnimation from '../animations/SignalStabilityAnimation';
import { COLORS, API_URL } from '../constants';
import { usePreferences } from '../context/PreferencesContext';

interface Props {
    navigation: any;
}

export default function MonitoringScreen({ navigation }: Props) {
    const { userToken } = usePreferences();
    const [heartRate, setHeartRate] = React.useState(72);
    const [skinConductance, setSkinConductance] = React.useState(0.5);
    const [signalStrength, setSignalStrength] = React.useState(85);

    // Simulate real-time data updates
    React.useEffect(() => {
        const interval = setInterval(() => {
            setHeartRate(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 5)));
            setSkinConductance(prev => Math.max(0, Math.min(1, prev + (Math.random() - 0.5) * 0.1)));
            setSignalStrength(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 10)));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Post data to API every 10 seconds
    React.useEffect(() => {
        const postData = async () => {
            if (!userToken) return;

            try {
                // Mock device ID for now - in real app would come from pairing state
                const deviceId = '00000000-0000-0000-0000-000000000001';

                await fetch(`${API_URL}/api/events`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    },
                    body: JSON.stringify({
                        deviceId,
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
    }, [userToken, heartRate, skinConductance, signalStrength]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.animationContainer}>
                    <SignalStabilityAnimation stability={signalStrength / 100} />
                </View>

                <View style={styles.metricsGrid}>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>Heart Rate</Text>
                        <Text style={styles.metricValue}>{Math.round(heartRate)}</Text>
                        <Text style={styles.metricUnit}>bpm</Text>
                    </View>

                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>Skin Conductance</Text>
                        <Text style={styles.metricValue}>{skinConductance.toFixed(2)}</Text>
                        <Text style={styles.metricUnit}>μS</Text>
                    </View>

                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>Signal Strength</Text>
                        <Text style={styles.metricValue}>{Math.round(signalStrength)}</Text>
                        <Text style={styles.metricUnit}>%</Text>
                    </View>
                </View>

                <View style={styles.statusCard}>
                    <Text style={styles.statusTitle}>Current Status</Text>
                    <Text style={styles.statusText}>
                        Monitoring active. All biometric signals are within normal range.
                    </Text>
                    <View style={styles.statusIndicator}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusLabel}>Connected</Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>About Your Metrics</Text>
                    <Text style={styles.infoText}>
                        CRAVEX® continuously monitors your biometric signals to detect patterns associated with cravings.
                        All data is processed locally on your device for maximum privacy.
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => (navigation as any).navigate('HomeTab')}
                >
                    <Text style={styles.secondaryButtonText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
    },
    content: {
        padding: 24,
    },
    animationContainer: {
        height: 250,
        marginBottom: 24,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    metricCard: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    metricLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    metricValue: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1e293b',
        marginBottom: 4,
    },
    metricUnit: {
        fontSize: 14,
        fontWeight: '600',
        color: '#94a3b8',
    },
    statusCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 12,
    },
    statusText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#64748b',
        marginBottom: 16,
    },
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#22c55e',
        marginRight: 8,
    },
    statusLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#22c55e',
    },
    infoSection: {
        marginBottom: 24,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#64748b',
    },
    secondaryButton: {
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginBottom: 32,
    },
    secondaryButtonText: {
        color: '#475569',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
});
