/// <reference types="Cypress" />

// suíte de teste
describe('Central de Atendimento ao Cliente TAT', function() {

    // caso de teste
    it('verifica o título da aplicação', function() {
        cy.visit('./src/index.html');
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    })
})