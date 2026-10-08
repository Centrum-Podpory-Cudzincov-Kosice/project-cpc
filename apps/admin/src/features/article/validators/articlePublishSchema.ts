import * as v from "valibot";
import { ArticleType } from "@cpc/article-system";

export const articlePublishSchema = v.object({
    id: v.nullable(v.string()),

    date: v.pipe(
        v.string(),
        v.nonEmpty("Vyberte dátum")
    ),

    type: v.picklist(
        Object.values(ArticleType),
        "Vyberte typ článku"
    ),

    titles: v.object({
        sk: v.pipe(
            v.string(),
            v.nonEmpty("Vyplňte slovenský názov")
        ),

        en: v.pipe(
            v.string(),
            v.nonEmpty("Vyplňte anglický názov")
        ),

        uk: v.pipe(
            v.string(),
            v.nonEmpty("Vyplňte ukrajinský názov")
        ),
    }),

    descriptions: v.object({
        sk: v.pipe(
            v.string(),
            v.nonEmpty("Vyplňte slovenský popis")
        ),

        en: v.pipe(
            v.string(),
            v.nonEmpty("Vyplňte anglický popis")
        ),

        uk: v.pipe(
            v.string(),
            v.nonEmpty("Vyplňte ukrajinský popis")
        ),
    }),

    images: v.pipe(
        v.array(
            v.object({
                id: v.string(),
            })
        ),
        v.minLength(
            1,
            "Pridajte aspoň jeden obrázok"
        )
    ),
});