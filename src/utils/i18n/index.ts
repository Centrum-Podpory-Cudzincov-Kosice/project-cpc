import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

interface RequireContext {
    keys: () => string[],
    <T>(id: string): T,
}

declare const require: {
    context: (path: string, deep?: boolean, filter?: RegExp) => RequireContext
}

const importAllNs = (r: RequireContext): Record<string, any> => {
    return r.keys().reduce((acc: Record<string, any>, file: string) => {
        const ns = file.replace("./", "").replace(".json", "");
        acc[ns] = r(file);
        return acc;
    }, {} as Record<string, any>);
};

const resources = {
    en: importAllNs(require.context("./en", false, /\.json$/)),
    sk: importAllNs(require.context("./sk", false, /\.json$/)),
    ua: importAllNs(require.context("./uk", false, /\.json$/)),
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        ns: Object.keys(resources.en),
        defaultNS: "common",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;