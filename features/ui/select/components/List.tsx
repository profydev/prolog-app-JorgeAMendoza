import { useEffect, useRef } from "react";
import type { option } from "../Select";
import style from "./List.module.scss";

interface ListProps {
  groupName: string;
  hasEmpty: boolean;
  options: option[];
  selected: string;
  setSelected: React.Dispatch<string>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
}

export const List = ({
  groupName,
  hasEmpty,
  options,
  selected,
  setSelected,
  isOpen,
  setIsOpen,
}: ListProps) => {
  const list = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const selectList = list.current;
    if (isOpen) {
      const selectedInput = selectList?.querySelector<HTMLInputElement>(
        `input[value="${selected}"]`,
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
          setSelected(selectedValue || "");
          setIsOpen(false);
          break;
        }
      }
    };

    selectList?.addEventListener("keydown", handleKey);

    return () => {
      selectList?.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, setIsOpen, setSelected, selected]);

  return (
    <ul id={`${groupName}Id`} ref={list}>
      {hasEmpty ? (
        <>
          {[{ value: "", name: "---" }].concat(options).map((option) => (
            <li
              className={style.selectOption}
              key={option.name}
              data-active={option.value === selected}
              onMouseDown={() => {
                setSelected(option.value);
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
                    setSelected(option.value);
                  }}
                  checked={option.value === selected}
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
              data-active={option.value === selected}
            >
              <label
                onMouseDown={() => {
                  setSelected(option.value);
                  setIsOpen(false);
                }}
              >
                {option.name}
                <input
                  type="radio"
                  name={groupName}
                  value={option.value}
                  onChange={() => {
                    setSelected(option.value);
                  }}
                  checked={option.value === selected}
                />
              </label>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};
