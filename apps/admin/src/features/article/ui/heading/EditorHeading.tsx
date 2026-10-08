"use client";

import styles from "../../article.module.css";
import {BackBtn} from "@cpc/article-system";
import TypeSwitcher from "@/features/article/ui/heading/TypeSwitcher";
import LanguageSwitcher from "@/features/article/ui/heading/LanguageSwitcher";
import {useRouter} from "next/navigation";
import {SaveBtn} from "@/features/article/ui/heading/SaveBtn";
import DeleteBtn from "@/features/article/ui/heading/DeleteBtn";
import PublishToggle from "@/features/article/ui/heading/PublishToggle";

export default function EditorHeading() {
    const {push} = useRouter();

    const backHandler = () => {
        push("/articles");
    }

    return (
        <div>
            <div className={styles.actionsBar}>
                <BackBtn onBack={backHandler}>
                    ← Späť
                </BackBtn>

                <div className={styles.rightActions}>
                    <DeleteBtn/>

                    <SaveBtn/>

                    <PublishToggle/>
                </div>
            </div>

            <div className={styles.switchers}>
                <div/>

                <TypeSwitcher/>

                <LanguageSwitcher/>
            </div>
        </div>
    );
}