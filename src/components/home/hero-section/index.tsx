import {useEffect, useRef} from "react";
import styles from "./hero-section.module.css";
import {useTranslation} from "react-i18next";

export default function HeroSection() {
    const {t} = useTranslation(["home"]);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.defaultMuted = true;

        const onTouch = () => {
            video.play().catch(() => {
            });
            window.removeEventListener("touchstart", onTouch);
        };

        window.addEventListener("touchstart", onTouch, {passive: true});

        return () => {
            window.removeEventListener("touchstart", onTouch);
        };
    }, [videoRef]);

    return (
        <section className={styles.container}>
            <video
                ref={videoRef}
                playsInline
                autoPlay
                loop
                className={styles.bgVideo}
            >
                <source
                    src="/videos/bg-kosice-1080.avc.mp4"
                    type='video/mp4; codecs="avc1.640029, mp4a.40.2"'
                />
                <source
                    src="/videos/bg-kosice-1080.hevc.hvc1.mp4"
                    type='video/mp4; codecs="hvc1"'
                />
            </video>

            <div className={styles.cover}>
                <h1>{t("heroSection.welcomeMsg")}</h1>
            </div>
        </section>
    );
}

