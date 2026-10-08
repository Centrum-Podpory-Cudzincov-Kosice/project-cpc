"use client";

import styles from "../../article.module.css";
import {BackBtn} from "@cpc/article-system";
import ArticlesType from "@/features/article/ui/heading/ArticlesType";
import LanguageSwitcher from "@/features/article/ui/heading/LanguageSwitcher";
import {useRouter} from "next/navigation";

export default function EditorHeading() {
    const {push} = useRouter();

    const backHandler = () => {
        push("/articles");
    }

    return (
        <div className={styles.editorHeading}>
            <BackBtn onBack={backHandler}>
                ← Späť
            </BackBtn>

            <ArticlesType/>

            <LanguageSwitcher/>
        </div>
    );
}