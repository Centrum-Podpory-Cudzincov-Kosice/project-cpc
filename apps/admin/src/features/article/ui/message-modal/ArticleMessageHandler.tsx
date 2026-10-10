"use client";

import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import ArticleMessageModal from "./ArticleMessageModal";

export default function ArticleMessageHandler() {
    const {message, setMessage} = useArticleEditor();

    if (!message) return null;

    return (
        <ArticleMessageModal
            message={message}
            onClose={() => setMessage(null)}
        />
    );
}