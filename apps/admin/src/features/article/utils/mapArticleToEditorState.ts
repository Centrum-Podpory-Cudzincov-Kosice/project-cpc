import {ArticleEditorState} from "@/features/article/types";
import {MultilingualArticle} from "@cpc/article-system";
import {getImageId} from "@/lib/utils/getImageId";

export const mapArticleToEditorState = (
    article: MultilingualArticle
): ArticleEditorState => ({
    id: article.id,
    date: article.date,
    type: article.type,
    titles: {
        sk: article.title_sk,
        en: article.title_en,
        uk: article.title_uk,
    },
    descriptions: {
        sk: article.description_sk,
        en: article.description_en,
        uk: article.description_uk,
    },
    images: (article.images ?? []).map(
        (src: string) => ({
            id: getImageId(src),

            original: {
                src,
                file: undefined,
            },

            preview: {
                src,
                file: undefined,
            },

            crop: {x: 0, y: 0},
            zoom: 1
        })
    ),
    currentImage: 0,
    imageSelected: false,
    published: article.published,
});