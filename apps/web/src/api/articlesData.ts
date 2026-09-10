/*
import axios from "axios";
import {ArticlesPage, ArticleType, MultilingualArticle} from "../types";
import mapArticle from "../utils/mappers/mapArticles";

//const APP_MODE = process.env.REACT_APP_APP_MODE;

const AIRTABLE_BASE_ID = "appynslm7UcLg6XZ4";
const AIRTABLE_TABLE_NAME = "Events";
const AIRTABLE_TOKEN = process.env.REACT_APP_AIRTABLE_TOKEN;
const PAGE_SIZE = 3;

export async function getArticlesPage(
    type: ArticleType,
    offset?: string,
): Promise<ArticlesPage> {
    const res = await axios.get(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
        {
            headers: {
                Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            },
            params: {
                pageSize: PAGE_SIZE,
                offset,
                sort: [
                    {
                        field: "Date",
                        direction: "desc",
                    },
                ],
                filterByFormula: `{Type}="${type}"`,
            },
        }
    );

    return {
        articles: res.data.records.map(mapArticle),
        nextOffset: res.data.offset,
    };
}

export async function getArticleById(id: string): Promise<MultilingualArticle | null> {
    try {
        const res = await axios.get(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${AIRTABLE_TOKEN}`,
                },
            }
        );

        return mapArticle(res.data);
    } catch (error) {
        console.error("Error fetching articles:", error);
        return null;
    }
}*/
