import { Level, Status } from "@api/issues.types";
import { useFilter } from "../context/filter-context";
import { useEffect, useState } from "react";
import styles from "./filter.module.scss";
import { Select } from "@features/ui";

interface FilterProps {
  navigateToPage: (
    newPage: number,
    status: Status,
    Level: Level,
    projectName: string,
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
            if (setStatus) setStatus(option as Status);
            navigateToPage(1, option as Status, level, projectName);
          }}
          ariaText="Filter status by 'unresolved' or 'resolved'"
          groupName="issueStatusFilter"
          placeholder="State"
          hasEmpty={true}
          defaultSelected={
            status === "open"
              ? StatusOptions[0]
              : status === "resolved"
              ? StatusOptions[1]
              : undefined
          }
        />
      </div>
      <div className={styles.filterSelect}>
        <Select
          options={LevelOptions}
          action={(option) => {
            if (setLevel) setLevel(option as Level);
            navigateToPage(1, option as Status, level, projectName);
          }}
          ariaText="Filter status by 'error', 'warning', or 'info'"
          groupName="issueLevelFilter"
          placeholder="Level"
          hasEmpty={true}
          defaultSelected={
            level === "error"
              ? StatusOptions[0]
              : level === "warning"
              ? StatusOptions[1]
              : level === "info"
              ? StatusOptions[2]
              : undefined
          }
        />
      </div>
      <label aria-label="Filter by project name" className={styles.filterInput}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/search.svg" alt="" />
        <input
          type="text"
          maxLength={25}
          onChange={(e) => setName(e.target.value)}
          value={name}
          data-cy="issueProjectNameFilter"
          placeholder="Project Name"
        />
      </label>
    </form>
  );
}
