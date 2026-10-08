import {ArticleType} from "@cpc/article-system";
import {Language} from "@cpc/languages";
import {Point} from "react-easy-crop";

export interface ArticleEditorImage {
    id: string,

    original: {
        src: string,
        file?: File,
    },

    preview: {
        src: string,
        file?: File,
    },

    crop: Point,
    zoom: number
}

export type ArticleEditorState = {
    id: string | null,
    date: string,
    type: ArticleType,
    titles: Record<
        Language,
        string
    >,
    descriptions: Record<
        Language,
        string
    >,
    images: ArticleEditorImage[],
    currentImage: number,
    imageSelected: boolean,
    published: boolean
}