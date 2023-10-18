import Link from "next/link";
import { Button, ButtonColor } from "../button";
import style from "./contact-modal.module.scss";

interface ContactModalProps {
  closeModal: () => void;
}

export const ContactModal = ({ closeModal }: ContactModalProps) => {
  return (
    <div className={style.contactModal} data-testid="supportModal">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/mail.svg" alt="" />

      <p>Contact Us Via Mail</p>
      <p>
        Any questions? Send us an email at prolog@profy.dev. We usually answer
        within 24 hours.
      </p>

      <div>
        <Button color={ButtonColor.gray} onClick={() => closeModal()}>
          Cancel
        </Button>
        <Link href="mailto:profysupport@prolog-app.com?subject=Support%20Request%20:&body=message%20goes%20here">
          Open Email App
        </Link>
      </div>
    </div>
  );
};
