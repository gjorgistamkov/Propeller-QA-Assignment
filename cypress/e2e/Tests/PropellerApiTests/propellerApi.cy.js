describe('Propeller GraphQL API', () => {

  describe('Error Handling', () => {

    it('Handle invalid GraphQL query', () => {
      const query = `
          query {
            invalidField
          }
        `;

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.errors).to.exist;
        expect(response.body.errors[0].message).to.include('Cannot query field "invalidField"');

        //console.log('Handled invalid GraphQL query:', response.body.errors[0].message);
        cy.log('Handled invalid GraphQL query:', response.body.errors[0].message);
      });
    });

  });

});
