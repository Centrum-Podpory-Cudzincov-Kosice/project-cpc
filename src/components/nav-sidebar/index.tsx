import styles from "./nav-sidebar.module.css";
import NavList from "./nav-list";
import DownBlock from "./down-block";

export default function NavSidebar({sidebarToggle}: {
    sidebarToggle: boolean
}) {
    return (
        <div className={`${styles.sidebar} ${sidebarToggle && styles.shiftRight}`}>
            <NavList/>
            <DownBlock/>
        </div>
    );
}