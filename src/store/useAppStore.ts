import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorkingHours, CostBreakdown } from '@/lib/calculator';

export interface HistoryItem {
    id: string;
    productName: string;
    price: number;
    currency: string;
    createdAt: number;
    cost: CostBreakdown;
    status: 'pending' | 'bought' | 'skipped';
}

interface AppState {
    // Profile
    userName: string;
    salary: number;
    currency: 'TRY' | 'USD' | 'EUR';
    workingHours: WorkingHours;

    // Settings
    isDarkMode: boolean;
    language: 'tr' | 'en';
    hasFinishedOnboarding: boolean;

    // Data
    history: HistoryItem[];

    // Actions
    setUserName: (name: string) => void;
    setSalary: (salary: number) => void;
    setCurrency: (currency: 'TRY' | 'USD' | 'EUR') => void;
    setWorkingHours: (hours: WorkingHours) => void;
    setDarkMode: (mode: boolean) => void;
    setLanguage: (lang: 'tr' | 'en') => void;

    addToHistory: (item: Omit<HistoryItem, 'id' | 'createdAt' | 'status'>) => void;
    toggleHistoryStatus: (id: string, status: 'bought' | 'skipped' | 'pending') => void;
    removeFromHistory: (id: string) => void;

    finishOnboarding: () => void;
    resetOnboarding: () => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            userName: '',
            salary: 0,
            currency: 'TRY',
            workingHours: { daily: 9, daysPerWeek: 5 },

            isDarkMode: false,
            language: 'tr',
            hasFinishedOnboarding: false,
            history: [],

            setUserName: (userName) => set({ userName }),
            setSalary: (salary) => set({ salary }),
            setCurrency: (currency) => set({ currency }),
            setWorkingHours: (workingHours) => set({ workingHours }),
            setDarkMode: (isDarkMode) => set({ isDarkMode }),
            setLanguage: (language) => set({ language }),

            addToHistory: (item) => set((state) => ({
                history: [
                    {
                        ...item,
                        id: Date.now().toString(),
                        createdAt: Date.now(),
                        status: 'pending'
                    },
                    ...state.history
                ]
            })),

            toggleHistoryStatus: (id, status) => set((state) => ({
                history: state.history.map(h => h.id === id ? { ...h, status } : h)
            })),

            removeFromHistory: (id) => set((state) => ({
                history: state.history.filter(h => h.id !== id)
            })),

            finishOnboarding: () => set({ hasFinishedOnboarding: true }),
            resetOnboarding: () => set({ hasFinishedOnboarding: false, history: [], userName: '', isDarkMode: false, language: 'tr' }),
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
