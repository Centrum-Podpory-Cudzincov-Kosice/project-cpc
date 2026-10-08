"use client";

import styles from "../../article.module.css";
import clsx from "clsx";
import Image from "next/image";
import {useLanguage} from "@/features/providers/LanguageProvider";
import {languages} from "@cpc/languages";

export default function LanguageSwitcher() {
    const {lang, setLang} = useLanguage();

    const sortedLanguages = [
        ...languages.filter(l => l.systemName === lang),
        ...languages.filter(l => l.systemName !== lang),
    ];

    const selectedIndex = sortedLanguages.findIndex(
        l => l.systemName === lang
    );

    return (
        <div className={clsx(styles.languageSwitcher, "not-selectable")}>
            <div className={styles.languagesContainer}>
                <div className={styles.selectedContainer}
                     style={{
                         transform: `translateY(${selectedIndex * 2.5}em)`,
                     }}
                />

                {sortedLanguages.map((language, index) => {
                    return (
                        <div key={index}
                             className={styles.languageVariant}
                             onClick={() =>
                                 setLang(language.systemName)
                             }
                        >
                            <p>{language.label}</p>

                            <Image src={language.flagImg}
                                   alt={""}
                                   width={20}
                                   height={15}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}