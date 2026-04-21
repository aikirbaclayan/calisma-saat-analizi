import { View, TouchableOpacity, StyleSheet, Switch, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
import { ChevronRight, Moon, Globe, RotateCcw, X, Check } from 'lucide-react-native';
import i18n, { setLocale } from '@/lib/i18n';

const languages = [
    { code: 'tr' as const, name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
];

export default function SettingsScreen() {
    const router = useRouter();
    const { isDarkMode, setDarkMode, language, setLanguage, resetOnboarding, salary, currency, userName } = useAppStore();
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        setLocale(language);
    }, [language]);

    const handleReset = () => {
        resetOnboarding();
        router.replace('/');
    };

    const toggleTheme = () => {
        setDarkMode(!isDarkMode);
    };

    const handleLanguageSelect = (code: 'tr' | 'en') => {
        setLanguage(code);
        setLocale(code);
        setShowLanguageModal(false);
        forceUpdate(n => n + 1); // Force re-render
    };

    const dark = isDarkMode;
    const colors = {
        bg: dark ? '#111827' : '#fff',
        card: dark ? '#1F2937' : '#F3F4F6',
        cardSecondary: dark ? '#374151' : '#F9FAFB',
        text: dark ? '#F9FAFB' : '#1F2937',
        textMuted: dark ? '#9CA3AF' : '#6B7280',
        border: dark ? '#374151' : '#E5E7EB',
    };

    return (
        <Container style={{ backgroundColor: colors.bg }}>
            {/* Header */}
            <View style={styles.header}>
                <Text variant="h2" style={{ color: colors.text }}>⚙️ {i18n.t('settings_title')}</Text>
                <Button title={i18n.t('settings_close')} variant="ghost" size="sm" onPress={() => router.back()} />
            </View>

            {/* Profile Card */}
            <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{userName?.charAt(0)?.toUpperCase() || '?'}</Text>
                </View>
                <View>
                    <Text style={[styles.profileName, { color: colors.text }]}>{userName || 'User'}</Text>
                    <Text style={[styles.profileSalary, { color: colors.textMuted }]}>{salary?.toLocaleString()} {currency} {i18n.t('home_monthly')}</Text>
                </View>
            </View>

            {/* Settings List */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>{i18n.t('settings_appearance')}</Text>

                <View style={[styles.settingItem, { backgroundColor: colors.cardSecondary }]}>
                    <View style={styles.settingLeft}>
                        <View style={[styles.settingIcon, { backgroundColor: '#1F2937' }]}>
                            <Moon size={18} color="#fff" />
                        </View>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>{i18n.t('settings_dark_mode')}</Text>
                    </View>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleTheme}
                        trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                        thumbColor="#fff"
                    />
                </View>

                <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.cardSecondary }]} onPress={() => setShowLanguageModal(true)}>
                    <View style={styles.settingLeft}>
                        <View style={[styles.settingIcon, { backgroundColor: '#10B981' }]}>
                            <Globe size={18} color="#fff" />
                        </View>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>{i18n.t('settings_language')}</Text>
                    </View>
                    <View style={styles.settingRight}>
                        <Text style={[styles.settingValue, { color: colors.textMuted }]}>
                            {language === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
                        </Text>
                        <ChevronRight size={20} color={colors.textMuted} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Danger Zone */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>{i18n.t('settings_data')}</Text>

                <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.cardSecondary }]} onPress={handleReset}>
                    <View style={styles.settingLeft}>
                        <View style={[styles.settingIcon, { backgroundColor: '#EF4444' }]}>
                            <RotateCcw size={18} color="#fff" />
                        </View>
                        <Text style={[styles.settingLabel, { color: '#EF4444' }]}>{i18n.t('settings_reset')}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={[styles.version, { color: dark ? '#4B5563' : '#D1D5DB' }]}>v1.0.0 • {i18n.t('app_name')}</Text>

            {/* Language Modal */}
            <Modal
                visible={showLanguageModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowLanguageModal(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setShowLanguageModal(false)}>
                    <View style={[styles.modalContent, { backgroundColor: dark ? '#1F2937' : '#fff' }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>{i18n.t('settings_select_language')}</Text>
                            <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                                <X size={24} color={colors.textMuted} />
                            </TouchableOpacity>
                        </View>

                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[
                                    styles.languageItem,
                                    { backgroundColor: colors.cardSecondary },
                                    language === lang.code && styles.languageItemActive
                                ]}
                                onPress={() => handleLanguageSelect(lang.code)}
                            >
                                <Text style={styles.languageFlag}>{lang.flag}</Text>
                                <Text style={[styles.languageName, { color: colors.text }]}>{lang.name}</Text>
                                {language === lang.code && (
                                    <Check size={20} color="#10B981" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        marginBottom: 32,
        gap: 16,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#3B82F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileSalary: {
        fontSize: 14,
        marginTop: 2,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 12,
        marginLeft: 4,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
        marginBottom: 8,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    settingValue: {
        fontSize: 14,
    },
    version: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 'auto',
        paddingBottom: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 8,
        gap: 12,
    },
    languageItemActive: {
        backgroundColor: '#ECFDF5',
        borderWidth: 2,
        borderColor: '#10B981',
    },
    languageFlag: {
        fontSize: 28,
    },
    languageName: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
    },
});
