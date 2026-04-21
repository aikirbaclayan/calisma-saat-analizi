import { I18n } from 'i18n-js';
import tr from '../../assets/i18n/tr.json';
import en from '../../assets/i18n/en.json';

const i18n = new I18n({
    en,
    tr,
});

i18n.enableFallback = true;
i18n.defaultLocale = 'tr';
i18n.locale = 'tr';

export const setLocale = (locale: 'tr' | 'en') => {
    i18n.locale = locale;
};

export const t = (key: string) => i18n.t(key);

export default i18n;
