import { useEffect, useRef, useState } from "react";
import style from "./select.module.scss";
import { useClickOutside } from "@features/hooks";

interface option {
  name: string;
  value: string;
}

interface SelectProps {
  options: option[];
  action: (value: string) => void;
  ariaText: string;
  groupName: string;
  defaultSelected?: option;
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
  options,
  defaultSelected,
  action,
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const list = useRef<HTMLUListElement>(null);
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (isOpen === false) return;
    setIsOpen(false);
  });

  useEffect(() => {
    const selectList = list.current;
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case "Escape": {
          setIsOpen(false);
          break;
        }
      }
    };

    selectList?.addEventListener("keydown", handleKey);

    return () => {
      selectList?.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

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
        {value === "" ? placeholder : value}
        {/* eslint-disable-next-line */}
        {error ? <img src="/icons/alert-circle.svg" alt="" /> : null}
      </button>
      {hintText ? <p className={style.hintText}>{hintText}</p> : null}
      {error && errorText ? <p>{errorText}</p> : null}
      <ul id={`${groupName}Id`} ref={list}>
        {hasEmpty ? (
          <>
            {[{ value: "", name: placeholder }]
              .concat(options)
              .map((option) => (
                <li key={option.name} data-active={option.value === value}>
                  <label>
                    {option.name}
                    <input
                      type="radio"
                      name={groupName}
                      value={option.value}
                      onChange={() => {
                        setValue(option.value);
                        action(option.value);
                      }}
                    />
                  </label>
                </li>
              ))}
          </>
        ) : (
          <>
            {options.map((option) => (
              <li key={option.name} data-active={option.value === value}>
                <label>
                  {option.name}
                  <input
                    type="radio"
                    name={groupName}
                    value={option.value}
                    onChange={() => {
                      setValue(option.value);
                      action(option.value);
                    }}
                    checked={option.value === value}
                  />
                </label>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};
