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

    const renderItem = ({ item }: { item: LogEntry }) => (
        <TouchableOpacity style={styles.logItem}>
            <View style={[styles.iconContainer, { backgroundColor: COLORS.background }]}>
                <Ionicons name={getIcon(item.type) as any} size={20} color={COLORS.primary} />
            </View>
            <View style={styles.logContent}>
                <View style={styles.logHeader}>
                    <Text style={styles.logType}>{item.type.replace('_', ' ').toUpperCase()}</Text>
                    <Text style={styles.logTime}>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
                <Text style={styles.logMessage}>
                    {item.message || (item.type === 'biometrics' ? `HR: ${item.payload?.heartRate} | SC: ${item.payload?.skinConductance}` : 'Activity recorded')}
                </Text>
            </View>
        </TouchableOpacity>
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
                <Text style={styles.title}>Event Log</Text>
                <Text style={styles.subtitle}>History of device interactions</Text>
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
                        <Ionicons name="document-text-outline" size={48} color={COLORS.border} />
                        <Text style={styles.emptyStateText}>No events recorded yet.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: 24,
        paddingTop: 60,
        backgroundColor: COLORS.card,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.text,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 15,
        color: COLORS.subtext,
        marginTop: 4,
    },
    listContent: {
        padding: 16,
        paddingBottom: 32,
    },
    logItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
        fontWeight: '700',
        color: COLORS.subtext,
        letterSpacing: 1,
    },
    logTime: {
        fontSize: 12,
        color: COLORS.subtext,
    },
    logMessage: {
        fontSize: 15,
        color: COLORS.text,
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyStateText: {
        marginTop: 16,
        color: COLORS.subtext,
        fontSize: 16,
    },
});
