describe('Login functionality', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    it('Attempting to login without giving name does not let through to editor', function() {
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get('#popup').contains('Et voi kirjautua nimettömänä!')
    })

    it('Changing language changes text to English', function() {
        cy.get('#registration-language-toggle-button').click()
        cy.get('#popup').should('contain', 'Log in')
        
    })

    it('Attempting to login without giving name does not let through to editor (ENGLISH)', function() {
        cy.get('#registration-language-toggle-button').click()
        cy.get('#popup').contains('Log in').click(500)
        cy.get('#popup').contains('You can\'t login without a name!')
    })

    it('Attempting to login with name lets user through to editor', function() {
        cy.get('#registration-name-input').type('example')
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get('#popup').should('not.exist')
    })

    it('Attempting to login afterwards', function() {
        cy.get('#popup').contains('X').click(500)
        cy.get('#navbar').contains('Kirjaudu').click(500)
        cy.get('#registration-name-input').type('Jaakko')
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get('#navbar').should('contain', 'Jaakko')
    })

    it('Attempting to login afterwards (ENGLISH)', function() {
        cy.get('#popup').contains('X').click(500)
        cy.get('#navbar').contains('Switch to English').click(500)
        cy.get('#navbar').contains('Login').click(500)
        cy.get('#registration-name-input').type('Jaakko')
        cy.get('#popup').contains('Log in').click(500)
        cy.get('#navbar').should('contain', 'Jaakko')
    })

    it('Logout from editor', function() {
        cy.get('#registration-name-input').type('Jaakko')
        cy.get('#popup').contains('Kirjaudu').click(500)
        cy.get('#navbar').should('contain', 'Jaakko')
        cy.get('#navbar').contains('Kirjaudu ulos').click(500)
        cy.get('#navbar').should('contain', 'Kirjaudu')
    })

    it('Logout from editor (ENGLISH)', function() {
        cy.get('#popup').contains('Switch to Englis').click(500)
        cy.get('#registration-name-input').type('Jaakko')
        cy.get('#popup').contains('Log in').click(500)
        cy.get('#navbar').should('contain', 'Jaakko')
        cy.get('#navbar').contains('Log out').click(500)
        cy.get('#navbar').should('contain', 'Login')
    })
})