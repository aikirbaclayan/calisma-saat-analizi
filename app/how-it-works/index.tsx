import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
import { getYearSummary, getMonthCalendar, getCurrentMonthWorkInfo } from '@/lib/calendar2026';
import { X, ChevronLeft, ChevronRight } from 'lucide-react-native';
import i18n, { setLocale } from '@/lib/i18n';

const WEEK_DAYS_TR = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'];
const WEEK_DAYS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function HowItWorksScreen() {
    const router = useRouter();
    const { language, isDarkMode, salary, workingHours } = useAppStore();
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    useEffect(() => {
        setLocale(language);
    }, [language]);

    const dark = isDarkMode;
    const yearSummary = getYearSummary(2026, workingHours.daysPerWeek);
    const currentMonthInfo = yearSummary[selectedMonth];
    const calendar = getMonthCalendar(2026, selectedMonth, workingHours.daysPerWeek);
    const weekDays = language === 'tr' ? WEEK_DAYS_TR : WEEK_DAYS_EN;

    // Hesaplama
    const workingDays = currentMonthInfo.workingDays;
    const totalHours = workingDays * workingHours.daily;
    const hourlyRate = salary / totalHours;

    const colors = {
        bg: dark ? '#111827' : '#fff',
        card: dark ? '#1F2937' : '#F3F4F6',
        text: dark ? '#F9FAFB' : '#1F2937',
        textMuted: dark ? '#9CA3AF' : '#6B7280',
        workDay: '#10B981',
        holiday: '#EF4444',
        weekend: '#6B7280',
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text variant="h2" style={{ color: colors.text }}>
                    📊 {language === 'tr' ? 'Nasıl Hesaplıyoruz?' : 'How We Calculate?'}
                </Text>
                <TouchableOpacity onPress={() => router.back()} style={[styles.closeBtn, { backgroundColor: colors.card }]}>
                    <X size={24} color={colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Month Selector */}
                <View style={styles.monthSelector}>
                    <TouchableOpacity
                        onPress={() => setSelectedMonth(m => Math.max(0, m - 1))}
                        style={[styles.monthArrow, { backgroundColor: colors.card }]}
                    >
                        <ChevronLeft size={24} color={colors.text} />
                    </TouchableOpacity>

                    <Text variant="h3" style={{ color: colors.text }}>
                        {language === 'tr' ? currentMonthInfo.nameTr : currentMonthInfo.nameEn} 2026
                    </Text>

                    <TouchableOpacity
                        onPress={() => setSelectedMonth(m => Math.min(11, m + 1))}
                        style={[styles.monthArrow, { backgroundColor: colors.card }]}
                    >
                        <ChevronRight size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Calendar */}
                <View style={[styles.calendarCard, { backgroundColor: colors.card }]}>
                    {/* Week Days Header */}
                    <View style={styles.weekHeader}>
                        {weekDays.map((day, index) => (
                            <Text key={index} style={[styles.weekDay, { color: colors.textMuted }]}>
                                {day}
                            </Text>
                        ))}
                    </View>

                    {/* Calendar Days */}
                    <View style={styles.calendarGrid}>
                        {calendar.map((dayInfo, index) => (
                            <View key={index} style={styles.dayCell}>
                                {dayInfo ? (
                                    <View style={[
                                        styles.dayCircle,
                                        dayInfo.isWorkDay && { backgroundColor: colors.workDay },
                                        dayInfo.isHoliday && { backgroundColor: colors.holiday },
                                        dayInfo.isWeekend && !dayInfo.isHoliday && { backgroundColor: colors.weekend },
                                    ]}>
                                        <Text style={[
                                            styles.dayText,
                                            (dayInfo.isWorkDay || dayInfo.isHoliday || dayInfo.isWeekend) && { color: '#fff' }
                                        ]}>
                                            {dayInfo.day}
                                        </Text>
                                    </View>
                                ) : null}
                            </View>
                        ))}
                    </View>

                    {/* Legend */}
                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: colors.workDay }]} />
                            <Text style={{ color: colors.textMuted, fontSize: 12 }}>
                                {language === 'tr' ? 'Çalışma' : 'Work'}
                            </Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: colors.holiday }]} />
                            <Text style={{ color: colors.textMuted, fontSize: 12 }}>
                                {language === 'tr' ? 'Resmi Tatil' : 'Holiday'}
                            </Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: colors.weekend }]} />
                            <Text style={{ color: colors.textMuted, fontSize: 12 }}>
                                {language === 'tr' ? 'Hafta Sonu' : 'Weekend'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Holidays List */}
                {currentMonthInfo.holidays.length > 0 && (
                    <View style={[styles.holidayList, { backgroundColor: colors.card }]}>
                        <Text style={[styles.holidayTitle, { color: colors.text }]}>
                            🎉 {language === 'tr' ? 'Bu Aydaki Tatiller' : 'Holidays This Month'}
                        </Text>
                        {currentMonthInfo.holidays.map((h, i) => (
                            <Text key={i} style={{ color: colors.textMuted, marginTop: 4 }}>
                                • {language === 'tr' ? h.name : h.nameEn}
                            </Text>
                        ))}
                    </View>
                )}

                {/* Calculation Card */}
                <View style={[styles.calcCard, { backgroundColor: '#3B82F6' }]}>
                    <Text style={styles.calcTitle}>
                        {language === 'tr' ? 'BU AY HESAPLAMA' : 'THIS MONTH'}
                    </Text>

                    <View style={styles.calcRow}>
                        <Text style={styles.calcLabel}>{language === 'tr' ? 'Çalışma Günü' : 'Work Days'}</Text>
                        <Text style={styles.calcValue}>{workingDays} {language === 'tr' ? 'gün' : 'days'}</Text>
                    </View>

                    <View style={styles.calcRow}>
                        <Text style={styles.calcLabel}>{language === 'tr' ? 'Günlük Çalışma' : 'Daily Hours'}</Text>
                        <Text style={styles.calcValue}>{workingHours.daily} {language === 'tr' ? 'saat' : 'hrs'}</Text>
                    </View>

                    <View style={styles.calcRow}>
                        <Text style={styles.calcLabel}>{language === 'tr' ? 'Toplam Saat' : 'Total Hours'}</Text>
                        <Text style={styles.calcValue}>{totalHours} {language === 'tr' ? 'saat' : 'hrs'}</Text>
                    </View>

                    <View style={[styles.calcRow, styles.calcHighlight]}>
                        <Text style={styles.calcLabel}>{language === 'tr' ? 'Saatlik Ücret' : 'Hourly Rate'}</Text>
                        <Text style={styles.calcValueBig}>{hourlyRate.toFixed(2)} ₺</Text>
                    </View>
                </View>

                {/* Formula */}
                <View style={[styles.formulaCard, { backgroundColor: colors.card }]}>
                    <Text style={[styles.formulaTitle, { color: colors.text }]}>
                        📐 {language === 'tr' ? 'Formül' : 'Formula'}
                    </Text>
                    <Text style={[styles.formula, { color: colors.textMuted }]}>
                        {language === 'tr'
                            ? `Saatlik Ücret = Maaş ÷ (İş Günü × Günlük Saat)`
                            : `Hourly Rate = Salary ÷ (Work Days × Daily Hours)`
                        }
                    </Text>
                    <Text style={[styles.formulaExample, { color: colors.text }]}>
                        {salary.toLocaleString()} ÷ ({workingDays} × {workingHours.daily}) = {hourlyRate.toFixed(2)} ₺/saat
                    </Text>
                </View>

                {/* Year Overview */}
                <Text variant="h3" style={[styles.yearTitle, { color: colors.text }]}>
                    📅 2026 {language === 'tr' ? 'Yıllık Özet' : 'Year Overview'}
                </Text>

                <View style={styles.yearGrid}>
                    {yearSummary.map((month, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedMonth(index)}
                            style={[
                                styles.monthCard,
                                { backgroundColor: colors.card },
                                selectedMonth === index && styles.monthCardActive
                            ]}
                        >
                            <Text style={[styles.monthName, { color: selectedMonth === index ? '#fff' : colors.text }]}>
                                {language === 'tr' ? month.nameTr.slice(0, 3) : month.nameEn.slice(0, 3)}
                            </Text>
                            <Text style={[styles.monthDays, { color: selectedMonth === index ? '#fff' : colors.workDay }]}>
                                {month.workingDays}
                            </Text>
                            <Text style={[styles.monthDaysLabel, { color: selectedMonth === index ? 'rgba(255,255,255,0.7)' : colors.textMuted }]}>
                                {language === 'tr' ? 'gün' : 'days'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    closeBtn: {
        padding: 10,
        borderRadius: 12,
    },
    monthSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    monthArrow: {
        padding: 10,
        borderRadius: 12,
    },
    calendarCard: {
        padding: 16,
        borderRadius: 20,
        marginBottom: 16,
    },
    weekHeader: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    weekDay: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 12,
        fontWeight: '500',
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    holidayList: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
    },
    holidayTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    calcCard: {
        padding: 20,
        borderRadius: 20,
        marginBottom: 16,
    },
    calcTitle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 16,
    },
    calcRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    calcLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
    },
    calcValue: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    calcHighlight: {
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
    },
    calcValueBig: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    formulaCard: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 24,
    },
    formulaTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    formula: {
        fontSize: 13,
        marginBottom: 8,
    },
    formulaExample: {
        fontSize: 14,
        fontWeight: '600',
    },
    yearTitle: {
        marginBottom: 16,
    },
    yearGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    monthCard: {
        width: '23%',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    monthCardActive: {
        backgroundColor: '#3B82F6',
    },
    monthName: {
        fontSize: 12,
        fontWeight: '600',
    },
    monthDays: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    monthDaysLabel: {
        fontSize: 10,
    },
});
