import { useEffect, useState } from "react";
import style from "./select.module.scss";
import { useClickOutside } from "@features/hooks";
import { List } from "./components/List";

export interface Option {
  name: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  action: (value: string) => void;
  ariaText: string;
  groupName: string;
  defaultSelected?: Option;
  hasEmpty?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: string;
  hintText?: string;
  error?: boolean;
  errorText?: string;
}

export const Select = ({
  action,
  options,
  defaultSelected,
  groupName,
  ariaText,
  placeholder = "Select",
  hasEmpty = false,
  label,
  icon,
  disabled,
  hintText,
  error,
  errorText,
}: SelectProps) => {
  const [value, setValue] = useState<string>(defaultSelected?.value || "");
  const [selected, setSelected] = useState<Option>(
    defaultSelected || ({} as Option),
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (isOpen === false) return;
    setIsOpen(false);
  });

  useEffect(() => {
    if (isOpen || value === selected.value) {
      return;
    }

    setValue(selected.value);
    action(selected.value);
  }, [isOpen, selected, value, action]);

  return (
    <div className={style.select} ref={ref}>
      {label ? <p>{label}</p> : null}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        role="combobox"
        aria-controls={`${groupName}Id`}
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="listbox"
        aria-label={ariaText}
        disabled={disabled}
      >
        {/* eslint-disable-next-line */}
        {icon ? <img src={icon} alt="" /> : null}
        {!selected.name || selected.value === "" ? placeholder : selected.name}
        {/* eslint-disable-next-line */}
        {error ? <img src="/icons/alert-circle.svg" alt="" /> : null}
      </button>
      {hintText ? <p className={style.hintText}>{hintText}</p> : null}
      {error && errorText ? <p>{errorText}</p> : null}
      <List
        groupName={groupName}
        options={hasEmpty ? [{ name: "---", value: "" }, ...options] : options}
        selected={selected}
        setSelected={setSelected}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};
