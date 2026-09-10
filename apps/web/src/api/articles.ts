import {supabase} from "../lib/supabase";

const PAGE_SIZE = 4;

export async function getArticlesByType(type: string, page: number) {
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

    return data;
}

export async function getArticle(id: string) {
    const {data, error} = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error("Failed to fetch article");
    }

    return data;
}