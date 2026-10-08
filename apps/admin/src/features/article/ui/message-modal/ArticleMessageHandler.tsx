"use client";

import {useArticleEditor} from "@/app/providers/ArticleEditorProvider";
import ArticleMessageModal from "./ArticleMessageModal";

export default function ArticleMessageHandler() {
    const {message, setMessages} = useArticleEditor();

    if (!message) return null;

    return (
        <ArticleMessageModal
            message={message}
            onClose={() => setMessages(null)}
        />
    );
}