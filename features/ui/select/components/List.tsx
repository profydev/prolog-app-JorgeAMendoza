import { useEffect, useRef } from "react";
import type { Option } from "../Select";
import style from "./List.module.scss";

interface ListProps {
  groupName: string;
  options: Option[];
  selected: Option;
  setSelected: React.Dispatch<Option>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
}

export const List = ({
  groupName,
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
        `input[value="${selected.value}"]`,
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
          const targetOption = options.find(
            (option) => option.value === selectedValue,
          );

          setSelected(targetOption || ({} as Option));
          setIsOpen(false);
          break;
        }
      }
    };

    selectList?.addEventListener("keydown", handleKey);

    return () => {
      selectList?.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, setIsOpen, setSelected, selected, options]);

  return (
    <ul id={`${groupName}Id`} ref={list}>
      <>
        {options.map((option) => (
          <li
            className={style.selectOption}
            key={option.name}
            data-active={option.value === selected.value}
          >
            <label
              onMouseDown={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option.name}
              <input
                type="radio"
                name={groupName}
                value={option.value}
                onChange={() => {
                  setSelected(option);
                }}
                checked={option.value === selected.value}
              />
            </label>
          </li>
        ))}
      </>
    </ul>
  );
};
