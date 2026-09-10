import {useTranslation} from "react-i18next";
import styles from "./pages.module.css";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense, useEffect} from "react";
import ArticlesListLoading from "../components/skeletons/articles-list-loading/ArticlesListLoading";
import ArticlesList from "../components/articles/ArticlesList";
import {ArticleType} from "@cpc/article-system";

export default function EventsListPage() {
    const {t} = useTranslation(["articles"]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <h1 className={styles.pageTitle}>
                {t("eventsPageTitle")}
            </h1>

            <ErrorBoundary fallback={<div></div>}>
                <Suspense fallback={<ArticlesListLoading/>}>
                    <ArticlesList type={ArticleType.EVENT}/>
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}