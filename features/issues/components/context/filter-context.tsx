import { createContext, useState, useContext } from "react";
import type { Status, Level } from "@api/issues.types";

interface FilterContextProps {
  status: Status | null;
  level: Level | null;
  projectName: string | null;
}

interface FilterActionContextProps {
  setStatus: React.Dispatch<React.SetStateAction<Status | null>>;
  setLevel: React.Dispatch<React.SetStateAction<Level | null>>;
  setProjectName: React.Dispatch<React.SetStateAction<string | null>>;
}

interface FilterContextProviderProps {
  children: React.ReactNode;
}

export const FilterContext = createContext<FilterContextProps>({
  status: null,
  level: null,
  projectName: null,
});
export const FilterActionContext =
  createContext<FilterActionContextProps | null>(null);

export const FilterContextProvider = ({
  children,
}: FilterContextProviderProps) => {
  const [status, setStatus] = useState<Status | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);

  return (
    <FilterActionContext.Provider
      value={{ setStatus, setLevel, setProjectName }}
    >
      <FilterContext.Provider value={{ status, level, projectName }}>
        {children}
      </FilterContext.Provider>
    </FilterActionContext.Provider>
  );
};

export const useFilter = () => {
  const filter = useContext(FilterContext);
  const filterActions = useContext(FilterActionContext);

  return { ...filter, ...filterActions };
};
