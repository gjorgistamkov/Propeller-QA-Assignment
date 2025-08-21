describe ('Albums Errors', () => {
     it('Handle non-existent album in mutation', () => {
      const query = `
          mutation {
            updateAlbum(id: 999999, input: { title: "Non Existent Album" }) {
              id
              title
            }
          }
        `;

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.errors).to.be.undefined;

        //console.log('Handled non-existent album in mutation:', response.body.errors.message);
        cy.log('Handled non-existent album in mutation:', response.body.errors);
      });
    });

});