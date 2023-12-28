import { useEffect, useRef } from "react";
import type { option } from "../Select";
import style from "./List.module.scss";

interface ListProps {
  groupName: string;
  hasEmpty: boolean;
  options: option[];
  value: string;
  setValue: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const List = ({
  groupName,
  hasEmpty,
  options,
  value,
  setValue,
  isOpen,
  setIsOpen,
}: ListProps) => {
  const list = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const selectList = list.current;
    if (isOpen) {
      const selectedInput = selectList?.querySelector<HTMLInputElement>(
        `input[value="${value}"]`,
      );
      const firstInput = selectList?.querySelector<HTMLInputElement>(
        "input:first-of-type",
      );

      if (selectedInput) {
        selectedInput.focus();
      } else {
        firstInput?.focus();
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case "Tab":
        case "Enter":
        case "Escape": {
          const selectedValue =
            selectList?.querySelector<HTMLInputElement>("input:focus")?.value;
          setValue(selectedValue || "");
          setIsOpen(false);

          break;
        }
      }
    };

    selectList?.addEventListener("keydown", handleKey);

    return () => {
      selectList?.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, setIsOpen, value, setValue]);

  return (
    <ul id={`${groupName}Id`} ref={list}>
      {hasEmpty ? (
        <>
          {[{ value: "", name: "---" }].concat(options).map((option) => (
            <li
              className={style.selectOption}
              key={option.name}
              data-active={option.value === value}
              onMouseDown={() => {
                setValue(option.value);
                setIsOpen(false);
              }}
            >
              <label>
                {option.name}
                <input
                  type="radio"
                  name={groupName}
                  value={option.value}
                  onChange={() => {
                    setValue(option.value);
                  }}
                  checked={option.value === value}
                />
              </label>
            </li>
          ))}
        </>
      ) : (
        <>
          {options.map((option) => (
            <li
              className={style.selectOption}
              key={option.name}
              data-active={option.value === value}
            >
              <label
                onMouseDown={() => {
                  setValue(option.value);
                  setIsOpen(false);
                }}
              >
                {option.name}
                <input
                  type="radio"
                  name={groupName}
                  value={option.value}
                  onChange={() => {
                    setValue(option.value);
                  }}
                  checked={option.value === value}
                />
              </label>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};
