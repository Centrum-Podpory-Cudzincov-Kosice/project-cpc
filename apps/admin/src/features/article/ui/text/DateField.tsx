"use client";

import styles from "./article.text.module.css";
import DatePicker from "react-datepicker";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";

export default function DateField() {
    const {article, setDate} = useArticleEditor();

    const date = article.date
        ? new Date(article.date)
        : null;

    const onDateChange = (value: Date | null) => {
        if (!value) return;

        setDate(value.toISOString());
    };

    return (
        <DatePicker
            className={styles.dateInput}
            selected={date}
            onChange={onDateChange}
            dateFormat={"dd.MM.yyyy"}
        />
    );
}