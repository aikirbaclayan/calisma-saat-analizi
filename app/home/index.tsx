import { View, TouchableOpacity, ScrollView, StyleSheet, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
import { calculateTimeCost, CostBreakdown } from '@/lib/calculator';
import { Settings, Camera, Trash2, HelpCircle, ChevronDown } from 'lucide-react-native';
import i18n, { setLocale } from '@/lib/i18n';

const formatDate = (timestamp: number, lang: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (diffDays === 0) {
        return `${lang === 'tr' ? 'Bugün' : 'Today'} ${hours}:${minutes}`;
    } else if (diffDays === 1) {
        return `${lang === 'tr' ? 'Dün' : 'Yesterday'} ${hours}:${minutes}`;
    } else {
        const months = lang === 'tr'
            ? ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${date.getDate()} ${months[date.getMonth()]}`;
    }
};

const languages = [
    { code: 'tr' as const, flag: '🇹🇷' },
    { code: 'en' as const, flag: '🇬🇧' },
];

export default function HomeScreen() {
    const router = useRouter();
    const { salary, currency, workingHours, userName, addToHistory, history, removeFromHistory, isDarkMode, language, setLanguage } = useAppStore();

    const [price, setPrice] = useState('');
    const [productName, setProductName] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState<'TRY' | 'USD' | 'EUR'>(currency);
    const [showLangDropdown, setShowLangDropdown] = useState(false);

    useEffect(() => {
        setLocale(language);
    }, [language]);

    const result: CostBreakdown = price
        ? calculateTimeCost(parseFloat(price), salary, workingHours)
        : { totalSeconds: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

    const handleSave = () => {
        if (!price) return;
        addToHistory({
            productName: productName || (language === 'tr' ? 'İsimsiz Ürün' : 'Unnamed Product'),
            price: parseFloat(price),
            currency: selectedCurrency,
            cost: result,
        });
        setPrice('');
        setProductName('');
    };

    const handleLanguageSelect = (code: 'tr' | 'en') => {
        setLanguage(code);
        setLocale(code);
        setShowLangDropdown(false);
    };

    const dark = isDarkMode;
    const colors = {
        bg: dark ? '#111827' : '#fff',
        card: dark ? '#1F2937' : '#EFF6FF',
        cardInner: dark ? '#374151' : '#FFFFFF',
        text: dark ? '#F9FAFB' : '#1F2937',
        textMuted: dark ? '#9CA3AF' : '#6B7280',
        border: dark ? '#374151' : '#E5E7EB',
        accent: '#3B82F6',
    };

    const currentFlag = languages.find(l => l.code === language)?.flag || '🇹🇷';

    return (
        <Container style={[styles.container, { backgroundColor: colors.bg }]}>
            {/* Top Bar with Language */}
            <View style={styles.topBar}>
                <TouchableOpacity
                    onPress={() => setShowLangDropdown(true)}
                    style={[styles.langBtn, { backgroundColor: dark ? '#374151' : '#F3F4F6' }]}
                >
                    <Text style={styles.langFlag}>{currentFlag}</Text>
                    <ChevronDown size={14} color={colors.textMuted} />
                </TouchableOpacity>
            </View>

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text variant="h2" style={{ color: colors.text }}>{i18n.t('home_greeting')} {userName} 👋</Text>
                    <Text variant="caption" style={{ color: colors.textMuted }}>{salary.toLocaleString()} {currency} {i18n.t('home_monthly')}</Text>
                </View>
                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={() => router.push('/how-it-works')} style={[styles.headerBtn, { backgroundColor: dark ? '#374151' : '#F3F4F6' }]}>
                        <HelpCircle size={22} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/settings')} style={[styles.headerBtn, { backgroundColor: dark ? '#374151' : '#F3F4F6' }]}>
                        <Settings size={22} color={colors.text} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Calculator Card */}
                <View style={[styles.calculatorCard, { backgroundColor: colors.card }]}>
                    <Input
                        value={productName}
                        onChangeText={setProductName}
                        placeholder={i18n.t('home_product_name')}
                    />

                    {/* Currency Selector */}
                    <View style={styles.currencyRow}>
                        {(['TRY', 'USD', 'EUR'] as const).map((curr) => (
                            <TouchableOpacity
                                key={curr}
                                onPress={() => setSelectedCurrency(curr)}
                                style={[
                                    styles.currencyBtn,
                                    { borderColor: colors.border },
                                    selectedCurrency === curr && styles.currencyBtnActive
                                ]}
                            >
                                <Text style={[
                                    styles.currencyText,
                                    { color: colors.textMuted },
                                    selectedCurrency === curr && styles.currencyTextActive
                                ]}>
                                    {curr === 'TRY' ? '₺' : curr === 'USD' ? '$' : '€'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.priceInputContainer}>
                        <Text style={[styles.currencyLabel, { color: colors.textMuted }]}>{selectedCurrency}</Text>
                        <Input
                            value={price}
                            onChangeText={setPrice}
                            placeholder={i18n.t('home_price_placeholder')}
                            keyboardType="numeric"
                            style={styles.priceInput}
                        />
                    </View>

                    {price ? (
                        <View style={styles.resultSection}>
                            <View style={[styles.resultCard, { backgroundColor: colors.cardInner }]}>
                                <Text style={[styles.resultLabel, { color: colors.textMuted }]}>{i18n.t('home_cost_label')}</Text>
                                <View style={styles.timeRow}>
                                    {result.months > 0 && <TimeUnit value={result.months} unit={i18n.t('time_months')} dark={dark} />}
                                    {result.days > 0 && <TimeUnit value={result.days} unit={i18n.t('time_days')} dark={dark} />}
                                    {result.hours > 0 && <TimeUnit value={result.hours} unit={i18n.t('time_hours')} dark={dark} />}
                                    <TimeUnit value={result.minutes} unit={i18n.t('time_minutes')} dark={dark} />
                                    <TimeUnit value={result.seconds} unit={i18n.t('time_seconds')} dark={dark} />
                                </View>
                            </View>
                            <Button title={`${i18n.t('home_save')} 💾`} onPress={handleSave} />
                        </View>
                    ) : (
                        <TouchableOpacity style={[styles.scanButton, { backgroundColor: dark ? '#374151' : '#DBEAFE' }]}>
                            <Camera size={20} color="#3B82F6" />
                            <Text style={styles.scanButtonText}>{i18n.t('home_scan')}</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* History */}
                <Text variant="h3" style={[styles.historyTitle, { color: colors.text }]}>{i18n.t('home_history')}</Text>
                {history.length === 0 ? (
                    <Text style={[styles.emptyText, { color: colors.textMuted }]}>{i18n.t('home_no_history')}</Text>
                ) : (
                    history.map((item) => (
                        <View key={item.id} style={[styles.historyItem, { backgroundColor: dark ? '#1F2937' : '#F9FAFB' }]}>
                            <View style={styles.historyInfo}>
                                <View style={styles.historyHeader}>
                                    <Text style={[styles.historyName, { color: colors.text }]}>{item.productName}</Text>
                                    <Text style={[styles.historyDate, { color: colors.textMuted }]}>{formatDate(item.createdAt, language)}</Text>
                                </View>
                                <Text variant="caption" style={{ color: colors.textMuted }}>{item.price.toLocaleString()} {item.currency}</Text>
                                <Text style={styles.historyTime}>
                                    {item.cost.days > 0 && `${item.cost.days} ${i18n.t('time_days')} `}
                                    {item.cost.hours} {i18n.t('time_hours')} {item.cost.minutes} {i18n.t('time_minutes')}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => removeFromHistory(item.id)} style={[styles.deleteBtn, { backgroundColor: dark ? '#7F1D1D' : '#FEE2E2' }]}>
                                <Trash2 size={18} color="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* Language Dropdown Modal */}
            <Modal visible={showLangDropdown} transparent animationType="fade" onRequestClose={() => setShowLangDropdown(false)}>
                <Pressable style={styles.dropdownOverlay} onPress={() => setShowLangDropdown(false)}>
                    <View style={[styles.dropdownMenu, { backgroundColor: dark ? '#1F2937' : '#fff' }]}>
                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[styles.dropdownItem, language === lang.code && { backgroundColor: colors.accent }]}
                                onPress={() => handleLanguageSelect(lang.code)}
                            >
                                <Text style={styles.dropdownFlag}>{lang.flag}</Text>
                                <Text style={[styles.dropdownText, { color: language === lang.code ? '#fff' : colors.text }]}>
                                    {lang.code.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </Container>
    );
}

const TimeUnit = ({ value, unit, dark }: { value: number, unit: string, dark: boolean }) => (
    <View style={styles.timeUnit}>
        <Text style={[styles.timeValue, { color: dark ? '#F9FAFB' : '#1F2937' }]}>{value}</Text>
        <Text style={[styles.timeLabel, { color: dark ? '#9CA3AF' : '#6B7280' }]}>{unit}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    langBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 4,
    },
    langFlag: {
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    headerBtn: {
        padding: 10,
        borderRadius: 12,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    calculatorCard: {
        padding: 24,
        borderRadius: 24,
        marginBottom: 32,
    },
    currencyRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 16,
        marginTop: 8,
    },
    currencyBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 2,
    },
    currencyBtnActive: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    currencyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    currencyTextActive: {
        color: '#FFFFFF',
    },
    priceInputContainer: {
        position: 'relative',
    },
    currencyLabel: {
        position: 'absolute',
        right: 16,
        top: 38,
        fontSize: 18,
        fontWeight: 'bold',
        zIndex: 1,
    },
    priceInput: {
        fontSize: 32,
        fontWeight: 'bold',
        paddingRight: 60,
    },
    resultSection: {
        marginTop: 16,
        gap: 16,
    },
    resultCard: {
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
    },
    resultLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 12,
    },
    timeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 16,
    },
    timeUnit: {
        alignItems: 'center',
    },
    timeValue: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    timeLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    scanButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        paddingVertical: 16,
        borderRadius: 16,
        gap: 8,
    },
    scanButtonText: {
        color: '#3B82F6',
        fontWeight: 'bold',
    },
    historyTitle: {
        marginBottom: 16,
    },
    emptyText: {
        textAlign: 'center',
        paddingVertical: 40,
    },
    historyItem: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    historyInfo: {
        flex: 1,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    historyName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    historyDate: {
        fontSize: 12,
    },
    historyTime: {
        color: '#3B82F6',
        fontWeight: 'bold',
        marginTop: 4,
    },
    deleteBtn: {
        padding: 12,
        borderRadius: 12,
        marginLeft: 12,
    },
    dropdownOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingTop: 100,
        paddingLeft: 20,
    },
    dropdownMenu: {
        width: 80,
        borderRadius: 12,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        gap: 6,
    },
    dropdownFlag: {
        fontSize: 16,
    },
    dropdownText: {
        fontSize: 12,
        fontWeight: '600',
    },
});
