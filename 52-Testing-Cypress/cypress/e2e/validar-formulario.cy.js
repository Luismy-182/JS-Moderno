///<reference types="cypress" />


describe('validar el formulario', ()=>{
    it('Submit al formulairo',()=>{
        cy.visit('http://127.0.0.1:3000/index.html')
        cy.get('[data-cy="formulario"]')
        .submit();
    });
})