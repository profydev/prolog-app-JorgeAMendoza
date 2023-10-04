import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const navItems = [
  { title: "Docs", url: "#" },
  { title: "API", url: "#" },
  { title: "Help", url: "#" },
  { title: "Community", url: "#" },
];

export const Footer = () => {
  return (
    <footer>
      <p>{publicRuntimeConfig?.version}</p>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.title}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-small.svg" alt="" />
      </nav>
    </footer>
  );
};
