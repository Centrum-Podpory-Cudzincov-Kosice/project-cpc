import {ArticleType} from "@cpc/article-system";
import {Language} from "@cpc/languages";
import {
    ArticleEditorImage,
    ArticleEditorState
} from "@/features/article/types";

export type Action =
    | {
    type: "SET_TITLE",
    lang: Language,
    value: string,
}
    | {
    type: "SET_DESCRIPTION",
    lang: Language,
    value: string,
}
    | {
    type: "SET_DATE",
    value: string,
}
    | {
    type: "SET_TYPE",
    value: ArticleType,
}
    | {
    type: "SET_CURRENT_IMAGE",
    index: number,
}
    | {
    type: "SELECT_IMAGE",
}
    | {
    type: "UNSELECT_IMAGE",
}
    | {
    type: "ADD_IMAGE",
    value: ArticleEditorImage,
}
    | {
    type: "UPDATE_IMAGE",
    value: ArticleEditorImage,
}
    | {
    type: "REMOVE_IMAGE",
}
    | {
    type: "MOVE_IMAGE",
    to: number,
}
    | {
    type: "SET_PUBLISHED",
    value: boolean,
}
    | {
    type: "RESET",
    value: ArticleEditorState,
};