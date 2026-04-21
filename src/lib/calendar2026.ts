// 2026 Türkiye Resmi Tatilleri ve Çalışma Günü Hesaplaması

export interface Holiday {
    date: string; // YYYY-MM-DD
    name: string;
    nameEn: string;
}

// 2026 Türkiye Resmi Tatilleri
export const HOLIDAYS_2026: Holiday[] = [
    // Yılbaşı
    { date: '2026-01-01', name: 'Yılbaşı', nameEn: "New Year's Day" },

    // Ramazan Bayramı (29 Mart - 31 Mart 2026)
    { date: '2026-03-29', name: 'Ramazan Bayramı Arifesi', nameEn: 'Ramadan Eve' },
    { date: '2026-03-30', name: 'Ramazan Bayramı 1. Gün', nameEn: 'Ramadan Day 1' },
    { date: '2026-03-31', name: 'Ramazan Bayramı 2. Gün', nameEn: 'Ramadan Day 2' },

    // Ulusal Egemenlik ve Çocuk Bayramı
    { date: '2026-04-23', name: 'Ulusal Egemenlik ve Çocuk Bayramı', nameEn: 'National Sovereignty Day' },

    // İşçi Bayramı
    { date: '2026-05-01', name: 'İşçi Bayramı', nameEn: 'Labor Day' },

    // Gençlik ve Spor Bayramı
    { date: '2026-05-19', name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı', nameEn: 'Youth Day' },

    // Kurban Bayramı (5-9 Haziran 2026)
    { date: '2026-06-05', name: 'Kurban Bayramı Arifesi', nameEn: 'Eid al-Adha Eve' },
    { date: '2026-06-06', name: 'Kurban Bayramı 1. Gün', nameEn: 'Eid al-Adha Day 1' },
    { date: '2026-06-07', name: 'Kurban Bayramı 2. Gün', nameEn: 'Eid al-Adha Day 2' },
    { date: '2026-06-08', name: 'Kurban Bayramı 3. Gün', nameEn: 'Eid al-Adha Day 3' },
    { date: '2026-06-09', name: 'Kurban Bayramı 4. Gün', nameEn: 'Eid al-Adha Day 4' },

    // Demokrasi ve Milli Birlik Günü
    { date: '2026-07-15', name: 'Demokrasi ve Milli Birlik Günü', nameEn: 'Democracy Day' },

    // Zafer Bayramı
    { date: '2026-08-30', name: 'Zafer Bayramı', nameEn: 'Victory Day' },

    // Cumhuriyet Bayramı
    { date: '2026-10-29', name: 'Cumhuriyet Bayramı', nameEn: 'Republic Day' },
];

// Tatil tarihlerini hızlı kontrol için Set
const holidayDates = new Set(HOLIDAYS_2026.map(h => h.date));

/**
 * Belirli bir tarihin tatil olup olmadığını kontrol eder
 */
export function isHoliday(date: Date): boolean {
    const dateStr = formatDateStr(date);
    return holidayDates.has(dateStr);
}

/**
 * Tarihi YYYY-MM-DD formatına çevirir
 */
export function formatDateStr(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Belirli bir ay için çalışma günü sayısını hesaplar
 * @param year Yıl
 * @param month Ay (0-indexed: Ocak=0)
 * @param workDays Haftalık çalışma günleri (1=Pazartesi, 7=Pazar)
 */
export function getWorkingDaysForMonth(
    year: number,
    month: number,
    daysPerWeek: number = 5
): { workingDays: number; totalDays: number; holidays: Holiday[] } {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    let workingDays = 0;
    const monthHolidays: Holiday[] = [];

    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay(); // 0=Pazar, 6=Cumartesi

        // Hafta sonu kontrolü (5 gün çalışan için Cumartesi-Pazar tatil)
        const isWeekend = daysPerWeek === 5
            ? (dayOfWeek === 0 || dayOfWeek === 6)
            : daysPerWeek === 6
                ? (dayOfWeek === 0)
                : false;

        const dateStr = formatDateStr(date);
        const holiday = HOLIDAYS_2026.find(h => h.date === dateStr);

        if (holiday) {
            monthHolidays.push(holiday);
        }

        // Çalışma günü: hafta sonu değil VE tatil değil
        if (!isWeekend && !holiday) {
            workingDays++;
        }
    }

    return { workingDays, totalDays, holidays: monthHolidays };
}

/**
 * Mevcut ay için çalışma bilgisini döndürür
 */
export function getCurrentMonthWorkInfo(daysPerWeek: number = 5) {
    const now = new Date();
    return getWorkingDaysForMonth(now.getFullYear(), now.getMonth(), daysPerWeek);
}

/**
 * 2026 yılının tüm ayları için özet bilgi
 */
export function getYearSummary(year: number = 2026, daysPerWeek: number = 5) {
    const months = [];
    const monthNames = {
        tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };

    for (let month = 0; month < 12; month++) {
        const info = getWorkingDaysForMonth(year, month, daysPerWeek);
        months.push({
            month,
            nameTr: monthNames.tr[month],
            nameEn: monthNames.en[month],
            ...info
        });
    }

    return months;
}

/**
 * Belirli bir ayın tüm günlerini takvim formatında döndürür
 */
export function getMonthCalendar(year: number, month: number, daysPerWeek: number = 5) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); // 0=Pazar

    const calendar: Array<{
        day: number;
        isWeekend: boolean;
        isHoliday: boolean;
        isWorkDay: boolean;
        holiday?: Holiday;
    } | null> = [];

    // Boş günler (ayın başlangıcı için)
    for (let i = 0; i < startDayOfWeek; i++) {
        calendar.push(null);
    }

    // Ayın günleri
    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();

        const isWeekend = daysPerWeek === 5
            ? (dayOfWeek === 0 || dayOfWeek === 6)
            : daysPerWeek === 6
                ? (dayOfWeek === 0)
                : false;

        const dateStr = formatDateStr(date);
        const holiday = HOLIDAYS_2026.find(h => h.date === dateStr);

        calendar.push({
            day,
            isWeekend,
            isHoliday: !!holiday,
            isWorkDay: !isWeekend && !holiday,
            holiday
        });
    }

    return calendar;
}
