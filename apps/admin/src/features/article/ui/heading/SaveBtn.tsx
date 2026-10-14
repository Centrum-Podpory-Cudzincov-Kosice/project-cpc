"use client";

import styles from "../../article.module.css";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";

export function SaveBtn() {
    const {submitArticle, setMessage} = useArticleEditor();

    const handleSave = async () => {
        try {
            const success = await submitArticle();

            if(success) {
                setMessage({
                    type: "success",
                    title: "Článok je uložený"
                });
            }
        } catch (e) {
            console.error("Failed to save article:", e);
        }
    };

    return (
        <button
            type="button"
            className={styles.actionBtn}
            onClick={handleSave}
        >
            Uložiť
        </button>
    );
}