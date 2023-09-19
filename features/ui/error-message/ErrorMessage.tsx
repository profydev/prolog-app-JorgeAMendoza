import style from "./error-message.module.scss";

interface ErrorMessageProps {
  message: string;
  reload: () => void;
}

export const ErrorMessage = ({ message, reload }: ErrorMessageProps) => {
  return (
    <div className={style.errorMessage}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/alert-circle.svg" alt="" />

      <p>{message}</p>

      <button type="button" onClick={() => reload()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        Try again <img src="/icons/arrow-right.svg" alt="" />
      </button>
    </div>
  );
};
