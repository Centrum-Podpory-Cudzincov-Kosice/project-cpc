import styles from "./partners.module.css";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Organization, OrganizationEvent} from "../../types/partners";
/*
import {organizationsEvents} from "../../lib/partners/organizationsEvents";
*/
import OrganizationEventField from "./OrganizationEventField";
import {BsArrowDownCircle} from "react-icons/bs";

export default function OrganizationBox({
                                            organization,
                                            eventsOpen,
                                            onToggleEvents,
                                        }: {
    organization: Organization;
    eventsOpen: boolean;
    onToggleEvents: () => void;
}) {
    const {t} = useTranslation("partners");
    const [isWideLogo, setIsWideLogo] = useState(false);

/*    const events = organizationsEvents
        .filter(event => event.organizationId === organization.id)
        .sort((a, b) => {
            if (a.dayWeek && !b.dayWeek) return -1;
            if (!a.dayWeek && b.dayWeek) return 1;
            if (a.dayWeek && b.dayWeek) {
                const weekdayOrder = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
                return weekdayOrder.indexOf(a.dayWeek) - weekdayOrder.indexOf(b.dayWeek);
            }
            return (a.date?.getTime() ?? 0) - (b.date?.getTime() ?? 0);
        });*/

    const events: OrganizationEvent[] = [];
    const hasEvents = events.length > 0;

    return (
        <article className={styles.card}>
            <div className={isWideLogo ? `${styles.logo} ${styles.wideLogo}` : styles.logo}>
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
                    {organization.web && <a href={organization.web} target={"_blank"} rel={"noreferrer"}>
                        {organization.web}
                    </a>}
                </div>
                {hasEvents && (
                    <button className={styles.toggle}
                            type={"button"}
                            aria-expanded={eventsOpen}
                            aria-controls={`organization-events-${organization.id}`}
                            aria-label={(eventsOpen ? t("hideEvents") : t("showEvents")) as string}
                            onClick={onToggleEvents}>
                        <span>{t("events")}</span>
                        <BsArrowDownCircle/>
                    </button>
                )}
            </div>

            {hasEvents && (
                <div id={`organization-events-${organization.id}`}
                     className={styles.eventsPanel}
                     aria-hidden={!eventsOpen}
                     inert={!eventsOpen}>
                    <div className={styles.eventsPanelContent}>
                        <div className={styles.events}>
                            <table className={styles.eventTable}>
                                <thead>
                                <tr>
                                    <th scope={"col"}>{t("eventDate")}</th>
                                    <th scope={"col"}>{t("eventTime")}</th>
                                    <th scope={"col"}>{t("eventActivity")}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {events.map((event, index) =>
                                    <OrganizationEventField event={event} key={index}/>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
}
