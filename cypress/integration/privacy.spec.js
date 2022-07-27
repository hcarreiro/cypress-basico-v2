/// <reference types="Cypress" />

describe('Página de Política de Privacidade', function() {
    
    beforeEach(function(){
        cy.visit('./src/privacy.html')
    });

    it.only('Testa a página da política de privavidade de forma independente', function() { 
          
        // valida se contém esse texto informado na página
        cy.contains('CAC TAT - Política de privacidade').should('be.visible');
        // valida se o título da página é o texto informado
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade');
    });
})