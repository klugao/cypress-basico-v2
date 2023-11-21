Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Eduardo Vinicios')
    cy.get('#lastName').type('Klug')
    cy.get('#email').type('eduardo.klug7@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})