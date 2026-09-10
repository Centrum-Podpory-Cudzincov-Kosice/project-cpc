import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Language} from "@cpc/languages";
import stringToLanguage from "../utils/mappers/stringToLanguage";

const LanguageContext = createContext<{
    lang: Language,
    changeLangWithAnimation: (lang: Language) => void,
    isChanging: boolean,
    setIsLangChanging: (isChanging: boolean) => void
} | undefined>(undefined);

export default function LanguageProvider({children}: {children: ReactNode}) {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language.toLowerCase().slice(0, 2);
    const [lang, setLang] = useState<Language>(stringToLanguage(currentLanguage));
    const [isChanging, setIsLangChanging] = useState(false);

    useEffect(() => {
        const handleStart = () => setIsLangChanging(true);
        const handleEnd = () => {
            setTimeout(() => setIsLangChanging(false), 300);
        };

        i18n.on("languageChanging", handleStart);
        i18n.on("languageChanged", handleEnd);

        return () => {
            i18n.off("languageChanged", handleEnd);
        };
    }, [i18n]);

    const changeLangWithAnimation = async (lang: Language) => {
        setIsLangChanging(true);

        await i18n.changeLanguage(lang);
        setLang(lang);

        setTimeout(() => {
            setIsLangChanging(false);
        }, 200);
    };

    return (
        <LanguageContext.Provider value={{lang, changeLangWithAnimation, isChanging, setIsLangChanging}}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if(!context) throw new Error('Language not found');
    return context;
}