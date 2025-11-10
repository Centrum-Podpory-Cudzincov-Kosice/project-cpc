import styles from "./about-kosice.module.css";
import {useTranslation} from "react-i18next";
import {useEffect, useRef} from "react";

export default function AboutKosice() {
    const {t} = useTranslation("home");
    const bgLayerRef= useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const bgElement = bgLayerRef.current;

        if(isIos && bgElement) {
            bgElement.style.backgroundAttachment = "unset";
        }

    }, []);

    return (
        <article>
            <div className={styles.bgLayer} ref={bgLayerRef}>
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


