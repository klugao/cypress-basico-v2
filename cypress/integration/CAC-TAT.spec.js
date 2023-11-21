// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Testando o vscode para estudar colocando um texto longo pra caralho e eu não sei mais o que escrever para deixar isto aqui longo, não quero fazer um ctrl c e ctrl v para manter mais longo.'
    
        cy.get('#firstName').type('Eduardo Vinicios')
        cy.get('#lastName').type('Klug')
        cy.get('#email').type('eduardo.klug7@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email de formatação inválida', function() {
        cy.get('#firstName').type('Eduardo Vinicios')
        cy.get('#lastName').type('Klug')
        cy.get('#email').type('eduardo.klug7@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    
    it('Campo telefone continua vazio quando preenchido com valor não numérico', function() {
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Eduardo Vinicios')
        cy.get('#lastName').type('Klug')
        cy.get('#email').type('eduardo.klug7@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos, nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Eduardo Vinicios')
          .should('have.value', 'Eduardo Vinicios')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
            .type('Klug')
            .should('have.value', 'Klug')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('eduardo.klug7@gmail.com')
            .should('have.value', 'eduardo.klug7@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('47992002712')
            .should('have.value', '47992002712')
            .clear()
            .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem prencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customaizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('Seleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor', function() {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('be.checked')
    })

    it('Marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
    })

    it('Seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json')
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('Verifica que a política de privacidade abre em uma outra aba sem a necessidade de um clique', function() {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function() {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        
      cy.contains('Talking About Testing').should('be.visible')
    })
})