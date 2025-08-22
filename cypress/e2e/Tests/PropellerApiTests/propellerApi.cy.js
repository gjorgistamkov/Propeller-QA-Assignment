describe('Propeller GraphQL API', () => {

  describe('Error Handling', () => {

    it('Handle invalid GraphQL query', () => {
      const query = `
        query {
          invalidField
        }
      `;

      cy.graphql(query, {}, { failOnStatusCode: false, returnFullResponse: true }).then((response) => {
        expect(response.status).to.eq(400);

        expect(response.body.errors, 'GraphQL errors should exist').to.exist;
        expect(response.body.errors[0].message, 'Error message').to.include('Cannot query field "invalidField"');

        cy.log('Handled invalid GraphQL query:', response.body.errors.message);
      });
    });

  });

});
