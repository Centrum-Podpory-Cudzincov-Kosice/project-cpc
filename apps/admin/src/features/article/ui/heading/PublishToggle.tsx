import styles from "../../article.module.css";
import {useArticleEditor} from "@/app/providers/ArticleEditorProvider";
import {useRouter} from "next/navigation";

export default function PublishToggle() {
    const {article, submitArticle} = useArticleEditor();
    const {push} = useRouter();

    const handlePublish = async () => {
        const success = await submitArticle(true);

        if (success) {
            push("/articles");
        }
    };

    const handleUnpublish = async () => {
        const success = await submitArticle(false);

        if (success) {
            push("/articles");
        }
    };

    return article.published ? (
        <button className={styles.actionBtn}
                onClick={handleUnpublish}>
            Skryť
        </button>
    ) : (
        <button className={styles.actionBtn}
                onClick={handlePublish}>
            Publikovať →
        </button>
    );
}