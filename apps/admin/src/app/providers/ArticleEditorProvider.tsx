"use client";

import {
    createContext,
    ReactNode, useCallback,
    useContext, useReducer,
    useState,
} from "react";

import axios from "axios";
import {ArticleType} from "@cpc/article-system";
import {mapArticleToEditorState} from "@/features/article/utils/mapArticleToEditorState";
import {ArticleEditorImage, ArticleEditorState} from "@/features/article/types";
import {articleReducer} from "@/features/article/state/reducer";
import {Language} from "@cpc/languages";
import {validateArticle} from "@/features/article/validators/articleValidator";

export type ArticleMessage = {
    type: "error" | "validation",
    title: string,
    details?: string[],
}

const ArticleEditorContext = createContext<{
    article: ArticleEditorState,
    loading: boolean,

    message: ArticleMessage | null,
    setMessages: (value: ArticleMessage | null) => void,

    setType: (value: ArticleType) => void,
    setTitle: (lang: Language, value: string) => void,
    setDescription: (lang: Language, value: string) => void,
    setDate: (value: string) => void,
    addImage: (value: ArticleEditorImage) => void,
    updateImage: (index: number, value: ArticleEditorImage) => void,
    removeImage: (index: number) => void,
    moveImage: (from: number, to: number) => void,

    editExisting: (id: string) => Promise<void>,
    submitArticle: (published?: boolean) => Promise<boolean>,
    deleteArticle: () => Promise<boolean>,

    resetArticle: () => void,
} | undefined>(undefined);

const emptyArticle = {
    id: null,
    date: new Date().toDateString(),

    type: ArticleType.NEWS,

    titles: {
        "sk": "",
        "en": "",
        "uk": "",
    },

    descriptions: {
        "sk": "",
        "en": "",
        "uk": "",
    },

    images: [],
    published: false
}

export default function ArticleEditorProvider({children}: {
    children: ReactNode
}) {
    const [article, dispatch] = useReducer(articleReducer, emptyArticle);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<ArticleMessage | null>(null);

    const setType = (value: ArticleType) =>
        dispatch({
            type: "SET_TYPE",
            value,
        });

    const setTitle = (lang: Language, value: string) =>
        dispatch({
            type: "SET_TITLE",
            lang,
            value,
        });

    const setDescription = (lang: Language, value: string) =>
        dispatch({
            type: "SET_DESCRIPTION",
            lang,
            value,
        });

    const setDate = (value: string) =>
        dispatch({
            type: "SET_DATE",
            value,
        });

    const addImage = (value: ArticleEditorImage) =>
        dispatch({
            type: "ADD_IMAGE",
            value,
        });

    const updateImage = (index: number, value: ArticleEditorImage) =>
        dispatch({
            type: "UPDATE_IMAGE",
            index,
            value
        });

    const removeImage = (index: number) =>
        dispatch({
            type: "REMOVE_IMAGE",
            index
        });

    const moveImage = (from: number, to: number) =>
        dispatch({
            type: "MOVE_IMAGE",
            from,
            to
        });

    const editExisting = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setMessages(null);

            const res = await axios.get(`/api/admin/articles/${id}`);

            dispatch({
                type: "RESET",
                value: mapArticleToEditorState(res.data),
            });
        } catch (e) {
            console.error(e);

            setMessages({
                type: "error",
                title: "Článok sa nepodarilo načítať",
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const submitArticle = useCallback(async (published = article.published) => {
        try {
            setLoading(true);
            setMessages(null);

            const validation = validateArticle(article, published);

            if (!validation.success) {
                const missing = validation.issues.map(issue => issue.message);

                setMessages({
                    type: "validation",
                    title: "Článok sa nepodarilo načítať",
                    details: missing,
                });

                return false;
            }

            const formData = new FormData();

            formData.append("title_sk", article.titles.sk);
            formData.append("title_en", article.titles.en);
            formData.append("title_uk", article.titles.uk);

            formData.append("description_sk", article.descriptions.sk);
            formData.append("description_en", article.descriptions.en);
            formData.append("description_uk", article.descriptions.uk);

            formData.append("date", article.date);
            formData.append("type", article.type);
            formData.append("published", String(published));

            if (article.id) {
                formData.append(
                    "imageIds",
                    JSON.stringify(article.images.map((img) => img.id))
                );

                article.images.forEach((img) => {
                    if (img.preview.file) {
                        formData.append(img.id, img.preview.file);
                    }
                });
            } else {
                article.images.forEach((img) => {
                    formData.append("images", img.preview.file!);
                    formData.append("imageIds", img.id);
                });
            }

            const res = article.id
                ? await axios.post(`/api/admin/articles/${article.id}`, formData)
                : await axios.post("/api/admin/articles", formData);

            dispatch({
                type: "RESET",
                value: mapArticleToEditorState(res.data),
            });

            return true;
        } catch (e) {
            console.error(e);

            setMessages({
                type: "error",
                title: article.id
                    ? "Článok sa nepodarilo upraviť"
                    : "Článok sa nepodarilo vytvoriť",
            });

            return false;
        } finally {
            setLoading(false);
        }
    }, [article]);

    const deleteArticle = useCallback(async () => {
        setMessages(null);

        if (!article.id) {
            setMessages({
                type: "error",
                title: "ID článku nebolo nájdené"
            });

            return false;
        }

        try {
            setLoading(true);

            await axios.delete(`/api/admin/articles/${article.id}`);

            dispatch({
                type: "RESET",
                value: {
                    ...emptyArticle,
                    date: new Date().toISOString(),
                },
            });

            return true;
        } catch (e) {
            console.error(e);
            setMessages({
                type: "error",
                title: "Článok sa nepodarilo odstrániť"
            });

            return false;
        } finally {
            setLoading(false);
        }
    }, [article.id]);

    const resetArticle = useCallback(() => {
        dispatch({
            type: "RESET",
            value: {
                ...emptyArticle,
                date: new Date().toISOString(),
            },
        });

        setMessages(null);
    }, []);

    return (
        <ArticleEditorContext.Provider value={{
            article,
            loading,

            message: messages,
            setMessages,

            setType,
            setTitle,
            setDescription,
            setDate,
            addImage,
            removeImage,
            updateImage,
            moveImage,

            editExisting,
            submitArticle,
            deleteArticle,

            resetArticle
        }}>
            {children}
        </ArticleEditorContext.Provider>
    );
}

export function useArticleEditor() {
    const context = useContext(ArticleEditorContext);

    if (!context) {
        throw new Error("useArticleEditor must be used inside provider");
    }

    return context;
}