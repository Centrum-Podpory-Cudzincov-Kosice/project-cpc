"use client";

import styles from "../../article.module.css";
import {FaTrash} from "react-icons/fa";
import {useArticleEditor} from "@/app/providers/ArticleEditorProvider";
import {useRouter} from "next/navigation";

export default function DeleteBtn() {
    const {deleteArticle} = useArticleEditor();
    const {push} = useRouter();

    const handleDelete = async () => {
        const success = await deleteArticle();

        if (success) {
            push("/articles");
        }
    }

    return (
        <div className={styles.actionIconBtn}>
            <FaTrash onClick={handleDelete}/>
        </div>
    );
}