"use client";

import styles from "./article.gallery.module.css";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";

export default function GalleryWrapper() {
    const {selectImage} = useArticleEditor();

    return (
        <div className={styles.galleryHover}>
            <button className={styles.selectImageBtn}
                    onClick={selectImage}>
                Upraviť obrázok
            </button>
        </div>
    );
}