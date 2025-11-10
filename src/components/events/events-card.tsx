import styles from "./events.module.css";
import {PlannedEvent} from "../../types";

export default function EventsCard({event}: {
    event: PlannedEvent
}) {
    return (
        <div className={styles.gridBox}>
            {event.image && (
                <img
                    src={event.image}
                    alt={event.title}
                    className={styles.gridImage}
                />
            )}
            <h2>
                {event.title}
            </h2>
            <p className={styles.gridDate}>
                {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
                {event.description}
            </p>
        </div>
    );
}