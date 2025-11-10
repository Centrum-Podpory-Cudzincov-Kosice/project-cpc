import styles from "./services.module.css";
import {
  LuGraduationCap,   // Hľadanie školy/školstva
  LuLanguages,       // Tlmočenie
  LuLandmark,        // Prvý kontakt s Košickými inštitúciami
  LuShield,          // Otázky o cudzineckej polícii
  LuFileText,        // Vyplnenie tlačív a tlač
  LuUsers            // Celkové integračné poradenstvo
} from "react-icons/lu";
import {useTranslation} from "react-i18next";

export default function Services() {
  const {t} = useTranslation("home");

  const items = [
    { icon: <LuGraduationCap />, label: "services.schools" },
    { icon: <LuLanguages />,     label: "services.translation" },
    { icon: <LuLandmark />,      label: "services.institutions" },
    { icon: <LuShield />,        label: "services.police" },
    { icon: <LuFileText />,      label: "services.print" },
    { icon: <LuUsers />,         label: "services.integrationService" },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("services.title")}</h2>

        <ul className={styles.grid} aria-label="Zoznam služieb">
          {items.map((it, i) => (
            <li key={i} className={styles.card}>
              {/* Якщо знадобиться лінк — обгорни .inner у <a href="..."> */}
              <div className={styles.border}>
                <div className={styles.inner}>
                  <span className={styles.icon} aria-hidden="true">{it.icon}</span>
                  <span className={styles.label}>{t(it.label)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

