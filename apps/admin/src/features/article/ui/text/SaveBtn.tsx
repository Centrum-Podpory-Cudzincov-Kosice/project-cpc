"use client";

import styles from "./article.text.module.css";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import {useRouter} from "next/navigation";

export function SaveBtn() {
    const {article, createArticle, updateArticle} = useArticleEditor();
    const {push} = useRouter();

    const handleSave = async () => {
        try {
            if (article.id) {
                await updateArticle();
            } else {
                await createArticle();
            }

            push("/articles");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <button
            type="button"
            className={styles.saveBtn}
            onClick={handleSave}
        >
            Uložiť
        </button>
    );
}