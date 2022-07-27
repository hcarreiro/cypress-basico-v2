/// <reference types="Cypress" />

// suíte de teste
describe('Central de Atendimento ao Cliente TAT', function() {

    // para execução antes de cada caso de teste (cada it)
    beforeEach( function() {
        cy.visit('./src/index.html');
    });
    
    // caso de teste
    it('Verifica o título da aplicação', function() {
        cy.title()
          .should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    // caso de teste
    it('Preenche os campos obrigatórios e envia o formulário', function() {

        const longText = 'No objeto de options que podemos passar ao comando .type(), é possível sobrescrever o delay padrão por outro valor (em milissegundos). Quando o valor 0 é passado, a digitação no campo acontece quase que de forma imediata. Portanto, experimente digitar um texto longo na área de texto, passando como segundo argumento do comando .type(), um objeto ({}) com a propriedade delay com valor 0.';

        //preenchimento formulário
        cy.get('#firstName').type('Hildefonso');
        cy.get('#lastName').type('Carreiro');
        cy.get('#email').type('hildefonso@gmail.com');

        // utilizando o {delay: 0} o cypress realiza o processo de escrita muito mais rápido que o default
        cy.get('#open-text-area').type(longText, { delay: 0 });
        
        // pegar um seletor por type
        // clicar no botão enviar
        //cy.get('button[type="submit"]').click();
        cy.contains('button', 'Enviar').click(); // usar o cy.contains pra buscar o texto do botão para identificar

        // validar se a mensagem de sucesso está visível
        cy.get('.success').should('be.visible');
    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        
        //preenchimento formulário
        cy.get('#firstName').type('Hildefonso');
        cy.get('#lastName').type('Carreiro');
        cy.get('#email').type('hildefonso@gmail'); // email com formatação inválida
        cy.get('#open-text-area').type("Parabéns pelo treinamento!");
        
        // pegar um seletor por type
        // clicar no botão enviar
        cy.get('button[type="submit"]').click();

        // validar se a mensagem de erro par e-mail inválido está visível
        cy.get('.error').should('be.visible');
    });

    it('Exibe mensagem de erro quando o telefone aceitar caracteres não numericos', function() {
        
        // enviando texto inválido para o campo e validando se continua vazio
        cy.get('#phone').type('abc!@#_=-/').should('have.text', '');
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        //preenchimento formulário
        cy.get('#firstName').type('Hildefonso');
        cy.get('#lastName').type('Carreiro');
        cy.get('#email').type('hildefonso@gmail.com');
        cy.get('#phone-checkbox').click();
        cy.get('#open-text-area').type("Parabéns pelo treinamento!");

        // pegar um seletor por type
        // clicar no botão enviar
        cy.get('button[type="submit"]').click();

        // validar se a mensagem de erro par e-mail inválido está visível
        cy.get('.error').should('be.visible');
    });

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {

        //preenchimento formulário, limpa o campo e validar se está vazio
        cy.get('#firstName').type('Hildefonso').clear().should('have.value', '');
        cy.get('#lastName').type('Carreiro').clear().should('have.value', '');
        cy.get('#email').type('hildefonso@gmail.com').clear().should('have.value', '');
        cy.get('#phone').type('22225577').clear().should('have.value', '');
    });

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        
        // pegar um seletor por type
        // clicar no botão enviar
        cy.get('button[type="submit"]').click();

        // validar se a mensagem de erro par e-mail inválido está visível
        cy.get('.error').should('be.visible');
    })

    it('Envia o formuário com sucesso usando um comando customizado', function() {
        // comando personalizado em support/commands.js
        cy.fillMandatoryFieldsAndSubmit();
    })

    it('Seleciona um produto (YouTube) por seu texto', function() {

        // faço um get no campo, depois dou um select pelo conteúdo, depois valido o valor, não o texto exibido
        cy.get('#product').select('YouTube').should('have.value', 'youtube');
    });

    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
        const produto = 'mentoria';
        cy.get('select').select(produto).should('have.value', produto);
    });

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product').select(1).should('have.value', 'blog');
    });
})