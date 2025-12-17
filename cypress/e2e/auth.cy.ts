describe("Authentication", () => {
  const testUser = {
    username: "testuser" + Date.now(),
    password: "TestPass123",
  };

  beforeEach(() => {
    cy.visit("/");
  });

  it("should register a new user", () => {
    cy.contains("Register here").click();
    cy.url().should("include", "/registrera");

    cy.get('input[name="username"]').type(testUser.username);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('input[name="confirmPassword"]').type(testUser.password);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/todo-app");
  });
});
