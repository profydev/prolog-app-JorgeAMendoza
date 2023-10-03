import classNames from "classnames";
import style from "./loading.module.scss";

export enum LoadingSize {
  sm = "sm",
  md = "md",
  lg = "lg",
}

type LoadingProps = {
  size?: LoadingSize;
};

export const Loading = ({ size = LoadingSize.md }: LoadingProps) => {
  return (
    <div
      data-testid="loading"
      className={classNames(style.loading, style[size])}
    ></div>
  );
};
