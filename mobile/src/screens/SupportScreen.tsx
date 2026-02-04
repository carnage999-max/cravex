import * as React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { contactFormSchema, ContactFormValues } from '@cravex/shared';
import { API_URL, COLORS } from '../constants';
import { usePreferences } from '../context/PreferencesContext';
import { Ionicons } from '@expo/vector-icons';

export default function SupportScreen() {
    const { userToken } = usePreferences();
    const [form, setForm] = React.useState<ContactFormValues>({ name: '', email: '', message: '' });
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async () => {
        const validation = contactFormSchema.safeParse(form);
        if (!validation.success) {
            Alert.alert('Validation Error', validation.error.errors[0].message);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/support`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                Alert.alert('Message Sent', 'Our clinical support team has received your message and will respond within 24 hours.');
                setForm({ name: '', email: '', message: '' });
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            Alert.alert('Connection Error', 'We could not reach the support servers. Please check your data connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: '#f8fafc' }}
        >
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Support Center</Text>
                    <Text style={styles.subtitle}>Direct access to our dedicated assistance team.</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.infoCard}>
                        <Ionicons name="chatbubbles-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.infoText}>
                            Have a question about your device or need assistance with your recovery plan? We're here for you.
                        </Text>
                    </View>

                    <View style={styles.formCard}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                placeholderTextColor="#94a3b8"
                                value={form.name}
                                onChangeText={(t) => setForm(prev => ({ ...prev, name: t }))}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="name@example.com"
                                placeholderTextColor="#94a3b8"
                                value={form.email}
                                onChangeText={(t) => setForm(prev => ({ ...prev, email: t }))}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Message</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="How can we assist you today?"
                                placeholderTextColor="#94a3b8"
                                value={form.message}
                                onChangeText={(t) => setForm(prev => ({ ...prev, message: t }))}
                                multiline
                                numberOfLines={5}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.submitButton, loading && styles.buttonDisabled]}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit Request</Text>}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.alternativeSupport}>
                        <Text style={styles.altTitle}>Other Resources</Text>
                        <TouchableOpacity style={styles.altItem}>
                            <Ionicons name="book-outline" size={20} color={COLORS.subtext} />
                            <Text style={styles.altText}>Knowledge Base & FAQs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.altItem}>
                            <Ionicons name="mail-outline" size={20} color={COLORS.subtext} />
                            <Text style={styles.altText}>Email: support@cravex.net</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        lineHeight: 22,
    },
    content: {
        paddingHorizontal: 20,
    },
    infoCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    infoText: {
        flex: 1,
        marginLeft: 16,
        fontSize: 14,
        color: '#64748b',
        lineHeight: 20,
    },
    formCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 10,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: '#f8fafc',
        borderRadius: 14,
        padding: 16,
        fontSize: 16,
        color: COLORS.text,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
        paddingTop: 16,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 14,
        padding: 18,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    alternativeSupport: {
        marginTop: 32,
        paddingHorizontal: 4,
    },
    altTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 16,
    },
    altItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    altText: {
        fontSize: 14,
        color: '#64748b',
        marginLeft: 12,
        fontWeight: '500',
    },
});
