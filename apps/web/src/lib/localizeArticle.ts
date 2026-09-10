import {MultilingualArticle} from "@cpc/article-system";

const localizeArticle = (event: MultilingualArticle, lang: string): {
    title: string,
    text: string,
    date: string
} => {
    let title: string, text: string;

    switch (lang) {
        case "en":
            title = event.title_en;
            text = event.description_en;
            break;
        case "uk":
            title = event.title_uk;
            text = event.description_uk;
            break;
        default:
            title = event.title_sk;
            text = event.description_sk;
    }

    const date = new Date(event.date).toLocaleDateString(lang)

    return {title, text, date}
}

export default localizeArticle;