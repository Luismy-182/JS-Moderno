///<reference types="cypress" />

describe('carga el home',()=>{
    it('carga la página principal',()=>{
        cy.visit('http://127.0.0.1:3000/index.html');
        cy.contains('[data-cy="titulo-proyecto"]','Administrador de Pacientes de Veterinaria');
        cy.get('[data-cy="titulo-proyecto"]').should('exist');
        //verifica que exista el elemento y contenga un texto
        cy.get('[data-cy="titulo-proyecto"]')
            .invoque('text')
            .should('equal','Administrador de Pacientes de Veterinaria')

        //verifica el texto de las citas
        cy.get('[data-cy="citas-heading"]')
            .invoque('text')
            .should('equal','No hay citas, comienza creando una')

        cy.get('[data-cy=citas-heading]')
        .invoque('text')
        .should('not.equal','mike')
    })
});