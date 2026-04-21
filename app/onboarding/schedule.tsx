import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
import i18n, { setLocale } from '@/lib/i18n';

export default function ScheduleScreen() {
    const router = useRouter();
    const { setWorkingHours, finishOnboarding, language, isDarkMode } = useAppStore();
    const [daysPerWeek, setDaysPerWeek] = useState('5');
    const [hoursPerDay, setHoursPerDay] = useState('8');

    useEffect(() => {
        setLocale(language);
    }, [language]);

    const weeklyTotal = (parseInt(daysPerWeek) || 0) * (parseInt(hoursPerDay) || 0);

    const handleFinish = () => {
        // WorkingHours interface uses 'daily' for hours per day
        setWorkingHours({
            daily: parseInt(hoursPerDay) || 8,
            daysPerWeek: parseInt(daysPerWeek) || 5,
        });
        finishOnboarding();
        router.replace('/home');
    };

    const dark = isDarkMode;

    return (
        <LinearGradient
            colors={dark ? ['#1F2937', '#111827', '#0F172A'] : ['#EFF6FF', '#DBEAFE', '#BFDBFE']}
            style={styles.gradient}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressDot, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.progressDot, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.progressDot, styles.progressDotActive]} />
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <Text style={styles.emoji}>⏰</Text>
                    <Text variant="h1" style={[styles.title, { color: dark ? '#F9FAFB' : '#1F2937' }]}>
                        {i18n.t('schedule_title')}
                    </Text>
                    <Text style={[styles.subtitle, { color: dark ? '#9CA3AF' : '#6B7280' }]}>
                        {i18n.t('schedule_subtitle')}
                    </Text>
                </View>

                {/* Inputs */}
                <View style={styles.inputSection}>
                    <View style={styles.inputRow}>
                        <View style={styles.inputWrapper}>
                            <Text style={[styles.inputLabel, { color: dark ? '#9CA3AF' : '#6B7280' }]}>
                                {i18n.t('schedule_days_label')}
                            </Text>
                            <Input
                                value={daysPerWeek}
                                onChangeText={setDaysPerWeek}
                                placeholder="5"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={[styles.inputLabel, { color: dark ? '#9CA3AF' : '#6B7280' }]}>
                                {i18n.t('schedule_hours_label')}
                            </Text>
                            <Input
                                value={hoursPerDay}
                                onChangeText={setHoursPerDay}
                                placeholder="8"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    {/* Weekly Total */}
                    <View style={[styles.totalCard, { backgroundColor: dark ? '#1F2937' : '#FFFFFF' }]}>
                        <Text style={[styles.totalLabel, { color: dark ? '#9CA3AF' : '#6B7280' }]}>
                            {i18n.t('schedule_weekly_total')}
                        </Text>
                        <Text style={[styles.totalValue, { color: dark ? '#F9FAFB' : '#1F2937' }]}>
                            {weeklyTotal} {i18n.t('schedule_hours_week')}
                        </Text>
                    </View>
                </View>

                {/* Button */}
                <Button
                    title={`${i18n.t('schedule_finish')} 🚀`}
                    onPress={handleFinish}
                />
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 24,
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    progressDotActive: {
        backgroundColor: '#3B82F6',
        width: 24,
    },
    content: {
        alignItems: 'center',
        marginBottom: 24,
    },
    emoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    title: {
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        maxWidth: 280,
    },
    inputSection: {
        flex: 1,
    },
    inputRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    inputWrapper: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    totalCard: {
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    totalValue: {
        fontSize: 28,
        fontWeight: 'bold',
    },
});
