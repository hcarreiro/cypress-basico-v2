/// <reference types="Cypress" />

// suíte de teste
describe('Central de Atendimento ao Cliente TAT', function() {

    const THREE_SECONDS_IN_MS = 3000;

    // para execução antes de cada caso de teste (cada it)
    beforeEach( function() {
        cy.visit('./src/index.html');
    });
    
    // caso de teste
    it('Verifica o título da aplicação', function() {
        cy.title()
          .should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    // Uso da biblioteca lodash para repedição de testes
    Cypress._.times(5, function() {

        // caso de teste
        it('Preenche os campos obrigatórios e envia o formulário', function() {
    
            // Uso da biblioteca lodash com cypress pra repetição de strings
            const longText = Cypress._.repeat("bla ble bli blo blu ", 15);
    
            // congela o relógio do navegador
            cy.clock();
    
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
    
            // avança o relógio em 3 segundos
            cy.tick(THREE_SECONDS_IN_MS);
    
            // validar se a mensagem desapareceu
            cy.get('.success').should('not.be.visible');
        });
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        
        const longText = Cypress._.repeat('da de di do du ', 15);

        // congela o relógio do navegador
        cy.clock();

        //preenchimento formulário
        cy.get('#firstName').type('Hildefonso');
        cy.get('#lastName').type('Carreiro');
        cy.get('#email').type('hildefonso@gmail'); // email com formatação inválida
        // Uso do invoke pra simular um Ctrl + V no campo
        cy.get('#open-text-area').type('Parabéns pelo conteúdo');
        
        // pegar um seletor por type
        // clicar no botão enviar
        cy.get('button[type="submit"]').click();

        // validar se a mensagem de erro para e-mail inválido está visível
        cy.get('.error').should('be.visible');

        // avança o relógio em 3 segundos
        cy.tick(THREE_SECONDS_IN_MS);

        // validar se a mensagem de erro para e-mail inválido desapareceu após 3 seg
        cy.get('.error').should('not.be.visible');

    });

    it('Exibe mensagem de erro quando o telefone aceitar caracteres não numericos', function() {
        
        // enviando texto inválido para o campo e validando se continua vazio
        cy.get('#phone').type('abc!@#_=-/').should('have.text', '');
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        // congela o relógio do navegador
        cy.clock();

        //preenchimento formulário
        cy.get('#firstName').type('Hildefonso');
        cy.get('#lastName').type('Carreiro');
        cy.get('#email').type('hildefonso@gmail.com');
        cy.get('#phone-checkbox').click();
        cy.get('#open-text-area').type("Parabéns pelo treinamento!");

        // pegar um seletor por type
        // clicar no botão enviar
        cy.get('button[type="submit"]').click();

        // validar se a mensagem de erro para e-mail inválido está visível
        cy.get('.error').should('be.visible');

        // avança o relógio em 3 segundos
        cy.tick(THREE_SECONDS_IN_MS);

        // validar se a mensagem de erro para e-mail inválido desapareceu após 3 seg
        cy.get('.error').should('not.be.visible');
    });

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {

        //preenchimento formulário, limpa o campo e validar se está vazio
        cy.get('#firstName').type('Hildefonso').clear().should('have.value', '');
        cy.get('#lastName').type('Carreiro').clear().should('have.value', '');
        cy.get('#email').type('hildefonso@gmail.com').clear().should('have.value', '');
        cy.get('#phone').type('22225577').clear().should('have.value', '');
    });

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        
        // congela o relógio do navegador
        cy.clock();

        // pegar um seletor por type
        // clicar no botão enviar
        cy.get('button[type="submit"]').click();

        // validar se a mensagem de erro para e-mail inválido está visível
        cy.get('.error').should('be.visible');

        // avança o relógio em 3 segundos
        cy.tick(THREE_SECONDS_IN_MS);

        // validar se a mensagem de erro para e-mail inválido desapareceu após 3 seg
        cy.get('.error').should('not.be.visible');
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

    it('marca o tipo de atendimento "Feedback"', function() {

        // seleciona e valida se o valor do item selecionado é o que quisemos selecionar
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', function() {
        
        // pego todos os radio buttons
        cy.get('input[type="radio"]')
            // valido se temos realmente 3 radio buttons existentes
            .should('have.length', 3)
            // usamos o comando each para passar em cada um dos elementos 
            // onde ela terá uma função como argumento
            .each(function($radio) {
                // essa linha faz a seleção do radio button
                cy.wrap($radio).check();
                // essa linha valida se o radio button está selecionado
                cy.wrap($radio).should('be.checked');
            });
    });

    it('Marca ambos checkboxes, depois desmarca o último', function() {
        
        // usamos esse seletor para pegar todos os checkbox
        cy.get('input[type="checkbox"]')
            // damos um check em todos os checkbox
            .check()
            // pegamos o último checkbox encontrado
            .last()
            // realizamos um uncheck neste último checkbox encontrado
            .uncheck();
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
  
        // congela o relógio do navegador
        cy.clock();

        //preenchimento formulário
        cy.get('#firstName').type('Hildefonso');
        cy.get('#lastName').type('Carreiro');
        cy.get('#email').type('hildefonso@gmail.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type("Parabéns pelo treinamento!");

        // pegar um seletor por type
        // clicar no botão enviar
        cy.get('button[type="submit"]').click();

        // validar se a mensagem de erro para e-mail inválido está visível
        cy.get('.error').should('be.visible');

        // avança o relógio em 3 segundos
        cy.tick(THREE_SECONDS_IN_MS);

        // validar se a mensagem de erro para e-mail inválido desapareceu após 3 seg
        cy.get('.error').should('not.be.visible');
    })

    it('Seleciona um arquivo da pasta fixtures', function() {

        // damos um get no elemento de file upload
        cy.get('#file-upload')
            // verificamos que não há arquivo importado
            .should('not.have.value')
            // enviamos um select file com o caminho do arquivo
            .selectFile('./cypress/fixtures/example.json')
            // chamamos o should passando uma função de callback
            .should(function($input) {
                // validamos que o arquivo do índice 0 é o que foi importado
                expect($input[0].files[0].name).to.equal('example.json');
            });
    });

    it('Seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            // passando o parâmetro {action: "drag-drop"} o cypress simula um drat and drop
            .selectFile('./cypress/fixtures/example.json', {action: "drag-drop"})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json');
            });    
    });

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        // criado um alias para meu arquivo contido em fixture
        cy.fixture('example.json').as('sampleFile');

        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json');
            });
    });

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        // validamos que o link possui o atributo target blank que envia para outra aba
        cy.get('a').should('have.attr', 'target', '_blank');
    });

    it('Acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
        // removemos o atributo target, assim não abrimos em outra aba mas na mesma mesmo, funciona quando é no mesmo domínio o link
        cy.get('a')
            .invoke('removeAttr', 'target')
            .click();
        // valida se contém esse texto informado na página
        cy.contains('CAC TAT - Política de privacidade').should('be.visible');
        // valida se o título da página é o texto informado
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade');
    });

    it('Exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function() {
        // Dou um get no elemento da msg de sucesso
        cy.get('.success')
            // Validar se ela não está visível
            .should('not.be.visible')
            // Invocar e tornar ela visível
            .invoke('show')
            // Validar se ela está visível
            .should('be.visible')
            // Validar se ela contém o texto informado
            .and('contain', 'Mensagem enviada com sucesso.')
            // Invocar e tornar ela não visível
            .invoke('hide')
            // Validar se não está mais visível
            .should('not.be.visible')
        
        // Dou um get no elemento da msg de erro
        cy.get('.error')
            // Validar se ela não está visível
            .should('not.be.visible')
            // Invocar e tornar ela visível
            .invoke('show')
            // Validar se ela está visível
            .should('be.visible')
            // Validar se ela contém o texto informado
            .and('contain', 'Valide os campos obrigatórios!')
            // Invocar e tornar ela não visível
            .invoke('hide')
            // Validar se não está mais visível
            .should('not.be.visible')
    });
    
    it('Preenche a area de texto usando o comando invoke', function() {
        
        const longText = Cypress._.repeat('da de di do du ', 15);

        // congela o relógio do navegador
        cy.clock();

        //preenchimento formulário
        cy.get('#firstName').type('Hildefonso');
        cy.get('#lastName').type('Carreiro');
        cy.get('#email').type('hildefonso@gmail'); // email com formatação inválida
        // Uso do invoke pra simular um Ctrl + V no campo
        cy.get('#open-text-area').invoke('val', longText).should('have.value', longText);
        
        // pegar um seletor por type
        // clicar no botão enviar
        cy.get('button[type="submit"]').click();

        // validar se a mensagem de erro para e-mail inválido está visível
        cy.get('.error').should('be.visible');

        // avança o relógio em 3 segundos
        cy.tick(THREE_SECONDS_IN_MS);

        // validar se a mensagem de erro para e-mail inválido desapareceu após 3 seg
        cy.get('.error').should('not.be.visible');

    });

    it('Faz uma requisição HTTP', function() {

        // realização de uma request
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            // enviamos um "deveria" com uma função de callback contendo o reponse
            .should(function(response){
                // com a resposta da requisão desestruturamos o response
                const { status, statusText, body } = response
                // validamos se o status é 200
                expect(status).to.equal(200)
                // validamos se o texto do status é OK
                expect(statusText).to.equal('OK')
                // validamos se está incluso no body o texto 'CAC TAT'
                expect(body).to.include('CAC TAT')
            })

        
    })
});