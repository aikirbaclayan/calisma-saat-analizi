# Zamanın Değeri — Value of Your Time

**How many hours do you actually work to afford something?**

[![Expo](https://img.shields.io/badge/Expo-SDK_54-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://www.nativewind.dev/)
[![Zustand](https://img.shields.io/badge/State-Zustand-FF4154?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)]()

&nbsp;

---

> *"I want to buy headphones — but I don't know if they're actually worth it."*

## The Story

A friend came to me with a simple frustration. Every time he looked at a price tag, he had no real way to measure it against his own effort. Numbers on a screen meant nothing without context.

**₺4,500 headphones. Is that cheap? Is it expensive?**

The real question isn't the price. It's the time.

If you earn ₺30,000 a month and work 9 hours a day, 5 days a week — those headphones cost you **1 day, 3 hours, and 12 minutes** of your life.

That's the number that changes decisions.

So I built this app for him over a weekend. It does one thing and it does it precisely.

## Overview

**Zamanın Değeri** (Value of Your Time) is a React Native app that converts any price into the actual working time it costs you — calculated against real calendar data for the current month, not an averaged estimate.

Enter your monthly salary and work schedule once. Then type any price and instantly see:

- How many **months**, **days**, **hours**, **minutes**, and **seconds** you'd need to work
- Based on the **real number of working days** this month (weekends, not an average)

## Project Status

Completed mobile utility / active portfolio project. The app is kept public as a focused example of a small, practical React Native product.

## Features

- **Real calendar engine** — Uses actual 2026 calendar data to count working days per month, not a simplified average
- **Onboarding flow** — Name → monthly net salary → weekly schedule (days + hours per day)
- **Instant calculation** — Live result as you type the price
- **History** — Save items, mark them as bought or skipped
- **Multi-currency** — TRY, USD, EUR
- **Dark mode** — Full theme support
- **Bilingual** — Turkish and English (auto-detects device language)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo SDK 54 |
| Navigation | Expo Router (file-based) |
| State | Zustand + AsyncStorage (persistent) |
| Styling | NativeWind (Tailwind CSS for RN) |
| Animation | React Native Reanimated |
| Icons | Lucide React Native |
| Localization | expo-localization + i18n-js |
| Language | TypeScript 5.9 |

## Getting Started

```bash
git clone https://github.com/umitaltinozzz/work-hour-cost-calculator.git
cd work-hour-cost-calculator

npm install

# Start dev server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

> Requires Node.js ≥ 18 and either the Expo Go app or a physical device / emulator.

## How It Works

```
Hourly Rate   = Monthly Salary ÷ (Working Days This Month × Daily Hours)
Working Time  = Product Price  ÷ Hourly Rate
```

The key detail: **working days this month** is pulled from a real calendar, not `(52 weeks × days per week) / 12`. A month with 3 public holidays gives you a different hourly rate than a clean month — and this app reflects that.

## Project Structure

```
work-hour-cost-calculator/
├── app/                        # Expo Router pages
│   ├── _layout.tsx             # Root layout & theme provider
│   ├── index.tsx               # Entry — redirects to onboarding or home
│   ├── home/                   # Main calculator screen
│   ├── onboarding/             # welcome → salary → schedule
│   ├── how-it-works/           # Explanation screen
│   └── settings/               # Language, theme, reset
├── src/
│   ├── components/ui/          # Button, Input, Text, Screen, Container
│   ├── lib/
│   │   ├── calculator.ts       # Core calculation logic
│   │   ├── calendar2026.ts     # Real working-day data for 2026
│   │   ├── i18n.ts             # Localization setup
│   │   └── utils.ts            # Shared helpers
│   └── store/
│       └── useAppStore.ts      # Zustand global store
└── assets/
    └── i18n/                   # tr.json, en.json translation files
```

## License

MIT — Free to use, modify, and distribute.
