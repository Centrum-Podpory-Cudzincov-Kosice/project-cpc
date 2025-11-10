import styles from "./about-us-brief.module.css";
import {useTranslation} from "react-i18next";
import {useAppNavigation} from "../../../hooks/use-app-navigation";

export default function AboutUsBrief() {
    const {t} = useTranslation(["home"]);
    const appNavigate = useAppNavigation();

    return (
        <article className={styles.container}>
            <img className={styles.mainLogo}
                 src={"/kosice-logo.png"}
                 alt={"Košice"}
            />
            <h2>
                {t("aboutUsBrief.title")}
            </h2>
            <p>
                {t("aboutUsBrief.text")}
            </p>
            <button onClick={() => appNavigate("#contacts")}>
                {t("aboutUsBrief.contactsButton")}
            </button>
        </article>
    );
}