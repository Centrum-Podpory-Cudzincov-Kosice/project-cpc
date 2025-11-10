import styles from './header.module.css';
import NavBar from "./nav-bar";
import SidebarButton from "./sidebar-button";
import LanguageSwitcher from "./language-switcher";
import useScrolledFromTop from "../../hooks/useScrolledFromTop";
import Socials from "./socials";
import {ReactComponent as KosiceLogo} from "../../assets/logo-white.svg";
import {useLocation, useNavigate} from "react-router-dom";

export default function Header({
                                   sidebarToggle, toggleSidebar
                               }: {
    sidebarToggle: boolean;
    toggleSidebar: (toggle: boolean) => void
}) {
    const {scrolled} = useScrolledFromTop(50);
    const location = useLocation();
    const isHomepage = location.pathname === "/";
    const navigate = useNavigate();

    const handleToHomepage = () => {
        if (isHomepage) {
            window.scrollTo({top: 0, behavior: "smooth"});
        } else {
            navigate("/")
        }
    }

    return (
        <header style={{ backgroundColor: isHomepage ? "transparent" : undefined }}
                className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        >
            <div className={styles.logo} onClick={handleToHomepage}>
                <img src={"/logo.png"} alt={""} className={styles.cpcLogo}/>
                <KosiceLogo className={styles.kosiceLogo}/>
            </div>
            <NavBar/>
            <div className={styles.buttonsRight}>
                <LanguageSwitcher/>
                <Socials/>
                <SidebarButton sidebarToggle={sidebarToggle}
                               toggleSidebar={toggleSidebar}
                />
            </div>
        </header>
    );
}