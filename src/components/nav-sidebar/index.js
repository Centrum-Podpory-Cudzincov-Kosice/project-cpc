import styles from "./nav-sidebar.module.css";
import navLinks from "../../lib/nav-links";
import {useTranslation} from "react-i18next";
import {useAppNavigation} from "../../hooks/use-app-navigation";

export default function NavSidebar({sidebarToggle}) {
    const appNavigate = useAppNavigation();
    const {t} = useTranslation(["nav"]);

    return (
        <div className={`${styles.sidebar} ${sidebarToggle && styles.shiftRight}`}>
            <ul className={styles.sidebarList}>
                {navLinks.map((link, index) => {
                    return (
                        <li key={index}
                            onClick={() => {
                                appNavigate(link.url)
                            }}
                        >
                            {t(link.label)}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}