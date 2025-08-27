import styles from "./about-kosice.module.css";
import {useTranslation} from "react-i18next";

export default function AboutKosice() {
    const {t} = useTranslation("home");

    return (
        <article>
            <div className={styles.fixedBackground} />
            <div className={styles.bgLayer}>
                <div className={styles.overlay}/>
                <div className={styles.content}>
                    <h2>
                        {t("aboutKosice.title")}{/*KOŠICE*/}
                    </h2>
                    <p>
                        {t("aboutKosice.text")}
                        {/*Košice sú otvoreným a priateľským mestom, ktoré srdečne víta cudzincov prichádzajúcich za
                        prácou,
                        štúdiom či podnikaním. Ponúkajú pestré možnosti profesionálneho uplatnenia, kvalitné
                        vzdelávacie
                        inštitúcie a priaznivé podnikateľské prostredie. S bohatou kultúrou, živým spoločenským
                        životom
                        a
                        multikultúrnou atmosférou sa Košice stávajú miestom, kde sa ľudia z rôznych krajín cítia ako
                        doma.
                        Košičania sú známi svojou pohostinnosťou a ochotou pomôcť cudzincom pri integrácii do
                        miestnej
                        komunity.*/}
                    </p>
                </div>
            </div>
        </article>
    );
}


