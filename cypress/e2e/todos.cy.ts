describe("Todo Operations", () => {
  beforeEach(() => {
    const uniqueUser = {
      username: "todotest" + Date.now(),
      password: "TestPass123",
    };

    cy.visit("/");
    cy.contains("Register here").click();
    cy.get('input[name="username"]').type(uniqueUser.username);
    cy.get('input[name="password"]').type(uniqueUser.password);
    cy.get('input[name="confirmPassword"]').type(uniqueUser.password);
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/todo-app");
  });

  it("should add a new todo", () => {
    const todoText = "Test Todo " + Date.now();

    cy.contains("Låg").click();
    cy.get('input[placeholder="Lägg till en uppgift..."]').type(todoText);
    cy.get('button[type="submit"]').click();

    cy.contains(todoText).should("be.visible");
  });
});
