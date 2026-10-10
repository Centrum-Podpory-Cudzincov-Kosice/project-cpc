"use client";

import styles from "../../article.module.css";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import {useRouter, usePathname} from "next/navigation";

export function SaveBtn() {
    const {createArticle, updateArticle} = useArticleEditor();
    const {push} = useRouter();
    const pathname = usePathname();

    const handleSave = async () => {
        try {
            if (pathname.endsWith("/new")) {
                await createArticle();
            } else {
                await updateArticle();
            }

            push("/articles");
        } catch (error) {
            console.error("Failed to save article:", error);
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