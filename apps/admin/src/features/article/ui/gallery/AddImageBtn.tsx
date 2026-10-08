"use client";

import styles from "./article.gallery.module.css";
import {useImageUpload} from "@/features/article/hooks/useImageUpload";

export default function AddImageBtn() {
    const uploadHandler = useImageUpload();

    return (
        <div className={styles.addImgBtn}>
            <input
                className={styles.addImgInput}
                id={"article-image-upload"}
                type={"file"}
                accept={"image/*"}
                onChange={uploadHandler}
            />

            <label htmlFor={"article-image-upload"}>
                Pridať obrazok
            </label>
        </div>
    );
}