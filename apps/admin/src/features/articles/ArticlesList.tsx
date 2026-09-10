"use client";

import styles from "@/features/articles/articles.module.css";
import axios from "axios";
import {OrbitProgress} from "react-loading-indicators";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {ArticlesItem} from "@/features/articles/types";
import {ArticleType} from "@cpc/article-system";

export default function ArticlesList({type}: {
    type: ArticleType
}) {
    const {push} = useRouter();

    const [articles, setArticles] = useState<ArticlesItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const res =
                await axios.get(`/api/articles?type=${type}&from=${0}&to=${6}`);
            setArticles(res.data.articles);
        } catch (e) {
            console.error(e);
            setError("Failed to fetch articles");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchArticles();
    }, [type]);

    if (loading) return <ListLoading/>;
    if (error) return <ErrorField message={error}/>;

    return (
        <ul>
            {articles.length > 0 && articles.map((article) => (
                <li key={article.id}
                    className={styles.tableRow}>
                    <h3>{article.title_sk}</h3>

                    <p className={styles.date}>
                        {article.date.toString()}
                    </p>

                    <button className={"primaryBtn"}
                            onClick={() => {
                                push("/article/" + article.id)
                            }}>
                        Upraviť
                    </button>
                </li>
            ))}
        </ul>
    );
}

const ListLoading = () => (
    <div className={styles.loading}>
        <OrbitProgress
            variant={"track-disc"}
            color={"#ffffff"}
            size={"medium"}
        />
    </div>
);

const ErrorField = ({message}: {
    message: string
}) => (
    <div className={styles.error}>
        <p>{message}</p>
    </div>
);