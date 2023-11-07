import Link from "next/link";
import { Button, ButtonColor } from "../button";
import style from "./contact-modal.module.scss";

interface ContactModalProps {
  closeModal: () => void;
}

export const ContactModal = ({ closeModal }: ContactModalProps) => {
  return (
    <section className={style.contactModal} data-testid="supportModal">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/mail.svg" alt="" className={style.icon} />

      <h2 className={style.title}>Contact Us Via EMail</h2>
      <p className={style.desc}>
        Any questions? Send us an email at prolog@profy.dev. We usually answer
        within 24 hours.
      </p>

      <div className={style.buttons}>
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