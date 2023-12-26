import { useState } from "react";
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
}: SelectProps) => {
  const [value, setValue] = useState<string>(defaultSelected?.value || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (isOpen === false) return;
    setIsOpen(false);
  });
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
      </button>
      <ul id={`${groupName}Id`}>
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
