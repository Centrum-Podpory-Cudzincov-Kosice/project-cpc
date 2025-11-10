import styles from "./events.module.css";
import EventsCard from "./events-card";
import {PlannedEvent} from "../../types";

export default function EventsGreed({events}: {
    events: PlannedEvent[]
}) {
    return (
        <div className={styles.gridContainer}>
            {events && events.map((event) => (
                <EventsCard key={event.id}
                            event={event}
                />
            ))}
        </div>
    );
}