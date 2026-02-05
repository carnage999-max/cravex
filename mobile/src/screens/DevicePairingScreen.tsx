import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, API_URL } from '../constants';
import { usePreferences } from '../context/PreferencesContext';

export default function DevicePairingScreen({ navigation }: any) {
    const { pairedDeviceId, setPairedDeviceId, userToken } = usePreferences();
    const [status, setStatus] = React.useState<'idle' | 'scanning' | 'connecting' | 'connected'>(
        pairedDeviceId ? 'connected' : 'idle'
    );
    const [devices, setDevices] = React.useState<{ id: string; name: string; signal: number }[]>([]);

    const startScan = () => {
        setDevices([]);
        setStatus('scanning');
        // Simulate finding devices
        setTimeout(() => {
            setDevices([
                { id: 'CX-08821', name: 'CRAVEX Alpha', signal: 92 },
                { id: 'CX-04129', name: 'CRAVEX Beta', signal: 78 },
            ]);
        }, 2000);
    };

    const connectToDevice = async (device: { id: string; name: string }) => {
        setStatus('connecting');
        // Simulate connection delay
        setTimeout(async () => {
            try {
                // Bind device to user account on server
                const response = await fetch(`${API_URL}/api/devices/bind`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    },
                    body: JSON.stringify({
                        deviceId: device.id,
                        label: device.name
                    })
                });

                if (response.ok) {
                    await setPairedDeviceId(device.id);
                    setStatus('connected');
                    Alert.alert(
                        "Connected",
                        `Successfully paired with ${device.name}.`,
                        [{ text: "OK", onPress: () => navigation.navigate('Main', { screen: 'Monitoring' }) }]
                    );
                } else {
                    throw new Error('Failed to bind device on server');
                }
            } catch (error) {
                setStatus('idle');
                Alert.alert("Pairing Error", "Could not synchronize with the CRAVEX secure cloud. Please check your connection.");
            }
        }, 1500);
    };

    const disconnect = async () => {
        Alert.alert("Disconnect", "Are you sure you want to unpair this device?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Unpair",
                style: "destructive",
                onPress: async () => {
                    await setPairedDeviceId(null);
                    setStatus('idle');
                    setDevices([]);
                }
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/cravex-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Device Pairing</Text>
                <Text style={styles.subtitle}>Connect your CRAVEX® hardware</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    {status === 'idle' && (
                        <View style={styles.central}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="bluetooth" size={48} color={COLORS.primary} />
                            </View>
                            <Text style={styles.instruction}>
                                Ensure your CRAVEX® device is turned on and nearby.
                            </Text>
                            <TouchableOpacity style={styles.primaryButton} onPress={startScan}>
                                <Text style={styles.buttonText}>Scan for Devices</Text>
                            </TouchableOpacity>

                            <View style={styles.infoSection}>
                                <Text style={styles.infoTitle}>Pairing Instructions</Text>
                                <View style={styles.step}>
                                    <View style={styles.stepNumberContainer}>
                                        <Text style={styles.stepNumber}>1</Text>
                                    </View>
                                    <Text style={styles.stepText}>Ensure your device is powered on.</Text>
                                </View>
                                <View style={styles.step}>
                                    <View style={styles.stepNumberContainer}>
                                        <Text style={styles.stepNumber}>2</Text>
                                    </View>
                                    <Text style={styles.stepText}>Keep the device within 10 feet of your phone.</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {status === 'scanning' && (
                        <View style={styles.central}>
                            <ActivityIndicator color={COLORS.primary} size="large" />
                            <Text style={styles.statusText}>Searching for CRAVEX signals...</Text>
                            {devices.length > 0 && (
                                <View style={styles.deviceList}>
                                    {devices.map(device => (
                                        <TouchableOpacity
                                            key={device.id}
                                            style={styles.deviceItem}
                                            onPress={() => connectToDevice(device)}
                                        >
                                            <View>
                                                <Text style={styles.deviceName}>{device.name}</Text>
                                                <Text style={styles.deviceId}>ID: {device.id}</Text>
                                            </View>
                                            <View style={styles.deviceRight}>
                                                <Text style={styles.signalText}>{device.signal}%</Text>
                                                <Ionicons name="chevron-forward" size={20} color={COLORS.subtext} />
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                            {devices.length === 0 && (
                                <View style={styles.scanningPulse} />
                            )}
                        </View>
                    )}

                    {status === 'connecting' && (
                        <View style={styles.central}>
                            <ActivityIndicator color={COLORS.primary} size="large" />
                            <Text style={styles.statusText}>Establishing secure connection...</Text>
                        </View>
                    )}

                    {status === 'connected' && (
                        <View style={styles.central}>
                            <View style={[styles.iconCircle, { backgroundColor: '#f0fdf4' }]}>
                                <Ionicons name="checkmark-circle" size={60} color="#22c55e" />
                            </View>
                            <Text style={styles.connectedTitle}>Device Paired</Text>
                            <Text style={styles.connectedId}>CX-ID: {pairedDeviceId}</Text>

                            <TouchableOpacity
                                style={styles.primaryButton}
                                onPress={() => navigation.navigate('Main', { screen: 'Monitoring' })}
                            >
                                <Text style={styles.buttonText}>Open Monitoring</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.textButton} onPress={disconnect}>
                                <Text style={styles.textButtonText}>Unpair Device</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    logo: {
        width: 120,
        height: 40,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.text,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.subtext,
        marginTop: 4,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 24,
    },
    central: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    instruction: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    statusText: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 32,
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        width: '100%',
        padding: 18,
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    deviceList: {
        width: '100%',
        marginTop: 10,
    },
    deviceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    deviceName: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
    },
    deviceId: {
        fontSize: 12,
        color: COLORS.subtext,
        marginTop: 2,
    },
    deviceRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signalText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#22c55e',
        marginRight: 8,
    },
    infoSection: {
        width: '100%',
        marginTop: 48,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 16,
    },
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    stepNumberContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    stepNumber: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748b',
    },
    stepText: {
        fontSize: 14,
        color: '#64748b',
    },
    connectedTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 8,
    },
    connectedId: {
        fontSize: 16,
        color: COLORS.subtext,
        marginBottom: 40,
    },
    textButton: {
        marginTop: 20,
    },
    textButtonText: {
        color: COLORS.secondary,
        fontSize: 14,
        fontWeight: '600',
    },
    scanningPulse: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLORS.primary,
        opacity: 0.3,
    }
});
