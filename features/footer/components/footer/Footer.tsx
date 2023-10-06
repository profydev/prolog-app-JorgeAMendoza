import getConfig from "next/config";
import style from "./footer.module.scss";

const { publicRuntimeConfig } = getConfig();

const navItems = [
  { title: "Docs", url: "#" },
  { title: "API", url: "#" },
  { title: "Help", url: "#" },
  { title: "Community", url: "#" },
];

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <nav aria-label="Footer navigation" className={style.nav}>
        <ul role="list">
          {navItems.map((item) => (
            <li key={item.title}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/logo-small.svg" alt="" className={style.logo} />

      <p className={style.version}>Version: {publicRuntimeConfig?.version}</p>
    </footer>
  );
};
