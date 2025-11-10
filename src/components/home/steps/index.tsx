import Step from "./step";
import styles from "./steps.module.css";
import {useTranslation} from "react-i18next";

export default function Steps() {
    const {t} = useTranslation("home");

    return (
        <article className={styles.container}>
            <Step number={1}
                  heading={t("steps.step1.title")}
                  delay={0}
            >
                {/*"Kontaktujte nás"*/}
                {t("steps.step1.text")}{/*Navštívte jednu z našich kancelárií centra alebo nám zavolajte, aby ste si dohodli stretnutie.*/}
            </Step>
            <Step number={2}
                  heading={t("steps.step2.title")}
                  delay={300}
                  className={styles.step2}
            >
                {t("steps.step2.text")}{/*Povedzte nám, akú pomoc by ste potrebovali alebo s akými ťažkosťami sa stretávate pri integrácii v meste
                Košice.*/}
            </Step>
            <Step number={3}
                  heading={t("steps.step3.title")}
                  delay={600}
                  className={styles.step3}
            >
                {t("steps.step3.text")}{/*Urobíme všetko, čo je v našich silách, aby sme vám pomohli vyriešiť vaše otázky.*/}
            </Step>
        </article>
    );
}