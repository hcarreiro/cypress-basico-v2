/// <reference types="Cypress" />

// suíte de teste
describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach( function() {

        // para execução antes de cada caso de teste (cada it)
        it('verifica o título da aplicação', function() {
            cy.visit('./src/index.html');
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
        })
    })

    // caso de teste
    it('preenche os campos obrigatórios e envia o formulário', function() {
        
    })
})