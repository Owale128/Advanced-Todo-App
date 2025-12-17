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

  it("should toggle todo as done", () => {
    const todoText = "Toggle Todo " + Date.now();

    cy.contains("Medium").click();
    cy.get('input[placeholder="Lägg till en uppgift..."]').type(todoText);
    cy.get('button[type="submit"]').click();

    cy.contains(todoText)
      .parent()
      .parent()
      .find('input[type="checkbox"]')
      .click();
    cy.contains(todoText).should("have.class", "line-through");
  });

  it("should delete a todo with confirmation", () => {
    const todoText = "Delete Todo " + Date.now();

    cy.contains("Hög").click();
    cy.get('input[placeholder="Lägg till en uppgift..."]').type(todoText);
    cy.get('button[type="submit"]').click();

    cy.contains(todoText).parent().parent().contains("x").click();
    cy.contains("Ta bort todo?").should("be.visible");

    cy.contains("Ta bort todo?")
      .parent()
      .contains("button", "Ta bort")
      .click();

    cy.contains(todoText).should("not.exist");
  });

  it("should cycle through priorities", () => {
    const todoText = "Priority Todo " + Date.now();

    cy.contains("Låg").click();
    cy.get('input[placeholder="Lägg till en uppgift..."]').type(todoText);
    cy.get('button[type="submit"]').click();

    cy.contains(todoText)
      .parent()
      .parent()
      .find('[title*="Prioritet"]')
      .click();
  });
});
