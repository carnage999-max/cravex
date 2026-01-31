import * as React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { contactFormSchema, ContactFormValues } from '@cravex/shared';
import { API_URL, COLORS } from '../constants';
import { usePreferences } from '../context/PreferencesContext';

export default function SupportScreen() {
    const { userToken } = usePreferences();
    const [form, setForm] = React.useState<ContactFormValues>({ name: '', email: '', message: '' });
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async () => {
        const validation = contactFormSchema.safeParse(form);
        if (!validation.success) {
            Alert.alert('Error', validation.error.errors[0].message);
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
                Alert.alert('Success', 'Message sent successfully!');
                setForm({ name: '', email: '', message: '' });
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            Alert.alert('Error', 'Could not send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Support</Text>
                <Text style={styles.subtitle}>We're here to help</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={form.name}
                    onChangeText={(t) => setForm(prev => ({ ...prev, name: t }))}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your email"
                    value={form.email}
                    onChangeText={(t) => setForm(prev => ({ ...prev, email: t }))}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Message</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="How can we help?"
                    value={form.message}
                    onChangeText={(t) => setForm(prev => ({ ...prev, message: t }))}
                    multiline
                    numberOfLines={4}
                />

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send Message</Text>}
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    form: {
        padding: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: COLORS.text,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 32,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
});
