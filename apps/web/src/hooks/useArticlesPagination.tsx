import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getArticlesPageByType} from "../api/articles";
import {ArticleType} from "@cpc/article-system";

export function useArticlesPage(
    currentPage: number,
    type: ArticleType
) {
    const navigate = useNavigate();
    const {i18n} = useTranslation();

    const {data, isLoading, isFetching} = useQuery({
        queryKey: ["articles", type, i18n.language, currentPage],
        queryFn: () => getArticlesPageByType(type, currentPage),
    });

    const setPage = (page: number) => {
        switch (type) {
            case ArticleType.EVENT:
                navigate(`/events?page=${page}`);
                break;

            case ArticleType.NEWS:
                navigate(`/news?page=${page}`);
                break;

            default:
                throw new Error("Invalid article type");
        }
    };

    return {
        pageArticles: data?.articles ?? [],
        setPage,
        loading: isLoading || isFetching,
        total: data?.total ?? 0,
    };
}