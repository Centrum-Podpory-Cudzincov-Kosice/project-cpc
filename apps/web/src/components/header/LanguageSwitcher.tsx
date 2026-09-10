import styles from "./header.module.css";
import languages from "./languages";
import clsx from "clsx";
import {useLanguage} from "../../providers/languageProvider";
import stringToLanguage from "../../utils/mappers/stringToLanguage";

export default function LanguageSwitcher() {
    const {lang, changeLangWithAnimation} = useLanguage();
    const sortedLanguages = [
        ...languages.filter(l => l.systemName === lang),
        ...languages.filter(l => l.systemName !== lang)
    ];

    const selectedIndex = sortedLanguages.findIndex(
        l => l.systemName === lang
    );

    return (
        <div className={clsx(styles.languageSwitcher, "not-selectable")}>
            <div className={styles.languagesContainer}>
                <div className={styles.selectedContainer}
                     style={{
                         transform: `translateY(${selectedIndex * 2.5}em)`
                     }}
                />
                {sortedLanguages.map((language, index) => {
                    return (
                        <div key={index}
                             className={styles.languageVariant}
                             onClick={() => {
                                 if(language.systemName !== lang) changeLangWithAnimation(stringToLanguage(language.systemName));
                             }}
                        >
                            <p>{language.label}</p>
                            <img src={language.flagImg} alt={""}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}