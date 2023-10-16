import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

export enum ButtonColor {
  primary = "primary",
  error = "error",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "empty-gray",
}

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xlg = "xlg",
}

export enum ButtonIcon {
  none = "none",
  only = "only",
  trailing = "trailing",
  leading = "leading",
}

type ButtonProps = {
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: ButtonIcon;
};

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps,
) {
  const { color, size, icon, ...buttonProps } = props;
  const buttonColor = color === undefined ? ButtonColor.primary : color;
  const buttonSize = size === undefined ? ButtonSize.md : size;
  const buttonIcon = icon === undefined ? ButtonIcon.none : icon;

  return (
    <button
      className={classNames(
        styles.button,
        styles[buttonColor],
        styles[buttonSize],
        styles[buttonIcon],
      )}
      {...buttonProps}
    />
  );
}
