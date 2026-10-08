"use client";

import styles from "./article.text.module.css";
import {ChangeEvent, useEffect, useRef} from "react";
import {useLanguage} from "@/features/providers/LanguageProvider";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";

export default function TitleEditor() {
    const {article, setTitle} = useArticleEditor();

    const {lang} = useLanguage();

    const title = article.titles[lang];

    const textareaRef =
        useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "0px";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
        adjustHeight();
    }, [title]);

    useEffect(() => {
        const textarea = textareaRef.current;

        if (!textarea) return;

        const observer = new ResizeObserver(() => {
            adjustHeight();
        });

        observer.observe(textarea);

        return () => {
            observer.disconnect();
        };
    }, []);

    const onTitleChange = (
        e: ChangeEvent<HTMLTextAreaElement>
    ) => {
        setTitle(lang, e.target.value);
    };

    return (
        <div>
            <textarea
                className={styles.titleInput}
                ref={textareaRef}
                value={title}
                onChange={(e) =>
                    onTitleChange(e)}
                placeholder={"Názov..."}
                maxLength={130}
            />
        </div>
    );
}