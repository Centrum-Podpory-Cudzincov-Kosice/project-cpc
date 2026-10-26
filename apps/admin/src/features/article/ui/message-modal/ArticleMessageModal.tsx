import ModalPortal from "@/features/article/ui/message-modal/ModalPortal";
import {MdCancel} from "react-icons/md";
import styles from "./modal.module.css";
import {ArticleMessage} from "@/features/providers/ArticleEditorProvider";

export default function ArticleMessageModal({message, isExiting, onClose}: {
    message: ArticleMessage,
    isExiting: boolean,
    onClose: () => void,
}) {
    let borderColor;
    switch (message.type) {
        case "validation":
            borderColor = "#7c3aed";
            break;
        case "error":
            borderColor = "#dc2626";
            break;
        case "success":
            borderColor = "#16a34a";
            break;
        default:
            borderColor = "#7c3aed";
    }

    return (
        <ModalPortal wrapperId={"notification-modal-wrapper"}>
            <div className={`${styles.notificationsContainer} ${isExiting ? styles.exiting : ""}`}
                 style={{borderLeftColor: borderColor}}
                 role={message.type === "error" ? "alert" : "status"}
                 aria-live={message.type === "error" ? "assertive" : "polite"}
            >
                <div className={styles.head}>
                    <h2 className={styles.title}>
                        {message.title}
                    </h2>

                    <button type="button" onClick={onClose}
                            className={styles.closeBtn}
                            aria-label="Zavrieť oznámenie">
                        <MdCancel/>
                    </button>
                </div>

                {message.details && (
                    <ul className={styles.messages}>
                        {message.details.map((msg, index) => (
                            <li key={index}>
                                {msg + (index + 1 !== message.details?.length ? "," : "")}
                                <br/>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </ModalPortal>
    );
}
