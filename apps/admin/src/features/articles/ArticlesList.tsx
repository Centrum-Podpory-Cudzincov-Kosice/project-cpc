"use client";

import styles from "@/features/articles/articles.module.css";
import axios from "axios";
import {OrbitProgress} from "react-loading-indicators";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {ArticlesItem} from "@/features/articles/types";
import {ArticleType} from "@cpc/article-system";
import Pagination from "@/features/articles/Pagination";

const PAGE_SIZE = 5;

export default function ArticlesList({type}: {
    type: ArticleType,
}) {
    const {push} = useRouter();

    const [articles, setArticles] = useState<ArticlesItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchArticles = async () => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        try {
            setLoading(true);
            const res =
                await axios.get(`/api/articles?type=${type}&from=${from}&to=${to}`);
            setArticles(res.data.articles);
            setTotalPages(Math.ceil(res.data.total / PAGE_SIZE));
        } catch (e) {
            console.error(e);
            setError("Failed to fetch articles");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchArticles();
    }, [type, page]);

    if (loading) return <ListLoading/>;
    if (error) return <ErrorField message={error}/>;

    return (
        <div>
            <Pagination currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(page: number) => setPage(page)}
            />

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
        </div>
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