import Link from "next/link";
import { Button, ButtonColor } from "../button";
import style from "./contact-modal.module.scss";
import { useEffect, useRef } from "react";

interface ContactModalProps {
  closeModal: () => void;
}

export const ContactModal = ({ closeModal }: ContactModalProps) => {
  const modal = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const modalElement = modal.current;
    const handleKey = (event: KeyboardEvent) => {
      const modalButtons = document.querySelectorAll(
        "#modalButtons > *",
      ) as NodeListOf<HTMLElement>;
      switch (event.key) {
        case "Escape": {
          closeModal();
          break;
        }
        case "Tab": {
          if (event.shiftKey && document.activeElement === modalButtons[0]) {
            event.preventDefault();
            modalButtons[modalButtons.length - 1].focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === modalButtons[modalButtons.length - 1]
          ) {
            event.preventDefault();
            modalButtons[0].focus();
          }
          break;
        }
      }
    };

    modalElement?.addEventListener("keydown", handleKey);
    return () => {
      modalElement?.removeEventListener("keydown", handleKey);
    };
  }, [closeModal]);

  return (
    <section
      className={style.contactModal}
      data-testid="supportModal"
      ref={modal}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/mail.svg" alt="" className={style.icon} />

      <h2 className={style.title}>Contact Us Via EMail</h2>
      <p className={style.desc}>
        Any questions? Send us an email at prolog@profy.dev. We usually answer
        within 24 hours.
      </p>

      <div id="modalButtons" className={style.buttons}>
        <Button color={ButtonColor.gray} onClick={() => closeModal()}>
          Cancel
        </Button>
        <Link href="mailto:profysupport@prolog-app.com?subject=Support%20Request%20:&body=message%20goes%20here">
          Open Email App
        </Link>
      </div>
    </section>
  );
};
