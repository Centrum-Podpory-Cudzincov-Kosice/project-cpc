"use client";

import styles from "../../article.module.css";
import clsx from "clsx";
import {ArticleType} from "@cpc/article-system";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";

export default function ArticlesType() {
    const {article, setType} = useArticleEditor();

    const type = article.type;

    return (
        <div className={styles.types}>
            <button className={clsx(
                styles.typeButton,
                type === ArticleType.NEWS && styles.selected
            )}
                    onClick={() => setType(ArticleType.NEWS)}
            >
                Aktuality
            </button>

            <button className={clsx(
                styles.typeButton,
                type === ArticleType.EVENT && styles.selected
            )}
                    onClick={() => setType(ArticleType.EVENT)}
            >
                Podujatia
            </button>
        </div>
    );
}