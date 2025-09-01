import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const importAllNs = (r) => {
    return r.keys().reduce((acc, file) => {
        const ns = file
            .replace("./", "")
            .replace(".json", "");
        acc[ns] = r(file);
        return acc;
    }, {});
}

const resources = {
    en: importAllNs(require.context("./en", false, /\.json$/)),
    sk: importAllNs(require.context("./sk", false, /\.json$/)),
    ua: importAllNs(require.context("./uk", false, /\.json$/)),
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
            resources,
            fallbackLng: "en",
            ns: Object.keys(resources.en),
            defaultNS: "common",

            interpolation: {
                escapeValue: false,
            },
        }
    );

export default i18n;
