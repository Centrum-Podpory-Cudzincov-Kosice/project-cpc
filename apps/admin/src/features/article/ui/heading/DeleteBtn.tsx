"use client";

import styles from "../../article.module.css";
import {FaTrash} from "react-icons/fa";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Modal from "@/features/modal/modal";

export default function DeleteBtn() {
    const {deleteArticle} = useArticleEditor();
    const {push} = useRouter();
    const [openModal, setOpenModal] = useState<boolean>(false);

    const openModalHandler = () => setOpenModal(true);
    const closeModalHandler = () => setOpenModal(false);

    const handleDelete = async () => {
        const success = await deleteArticle();

        if (success) {
            push("/articles");
        } else {
            closeModalHandler();
        }
    }

    return (
        <div className={styles.actionIconBtn}>
            <FaTrash onClick={openModalHandler}/>
            <Modal onClose={closeModalHandler} open={openModal} buttons={
                <>
                    <button onClick={handleDelete}>
                        Áno
                    </button>
                    <button onClick={closeModalHandler}>
                        Nie
                    </button>
                </>
            }>
                <h2>Vymazať tento článok?</h2>
            </Modal>
        </div>
    );
}