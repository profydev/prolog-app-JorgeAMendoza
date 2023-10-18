describe("landing page - support modal", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="supportButton"]').as("supportButton");
  });

  it("support modal can be opened", () => {
    cy.get("@supportButton").click();
    cy.get('[data-testid="supportModal"]').should("exist");
  });

  it("support modal can be closed with cancel button", () => {
    cy.get("@supportButton").click();
    cy.get('[data-testid="supportModal"]').should("exist");
    cy.get('[data-testid="supportModal"]').find("button").click();
    cy.get('[data-testid="supportModal"]').should("not.exist");
  });

  it("support modal link opens the client email application", () => {
    cy.get("@supportButton").click();
    cy.get('[data-testid="supportModal"]').should("exist");
    cy.get('[data-testid="supportModal"]')
      .find("a")
      .should(
        "have.attr",
        "href",
        "mailto:profysupport@prolog-app.com?subject=Support%20Request%20:&body=message%20goes%20here",
      );
  });
});
