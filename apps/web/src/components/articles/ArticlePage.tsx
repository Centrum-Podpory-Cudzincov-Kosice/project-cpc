import {useQuery} from "@tanstack/react-query";
import {ArticleType, MultilingualArticle} from "@cpc/article-system";
import Article from "./Article";
import ArticleLoading from "../skeletons/articles-list-loading/ArticleLoading";
import {getArticle} from "../../api/articles";

export default function ArticlePage({id, type}: {
    id: string,
    type: ArticleType
}) {
    const {data: article, isLoading, isError} = useQuery<MultilingualArticle | null>({
        queryKey: ["article", id],
        queryFn: () => getArticle(id),
        staleTime: 1000 * 60 * 5,
    });

    if (isError) {
        console.error("Error fetching article...");
    }

    return (
        <main>
            {isLoading && (
                <div style={{margin: "5em 0 3em 0"}}>
                    <ArticleLoading/>
                </div>
            )}

            {!isLoading && article && (
                <Article
                    articleData={article}
                    type={type}
                />
            )}
        </main>
    );
}