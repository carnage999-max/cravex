import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { COLORS, API_URL } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { usePreferences } from '../context/PreferencesContext';

interface Props {
    navigation: any;
}

export default function HomeScreen({ navigation }: Props) {
    const { userToken, pairedDeviceId } = usePreferences();
    const [isAutonomous, setIsAutonomous] = React.useState(true);
    const [lastSync, setLastSync] = React.useState('Just now');
    const [recentHR, setRecentHR] = React.useState<number[]>([]);

    const fetchStatus = async () => {
        if (!userToken) return;
        try {
            const response = await fetch(`${API_URL}/api/events?limit=10`, {
                headers: { 'Authorization': `Bearer ${userToken}` }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.events && data.events.length > 0) {
                    const latest = data.events[0];
                    setLastSync(new Date(latest.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

                    const hrData = data.events
                        .filter((e: any) => e.type === 'biometrics')
                        .map((e: any) => e.payload.heartRate)
                        .slice(0, 5);
                    setRecentHR(hrData);
                }
            }
        } catch (error) {
            console.error('Failed to fetch status', error);
        }
    };

    React.useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 30000);
        return () => clearInterval(interval);
    }, [userToken]);

    const handleManualOverride = () => {
        Alert.alert(
            "Intervention",
            "Manually trigger a calming haptic sequence? This will override autonomous mode for 5 minutes.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Trigger",
                    onPress: () => {
                        setIsAutonomous(false);
                        setTimeout(() => setIsAutonomous(true), 300000);
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeTitle}>System Dashboard</Text>
                <View style={styles.statusBadge}>
                    <View style={[styles.statusDot, { backgroundColor: pairedDeviceId ? '#22c55e' : '#f59e0b' }]} />
                    <Text style={styles.statusText}>{pairedDeviceId ? 'Device Connected' : 'No Device Linked'}</Text>
                </View>
            </View>

            <View style={styles.modeCard}>
                <View style={styles.modeHeader}>
                    <View>
                        <Text style={styles.modeLabel}>Active Mode</Text>
                        <Text style={styles.modeTitle}>{isAutonomous ? 'Autonomous' : 'Manual Override'}</Text>
                    </View>
                    <Ionicons
                        name={isAutonomous ? "shield-checkmark" : "hand-right"}
                        size={32}
                        color={isAutonomous ? "#22c55e" : COLORS.primary}
                    />
                </View>
                <Text style={styles.modeDescription}>
                    {isAutonomous
                        ? 'CRAVEX is monitoring your biomarkers and will intervene with gentle haptics if a craving signal is detected.'
                        : 'Manual intervention sequence is active. Autonomous monitoring will resume in 5 minutes.'}
                </Text>
                <View style={styles.lastSyncRow}>
                    <Ionicons name="time-outline" size={14} color={COLORS.subtext} />
                    <Text style={styles.lastSyncText}>Last signal sync: {lastSync}</Text>
                </View>
            </View>

            {pairedDeviceId && recentHR.length > 0 && (
                <View style={styles.chartPreview}>
                    <Text style={styles.sectionTitle}>Heart Rate Trend (BPM)</Text>
                    <View style={styles.barChart}>
                        {recentHR.map((hr, i) => (
                            <View key={i} style={styles.barItem}>
                                <View style={[styles.bar, { height: (hr / 120) * 60 }]} />
                                <Text style={styles.barLabel}>{hr}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            <View style={styles.actionGrid}>
                <TouchableOpacity
                    style={styles.actionCard}
                    onPress={() => navigation.navigate('Monitoring')}
                >
                    <View style={[styles.actionIcon, { backgroundColor: '#eff6ff' }]}>
                        <Ionicons name="pulse" size={24} color="#3b82f6" />
                    </View>
                    <Text style={styles.actionLabel}>Live Metrics</Text>
                    <Ionicons name="arrow-forward" size={16} color={COLORS.border} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionCard}
                    onPress={() => navigation.navigate('EventLog')}
                >
                    <View style={[styles.actionIcon, { backgroundColor: '#fdf2f8' }]}>
                        <Ionicons name="journal" size={24} color="#db2777" />
                    </View>
                    <Text style={styles.actionLabel}>Event Log</Text>
                    <Ionicons name="arrow-forward" size={16} color={COLORS.border} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionCard}
                    onPress={handleManualOverride}
                >
                    <View style={[styles.actionIcon, { backgroundColor: '#fff7ed' }]}>
                        <Ionicons name="flash" size={24} color="#f97316" />
                    </View>
                    <Text style={styles.actionLabel}>Override</Text>
                    <Ionicons name="arrow-forward" size={16} color={COLORS.border} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionCard}
                    onPress={() => navigation.navigate('Support')}
                >
                    <View style={[styles.actionIcon, { backgroundColor: '#f0fdf4' }]}>
                        <Ionicons name="help-buoy" size={24} color="#16a34a" />
                    </View>
                    <Text style={styles.actionLabel}>Support</Text>
                    <Ionicons name="arrow-forward" size={16} color={COLORS.border} />
                </TouchableOpacity>
            </View>

            {!pairedDeviceId && (
                <TouchableOpacity
                    style={styles.pairingCTA}
                    onPress={() => navigation.navigate('DevicePairing')}
                >
                    <View style={styles.pairingCTAContent}>
                        <Ionicons name="bluetooth" size={24} color="#fff" />
                        <View style={styles.pairingCTAText}>
                            <Text style={styles.pairingCTATitle}>Pair Your Device</Text>
                            <Text style={styles.pairingCTASubtitle}>Enable live monitoring & interventions</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>
            )}

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    content: {
        padding: 24,
    },
    welcomeSection: {
        marginBottom: 24,
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.text,
        letterSpacing: -0.5,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.subtext,
    },
    modeCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
    },
    modeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    modeLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.subtext,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    modeTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.text,
        marginTop: 2,
    },
    modeDescription: {
        fontSize: 15,
        color: '#64748b',
        lineHeight: 22,
        marginBottom: 20,
    },
    lastSyncRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    lastSyncText: {
        fontSize: 12,
        color: COLORS.subtext,
        marginLeft: 6,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    chartPreview: {
        marginBottom: 24,
    },
    barChart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
    },
    barItem: {
        alignItems: 'center',
        flex: 1,
    },
    bar: {
        width: 8,
        backgroundColor: COLORS.primary,
        borderRadius: 4,
        opacity: 0.8,
    },
    barLabel: {
        fontSize: 10,
        color: COLORS.subtext,
        marginTop: 6,
        fontWeight: '600',
    },
    actionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    actionCard: {
        backgroundColor: '#fff',
        width: '47.5%',
        padding: 16,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    actionIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
        flex: 1,
        marginLeft: 12,
    },
    pairingCTA: {
        backgroundColor: COLORS.primary,
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6,
    },
    pairingCTAContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pairingCTAText: {
        marginLeft: 16,
    },
    pairingCTATitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
    },
    pairingCTASubtitle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
    },
});
