import styles from "./articles.module.css";
import clsx from "clsx";

export default function Pagination({
                                       curr,
                                       selectFn,
                                       total,
                                   }: {
    curr: number;
    selectFn: (index: number) => void;
    total: number;
}) {
    const getPages = () => {
        if (total <= 3) {
            return Array.from({length: total}, (_, i) => i + 1);
        }

        if (curr === 1) {
            return [1, 2, 3];
        }

        if (curr === total) {
            return [total - 2, total - 1, total];
        }

        return [curr - 1, curr, curr + 1];
    };

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => selectFn(curr - 1)}
                disabled={curr === 1}
                aria-label={"Previous page"}
                className={clsx(styles.paginationArrow, "not-selectable")}
            >
                ‹
            </button>

            {getPages().map((page) => (
                <button
                    key={page}
                    onClick={() => selectFn(page)}
                    className={clsx(
                        curr === page ? styles.active : "",
                        "not-selectable"
                    )}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => selectFn(curr + 1)}
                disabled={curr === total}
                aria-label={"Next page"}
                className={clsx(styles.paginationArrow, "not-selectable")}
            >
                ›
            </button>
        </div>
    );
}