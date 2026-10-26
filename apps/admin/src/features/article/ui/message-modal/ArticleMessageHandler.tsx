"use client";

import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import ArticleMessageModal from "./ArticleMessageModal";
import {useEffect, useState} from "react";

const EXIT_ANIMATION_MS = 320;

export default function ArticleMessageHandler() {
    const {message, setMessage} = useArticleEditor();
    const [visibleMessage, setVisibleMessage] = useState(message);
    const [isExiting, setIsExiting] = useState(false);

    const closeMessage = () => setMessage(null);

    useEffect(() => {
        if (message) {
            setVisibleMessage(message);
            setIsExiting(false);
            return;
        }

        if (!visibleMessage) return;

        setIsExiting(true);
        const timeout = setTimeout(() => {
            setVisibleMessage(null);
            setIsExiting(false);
        }, EXIT_ANIMATION_MS);

        return () => clearTimeout(timeout);
    }, [message, visibleMessage]);

    useEffect(() => {
        if (!message) return;

        const delay = message.type === "success" ? 3000 : 6000;

        const timeout = setTimeout(() => {
            closeMessage();
        }, delay);

        return () => clearTimeout(timeout);
    }, [message, setMessage]);

    if (!visibleMessage) return null;

    return (
        <ArticleMessageModal
            message={visibleMessage}
            isExiting={isExiting}
            onClose={closeMessage}
        />
    );
}
