"use client";

import {ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";
import styles from "./modal.module.css";

export default function Modal({open, onClose, children, buttons}: {
    open: boolean,
    onClose: () => void,
    children: ReactNode,
    buttons?: ReactNode,
}) {
    useEffect(() => {
        if(!open) return;

        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onEsc);

        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onEsc);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!open) return (<></>);

    return createPortal(
        <div className={styles.backdrop} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                role={"dialog"}
                aria-modal={"true"}
            >
                <button className={styles.close} onClick={onClose} aria-label={"Close"}>
                    ✕
                </button>

                <div className={styles.content}>
                    {children}
                </div>

                <div className={styles.buttons}>
                    {buttons}
                </div>
            </div>
        </div>,
        document.body
    );
}
