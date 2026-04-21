import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
import i18n, { setLocale } from '@/lib/i18n';

const currencies = [
    { code: 'TRY' as const, symbol: '₺' },
    { code: 'USD' as const, symbol: '$' },
    { code: 'EUR' as const, symbol: '€' },
];

export default function SalaryScreen() {
    const router = useRouter();
    const { setSalary, setCurrency, currency, language, isDarkMode } = useAppStore();
    const [amount, setAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState<'TRY' | 'USD' | 'EUR'>(currency);

    useEffect(() => {
        setLocale(language);
    }, [language]);

    const handleNext = () => {
        if (amount) {
            setSalary(parseFloat(amount));
            setCurrency(selectedCurrency);
            router.push('/onboarding/schedule');
        }
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
                    <View style={[styles.progressDot, styles.progressDotActive]} />
                    <View style={[styles.progressDot, { backgroundColor: dark ? '#374151' : '#D1D5DB' }]} />
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <Text style={styles.emoji}>💰</Text>
                    <Text variant="h1" style={[styles.title, { color: dark ? '#F9FAFB' : '#1F2937' }]}>
                        {i18n.t('salary_title')}
                    </Text>
                    <Text style={[styles.subtitle, { color: dark ? '#9CA3AF' : '#6B7280' }]}>
                        {i18n.t('salary_subtitle')}
                    </Text>
                </View>

                {/* Currency Selection */}
                <View style={styles.currencyRow}>
                    {currencies.map((curr) => (
                        <TouchableOpacity
                            key={curr.code}
                            onPress={() => setSelectedCurrency(curr.code)}
                            style={[
                                styles.currencyBtn,
                                { borderColor: dark ? '#374151' : '#E5E7EB' },
                                selectedCurrency === curr.code && styles.currencyBtnActive
                            ]}
                        >
                            <Text style={[
                                styles.currencyText,
                                { color: dark ? '#9CA3AF' : '#6B7280' },
                                selectedCurrency === curr.code && styles.currencyTextActive
                            ]}>
                                {curr.symbol}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Input */}
                <View style={styles.inputSection}>
                    <Input
                        value={amount}
                        onChangeText={setAmount}
                        placeholder={i18n.t('salary_placeholder')}
                        keyboardType="numeric"
                    />
                </View>

                {/* Button */}
                <Button
                    title={`${i18n.t('salary_continue')} →`}
                    onPress={handleNext}
                    disabled={!amount}
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
    currencyRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 24,
    },
    currencyBtn: {
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 2,
    },
    currencyBtnActive: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    currencyText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    currencyTextActive: {
        color: '#FFFFFF',
    },
    inputSection: {
        flex: 1,
    },
});
