import styles from './header.module.css';
import NavBar from "./nav-bar";
import SidebarButton from "./sidebar-button";
import LanguageSwitcher from "./language-switcher";
import useScrolledFromTop from "../../hooks/useScrolledFromTop";
import Socials from "./socials";

export default function Header({
                                   sidebarToggle, setSidebarToggle
                               }) {
    const {scrolled} = useScrolledFromTop(50);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.logo}>
                <a href={"/"}>
                    <img src={"/img/logo-cpc.png"} alt={""}/>
                </a>
            </div>
            <NavBar/>
            <div className={styles.buttonsRight}>
                <LanguageSwitcher/>
                <Socials/>
                <SidebarButton sidebarToggle={sidebarToggle}
                               setSidebarToggle={setSidebarToggle}
                />
            </div>
        </header>
    );
}