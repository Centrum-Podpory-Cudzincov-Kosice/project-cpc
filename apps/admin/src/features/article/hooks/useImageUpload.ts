"use client";

import {ChangeEvent} from "react";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import convertToWebp from "@/features/article/utils/convertToWebp";

export function useImageUpload() {
    const {addImage} = useArticleEditor();

    return async (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        try {
            const webpFile = await convertToWebp(file);
            const previewUrl = URL.createObjectURL(webpFile);

            addImage({
                id: crypto.randomUUID(),

                original: {
                    src: previewUrl,
                    file: webpFile,
                },

                preview: {
                    src: previewUrl,
                    file: webpFile,
                },

                crop: {x: 0, y: 0},
                zoom: 1,
            });
        } finally {
            e.target.value = "";
        }
    };
}