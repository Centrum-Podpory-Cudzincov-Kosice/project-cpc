import {OrganizationEvent} from "../../types/partners";
import {useTranslation} from "react-i18next";
import styles from "./partners.module.css";

export default function OrganizationEventField({event}: { event: OrganizationEvent }) {
    const {t} = useTranslation("partners");
    const formatDate = (date: Date) => new Intl.DateTimeFormat("sk-SK", {
        day: "2-digit", month: "2-digit", year: "2-digit"
    }).format(date);
    const weekdayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
    const weekday = event.dayWeek ?? (event.date ? weekdayKeys[event.date.getDay()] : undefined);

    return (
        <tr>
            <td className={styles.eventDayCell}>
                {weekday && <span className={styles.eventWeekday}>{t(`dayWeek.${weekday}`)}</span>}
                {event.date && <span className={styles.eventDate}>{formatDate(event.date)}</span>}
                {event.to && <span className={`${styles.eventDate} ${styles.eventDateSeparator}`}>–</span>}
                {event.to && <span className={styles.eventDate}>{formatDate(event.to)}</span>}
            </td>
            <td>{event.time}</td>
            <td>
                <strong className={styles.eventName}>{event.name}</strong>
                {event.description && <span className={styles.eventDescription}>{event.description}</span>}
                {event.location && (
                    <span className={styles.eventLocation}>
                        <strong>{t("eventLocation")}:</strong> {event.location}
                    </span>
                )}
            </td>
        </tr>
    );
}
