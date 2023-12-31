import { Level, Status } from "@api/issues.types";
import { useFilter } from "../context/filter-context";
import { useEffect, useState } from "react";
import styles from "./filter.module.scss";
import { Input } from "@features/ui";

interface FilterProps {
  navigateToPage: (
    newPage: number,
    status: Status,
    Level: Level,
    projectName: string,
  ) => void;
}

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
      <label
        aria-label="Filter status by 'unresolved' or 'resolved'"
        className={styles.filterSelect}
      >
        <select
          onChange={(e) => {
            const status = e.target.value as Status;
            if (setStatus) setStatus(status);
            navigateToPage(1, status, level, projectName);
          }}
          value={status}
          data-cy="issueStatusFilter"
          data-active={status !== ""}
        >
          <option value="">State</option>
          <option value="open">Unresolved</option>
          <option value="resolved">Resolved</option>
        </select>
      </label>

      <label
        aria-label="Filter level by 'error', 'warning', or 'info'"
        className={styles.filterSelect}
      >
        <select
          onChange={(e) => {
            const level = e.target.value as Level;
            if (setLevel) setLevel(level);
            navigateToPage(1, status, level, projectName);
          }}
          value={level}
          data-cy="issueLevelFilter"
          data-active={level !== ""}
        >
          <option value="">Level</option>
          <option value="error">Error</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </label>
      <Input
        maxLength={25}
        onChange={(e) => setName(e.target.value)}
        value={name}
        data-cy="issueProjectNameFilter"
        placeholder="Project Name"
        ariaText="Filter by project name"
      />
    </form>
  );
}
