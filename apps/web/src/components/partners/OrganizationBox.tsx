import styles from "./partners.module.css";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Organization} from "../../types/partners";
import {organizationsEvents} from "../../lib/partners/organizationsEvents";
import OrganizationEventField from "./OrganizationEventField";
import {BsArrowDownCircle} from "react-icons/bs";

export default function OrganizationBox({organization}: { organization: Organization }) {
    const {t} = useTranslation("partners");
    const [toggleEvents, setToggleEvents] = useState(false);
    const [isWideLogo, setIsWideLogo] = useState(false);

    const events = organizationsEvents
        .filter(event => event.organizationId === organization.id)
        .sort((a, b) => {
            if (a.dayWeek && !b.dayWeek) return -1;
            if (!a.dayWeek && b.dayWeek) return 1;
            if (a.dayWeek && b.dayWeek) {
                const weekdayOrder = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
                return weekdayOrder.indexOf(a.dayWeek) - weekdayOrder.indexOf(b.dayWeek);
            }
            return (a.date?.getTime() ?? 0) - (b.date?.getTime() ?? 0);
        });
    const hasEvents = events.length > 0;

    return (
        <article className={styles.card}>
            <div className={`${styles.logo} ${isWideLogo ? styles.wideLogo : ""}`}>
                <img src={organization.logo} alt={`${organization.name} logo`}
                     onLoad={event =>
                         setIsWideLogo(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight > 2)}/>
            </div>
            <div className={styles.cardHeader}>
                <div className={styles.organizationInfo}>
                    <div className={styles.details}>
                        <h3 className={styles.name}>{organization.name}</h3>
                        <p className={styles.services}>{organization.services}</p>
                    </div>
                </div>
                <div className={styles.contacts}>
                    {organization.contacts.map(contact => {
                        return (<p key={contact}>{contact}</p>)
                    })}
                    {organization.web && <a href={organization.web} target="_blank" rel="noreferrer">
                        {organization.web}
                    </a>}
                </div>
                {hasEvents && (
                    <button className={styles.toggle} type="button" aria-expanded={toggleEvents}
                            aria-label={(toggleEvents ? t("hideEvents") : t("showEvents")) as string}
                            onClick={() => setToggleEvents(!toggleEvents)}>
                        <span>{t("events")}</span>
                        <BsArrowDownCircle/>
                    </button>
                )}
            </div>
            {hasEvents && toggleEvents && (
                <div className={`${styles.eventsPanel} ${toggleEvents ? styles.eventsPanelOpen : ""}`}>
                    <div className={styles.events}>
                    <table className={styles.eventTable}>
                        <thead>
                        <tr>
                            <th scope="col">{t("eventDate")}</th>
                            <th scope="col">{t("eventTime")}</th>
                            <th scope="col">{t("eventActivity")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {events.map((event, index) =>
                            <OrganizationEventField event={event} key={index}/>)}
                        </tbody>
                    </table>
                    </div>
                </div>
            )}
        </article>
    );
}
