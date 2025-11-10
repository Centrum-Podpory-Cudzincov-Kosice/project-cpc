import styles from "./contact.module.css";
import {useTranslation} from "react-i18next";

type HoursRow = { day: string, time: string };

export default function ContactMaps() {
    const {t} = useTranslation("home");

    const hoursCommon = [
        {day: "monday", time: `8:00 – 15:00 ${t("common:hoursShort")}`},
        {day: "tuesday", time: `8:00 – 15:00 ${t("common:hoursShort")}`},
        {day: "wednesday", time: `8:00 – 16:00 ${t("common:hoursShort")}`},
        {day: "thursday", time: `8:00 – 15:00 ${t("common:hoursShort")}`},
        {day: "friday", time: `8:00 – 14:00 ${t("common:hoursShort")}`},
    ];

    return (
        <div className={styles.section} id={"contacts"}>
            <div className={styles.container}>
                {/* Офіс 1 — текст зліва, карта справа */}
                <ContactBlock
                    title={t("contactMaps.title")}
                    addressLines={[
                        "Hlavná 68, Košice, B 214, 2. posch.",
                        "040 01, Staré Mesto",
                    ]}
                    phone="+421 908 365 995"
                    email="centrumH68@kosice.sk"
                    hours={hoursCommon}
                    lunchNote="12:00 – 12:30 h."
                    mapQuery="Hlavná 68, Košice"
                    reverseOnDesktop={false}
                />

                <ContactBlock
                    title={t("contactMaps.title")}
                    addressLines={[
                        "Tr. SNP 48/A, Košice",
                        "040 10, Staré Mesto",
                    ]}
                    phone="+421 55 64 19 190"
                    hours={hoursCommon}
                    lunchNote="12:00 – 12:30 h."
                    mapQuery="Trieda SNP 48A, Košice"
                    reverseOnDesktop={true}
                />
            </div>
        </div>
    );
}

function ContactBlock({
                                         title,
                                         addressLines = [],
                                         phone,
                                         email,
                                         hours = [],
                                         lunchNote,
                                         mapQuery,
                                         reverseOnDesktop = false,
                                     }: {
    title: string,
    addressLines?: string[],
    phone?: string,
    email?: string,
    hours?: HoursRow[],
    lunchNote?: string,
    mapQuery: string,
    reverseOnDesktop?: boolean,
}) {
    const {t} = useTranslation(["home", "common"]);

    return (
        <section
            className={`${styles.block} ${reverseOnDesktop ? styles.blockReverse : ""}`}
            aria-labelledby={`${title.replace(/\s+/g, "-").toLowerCase()}-title`}
        >
            <div className={styles.textCol}>
                <h2 id={`${title.replace(/\s+/g, "-").toLowerCase()}-title`} className={styles.h2}>
                    {title}
                </h2>

                <address className={styles.address}>
                    {addressLines.map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
                </address>

                {phone && (
                    <p className={styles.kv}>
                        <span className={styles.k}>{t("contactMaps.phone")}:</span>{" "}
                        <a className={styles.link} href={`tel:${phone.replace(/\s+/g, "")}`}>
                            {phone}
                        </a>
                    </p>
                )}

                {email && (
                    <p className={styles.kv}>
                        <span className={styles.k}>{t("contactMaps.email")}:</span>{" "}
                        <a className={styles.link} href={`mailto:${email}`}>
                            {email}
                        </a>
                    </p>
                )}

                {!!hours.length && (
                    <>
                        <h3 className={styles.h3}>{t("contactMaps.openingHours")}:</h3>
                        <ul className={styles.hours}>
                            {hours.map((row, i) => (
                                <li key={i}>
                                    <span className={styles.day}>{t(`contactMaps.days.${row.day}`)}</span>
                                    <span className={styles.time}>{row.time}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {lunchNote && (
                    <p className={styles.lunch}>
                        <strong>{t("contactMaps.lunchBreak")}:</strong> {lunchNote}
                    </p>
                )}
            </div>

            <div className={styles.mapCol} role="region" aria-label="Mapa">
                <div className={styles.mapFrame}>
                    <iframe
                        title={`Mapa - ${title}`}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
}