"use client";

import styles from "./article-system.module.css";
import {ReactNode} from "react";

export function ArticleContainer({heading, gallery, title, date, content}: {
    heading: ReactNode,
    gallery: ReactNode,
    title: ReactNode,
    date: ReactNode,
    content: ReactNode,
}) {
    return (
        <article className={styles.mainContainer}>
            {heading}

            <div className={styles.galleryField}>
                {gallery}
            </div>

            <div className={styles.textContent}>
                <h2 className={styles.titleField}>
                    {title}
                </h2>

                <b className={styles.dateField}>
                    {date}
                </b>

                <div className={styles.textField}>
                    {content}
                </div>
            </div>
        </article>
    );
}