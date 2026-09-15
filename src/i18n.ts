import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en.json";
import translationFR from "./locales/fr.json";

export type SupportedLanguage = "fr" | "en";

const STORAGE_KEY = "paris-a-pas-language";
const DEFAULT_LANGUAGE: SupportedLanguage = "fr";

function getInitialLanguage(): SupportedLanguage {
    if (typeof window === "undefined") {
        return DEFAULT_LANGUAGE;
    }

    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);

    if (storedLanguage === "fr" || storedLanguage === "en") {
        return storedLanguage;
    }

    return window.navigator.language.toLowerCase().startsWith("en")
        ? "en"
        : DEFAULT_LANGUAGE;
}

void i18n.use(initReactI18next).init({
    resources: {
        fr: { translation: translationFR },
        en: { translation: translationEN },
    },
    lng: getInitialLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: ["fr", "en"],
    load: "languageOnly",
    interpolation: {
        escapeValue: false,
    },
});

function synchronizeDocumentLanguage(language: string): void {
    const supportedLanguage: SupportedLanguage = language.startsWith("en")
        ? "en"
        : "fr";

    if (typeof document !== "undefined") {
        document.documentElement.lang = supportedLanguage;
    }

    if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, supportedLanguage);
    }
}

synchronizeDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);
i18n.on("languageChanged", synchronizeDocumentLanguage);

export default i18n;
