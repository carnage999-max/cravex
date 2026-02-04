import * as React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Alert, Platform, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { CONFIG_BOUNDS, AppConfig } from '@cravex/shared';
import { usePreferences } from '../context/PreferencesContext';
import { COLORS, API_URL } from '../constants';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
    const { reduceMotion, setReduceMotion, setIsAuthenticated, setUserToken, userToken, pairedDeviceId, setPairedDeviceId } = usePreferences();
    const [config, setConfig] = React.useState<AppConfig>({
        hapticIntensity: 50,
        ledBrightness: 50,
        sensitivity: 'medium',
        notificationsEnabled: true,
    });

    React.useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch(`${API_URL}/api/config`, {
                    headers: { 'Authorization': `Bearer ${userToken}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.config) setConfig(data.config);
                }
            } catch (error) {
                console.error('Failed to fetch config', error);
            }
        };
        if (userToken) fetchConfig();
    }, [userToken]);

    const updateConfig = async (key: keyof AppConfig, value: any) => {
        const newConfig = { ...config, [key]: value };
        setConfig(newConfig);

        try {
            await fetch(`${API_URL}/api/config`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({ [key]: value }),
            });
        } catch (error) {
            console.error('Failed to update config', error);
        }
    };

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout? You will need to re-authenticate to sync your data.", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                    await setUserToken(null);
                    setIsAuthenticated(false);
                }
            }
        ]);
    };

    const handleUnpair = () => {
        Alert.alert("Unpair Device", "This will disconnect the current CRAVEX device from your profile.", [
            { text: "Cancel", style: "cancel" },
            { text: "Unpair", style: "destructive", onPress: () => setPairedDeviceId(null) }
        ]);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.subtitle}>Manage your device and preferences</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Hardware & Connection</Text>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.labelGroup}>
                            <Text style={styles.label}>Paired Device</Text>
                            <Text style={styles.subLabel}>{pairedDeviceId || 'No device linked'}</Text>
                        </View>
                        {pairedDeviceId ? (
                            <TouchableOpacity onPress={handleUnpair} style={styles.unpairButton}>
                                <Text style={styles.unpairText}>Unpair</Text>
                            </TouchableOpacity>
                        ) : (
                            <Ionicons name="bluetooth" size={20} color={COLORS.border} />
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Intervention Intensity</Text>
                <View style={styles.card}>
                    <View style={styles.controlGroup}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Haptic Strength</Text>
                            <Text style={styles.value}>{Math.round(config.hapticIntensity)}%</Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={CONFIG_BOUNDS.hapticIntensity.min}
                            maximumValue={CONFIG_BOUNDS.hapticIntensity.max}
                            value={config.hapticIntensity}
                            onSlidingComplete={(val) => updateConfig('hapticIntensity', val)}
                            minimumTrackTintColor={COLORS.primary}
                            maximumTrackTintColor="#f1f5f9"
                            thumbTintColor={COLORS.primary}
                        />
                    </View>

                    <View style={styles.controlGroup}>
                        <View style={styles.row}>
                            <Text style={styles.label}>LED Brightness</Text>
                            <Text style={styles.value}>{Math.round(config.ledBrightness)}%</Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={CONFIG_BOUNDS.ledBrightness.min}
                            maximumValue={CONFIG_BOUNDS.ledBrightness.max}
                            value={config.ledBrightness}
                            onSlidingComplete={(val) => updateConfig('ledBrightness', val)}
                            minimumTrackTintColor={COLORS.primary}
                            maximumTrackTintColor="#f1f5f9"
                            thumbTintColor={COLORS.primary}
                        />
                    </View>

                    <View style={styles.controlGroup}>
                        <Text style={styles.label}>Detection Sensitivity</Text>
                        <View style={styles.segmentControl}>
                            {(['low', 'medium', 'high'] as const).map((level) => (
                                <TouchableOpacity
                                    key={level}
                                    onPress={() => updateConfig('sensitivity', level)}
                                    style={[
                                        styles.segmentOption,
                                        config.sensitivity === level && styles.segmentOptionSelected
                                    ]}
                                >
                                    <Text style={[
                                        styles.segmentText,
                                        config.sensitivity === level && styles.segmentTextSelected
                                    ]}>
                                        {level.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>App Preferences</Text>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Reduce Motion</Text>
                        <Switch
                            value={reduceMotion}
                            onValueChange={setReduceMotion}
                            trackColor={{ false: '#f1f5f9', true: COLORS.primary }}
                        />
                    </View>
                    <Text style={styles.description}>Minimize 3D animations and transitions for a calmer experience.</Text>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Push Notifications</Text>
                        <Switch
                            value={config.notificationsEnabled}
                            onValueChange={(val) => updateConfig('notificationsEnabled', val)}
                            trackColor={{ false: '#f1f5f9', true: COLORS.primary }}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account & Data</Text>
                <TouchableOpacity style={styles.actionItem} onPress={() => Alert.alert('Export', 'Data export request submitted. You will receive an email shortly.')}>
                    <Ionicons name="download-outline" size={20} color={COLORS.text} />
                    <Text style={styles.actionText}>Export My Data</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color={COLORS.secondary} />
                    <Text style={[styles.actionText, { color: COLORS.secondary }]}>Sign Out</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} onPress={() => Alert.alert('Delete Account', 'For your security, account deletion must be confirmed via support@cravex.net.')}>
                    <Ionicons name="trash-outline" size={20} color="#94a3b8" />
                    <Text style={[styles.actionText, { color: '#94a3b8' }]}>Delete Account</Text>
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
        paddingBottom: 40,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 24,
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
    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    labelGroup: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
    },
    subLabel: {
        fontSize: 13,
        color: COLORS.subtext,
        marginTop: 2,
    },
    value: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.primary,
    },
    description: {
        fontSize: 13,
        color: '#94a3b8',
        lineHeight: 18,
        marginTop: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginVertical: 16,
    },
    controlGroup: {
        marginBottom: 24,
    },
    slider: {
        width: '100%',
        height: 40,
        marginTop: 8,
    },
    segmentControl: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 4,
        marginTop: 12,
    },
    segmentOption: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10,
    },
    segmentOptionSelected: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    segmentText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#94a3b8',
    },
    segmentTextSelected: {
        color: COLORS.text,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 18,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    actionText: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
        marginLeft: 16,
    },
    unpairButton: {
        backgroundColor: '#fee2e2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    unpairText: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.secondary,
    }
});
