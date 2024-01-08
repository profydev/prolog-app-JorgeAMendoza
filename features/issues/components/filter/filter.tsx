import { Level, Status } from "@api/issues.types";
import { useFilter } from "../context/filter-context";
import { useEffect, useState } from "react";
import styles from "./filter.module.scss";
import { Select } from "@features/ui";
import { Input } from "@features/ui";

interface FilterProps {
  navigateToPage: (
    newPage: number,
    status: Status | null,
    Level: Level | null,
    projectName: string | null,
  ) => void;
}

const StatusOptions = [
  { name: "Unresolved", value: "open" },
  { name: "Resolved", value: "resolved" },
];

const LevelOptions = [
  { name: "Error", value: "error" },
  { name: "Warning", value: "warning" },
  { name: "Info", value: "info" },
];

export function Filter({ navigateToPage }: FilterProps) {
  const { setStatus, setLevel, setProjectName, status, level, projectName } =
    useFilter();
  const [name, setName] = useState(projectName);

  useEffect(() => {
    setName(projectName);
  }, [projectName]);
  return (
    <form
      className={styles.filter}
      onSubmit={(e) => {
        e.preventDefault();
        if (setStatus && setLevel && setProjectName) {
          setStatus(status);
          setLevel(level);
          setProjectName(projectName);
        }
        navigateToPage(1, status, level, name);
      }}
    >
      <div className={styles.filterSelect}>
        <Select
          options={StatusOptions}
          action={(option) => {
            navigateToPage(1, option as Status, level, projectName);
          }}
          ariaText="Filter status by 'unresolved' or 'resolved'"
          groupName="issueStatusFilter"
          placeholder="State"
          hasEmpty={true}
          value={status}
        />
      </div>
      <div className={styles.filterSelect}>
        <Select
          options={LevelOptions}
          action={(option) => {
            navigateToPage(1, status, option as Level, projectName);
          }}
          ariaText="Filter status by 'error', 'warning', or 'info'"
          groupName="issueLevelFilter"
          placeholder="Level"
          hasEmpty={true}
          value={level}
        ></Select>
      </div>
      <Input
        maxLength={25}
        onChange={(e) => setName(e.target.value)}
        value={name || ""}
        data-cy="issueProjectNameFilter"
        placeholder="Project Name"
        ariaText="Filter by project name"
      />
    </form>
  );
}
