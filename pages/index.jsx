import { Routes } from "@config/routes";
import styles from "./index.module.scss";
import { useState } from "react";
import { ContactModal } from "@features/ui";

const navigationItems = [
  { text: "Home", link: Routes.home },
  { text: "Products", link: Routes.products },
  { text: "Documentation", link: Routes.documentation },
  { text: "Pricing", link: Routes.pricing },
];

const IssuesPage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.index} data-cover={showModal}>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />
        <nav className={styles.navLinks}>
          <ul>
            {navigationItems.map((item) => {
              return (
                <li key={item.text}>
                  <a href={item.link}>{item.text}</a>
                </li>
              );
            })}
          </ul>
        </nav>
        <a href={Routes.projects} className={styles.dashboardLink}>
          Open Dashboard
        </a>
      </header>
      <button
        className={styles.contactButton}
        onClick={() => setShowModal(true)}
        data-testid="supportButton"
        aria-label="click to open the contact modal"
        aria-controls="support-modal"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>

      {showModal ? (
        <div className={styles.modalContainter}>
          <ContactModal closeModal={() => setShowModal(false)} />
        </div>
      ) : null}
    </div>
  );
};

export default IssuesPage;
