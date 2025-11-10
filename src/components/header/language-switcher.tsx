import styles from "./header.module.css";
import {MdOutlineLanguage} from "react-icons/md";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import languages from "./languages";

export default function LanguageSwitcher() {
    const {i18n} = useTranslation();
    const initialIndex = languages.findIndex(lang => lang.systemName === i18n.language);
    const [langIndex, setLangIndex] = useState(initialIndex);

    const changeLanguageHandler = (lang: string, index: number) => {
        i18n.changeLanguage(lang).then(() => {
            setLangIndex(index)
        });
    }

    return (
        <div className={styles.languageSwitcher}>
            <MdOutlineLanguage/>

            <div className={styles.languagesContainer}>
                <div className={styles.selectedContainer}
                     style={{transform: `translateY(${(langIndex + 1) * 2.45}em)`}}
                />
                {languages.map((language, index) => {
                    return (
                        <div key={index}
                             className={styles.languageVariant}
                             onClick={() =>
                                 changeLanguageHandler(language.systemName, index)}
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