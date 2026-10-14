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
    type: "error" | "validation" | "success",
    title: string,
    details?: string[],
}

const ArticleEditorContext = createContext<{
    article: ArticleEditorState,
    loading: boolean,

    message: ArticleMessage | null,
    setMessage: (value: ArticleMessage | null) => void,

    setType: (value: ArticleType) => void,
    setTitle: (lang: Language, value: string) => void,
    setDescription: (lang: Language, value: string) => void,
    setDate: (value: string) => void,

    addImage: (value: ArticleEditorImage) => void,
    setCurrentImage: (index: number) => void,
    updateImage: (value: ArticleEditorImage) => void,
    removeImage: () => void,
    moveImage: (to: number) => void,
    selectImage: () => void,
    unselectImage: () => void,

    editExisting: (id: string) => Promise<void>,
    submitArticle: (published?: boolean) => Promise<boolean>,
    unpublishArticle: () => Promise<boolean>,
    deleteArticle: () => Promise<boolean>
} | undefined>(undefined);

const emptyArticle: ArticleEditorState = {
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
    currentImage: 0,
    imageSelected: false,
    published: false
}

export default function ArticleEditorProvider({children}: {
    children: ReactNode
}) {
    const [article, dispatch] = useReducer(articleReducer, emptyArticle);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<ArticleMessage | null>(null);

    const setType = useCallback((value: ArticleType) => {
        dispatch({
            type: "SET_TYPE",
            value,
        });
    }, []);

    const setTitle = useCallback((lang: Language, value: string) => {
        dispatch({
            type: "SET_TITLE",
            lang,
            value,
        });
    }, []);

    const setDescription = useCallback((lang: Language, value: string) => {
        dispatch({
            type: "SET_DESCRIPTION",
            lang,
            value,
        });
    }, []);

    const setDate = useCallback((value: string) => {
        dispatch({
            type: "SET_DATE",
            value,
        });
    }, []);

    const addImage = useCallback((value: ArticleEditorImage) => {
        dispatch({
            type: "ADD_IMAGE",
            value,
        });
    }, []);

    const setCurrentImage = useCallback((index: number) => {
        dispatch({
            type: "SET_CURRENT_IMAGE",
            index,
        });
    }, []);

    const updateImage = useCallback((value: ArticleEditorImage) => {
        dispatch({
            type: "UPDATE_IMAGE",
            value,
        });
    }, []);

    const removeImage = useCallback(() => {
        dispatch({
            type: "REMOVE_IMAGE",
        });
    }, []);

    const moveImage = useCallback((to: number) => {
        dispatch({
            type: "MOVE_IMAGE",
            to,
        });
    }, []);

    const selectImage = useCallback(() => {
        dispatch({
            type: "SELECT_IMAGE",
        });
    }, []);

    const unselectImage = useCallback(() => {
        dispatch({
            type: "UNSELECT_IMAGE",
        });
    }, []);

    const editExisting = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setMessage(null);

            const res = await axios.get(`/api/admin/articles/${id}`);

            dispatch({
                type: "RESET",
                value: mapArticleToEditorState(res.data),
            });
        } catch (e) {
            console.error(e);

            setMessage({
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
            setMessage(null);

            const validation = validateArticle(article, published);

            if (!validation.success) {
                const missing = validation.issues.map(issue => issue.message);

                setMessage({
                    type: "validation",
                    title: "Článok sa nepodarilo uložiť",
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

            setMessage({
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

    const unpublishArticle = useCallback(async () => {
        if (!article.id) {
            setMessage({
                type: "error",
                title: "ID článku nebolo nájdené",
            });

            return false;
        }

        if (!article.published) {
            return true;
        }

        try {
            setLoading(true);
            setMessage(null);

            const res = await axios.patch(
                `/api/admin/articles/${article.id}`,
                {published: false}
            );

            dispatch({
                type: "RESET",
                value: mapArticleToEditorState(res.data),
            });

            setMessage({
                type: "success",
                title: "Článok bol skrytý",
            });

            return true;
        } catch (e) {
            console.error(e);

            setMessage({
                type: "error",
                title: "Článok sa nepodarilo skryť",
            });

            return false;
        } finally {
            setLoading(false);
        }
    }, [article.id, article.published]);

    const deleteArticle = useCallback(async () => {
        setMessage(null);

        if (!article.id) {
            setMessage({
                type: "error",
                title: "ID článku nebolo nájdené"
            });

            return false;
        }

        try {
            setLoading(true);

            await axios.delete(`/api/admin/articles/${article.id}`);

            return true;
        } catch (e) {
            console.error(e);
            setMessage({
                type: "error",
                title: "Článok sa nepodarilo odstrániť"
            });

            return false;
        } finally {
            setLoading(false);
        }
    }, [article.id]);

    return (
        <ArticleEditorContext.Provider value={{
            article,
            loading,

            message,
            setMessage,

            setType,
            setTitle,
            setDescription,
            setDate,

            addImage,
            setCurrentImage,
            removeImage,
            updateImage,
            moveImage,
            selectImage,
            unselectImage,

            editExisting,
            submitArticle,
            unpublishArticle,
            deleteArticle
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