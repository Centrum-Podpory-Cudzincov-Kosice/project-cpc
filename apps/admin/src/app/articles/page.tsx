import styles from "@/features/articles/articles.module.css";
import LogOut from "@/features/auth/LogOut";
import ArticlesByType from "@/features/articles/ArticlesByType";

export default async function ArticlesPage() {
    return (
        <main className={styles.articles}>
            <LogOut/>

            <h1>
                Članky
            </h1>

            <ArticlesByType/>
        </main>
    );
}