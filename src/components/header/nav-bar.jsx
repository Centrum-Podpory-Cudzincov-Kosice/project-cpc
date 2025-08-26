import styles from "./header.module.css";
import navLinks from "../../lib/nav-links";
import {useTranslation} from "react-i18next";
import {useAppNavigation} from "../../hooks/use-app-navigation";

export default function NavBar() {
    const appNavigate = useAppNavigation();
    const {t} = useTranslation(["nav"]);

    return (
        <nav className={styles.links}>
            {navLinks.map((link, index) => {
                return (
                    <p key={index}
                       onClick={() =>
                           appNavigate(link.url)
                       }>
                        {t(link.label)}
                    </p>
                )
            })}
        </nav>
    );
}