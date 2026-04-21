import { getCurrentMonthWorkInfo } from './calendar2026';

export interface WorkingHours {
    daily: number;
    daysPerWeek: number;
}

export interface CostBreakdown {
    totalSeconds: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const calculateTimeCost = (
    price: number,
    monthlySalary: number,
    schedule: WorkingHours
): CostBreakdown => {
    if (monthlySalary <= 0 || price <= 0) {
        return { totalSeconds: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // Gerçek takvime göre bu ayki çalışma günü sayısı
    const currentMonthInfo = getCurrentMonthWorkInfo(schedule.daysPerWeek);
    const workingDaysThisMonth = currentMonthInfo.workingDays;

    // Aylık toplam çalışma saati (gerçek takvime göre)
    const totalMonthlyHours = workingDaysThisMonth * schedule.daily;

    // Saatlik ve saniye başına ücret
    const salaryPerHour = monthlySalary / totalMonthlyHours;
    const salaryPerSecond = salaryPerHour / 3600;

    if (salaryPerSecond <= 0) {
        return { totalSeconds: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // Ürün için gereken toplam saniye
    const totalSecondsNeeded = Math.ceil(price / salaryPerSecond);

    // Saniyeyi iş günü/saat formatına çevir
    const secondsPerWorkDay = schedule.daily * 3600;

    let remainingSeconds = totalSecondsNeeded;

    const days = Math.floor(remainingSeconds / secondsPerWorkDay);
    remainingSeconds %= secondsPerWorkDay;

    const hours = Math.floor(remainingSeconds / 3600);
    remainingSeconds %= 3600;

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    // Günleri aya çevir (bu ayın iş günü sayısına göre)
    let months = 0;
    let displayDays = days;

    if (displayDays >= workingDaysThisMonth) {
        months = Math.floor(displayDays / workingDaysThisMonth);
        displayDays = Math.floor(displayDays % workingDaysThisMonth);
    }

    return {
        totalSeconds: totalSecondsNeeded,
        months,
        days: displayDays,
        hours,
        minutes,
        seconds
    };
};
