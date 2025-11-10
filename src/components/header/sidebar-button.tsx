import styles from "./header.module.css";
import {IoMdClose} from "react-icons/io";
import {RiMenu2Line} from "react-icons/ri";

export default function SidebarButton({sidebarToggle, toggleSidebar}: {
    sidebarToggle: boolean,
    toggleSidebar: (toggle: boolean) => void
}) {
    const openSidebar = () => {
        toggleSidebar(true);
    }

    const closeSidebar = () => {
        toggleSidebar(false);
    }

    return (
        <div className={styles.burgerIconContainer}>
            {sidebarToggle
                ? <IoMdClose onClick={() => {
                    closeSidebar()
                }}/>
                : <RiMenu2Line onClick={() => {
                    openSidebar()
                }}/>
            }
        </div>
    );
}