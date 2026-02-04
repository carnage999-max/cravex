import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image, Dimensions, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { usePreferences } from '../context/PreferencesContext';
import { COLORS, API_URL } from '../constants';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type Step = 'welcome' | 'motion' | 'privacy' | 'login' | 'otp';

export default function OnboardingScreen() {
    const { reduceMotion, setReduceMotion, setIsAuthenticated, setUserToken } = usePreferences();
    const [step, setStep] = React.useState<Step>('welcome');
    const [email, setEmail] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleRequestOtp = async () => {
        if (!email.includes('@')) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/request-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStep('otp');
            } else {
                const data = await response.json();
                Alert.alert('Error', data.error || 'Failed to send OTP');
            }
        } catch (error) {
            Alert.alert('Error', 'Connection failed. Please check your network.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            Alert.alert('Invalid Code', 'OTP must be 6 digits.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: otp }),
            });

            const data = await response.json();
            if (response.ok && data.token) {
                await setUserToken(data.token);
                setIsAuthenticated(true);
            } else {
                Alert.alert('Error', data.error || 'Invalid code');
            }
        } catch (error) {
            Alert.alert('Error', 'Connection failed.');
        } finally {
            setLoading(false);
        }
    };

    const renderWelcome = () => (
        <View style={styles.stepContainer}>
            <Image
                source={require('../../assets/cravex-logo.png')}
                style={{ width: 120, height: 40, marginBottom: 40 }}
                resizeMode="contain"
            />
            <View style={styles.iconCircle}>
                <Ionicons name="pulse" size={60} color={COLORS.primary} />
            </View>
            <Text style={styles.title}>Welcome to CRAVEX®</Text>
            <Text style={styles.description}>
                Control your cravings with evidence-based biometric monitoring and calm, non-invasive interventions.
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={() => setStep('motion')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );

    const renderMotion = () => (
        <View style={styles.stepContainer}>
            <Ionicons name="eye-outline" size={48} color={COLORS.primary} style={{ marginBottom: 20 }} />
            <Text style={styles.title}>Visual Comfort</Text>
            <Text style={styles.description}>
                We use subtle 3D animations to represent device connection and status. If you prefer less movement, you can enable Reduce Motion.
            </Text>

            <View style={styles.preferenceCard}>
                <View style={styles.row}>
                    <Text style={styles.preferenceLabel}>Reduce Motion</Text>
                    <Switch
                        value={reduceMotion}
                        onValueChange={setReduceMotion}
                        trackColor={{ false: '#e2e8f0', true: COLORS.primary }}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => setStep('privacy')}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );

    const renderPrivacy = () => (
        <View style={styles.stepContainer}>
            <Ionicons name="shield-checkmark-outline" size={48} color={COLORS.primary} style={{ marginBottom: 20 }} />
            <Text style={styles.title}>Your Privacy</Text>
            <Text style={styles.description}>
                Your data is stored locally and encrypted. We never share your biometric signals without your explicit permission.
            </Text>

            <TouchableOpacity style={[styles.primaryButton, { marginTop: 40 }]} onPress={() => setStep('login')}>
                <Text style={styles.buttonText}>Continue to Login</Text>
            </TouchableOpacity>
        </View>
    );

    const renderLogin = () => (
        <View style={styles.stepContainer}>
            <Ionicons name="mail-outline" size={48} color={COLORS.primary} style={{ marginBottom: 20 }} />
            <Text style={styles.title}>Identity</Text>
            <Text style={styles.description}>
                Enter your email to sync your data across devices and secure your profile.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#94a3b8"
            />

            <TouchableOpacity
                style={[styles.primaryButton, loading && styles.disabledButton]}
                onPress={handleRequestOtp}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send Authentication Code</Text>}
            </TouchableOpacity>
        </View>
    );

    const renderOtp = () => (
        <View style={styles.stepContainer}>
            <Ionicons name="keypad-outline" size={48} color={COLORS.primary} style={{ marginBottom: 20 }} />
            <Text style={styles.title}>Verification</Text>
            <Text style={styles.description}>
                We've sent a 6-digit code to {email}.
            </Text>

            <TextInput
                style={[styles.input, { textAlign: 'center', fontSize: 32, fontWeight: '800' }]}
                placeholder="000000"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                placeholderTextColor="#94a3b8"
            />

            <TouchableOpacity
                style={[styles.primaryButton, loading && styles.disabledButton]}
                onPress={handleVerifyOtp}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify & Enter</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.textButton} onPress={() => setStep('login')}>
                <Text style={styles.textButtonText}>Change Email</Text>
            </TouchableOpacity>
        </View>
    );

    const getProgress = () => {
        switch (step) {
            case 'welcome': return 20;
            case 'motion': return 40;
            case 'privacy': return 60;
            case 'login': return 80;
            case 'otp': return 100;
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressIndicator, { width: `${getProgress()}%` }]} />
                </View>

                {step === 'welcome' && renderWelcome()}
                {step === 'motion' && renderMotion()}
                {step === 'privacy' && renderPrivacy()}
                {step === 'login' && renderLogin()}
                {step === 'otp' && renderOtp()}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        padding: 24,
        justifyContent: 'center',
    },
    progressBar: {
        height: 4,
        backgroundColor: '#e2e8f0',
        borderRadius: 2,
        position: 'absolute',
        top: 60,
        left: 24,
        right: 24,
    },
    progressIndicator: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 2,
    },
    stepContainer: {
        alignItems: 'center',
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: -0.5,
    },
    description: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    input: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 18,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        fontSize: 16,
        color: COLORS.text,
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        width: '100%',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    disabledButton: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    textButton: {
        marginTop: 20,
    },
    textButtonText: {
        color: COLORS.secondary,
        fontSize: 14,
        fontWeight: '600',
    },
    preferenceCard: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
        borderRadius: 12,
        marginBottom: 40,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    preferenceLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
});
