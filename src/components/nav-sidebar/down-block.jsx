import styles from "../nav-sidebar/nav-sidebar.module.css";
import {FaFacebookF, FaViber, FaTelegramPlane} from "react-icons/fa";

export default function DownBlock() {
    return (
        <div>
            <div className={styles.socials}>
                <a className={styles.socialsBtn} href="https://www.facebook.com/CentrumPodporyCudzincovKosice" aria-label="Facebook">
                <FaFacebookF />
                </a>
                <a className={styles.socialsBtn} href="https://t.me/+421908365995" aria-label="Telegram">
                    <FaTelegramPlane />
                </a>
                <a className={styles.socialsBtn} href="tel:+421908365995" aria-label="Viber">
                    <FaViber />
                </a>
            </div>
        </div>
    );
}