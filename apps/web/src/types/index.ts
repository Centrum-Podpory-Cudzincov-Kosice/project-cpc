import {MultilingualArticle} from "@cpc/article-system";

export type ArticlesPage = {
    articles: MultilingualArticle[],
    nextOffset?: number
}