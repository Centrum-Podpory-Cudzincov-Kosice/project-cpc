"use client";

import styles from "../../article.module.css";
import {useArticleEditor} from "@/app/providers/ArticleEditorProvider";
import {useRouter} from "next/navigation";

export function SaveBtn() {
    const {submitArticle} = useArticleEditor();
    const {push} = useRouter();

    const handleSave = async () => {
        const success = await submitArticle();

        if (success) {
            push("/articles");
        }
    }

    return (
        <button type={"button"}
                className={styles.actionBtn}
                onClick={handleSave}
        >
            Uložiť
        </button>
    );
}