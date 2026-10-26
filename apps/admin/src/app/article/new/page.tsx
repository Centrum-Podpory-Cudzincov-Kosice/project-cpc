"use client";

import styles from "@/features/article/article.module.css";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import {ArticleLoading} from "@cpc/article-system";
import NewArticle from "@/features/article/ui/NewArticle";

export default function NewArticlePage() {
    const {loading} = useArticleEditor();

    return loading ? (
        <div className={styles.navigationLoading}>
            <ArticleLoading/>
        </div>
    ) : (
        <NewArticle/>
    );
}