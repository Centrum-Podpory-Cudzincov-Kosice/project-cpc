import styles from "../../article.module.css";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
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
        await submitArticle(false);
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