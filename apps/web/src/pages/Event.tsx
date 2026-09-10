import {useParams} from "react-router-dom";
import ArticlePage from "../components/articles/ArticlePage";
import {ArticleType} from "@cpc/article-system";

export default function EventPage() {
    const params = useParams();
    const eventId = params.id!;

    return (
        <ArticlePage id={eventId}
                     type={ArticleType.EVENT}
        />
    );
}