import styles from "./articles.module.css";
import {useTranslation} from "react-i18next";
import Pagination from "./Pagination";
import {useMemo} from "react";
import ArticlesListLoading from "../skeletons/articles-list-loading/ArticlesListLoading";
import {useArticlesPage} from "../../hooks/useArticlesPagination";
import ArticleCard from "./ArticleCard";
import {ArticlesPage} from "../../types";
import {useSearchParams} from "react-router-dom";
import {ArticleType} from "@cpc/article-system";

export default function ArticlesList({type}: {
    type: ArticleType
}) {
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");
    const currentPage = Number(page);
    if (isNaN(currentPage)) throw new Error("Page not found");

    const {pages, setPage, loading, total} = useArticlesPage(currentPage, type);

    if (pages.length < 1) return null;

    return loading ? (
        <ArticlesListLoading/>
    ) : (
        <div className={styles.listContainer}>
            <Pagination curr={currentPage}
                        selectFn={setPage}
                        total={total}
            />

            <SortedArticles pages={pages}
                            currentPage={currentPage}
            />

            <Pagination curr={currentPage}
                        selectFn={setPage}
                        total={total}
            />
        </div>
    );
}

const SortedArticles = ({pages, currentPage}: {
    pages: ArticlesPage[],
    currentPage: number,
}) => {
    const {i18n} = useTranslation();
    const lang = i18n.language;

    const sortedArticles = useMemo(() =>
        pages[currentPage - 1]?.articles ?? [], [currentPage, pages]);

    return (
        <>
            {sortedArticles.map((article, index) => (
                <ArticleCard key={article.id}
                             article={article}
                             lang={lang}
                             isLast={index !== sortedArticles.length - 1}
                             currentPage={currentPage}
                />
            ))}
        </>
    );
}