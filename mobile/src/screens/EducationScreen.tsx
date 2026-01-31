import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const TOPICS = [
    {
        id: 1,
        title: 'Understanding Cravings',
        content: 'Cravings are natural responses to triggers. They are temporary and pass like waves. CRAVEX helps you ride these waves without judgment.',
        color: '#3b82f6',
    },
    {
        id: 2,
        title: 'How It Works',
        content: 'By monitoring your biometric signals, we can detect early signs of stress or arousal. The device provides gentle haptic feedback to ground you.',
        color: '#10b981',
    },
    {
        id: 3,
        title: 'Safety First',
        content: 'Our interventions are non-invasive and safe. If you ever feel uncomfortable, simply remove the device. You are always in control.',
        color: '#f59e0b',
    },
    {
        id: 4,
        title: 'Mindfulness Basics',
        content: 'When you feel a connection, take a deep breath. Focus on the sensation. Let the thought come and go. Return to the present moment.',
        color: '#8b5cf6',
    },
];

export default function EducationScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Learn</Text>
                <Text style={styles.subtitle}>Calm, evidence-based guidance</Text>
            </View>

            <View style={styles.content}>
                {TOPICS.map((topic) => (
                    <TouchableOpacity key={topic.id} style={[styles.card, { borderLeftColor: topic.color }]}>
                        <Text style={[styles.cardTitle, { color: topic.color }]}>{topic.title}</Text>
                        <Text style={styles.cardText}>{topic.content}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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
    content: {
        padding: 24,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    cardText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#475569',
    },
});
