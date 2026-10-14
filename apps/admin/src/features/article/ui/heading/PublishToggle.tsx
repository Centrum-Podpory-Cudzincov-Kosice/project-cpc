import styles from "../../article.module.css";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";

export default function PublishToggle() {
    const {article, submitArticle, unpublishArticle, setMessage} = useArticleEditor();

    const handlePublish = async () => {
        const success = await submitArticle(true);

        if (success) {
            setMessage({
                type: "success",
                title: "Článok je publikovaný"
            });
        }
    };

    const handleUnpublish = async () => {
        const success = await unpublishArticle();

        if (success) {
            setMessage({
                type: "success",
                title: "Článok je skrytý"
            });
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