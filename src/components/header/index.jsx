import styles from './header.module.css';
import NavBar from "./nav-bar";
import SidebarButton from "./sidebar-button";
import LanguageSwitcher from "./language-switcher";
import useScrolledFromTop from "../../hooks/useScrolledFromTop";
import Socials from "./socials";
import {ReactComponent as KosiceLogo} from "../../assets/logo-white.svg";

export default function Header({
                                   sidebarToggle, setSidebarToggle
                               }) {
    const {scrolled} = useScrolledFromTop(50);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
            <a href={"/"}>
                <div className={styles.logo}>
                    <img src={"/logo.png"} alt={""} className={styles.cpcLogo}/>
                    <KosiceLogo className={styles.kosiceLogo}/>
                </div>
            </a>
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