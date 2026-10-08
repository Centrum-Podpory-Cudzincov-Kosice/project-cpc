"use client";

import {createContext, ReactNode, useContext, useState} from "react";
import {Language} from "@cpc/languages";

const LanguageContext = createContext<{
    lang: Language,
    setLang: (lang: Language) => void,
} | undefined>(undefined);

export default function LanguageProvider({children}: {
    children: ReactNode,
}) {
    const [lang, setLang] = useState<Language>("sk");

    return (
        <LanguageContext.Provider value={{lang, setLang}}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    return context;
}