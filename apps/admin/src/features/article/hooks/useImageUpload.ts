"use client";

import {ChangeEvent} from "react";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";

export function useImageUpload() {
    const {addImage} = useArticleEditor();

    return (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const previewUrl = URL.createObjectURL(file);

        addImage({
            id: crypto.randomUUID(),

            original: {
                src: previewUrl,
                file,
            },

            preview: {
                src: previewUrl,
                file,
            },

            crop: {x: 0, y: 0},
            zoom: 1,
        });

        e.target.value = "";
    };
}