
describe("Login", () => {
    beforeEach(() => {
        cy.visit(`${Cypress.config().baseUrl}/login`);

        cy.get("body").within(() => {
            cy.get("div").should("contain.text", "Don't have an account? Sign up");
        });

        cy.get("div")
            .find("img")
            .should("be.visible")
            .should("have.attr", "alt")
            .should("contain", "iPhone with Instagram app");

        cy.get("form").within(() => {
            cy.get("input:first")
                .should("have.attr", "placeholder", "Email address")
                .type("vikram.silk@gmail.com");

            cy.get("input:last")
                .should("have.attr", "placeholder", "Password")
                .type("Vi654321");

            cy.get("button").should("contain.text", "Login").click();
        })

        cy.get("div")
            .find("img")
            .should("be.visible")
            .should("have.attr", "alt")
            .should("contain", "Instagram");
    });

    it("logs the user in and shows the dashboard and does basic checks around UI", () => {
        cy.get("body").within(() => {
            cy.get("div").should("contain.text", "vikramvi");
            cy.get("div").should("contain.text", "vikram jaiho");
            cy.get("div").should("contain.text", "Suggestions for you");
        })
    })
});