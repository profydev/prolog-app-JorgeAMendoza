import { useEffect, useRef } from "react";
import type { option } from "../Select";

interface ListProps {
  groupName: string;
  hasEmpty: boolean;
  options: option[];
  value: string;
  setValue: (value: string) => void;
  action: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const List = ({
  groupName,
  hasEmpty,
  options,
  value,
  setValue,
  action,
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
  }, [isOpen, setIsOpen, value]);

  return (
    <ul id={`${groupName}Id`} ref={list}>
      {hasEmpty ? (
        <>
          {[{ value: "", name: "---" }].concat(options).map((option) => (
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
  );
};
