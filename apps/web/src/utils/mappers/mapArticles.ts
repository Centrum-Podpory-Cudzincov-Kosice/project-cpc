import {ArticleType, MultilingualArticle} from "@cpc/article-system";

export function mapArticle(article: any): MultilingualArticle {
    return {
        id: article.id,
        created_at: article.created_at,
        date: article.date,
        type: article.type as ArticleType,

        title_sk: article.title_sk,
        title_uk: article.title_uk,
        title_en: article.title_en,

        description_sk: article.description_sk,
        description_uk: article.description_uk,
        description_en: article.description_en,

        images: article.images,
        published: article.published,
    };
}

export function mapArticles(articles: any[]): MultilingualArticle[] {
    return articles.map(mapArticle);
}