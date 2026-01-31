import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import DeviceConnectionAnimation from '../animations/DeviceConnectionAnimation';
import { COLORS } from '../constants';

interface Props {
    navigation: any;
}

export default function DevicePairingScreen({ navigation }: Props) {
    const [isScanning, setIsScanning] = React.useState(false);
    const [isConnecting, setIsConnecting] = React.useState(false);
    const [isConnected, setIsConnected] = React.useState(false);

    const handleScan = () => {
        setIsScanning(true);
        // Simulate scanning
        setTimeout(() => {
            setIsScanning(false);
            setIsConnecting(true);
        }, 2000);
    };

    const handleConnect = () => {
        // Simulate connection
        setTimeout(() => {
            setIsConnecting(false);
            setIsConnected(true);
        }, 3000);
    };

    React.useEffect(() => {
        if (isConnecting) {
            handleConnect();
        }
    }, [isConnecting]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.animationContainer}>
                    <DeviceConnectionAnimation
                        isConnecting={isConnecting}
                        isConnected={isConnected}
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Device Pairing</Text>
                    <Text style={styles.cardText}>
                        {isConnected
                            ? 'Device successfully paired! You can now start monitoring.'
                            : isConnecting
                                ? 'Establishing secure connection...'
                                : isScanning
                                    ? 'Scanning for nearby devices...'
                                    : 'Press the button below to scan for your CRAVEX® device.'}
                    </Text>
                </View>

                {!isConnected && !isConnecting && (
                    <TouchableOpacity
                        style={[styles.primaryButton, isScanning && styles.buttonDisabled]}
                        onPress={handleScan}
                        disabled={isScanning}
                    >
                        {isScanning ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.primaryButtonText}>Scan for Devices</Text>
                        )}
                    </TouchableOpacity>
                )}

                {isConnected && (
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('Main', { screen: 'MonitoringTab' })}
                    >
                        <Text style={styles.primaryButtonText}>Start Monitoring</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>Pairing Instructions</Text>
                    <View style={styles.step}>
                        <Text style={styles.stepNumber}>1</Text>
                        <Text style={styles.stepText}>Ensure your CRAVEX® device is powered on</Text>
                    </View>
                    <View style={styles.step}>
                        <Text style={styles.stepNumber}>2</Text>
                        <Text style={styles.stepText}>Keep the device within 10 feet of your phone</Text>
                    </View>
                    <View style={styles.step}>
                        <Text style={styles.stepNumber}>3</Text>
                        <Text style={styles.stepText}>Tap "Scan for Devices" to begin pairing</Text>
                    </View>
                </View>
            </View>
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
    },
    animationContainer: {
        height: 300,
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
    card: {
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
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 12,
    },
    cardText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#64748b',
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginBottom: 32,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    infoSection: {
        marginTop: 16,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 16,
    },
    step: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    stepNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 32,
        marginRight: 12,
    },
    stepText: {
        flex: 1,
        fontSize: 15,
        lineHeight: 32,
        color: '#64748b',
    },
});
