import * as v from "valibot";

import {articleDraftSchema} from "./articleDraftSchema";
import {articlePublishSchema} from "./articlePublishSchema";
import {ArticleEditorState} from "@/features/article/types";

export function validateArticle(
    article: ArticleEditorState,
    published: boolean
) {
    return v.safeParse(
        published
            ? articlePublishSchema
            : articleDraftSchema,
        article
    );
}