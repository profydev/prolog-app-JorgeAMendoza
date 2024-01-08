import type { Level, Query, Status } from "@api/issues.types";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useRouter } from "next/router";
import { useGetIssues } from "../../api/use-get-issues";
import { Filter } from "../filter";
import { useFilter } from "../context/filter-context";
import styles from "./issue-list.module.scss";
import { IssueRow } from "./issue-row";
import { NoIssues } from "../no-issues/NoIssues";
import { useEffect } from "react";

export function IssueList() {
  const { status, level, projectName, setLevel, setStatus, setProjectName } =
    useFilter();
  const router = useRouter();

  useEffect(() => {
    const routerQuery = router.query;
    const status =
      "status" in routerQuery ? (routerQuery.status as Status) : null;
    const level = "level" in routerQuery ? (routerQuery.level as Level) : null;
    const projectName =
      "project" in routerQuery ? (routerQuery.project as string) : null;
    if (setStatus) setStatus(status);
    if (setLevel) setLevel(level);
    if (setProjectName) setProjectName(projectName);
  }, [router, setStatus, setLevel, setProjectName]);

  const page = Number(router.query.page || 1);
  const navigateToPage = (
    newPage: number,
    status: Status | null,
    level: Level | null,
    projectName: string | null,
  ) => {
    const query: Query = { page: newPage };
    if (status !== null) query.status = status;
    if (level !== null) query.level = level;
    if (projectName !== null) query.project = projectName;

    router.push({
      pathname: router.pathname,
      query: { ...query },
    });
  };

  const issuesPage = useGetIssues(
    page,
    status || "",
    level || "",
    projectName || "",
  );
  const projects = useGetProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );
  const { items, meta } = issuesPage.data || {};

  return (
    <div>
      <div className={styles.issueOptions}>
        <Filter navigateToPage={navigateToPage} />
      </div>
      {items && items.length === 0 ? (
        <div className={styles.noIssuesContainer}>
          <NoIssues navigateToPage={navigateToPage} />
        </div>
      ) : (
        <div className={styles.container}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headerRow}>
                <th className={styles.headerCell}>Issue</th>
                <th className={styles.headerCell}>Level</th>
                <th className={styles.headerCell}>Events</th>
                <th className={styles.headerCell}>Users</th>
              </tr>
            </thead>
            <tbody>
              {(items || []).map((issue) => (
                <IssueRow
                  key={issue.id}
                  issue={issue}
                  projectLanguage={projectIdToLanguage[issue.projectId]}
                />
              ))}
            </tbody>
          </table>
          <div className={styles.paginationContainer}>
            <div>
              <button
                className={styles.paginationButton}
                onClick={() =>
                  navigateToPage(page - 1, status, level, projectName)
                }
                disabled={page === 1}
              >
                Previous
              </button>
              <button
                className={styles.paginationButton}
                onClick={() =>
                  navigateToPage(page + 1, status, level, projectName)
                }
                disabled={page === meta?.totalPages}
              >
                Next
              </button>
            </div>
            <div className={styles.pageInfo}>
              Page{" "}
              <span className={styles.pageNumber}>{meta?.currentPage}</span> of{" "}
              <span className={styles.pageNumber}>{meta?.totalPages}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
