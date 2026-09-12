import styles from "./articles.module.css";
import clsx from "clsx";
import {useTranslation} from "react-i18next";
import {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Gallery from "./Gallery";
import localizeArticle from "../../lib/localizeArticle";
import {ArticleType, MultilingualArticle} from "@cpc/article-system";

const MAX_DESCRIPTION_LENGTH = 250;

export default function ArticleCard({article, lang, isLast, currentPage}: {
    article: MultilingualArticle,
    lang: string,
    isLast: boolean,
    currentPage: number
}) {
    const navigate = useNavigate();

    const {title, text, date} = useMemo(
        () => localizeArticle(article, lang),
        [article, lang]
    );

    if (!text || !title || !article.id) return <></>;

    const separateText = text.length > MAX_DESCRIPTION_LENGTH;

    const titleBtnHandler = () => {
        if (!separateText) return;
        navigate(`/event/${article.id}`);
    }

    const textSliced = separateText
        ? text.slice(0, MAX_DESCRIPTION_LENGTH).replace(/\s+\S*$/, '') + "…"
        : text;

    return (
        <>
            <div>
                <div className={styles.galleryWrapper}>
                    <Gallery images={article.images}/>
                </div>

                <div className={styles.textContent}>
                    <h2 className={clsx(separateText && styles.hoverEffect)}
                        onClick={titleBtnHandler}>
                        {title}
                    </h2>

                    {date !== "Invalid Date" && (
                        <p className={styles.date}>
                            {date}
                        </p>
                    )}

                    <div className={styles.text}>
                        <ReactMarkdown>{textSliced}</ReactMarkdown>
                    </div>

                    {separateText && <ReadMoreBtn id={article.id}
                                                  type={article.type}
                                                  currentPage={currentPage}
                    />}
                </div>
            </div>

            {isLast && (
                <div className={styles.divider}/>
            )}
        </>
    );
}

const ReadMoreBtn = ({id, type, currentPage}: {
    id: string,
    type: ArticleType,
    currentPage: number
}) => {
    const {t} = useTranslation(["articles"]);
    const navigate = useNavigate();

    const openArticle = () => {
        switch (type) {
            case ArticleType.EVENT:
                navigate(`/event/${id}`, {
                    state: {page: currentPage}
                });
                break;

            case ArticleType.NEWS:
                navigate(`/news/${id}`, {
                    state: {page: currentPage}
                });
                break;

            default:
                throw new Error("Page not found");
        }
    };

    return (
        <button className={styles.readMoreButton}
                onClick={openArticle}>
            {t("readMoreBtn")}
        </button>
    );
}