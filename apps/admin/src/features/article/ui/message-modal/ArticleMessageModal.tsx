import ModalPortal from "@/features/article/ui/message-modal/ModalPortal";
import {MdCancel} from "react-icons/md";
import styles from "./modal.module.css";
import {ArticleMessage} from "@/features/providers/ArticleEditorProvider";

export default function ArticleMessageModal({message, onClose}: {
    message: ArticleMessage,
    onClose: () => void,
}) {
    let borderColor;
    switch (message.type) {
        case "validation":
            borderColor = "#44005e";
            break;
        case "error":
            borderColor = "#ff0000";
            break;
        case "success":
            borderColor = "#00ff00";
            break;
        default:
            borderColor = "#44005e";
    }

    return (
        <ModalPortal wrapperId={"notification-modal-wrapper"}>
            <div className={styles.notificationsContainer}
                 style={{borderColor: borderColor}}
            >
                <div className={styles.head}>
                    <h2 className={styles.title}>
                        {message.title}
                    </h2>

                    <button onClick={onClose}
                            className={styles.closeBtn}>
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