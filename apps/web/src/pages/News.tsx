import {useParams} from "react-router-dom";
import ArticlePage from "../components/articles/ArticlePage";
import {ArticleType} from "@cpc/article-system";

export default function NewsPage() {
    const params = useParams();
    const newsId = params.id!;

    return (
        <ArticlePage id={newsId}
                     type={ArticleType.NEWS}
        />
    );
}