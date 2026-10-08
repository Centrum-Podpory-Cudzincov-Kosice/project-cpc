import * as v from "valibot";
import { ArticleType } from "@cpc/article-system";

export const articleDraftSchema = v.object({
    id: v.nullable(v.string()),

    date: v.pipe(
        v.string(),
        v.nonEmpty("Vyberte dátum")
    ),

    type: v.picklist(
        Object.values(ArticleType),
        "Vyberte typ článku"
    ),

    published: v.boolean(),

    titles: v.object({
        sk: v.pipe(
            v.string(),
            v.nonEmpty("Vyplňte slovenský názov")
        ),

        en: v.string(),

        uk: v.string(),
    }),

    descriptions: v.object({
        sk: v.string(),
        en: v.string(),
        uk: v.string(),
    }),

    images: v.array(
        v.object({
            id: v.string(),
        })
    ),
});