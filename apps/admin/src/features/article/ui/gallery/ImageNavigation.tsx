"use client";

import styles from "./article.gallery.module.css";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import {IoMdArrowRoundBack} from "react-icons/io";
import {IoMdArrowRoundForward} from "react-icons/io";

export default function ImageNavigation() {
    const {article, moveImage} = useArticleEditor();

    if (article.imageSelected === null) throw new Error("No image selected");

    const images = article.images;
    const selectedImage = images[article.currentImage];

    const imageIndex = images.findIndex(
        image => image.id === selectedImage?.id
    );

    return (
        <div className={styles.imageNavigation}>
            <button
                disabled={imageIndex <= 0}
                onClick={() =>
                    moveImage(imageIndex - 1)
                }
            >
                <IoMdArrowRoundBack/>
            </button>

            <span>
                {imageIndex + 1} / {images.length}
            </span>

            <button
                disabled={imageIndex === images.length - 1}
                onClick={() =>
                    moveImage(imageIndex + 1)
                }
            >
                <IoMdArrowRoundForward/>
            </button>
        </div>
    );
}