import styles from "./footer.module.css";
import {useTranslation} from "react-i18next";

export default function WorkHours() {
    const {t} = useTranslation(["footer", "common"]);

    return (
        <div className={styles.block}>
            <h3 className={styles.title}>{t("openingHours")}{/*OTVÁRACIE HODINY*/}</h3>
            <ul className={styles.hours}>
                <li>
                    <span>{t("week.monday")}{/*Pondelok*/}</span><span>8:00 – 15:00 {t("common:hoursShort")}</span>
                </li>
                <li>
                    <span>{t("week.tuesday")}{/*Utorok*/}</span><span>8:00 – 15:00 {t("common:hoursShort")}</span>
                </li>
                <li>
                    <span>{t("week.wednesday")}{/*Streda*/}</span><span>8:00 – 16:00 {t("common:hoursShort")}</span>
                </li>
                <li>
                    <span>{t("week.thursday")}{/*Štvrtok*/}</span><span>8:00 – 15:00 {t("common:hoursShort")}</span>
                </li>
                <li>
                    <span>{t("week.friday")}{/*Piatok*/}</span><span>8:00 – 14:00 {t("common:hoursShort")}</span>
                </li>
            </ul>
            <p className={styles.note}>{t("lunchBreak")}{/*Obedňajšia prestávka*/}: 12:00 – 12:30 h.</p>
        </div>
    );
}