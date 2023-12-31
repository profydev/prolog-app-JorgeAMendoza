import { Routes } from "@config/routes";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { ContactModal } from "@features/ui";
import Image from "next/image";
import useIsMobile from "../hooks/useIsMobile";
import { Testimonials } from "@features/ui";

const navigationItems = [
  { text: "Home", link: Routes.home },
  { text: "Products", link: Routes.products },
  { text: "Documentation", link: Routes.documentation },
  { text: "Pricing", link: Routes.pricing },
  { text: "Dashboard", link: Routes.projects },
];

const companyList = [
  { name: "Layers", icon: "/icons/company-logos/layers.svg" },
  { name: "Sisyphus", icon: "/icons/company-logos/sisyphus.svg" },
  { name: "Circooles", icon: "/icons/company-logos/circooles.svg" },
  { name: "Catalog", icon: "/icons/company-logos/catalog.svg" },
  { name: "Quotient", icon: "/icons/company-logos/quotient.svg" },
  { name: "Hourglass", icon: "/icons/company-logos/hourglass.svg" },
];

const customerList = [
  {
    name: "Mollie Hall",
    title: "Web Developer, Sisyphus",
    avatar: "/images/mollie-hall.png",
    category: "Frontend Development",
    testimonial:
      "Prolog has saved us many times. We get an alert, investgate the error, and fix it. That simple.",
  },
  {
    name: "Alec Whitten",
    title: "Software Architect, Layers",
    avatar: "images/alec-whitten.png",
    category: "Microservice Architectures",
    testimonial:
      "Our services fail from time to time. That’s normal. But with Prolog we’re able to track the issue down in no time. ",
  },
  {
    name: "Kelly Williams",
    title: "Engineering Manager, Catalog",
    avatar: "images/kelly-williams.png",
    category: "Backend Servers",
    testimonial:
      "Prolog’s UI is beautiful and intuitive. It’s simple to find bugs and our devs are always on top of pressing issues.",
  },
];

const IssuesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) setNavOpen(false);
    else {
      setNavOpen(true);
      document.body.style.overflow = "unset";
    }
  }, [isMobile]);

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [showModal]);

  return (
    <div className={styles.index} data-cover={showModal}>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />
        <button
          aria-label={`click to ${navOpen === true ? "close" : "open"} menu}`}
          aria-controls="home-navigation"
          aria-expanded={navOpen === true ? true : false}
          onClick={() => {
            if (navOpen === true) {
              setNavOpen(false);
              document.body.style.overflow = "unset";
            } else {
              setNavOpen(true);
              document.body.style.overflow = "hidden";
            }
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/nav-menu.svg" alt="menu" />
        </button>
        <nav
          className={styles.navLinks}
          aria-hidden={navOpen === true ? false : true}
          id="home-navigation"
          aria-label="navigation links for the home page"
        >
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
      <main>
        <section
          id="hero"
          aria-label="company hero introduction"
          className={styles.hero}
        >
          <div className={styles.heroContainer}>
            <h1>
              Your Issues In Sight.
              <br /> At All Times.
            </h1>
            <p>
              Powerful error tracking and monitoring for software applications.
              Trusted by over 4,000 startups.
            </p>
            <Image
              src="/images/macbook.png"
              width={753}
              height={445}
              alt="prolog application being used on a macbook pro"
              priority={true}
            ></Image>
          </div>
        </section>

        <section
          id="company-list"
          aria-label="description of companies that use ProLog"
          className={styles.companies}
        >
          <div className={styles.companiesContainer}>
            <p>Join 4,000+ companies using Prolog</p>
            <ul
              className={styles.companyList}
              aria-label="list of companies that use prolog"
            >
              {companyList.map((company) => (
                <li key={company.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={company.icon}
                    alt={`Logo for the ${company.name} logo`}
                  ></img>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="testimonials"
          aria-label="Customer testimonials"
          className={styles.testimonials}
        >
          <div className={styles.testimonialsTitle}>
            <h2>Don&#39;t Only Trust Our Words</h2>
            <p>Our customers around the globe share their opinions.</p>
          </div>

          <Testimonials testimonials={customerList} />
        </section>
      </main>
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
