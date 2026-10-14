"use client";

import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import ArticleMessageModal from "./ArticleMessageModal";
import {useEffect} from "react";

export default function ArticleMessageHandler() {
    const {message, setMessage} = useArticleEditor();

    const closeMessage = () => setMessage(null);

    useEffect(() => {
        if (!message) return;

        const delay = message.type === "success" ? 3000 : 6000;

        const timeout = setTimeout(() => {
            closeMessage();
        }, delay);

        return () => clearTimeout(timeout);
    }, [message, setMessage]);

    if (!message) return null;

    return (
        <ArticleMessageModal
            message={message}
            onClose={closeMessage}
        />
    );
}