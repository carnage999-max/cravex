import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { COLORS, API_URL } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { usePreferences } from '../context/PreferencesContext';

interface Props {
    navigation: any;
}

export default function HomeScreen({ navigation }: Props) {
    const { userToken } = usePreferences();
    const [isConnected, setIsConnected] = React.useState(false);
    const [isAutonomous, setIsAutonomous] = React.useState(true);
    const [lastSync, setLastSync] = React.useState('Never');

    const fetchStatus = async () => {
        if (!userToken) return;
        try {
            const response = await fetch(`${API_URL}/api/events?limit=1`, {
                headers: { 'Authorization': `Bearer ${userToken}` }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.events && data.events.length > 0) {
                    const latest = data.events[0];
                    setLastSync(new Date(latest.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                    setIsConnected(true); // Assume connected if we have events
                }
            }
        } catch (error) {
            console.error('Failed to fetch status', error);
        }
    };

    React.useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, [userToken]);

    const handleManualOverride = () => {
        Alert.alert(
            "Manual Override",
            "Are you sure you want to manually trigger a calm sequence?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Confirm",
                    onPress: () => {
                        setIsAutonomous(false);
                        setTimeout(() => setIsAutonomous(true), 300000); // Back to auto in 5 mins
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.statusSection}>
                <View style={styles.statusHeader}>
                    <View style={styles.statusIndicator}>
                        <View style={[styles.pulseCircle, { backgroundColor: isConnected ? COLORS.success : COLORS.error }]} />
                        <Text style={styles.statusText}>{isConnected ? 'Device Connected' : 'Device Searching...'}</Text>
                    </View>
                    <Text style={styles.syncText}>Last sync: {lastSync}</Text>
                </View>

                <View style={styles.mainStateCard}>
                    <Text style={styles.stateLabel}>OPERATING MODE</Text>
                    <Text style={styles.stateValue}>{isAutonomous ? 'Autonomous' : 'Manual Override Active'}</Text>
                    <View style={styles.modeProgress}>
                        <View style={[styles.modeIndicator, { width: '100%', backgroundColor: isAutonomous ? COLORS.success : COLORS.primary }]} />
                    </View>
                    <Text style={styles.stateDescription}>
                        {isAutonomous
                            ? 'Monitoring biometric signals and providing gentle interventions when needed.'
                            : 'Manual session in progress. System will return to autonomous mode shortly.'}
                    </Text>
                </View>
            </View>

            <View style={styles.actionGrid}>
                <TouchableOpacity style={styles.actionCard} onPress={handleManualOverride}>
                    <View style={[styles.actionIcon, { backgroundColor: '#fee2e2' }]}>
                        <Ionicons name="hand-right-outline" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.actionLabel}>Manual Override</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard} onPress={() => (navigation as any).navigate('Main', { screen: 'MonitoringTab' })}>
                    <View style={[styles.actionIcon, { backgroundColor: '#dbeafe' }]}>
                        <Ionicons name="pulse" size={24} color="#3b82f6" />
                    </View>
                    <Text style={styles.actionLabel}>Live Monitoring</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard} onPress={() => (navigation as any).navigate('EventLog')}>
                    <View style={[styles.actionIcon, { backgroundColor: '#f1f5f9' }]}>
                        <Ionicons name="list" size={24} color={COLORS.secondary} />
                    </View>
                    <Text style={styles.actionLabel}>Review Event Log</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard} onPress={() => (navigation as any).navigate('Main', { screen: 'SettingsTab' })}>
                    <View style={[styles.actionIcon, { backgroundColor: '#fef3c7' }]}>
                        <Ionicons name="options-outline" size={24} color="#f59e0b" />
                    </View>
                    <Text style={styles.actionLabel}>Configure Device</Text>
                </TouchableOpacity>
            </View>

            {!isConnected && (
                <TouchableOpacity style={styles.pairBanner} onPress={() => (navigation as any).navigate('DevicePairing')}>
                    <Ionicons name="bluetooth" size={20} color="#fff" />
                    <Text style={styles.pairBannerText}>Re-pair Device</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: 24,
        paddingTop: 16,
    },
    statusSection: {
        marginBottom: 32,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pulseCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
    syncText: {
        fontSize: 12,
        color: COLORS.subtext,
    },
    mainStateCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    stateLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.subtext,
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    stateValue: {
        fontSize: 22,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 16,
    },
    modeProgress: {
        height: 4,
        backgroundColor: '#f1f5f9',
        borderRadius: 2,
        marginBottom: 16,
    },
    modeIndicator: {
        height: '100%',
        borderRadius: 2,
    },
    stateDescription: {
        fontSize: 14,
        color: COLORS.subtext,
        lineHeight: 22,
    },
    actionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionCard: {
        backgroundColor: '#fff',
        width: '47%',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 2,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
    },
    pairBanner: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    pairBannerText: {
        color: '#fff',
        fontWeight: '700',
        marginLeft: 8,
    },
});
