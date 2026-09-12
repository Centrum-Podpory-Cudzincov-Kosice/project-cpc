import styles from "./articles.module.css";

export default function Pagination({currentPage, totalPages, onPageChange}: {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
}) {
    if (totalPages < 2) return null;

    console.log(currentPage, totalPages);

    return (
        <div className={styles.pagination}>
            {currentPage > 1 && (
                <button onClick={() => onPageChange(currentPage - 1)}>
                    {currentPage - 1}
                </button>
            )}

            <span className={styles.currentPage}>
                {currentPage}
            </span>

            {currentPage < totalPages && (
                <button onClick={() => onPageChange(currentPage + 1)}>
                    {currentPage + 1}
                </button>
            )}
        </div>
    );
}