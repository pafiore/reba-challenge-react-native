import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en/global.json';
import esTranslation from './es/global.json';

const resources = {
    en: {
        translation: enTranslation,
    },
    es: {
        translation: esTranslation,
    }
};

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng : 'es',
        // fallbackLng : 'en',
        keySeparator: false,
        interpolation : {
            escapeValue : false,
        },
    });

export default i18n;