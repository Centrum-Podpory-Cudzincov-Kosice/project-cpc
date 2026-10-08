import ModalPortal from "@/features/article/ui/message-modal/ModalPortal";
import {MdCancel} from "react-icons/md";
import styles from "./modal.module.css";
import {ArticleMessage} from "@/app/providers/ArticleEditorProvider";

export default function ArticleMessageModal({message, onClose}: {
    message: ArticleMessage,
    onClose: () => void,
}) {
    return (
        <ModalPortal wrapperId={"notification-modal-wrapper"}>
            <div className={styles.notificationsContainer}
                 style={message.type === "validation"
                     ? {borderColor: "#44005e"}
                     : {borderColor: "#ff0000"}}
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