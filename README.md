# Zamanın Değeri ⏱️

**Her şeyin bir zaman maliyeti var. Sana gerçek fiyatı gösterelim.**

Bir arkadaşın isteği üzerine yapılmış bu uygulama, aylık maaşını ve çalışma programını kullanarak herhangi bir ürünün kaç saatlik emeğine bedel olduğunu hesaplar. Ürün almadan önce "bu benim kaç saatim?" sorusunu gerçek takvim verisine dayalı olarak yanıtlar.

---

## Özellikler

- **Gerçek Takvim Hesabı** — Ay bazında gerçek iş günü sayısı (2026 takvimi) kullanılarak hassas hesaplama
- **Onboarding Akışı** — İsim, aylık maaş ve çalışma programı (haftalık gün + günlük saat) kurulumu
- **Anlık Hesap** — Ürün fiyatı girildiğinde kaç ay / gün / saat / dakika çalışman gerektiği anında gösterilir
- **Geçmiş** — Hesaplanan ürünleri kaydet, "aldım / almadım" olarak işaretle
- **Para Birimi Desteği** — TRY, USD, EUR
- **Karanlık Mod** — Tam dark mode desteği
- **Çoklu Dil** — Türkçe ve İngilizce

---

## Ekranlar

| Onboarding | Ana Ekran | Ayarlar |
|---|---|---|
| Hoş geldin → Maaş → Çalışma programı | Fiyat gir, emek maliyetini gör | Dil, tema, sıfırlama |

---

## Teknoloji

| Katman | Teknoloji |
|---|---|
| Framework | React Native + Expo (SDK 54) |
| Navigasyon | Expo Router (file-based) |
| State | Zustand + AsyncStorage (kalıcı) |
| Stil | NativeWind (Tailwind CSS) |
| Animasyon | React Native Reanimated |
| İkonlar | Lucide React Native |
| Lokalizasyon | expo-localization + i18n-js |

---

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm start

# Android
npm run android

# iOS
npm run ios
```

> Node.js ≥ 18 ve Expo Go uygulaması (ya da fiziksel cihaz/emülatör) gereklidir.

---

## Nasıl Çalışır?

1. Aylık net maaşını gir
2. Haftada kaç gün ve günde kaç saat çalıştığını ayarla
3. Ana ekranda bir ürünün fiyatını yaz
4. Uygulama, **o ayın gerçek iş günü sayısını** baz alarak saatlik ücretini hesaplar ve ürün için gereken çalışma süresini gösterir

```
Saatlik Ücret = Aylık Maaş ÷ (Bu Ayki İş Günü × Günlük Çalışma Saati)
Çalışma Süresi = Ürün Fiyatı ÷ Saatlik Ücret
```

---

## Proje Yapısı

```
saat/
├── app/                    # Expo Router sayfaları
│   ├── _layout.tsx         # Root layout
│   ├── index.tsx           # Yönlendirici (onboarding / home)
│   ├── home/               # Ana hesap ekranı
│   ├── onboarding/         # welcome → salary → schedule
│   ├── how-it-works/       # Nasıl çalışır ekranı
│   └── settings/           # Ayarlar
├── src/
│   ├── components/ui/      # Button, Input, Text, Screen, Container
│   ├── lib/
│   │   ├── calculator.ts   # Çekirdek hesaplama mantığı
│   │   ├── calendar2026.ts # Gerçek takvim iş günü verisi
│   │   ├── i18n.ts         # Lokalizasyon kurulumu
│   │   └── utils.ts        # Yardımcı fonksiyonlar
│   └── store/
│       └── useAppStore.ts  # Zustand global state
└── assets/
    └── i18n/               # tr.json, en.json çeviri dosyaları
```

---

## Lisans

MIT — Kişisel kullanım için serbesttir.
