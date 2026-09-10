import styles from "./pages.module.css";
import {useTranslation} from "react-i18next";
import ArticlesListLoading from "../components/skeletons/articles-list-loading/ArticlesListLoading";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense, useEffect} from "react";
import ArticlesList from "../components/articles/ArticlesList";
import {ArticleType} from "@cpc/article-system";

export default function NewsListPage() {
    const {t} = useTranslation(["articles"]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <h1 className={styles.pageTitle}>
                {t("newsPageTitle")}
            </h1>

            <ErrorBoundary fallback={<div></div>}>
                <Suspense fallback={<ArticlesListLoading/>}>
                    <ArticlesList type={ArticleType.NEWS}/>
                </Suspense>
            </ErrorBoundary>
        </main>
    );
}