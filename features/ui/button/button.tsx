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

type ButtonProps = {
  color?: ButtonColor;
  size?: ButtonSize;
};

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps,
) {
  const { color, size, ...buttonProps } = props;
  const buttonColor = color === undefined ? ButtonColor.primary : color;
  const buttonSize = size === undefined ? ButtonSize.md : size;
  console.log(buttonColor);
  return (
    <button
      className={classNames(
        styles.button,
        styles[buttonColor],
        styles[buttonSize],
      )}
      {...buttonProps}
    />
  );
}
