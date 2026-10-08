"use client";

import {useEffect, useState} from "react";

export function useImagePreload(images: string[]) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let active = true;

        Promise.all(
            images.map(
                src =>
                    new Promise<void>((resolve, reject) => {
                        const img = new Image();
                        img.src = src;
                        img.onload = () => resolve();
                        img.onerror = reject;
                    })
            )
        ).then(() => {
            if (active) setReady(true);
        });

        return () => {
            active = false;
        };
    }, [images]);

    return ready;
}