import * as React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Alert, Platform, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { CONFIG_BOUNDS, AppConfig, configPatchSchema } from '@cravex/shared';
import { usePreferences } from '../context/PreferencesContext';
import { COLORS, API_URL } from '../constants';

export default function SettingsScreen() {
    const { reduceMotion, setReduceMotion, setIsAuthenticated, setUserToken, userToken } = usePreferences();
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
                    setConfig(data.config);
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
            const response = await fetch(`${API_URL}/api/config`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({ [key]: value }),
            });
            if (!response.ok) {
                console.error('Failed to update config on server');
            }
        } catch (error) {
            console.error('Failed to update config', error);
        }
    };

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.subtitle}>Personalize your experience</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferences</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Reduce Motion</Text>
                    <Switch
                        value={reduceMotion}
                        onValueChange={setReduceMotion}
                        trackColor={{ false: '#e2e8f0', true: COLORS.primary }}
                    />
                </View>
                <Text style={styles.description}>Minimize animations and 3D effects for a calmer interface.</Text>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.label}>Notifications</Text>
                    <Switch
                        value={config.notificationsEnabled}
                        onValueChange={(val) => updateConfig('notificationsEnabled', val)}
                        trackColor={{ false: '#e2e8f0', true: COLORS.primary }}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Device Configuration</Text>

                <View style={styles.controlGroup}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Haptic Intensity</Text>
                        <Text style={styles.value}>{Math.round(config.hapticIntensity)}%</Text>
                    </View>
                    <Slider
                        style={styles.slider}
                        minimumValue={CONFIG_BOUNDS.hapticIntensity.min}
                        maximumValue={CONFIG_BOUNDS.hapticIntensity.max}
                        value={config.hapticIntensity}
                        onSlidingComplete={(val) => updateConfig('hapticIntensity', val)}
                        minimumTrackTintColor={COLORS.primary}
                        maximumTrackTintColor="#e2e8f0"
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
                        maximumTrackTintColor="#e2e8f0"
                        thumbTintColor={COLORS.primary}
                    />
                </View>

                <View style={styles.controlGroup}>
                    <Text style={styles.label}>Sensitivity</Text>
                    <View style={styles.segmentControl}>
                        {(['low', 'medium', 'high'] as const).map((level) => (
                            <Text
                                key={level}
                                onPress={() => updateConfig('sensitivity', level)}
                                style={[
                                    styles.segmentOption,
                                    config.sensitivity === level && styles.segmentOptionSelected
                                ]}
                            >
                                {level.toUpperCase()}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Data & Privacy</Text>
                <TouchableOpacity onPress={() => Alert.alert('Export', 'Generating data export bundle...')}>
                    <Text style={styles.link}>Export My Data</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={[styles.link, { color: COLORS.secondary }]}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Delete', 'Please contact support to delete your account.')}>
                    <Text style={[styles.link, { color: COLORS.primary }]}>Delete Account</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        padding: 24,
        paddingTop: 60,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#0f172a',
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
        marginTop: 4,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
    },
    value: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ef4444',
    },
    description: {
        fontSize: 13,
        color: '#94a3b8',
        lineHeight: 20,
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 16,
    },
    controlGroup: {
        marginBottom: 24,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    segmentControl: {
        flexDirection: 'row',
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
        padding: 2,
        marginTop: 8,
    },
    segmentOption: {
        flex: 1,
        textAlign: 'center',
        paddingVertical: 8,
        fontSize: 12,
        fontWeight: '600',
        color: '#64748b',
        borderRadius: 6,
    },
    segmentOptionSelected: {
        backgroundColor: '#ffffff',
        color: '#0f172a',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    link: {
        fontSize: 16,
        fontWeight: '500',
        color: '#3b82f6',
        marginBottom: 16,
    },
});
