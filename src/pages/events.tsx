import styles from "./pages.module.css";
import {useQuery} from "@tanstack/react-query";
import {getEvents} from "../api/eventsData";
import {PlannedEvent} from "../types";
import EventsGreed from "../components/events/events-greed";
import EventsCalendar from "../components/events/events-calendar";
import {useTranslation} from "react-i18next";

export default function Events() {
    const {data: events, isLoading, isError} = useQuery<PlannedEvent[]>({
        queryKey: ["events"],
        queryFn: getEvents,
        staleTime: 1000 * 60 * 5,
    });
    const {t} = useTranslation("events");

    if (isLoading) return <p>Loading events...</p>;
    if (isError) return <p>Failed to load events.</p>;

    return (
        <div>
            <h1 className={styles.pageTitle}>
                {t("pageTitle")}
            </h1>
            {events && <EventsGreed events={events}/>}
            <EventsCalendar events={events}/>
        </div>
    );
}