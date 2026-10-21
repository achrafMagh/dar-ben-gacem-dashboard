import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { translationEn, translationFr } from "./pages/Translations";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    resources: {
      en: { translation: translationEn },
      fr: { translation: translationFr },
    },
    debug: false,
    //lng: "en",
    supportedLngs: ["en", "fr"],
    load: "languageOnly",
    fallbackLng: "en",
    nonExplicitSupportedLngs: true,

    interpolation: {
      escapeValue: false,
    },
    detection: {
      //order: ['path', 'cookie', 'htmlTag'],
      caches: ["cookie"],
    },
  });

export default i18n;
