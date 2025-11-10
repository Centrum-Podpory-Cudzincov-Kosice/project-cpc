import styles from "./nav-sidebar.module.css";
import navLinks from "../../lib/nav-links";
import {useAppNavigation} from "../../hooks/use-app-navigation";
import {useTranslation} from "react-i18next";

export default function NavList() {
    const appNavigate = useAppNavigation();
    const {t} = useTranslation(["nav"]);

    return (
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
    );
}