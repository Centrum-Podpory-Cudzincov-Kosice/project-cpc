import styles from "./footer.module.css";
import {useLocation} from "react-router-dom";
import WorkHours from "./work-hours";
import SecondOfficeBlock from "./second-office-block";
import FirstOfficeBlock from "./first-office-block";

export default function Footer() {
    const year = new Date().getFullYear();
    const location = useLocation();

    return (
        <footer className={styles.container}>
            {/* Внутрішній блок для центрування і обмеження ширини */}
            <div className={styles.content}>

                {/* верхній блок */}
                <div className={styles.topGrid}>
                    <FirstOfficeBlock/>

                    {location.pathname !== "/" ? (
                        <WorkHours/>
                    ) : (
                        <SecondOfficeBlock/>
                    )}
                </div>

                {/* нижній блок */}
                {location.pathname !== "/" && (
                    <>
                        <hr className={styles.divider}/>
                        <SecondOfficeBlock/>
                    </>
                )}

                {/* копірайт */}
                <div className={styles.copyRow}>
                    <span>Text © {year} Košice</span>
                </div>

            </div>
        </footer>
    );
}