import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { getLocales } from 'expo-localization';
import { ChevronDown } from 'lucide-react-native';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
import i18n, { setLocale } from '@/lib/i18n';

const languages = [
    { code: 'tr' as const, flag: '🇹🇷' },
    { code: 'en' as const, flag: '🇬🇧' },
];

export default function WelcomeScreen() {
    const router = useRouter();
    const { setUserName, language, setLanguage, isDarkMode } = useAppStore();
    const [name, setName] = useState('');
    const [showLangDropdown, setShowLangDropdown] = useState(false);

    // Detect device language on first load
    useEffect(() => {
        const deviceLocale = getLocales()[0]?.languageCode;
        if (deviceLocale === 'en') {
            setLanguage('en');
            setLocale('en');
        } else {
            setLanguage('tr');
            setLocale('tr');
        }
    }, []);

    useEffect(() => {
        setLocale(language);
    }, [language]);

    const handleNext = () => {
        if (name.trim()) {
            setUserName(name.trim());
            router.push('/onboarding/salary');
        }
    };

    const handleLanguageSelect = (code: 'tr' | 'en') => {
        setLanguage(code);
        setLocale(code);
        setShowLangDropdown(false);
    };

    const dark = isDarkMode;
    const currentFlag = languages.find(l => l.code === language)?.flag || '🇹🇷';

    return (
        <LinearGradient
            colors={dark ? ['#1F2937', '#111827', '#0F172A'] : ['#EFF6FF', '#DBEAFE', '#BFDBFE']}
            style={styles.gradient}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                {/* Top Bar - Language Dropdown */}
                <View style={styles.topBar}>
                    <TouchableOpacity
                        onPress={() => setShowLangDropdown(true)}
                        style={[styles.langBtn, { backgroundColor: dark ? 'rgba(55,65,81,0.8)' : 'rgba(255,255,255,0.8)' }]}
                    >
                        <Text style={styles.langFlag}>{currentFlag}</Text>
                        <ChevronDown size={12} color={dark ? '#9CA3AF' : '#6B7280'} />
                    </TouchableOpacity>
                </View>

                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressDot, styles.progressDotActive]} />
                    <View style={[styles.progressDot, { backgroundColor: dark ? '#374151' : '#D1D5DB' }]} />
                    <View style={[styles.progressDot, { backgroundColor: dark ? '#374151' : '#D1D5DB' }]} />
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <Text style={styles.emoji}>👋</Text>
                    <Text variant="h1" style={[styles.title, { color: dark ? '#F9FAFB' : '#1F2937' }]}>
                        {i18n.t('welcome_title')}
                    </Text>
                    <Text style={[styles.subtitle, { color: dark ? '#9CA3AF' : '#6B7280' }]}>
                        {i18n.t('welcome_subtitle')}
                    </Text>
                </View>

                {/* Input */}
                <View style={styles.inputSection}>
                    <Input
                        value={name}
                        onChangeText={setName}
                        placeholder={i18n.t('welcome_name_placeholder')}
                        autoFocus
                    />
                </View>

                {/* Button */}
                <Button
                    title={`${i18n.t('welcome_continue')} →`}
                    onPress={handleNext}
                    disabled={!name.trim()}
                />

                {/* Language Dropdown Modal */}
                <Modal visible={showLangDropdown} transparent animationType="fade" onRequestClose={() => setShowLangDropdown(false)}>
                    <Pressable style={styles.dropdownOverlay} onPress={() => setShowLangDropdown(false)}>
                        <View style={[styles.dropdownMenu, { backgroundColor: dark ? '#1F2937' : '#fff' }]}>
                            {languages.map((lang) => (
                                <TouchableOpacity
                                    key={lang.code}
                                    style={[styles.dropdownItem, language === lang.code && { backgroundColor: '#3B82F6' }]}
                                    onPress={() => handleLanguageSelect(lang.code)}
                                >
                                    <Text style={styles.dropdownFlag}>{lang.flag}</Text>
                                    <Text style={[styles.dropdownText, { color: language === lang.code ? '#fff' : (dark ? '#F9FAFB' : '#1F2937') }]}>
                                        {lang.code.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Pressable>
                </Modal>
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
        paddingTop: 50,
        paddingBottom: 40,
    },
    topBar: {
        flexDirection: 'row',
        marginBottom: 16,
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 56,
        marginBottom: 16,
    },
    title: {
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        maxWidth: 280,
        lineHeight: 24,
    },
    inputSection: {
        marginBottom: 16,
    },
    dropdownOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingTop: 100,
        paddingLeft: 24,
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
