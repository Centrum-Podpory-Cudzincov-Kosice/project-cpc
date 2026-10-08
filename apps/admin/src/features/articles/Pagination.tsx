import styles from "./articles.module.css";

export default function Pagination({currentPage, totalPages, onPageChange}: {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
}) {
    if (totalPages < 2) return null;

    let start = Math.max(1, currentPage - 1);

    if (currentPage <= 2) {
        start = 1;
    } else if (currentPage >= totalPages - 1) {
        start = totalPages - 2;
    }

    const pages = Array.from({length: 3}, (_, i) => start + i)
        .filter(page => page >= 1 && page <= totalPages);

    return (
        <div className={styles.pagination}>
            {start > 1 && (
                <button onClick={() => onPageChange(1)}>
                    ...
                </button>
            )}

            {pages.map(page =>
                page === currentPage ? (
                    <span key={page} className={styles.currentPage}>
                        {page}
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            {start + 2 < totalPages && (
                <button onClick={() => onPageChange(totalPages)}>
                    ...
                </button>
            )}
        </div>
    );
}