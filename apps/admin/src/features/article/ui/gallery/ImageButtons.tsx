"use client";

import styles from "./article.gallery.module.css";
import {ChangeEvent, useRef} from "react";
import ImageNavigation from "@/features/article/ui/gallery/ImageNavigation";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";

export default function ImageButtons({changeImage, saveChanges}: {
    changeImage: (file: File) => void,
    saveChanges: () => void,
}) {
    const {article, unselectImage, removeImage} = useArticleEditor();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        changeImage(file);
        e.target.value = "";
    }

    const handleDelete = () => {
        if (!article.imageSelected) return;
        removeImage();
        unselectImage();
    }

    return (
        <>
            <input
                ref={inputRef}
                hidden
                type={"file"}
                accept={"image/*"}
                onChange={handleChange}
            />

            <div className={styles.imageButtons}>
                <div>
                    <button onClick={unselectImage}>
                        Zrušiť
                    </button>
                </div>

                {article.images.length > 1 && <ImageNavigation/>}

                <div className={styles.changingButtons}>
                    <button onClick={handleDelete}>
                        Vymazať
                    </button>

                    <button onClick={() =>
                        inputRef.current?.click()}
                    >
                        Zmeniť
                    </button>

                    <button onClick={saveChanges}>
                        Uložiť
                    </button>
                </div>
            </div>
        </>
    );
}