import styles from "../../article.module.css";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import Modal from "@/features/modal/modal";
import {useState} from "react";

export default function PublishToggle() {
    const {article, submitArticle, unpublishArticle, setMessage} = useArticleEditor();
    const [openModal, setOpenModal] = useState<boolean>(false);

    const openModalHandler = () => setOpenModal(true);
    const closeModalHandler = () => setOpenModal(false);

    const handlePublish = async () => {
        const success = await submitArticle(true);

        if (success) {
            setMessage({
                type: "success",
                title: "Článok je publikovaný"
            });
        } else {
            closeModalHandler();
        }
    };

    const handleUnpublish = async () => {
        const success = await unpublishArticle();

        if (success) {
            setMessage({
                type: "success",
                title: "Článok je skrytý"
            });
        } else {
            closeModalHandler();
        }
    };

    return (
        <div>
            {article.published ? (
                <div>
                    <button className={styles.actionBtn}
                            onClick={openModalHandler}>
                        Skryť
                    </button>
                    <Modal onClose={closeModalHandler} open={openModal} buttons={
                        <>
                            <button onClick={handleUnpublish}>
                                Áno
                            </button>
                            <button onClick={closeModalHandler}>
                                Nie
                            </button>
                        </>
                    }>
                        <h2>Skrýt tento článok?</h2>
                    </Modal>
                </div>
            ) : (
                <div>
                    <button className={styles.actionBtn}
                            onClick={openModalHandler}>
                        Publikovať →
                    </button>
                    <Modal onClose={handleUnpublish} open={openModal} buttons={
                        <>
                            <button onClick={handlePublish}>
                                Áno
                            </button>
                            <button onClick={closeModalHandler}>
                                Nie
                            </button>
                        </>
                    }>
                        <h3>Publikovať tento článok?</h3>
                    </Modal>
                </div>
            )}
        </div>
    );
}