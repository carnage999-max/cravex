import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { COLORS, API_URL } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { usePreferences } from '../context/PreferencesContext';

interface LogEntry {
    id: string;
    type: string;
    message?: string;
    payload?: any;
    createdAt: string;
}

export default function EventLogScreen() {
    const { userToken } = usePreferences();
    const [logs, setLogs] = React.useState<LogEntry[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const fetchLogs = async () => {
        if (!userToken) return;
        try {
            const response = await fetch(`${API_URL}/api/events?limit=50`, {
                headers: { 'Authorization': `Bearer ${userToken}` }
            });
            if (response.ok) {
                const data = await response.json();
                setLogs(data.events);
            }
        } catch (error) {
            console.error('Failed to fetch logs', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    React.useEffect(() => {
        fetchLogs();
    }, [userToken]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchLogs();
    };

    const getIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'pairing': return 'bluetooth';
            case 'biometrics': return 'pulse';
            case 'error': return 'warning';
            case 'config_change': return 'settings';
            default: return 'list';
        }
    };

    const getIconColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'biometrics': return '#22c55e';
            case 'error': return '#ef4444';
            case 'pairing': return '#3b82f6';
            default: return COLORS.primary;
        }
    };

    const renderItem = ({ item }: { item: LogEntry }) => (
        <View style={styles.logItem}>
            <View style={[styles.iconContainer, { backgroundColor: `${getIconColor(item.type)}10` }]}>
                <Ionicons name={getIcon(item.type) as any} size={20} color={getIconColor(item.type)} />
            </View>
            <View style={styles.logContent}>
                <View style={styles.logHeader}>
                    <Text style={styles.logType}>{item.type.replace('_', ' ').toUpperCase()}</Text>
                    <Text style={styles.logTime}>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
                <Text style={styles.logMessage}>
                    {item.message || (item.type === 'biometrics' ? `HR: ${item.payload?.heartRate} bpm | Signal: ${item.payload?.signalStrength}%` : 'System activity recorded')}
                </Text>
            </View>
        </View>
    );

    if (loading && !refreshing) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Activity Log</Text>
                <Text style={styles.subtitle}>Historical record of device signals and events</Text>
            </View>

            <FlatList
                data={logs}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconCircle}>
                            <Ionicons name="document-text-outline" size={48} color={COLORS.border} />
                        </View>
                        <Text style={styles.emptyStateTitle}>No Logs Found</Text>
                        <Text style={styles.emptyStateText}>As you use your device, activity events will appear here.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 24,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.text,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 15,
        color: COLORS.subtext,
        marginTop: 4,
        lineHeight: 20,
    },
    listContent: {
        padding: 20,
        paddingBottom: 40,
    },
    logItem: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    logContent: {
        flex: 1,
    },
    logHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    logType: {
        fontSize: 11,
        fontWeight: '800',
        color: COLORS.subtext,
        letterSpacing: 1,
    },
    logTime: {
        fontSize: 12,
        color: COLORS.subtext,
        fontWeight: '500',
    },
    logMessage: {
        fontSize: 15,
        color: COLORS.text,
        fontWeight: '600',
        lineHeight: 20,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
        paddingHorizontal: 40,
    },
    emptyIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 8,
    },
    emptyStateText: {
        color: COLORS.subtext,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
});
