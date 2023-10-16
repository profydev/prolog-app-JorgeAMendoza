import React from "react";
import classNames from "classnames";
import styles from "./menu-item-button.module.scss";
import { Button, ButtonIcon } from "@features/ui";

type MenuItemProps = {
  className?: string;
  text: string;
  iconSrc: string;
  onClick: () => void;
  isCollapsed: boolean;
};

export function MenuItemButton({
  className,
  text,
  onClick,
  iconSrc,
  isCollapsed,
}: MenuItemProps) {
  return (
    <li className={classNames(styles.listItem, className)}>
      <Button
        type="button"
        className={styles["sidebar-button"]}
        onClick={onClick}
        icon={ButtonIcon.leading}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.icon}
          src={iconSrc}
          alt={`${text} icon`}
          data-collapsed={isCollapsed}
        />{" "}
        {!isCollapsed && text}{" "}
      </Button>
    </li>
  );
}
