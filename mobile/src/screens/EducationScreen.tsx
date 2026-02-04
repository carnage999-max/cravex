import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';

const TOPICS = [
    {
        id: 1,
        title: 'Understanding Cravings',
        content: 'Cravings are neuro-chemical signals, not commands. They typically last only 15-20 minutes. CRAVEX helps you recognize these signals early and "surf" the urge until it subsides.',
        icon: 'analytics-outline',
        color: '#3b82f6',
    },
    {
        id: 2,
        title: 'Haptic Grounding',
        content: 'Our device uses specific vibration patterns (haptics) to provide a "grounding" stimulus. This helps redirect your nervous system from a state of arousal (craving) back to a state of calm.',
        icon: 'finger-print-outline',
        color: '#10b981',
    },
    {
        id: 3,
        title: 'The Evidence',
        content: 'CRAVEX is based on established principles of Cognitive Behavioral Therapy (CBT) and biometric-informed mindfulness. We monitor HRV and Skin Conductance to provide objective feedback.',
        icon: 'library-outline',
        color: '#f59e0b',
    },
    {
        id: 4,
        title: 'Optimal Placement',
        content: 'For the most accurate biometric readings, wear the device snugly on the inside of your non-dominant wrist. Ensure the sensors maintain consistent contact with your skin.',
        icon: 'watch-outline',
        color: '#8b5cf6',
    },
    {
        id: 5,
        title: 'Data Privacy',
        content: 'Your raw biometric data stays on your device. Only anonymized, encrypted summaries are synced to the secure CRAVEX cloud to power your long-term trend analysis.',
        icon: 'shield-checkmark-outline',
        color: '#ef4444',
    },
];

export default function EducationScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
                <Text style={styles.title}>Education</Text>
                <Text style={styles.subtitle}>Evidence-based guidance for your journey</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.introCard}>
                    <Text style={styles.introText}>
                        Welcome to the CRAVEX® learning library. Explore the science behind our technology and find tips for managing your recovery.
                    </Text>
                </View>

                {TOPICS.map((topic) => (
                    <TouchableOpacity key={topic.id} style={styles.card}>
                        <View style={[styles.iconContainer, { backgroundColor: `${topic.color}15` }]}>
                            <Ionicons name={topic.icon as any} size={24} color={topic.color} />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{topic.title}</Text>
                            <Text style={styles.cardText}>{topic.content}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.footer}>
                <Ionicons name="information-circle-outline" size={20} color="#94a3b8" />
                <Text style={styles.footerText}>
                    CRAVEX is a support tool and does not replace professional medical advice or treatment programs.
                </Text>
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
        paddingTop: 60,
        paddingBottom: 24,
        backgroundColor: '#ffffff',
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
    content: {
        padding: 20,
    },
    introCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    introText: {
        fontSize: 15,
        color: '#64748b',
        lineHeight: 24,
        fontWeight: '500',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 24,
        marginBottom: 16,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 8,
    },
    cardText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#64748b',
    },
    footer: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    footerText: {
        fontSize: 12,
        color: '#94a3b8',
        marginLeft: 10,
        flex: 1,
        lineHeight: 18,
        fontWeight: '500',
    },
});
