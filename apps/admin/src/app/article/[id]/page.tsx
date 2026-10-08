"use client";

import styles from "../../../features/article/article.module.css";
import {useParams} from "next/navigation";
import {ArticleLoading} from "@cpc/article-system";
import Article from "@/features/article/ui/Article";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import {useEffect} from "react";

export default function ArticlePage() {
    const params = useParams<{ id: string }>();
    const articleId = params.id;

    const {editExisting, loading} = useArticleEditor();

    if (!articleId) throw new Error("No article found");

    useEffect(() => {
        editExisting(articleId);
    }, [articleId]);

    return loading ? (
        <div className={styles.navigationLoading}>
            <ArticleLoading/>
        </div>
    ) : (
        <Article/>
    );
}