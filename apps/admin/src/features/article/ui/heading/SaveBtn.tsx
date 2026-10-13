"use client";

import styles from "../../article.module.css";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import {useRouter} from "next/navigation";

export function SaveBtn() {
    const {submitArticle} = useArticleEditor();
    const {push} = useRouter();

    const handleSave = async () => {
        try {
            const success = await submitArticle();

            if(success) push("/articles");
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