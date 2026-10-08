"use client";

import {useEffect, useState} from "react";
import {ArticleEditorImage} from "admin-project-cpc/src/features/article/types";

export function useImgPreload(
    images: ArticleEditorImage[],
    type: "original" | "preview" = "preview"
) {
    const [ready, setReady] = useState(images.length === 0);

    useEffect(() => {
        let loading = true;

        if (images.length === 0) return;

        Promise.all(
            images.map(
                image =>
                    new Promise<void>((resolve, reject) => {
                        const img = new Image();

                        img.src = image[type].src;

                        img.onload = () => resolve();
                        img.onerror = () => reject(new Error(`Failed to load ${img.src}`));
                    })
            )
        )
            .then(() => {
                if (loading) setReady(true);
            })
            .catch(() => {
                if (loading) setReady(false);
            });

        return () => {
            loading = false;
        };
    }, [images, type]);

    return ready;
}