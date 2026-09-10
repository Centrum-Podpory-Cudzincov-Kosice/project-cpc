import {supabase} from "../lib/supabase";
import {ArticlesPage} from "../types";
import {mapArticle, mapArticles} from "../utils/mappers/mapArticles";
import {MultilingualArticle} from "@cpc/article-system";

const PAGE_SIZE = 4;

export async function getArticlesPageByType(type: string, page: number): Promise<ArticlesPage> {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const {data, error} = await supabase
        .from("articles")
        .select("*")
        .eq("type", type)
        .eq("published", true)
        .order("date", {ascending: false})
        .range(from, to);

    if (error) {
        throw new Error("Failed to fetch articles");
    }

    console.log(from, to, data)

    return {
        articles: mapArticles(data),
        nextOffset: data.length === PAGE_SIZE ? page + 1 : undefined,
    };
}

export async function getArticle(id: string): Promise<MultilingualArticle> {
    const {data, error} = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error("Failed to fetch article");
    }

    return mapArticle([data]);
}