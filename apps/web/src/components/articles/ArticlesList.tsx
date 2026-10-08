import styles from "./articles.module.css";
import {useTranslation} from "react-i18next";
import Pagination from "./Pagination";
import ArticlesListLoading from "../skeletons/articles-list-loading/ArticlesListLoading";
import {useArticlesPage} from "../../hooks/useArticlesPagination";
import ArticleCard from "./ArticleCard";
import {useSearchParams} from "react-router-dom";
import {ArticleType} from "@cpc/article-system";

export default function ArticlesList({type}: {
    type: ArticleType
}) {
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");
    const currentPage = Number(page);
    if (isNaN(currentPage)) throw new Error("Page not found");

    const {i18n} = useTranslation();
    const lang = i18n.language;

    const {pageArticles, setPage, loading, total} = useArticlesPage(currentPage, type);

    return loading ? (
        <ArticlesListLoading/>
    ) : (
        <div className={styles.listContainer}>
            <Pagination curr={currentPage}
                        selectFn={setPage}
                        total={total}
            />

            {pageArticles.map((article, index) => {
                return (
                    <ArticleCard key={article.id}
                             article={article}
                             lang={lang}
                             isLast={index !== pageArticles.length - 1}
                             currentPage={currentPage}
                />
                )
            })}

            <Pagination curr={currentPage}
                        selectFn={setPage}
                        total={total}
            />
        </div>
    );
}