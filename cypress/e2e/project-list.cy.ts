import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(capitalize(mockProjects[index].status));
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
  });
});

describe("Project list - Error", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });
  it("error message displayed on failed request", () => {
    // intercept request with error
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      body: {},
      statusCode: 400,
    }).as("getProjectsWithError");

    cy.wait(7000);

    cy.get("main").contains(
      "There was a problem while loading the project data",
    );
  });

  it("data is successfully retrieved after inital error, data is displayed", () => {
    // intercept request with error
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      body: {},
      statusCode: 400,
    }).as("getProjectsWithError");

    cy.wait(7000);

    cy.get("main").contains(
      "There was a problem while loading the project data",
    );

    // intercept request with data
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    cy.get("main").contains("Try again").click();

    cy.wait("@getProjects");

    // check that data is displayed
    cy.get("main").find("li").should("have.length", 3);
  });
});
