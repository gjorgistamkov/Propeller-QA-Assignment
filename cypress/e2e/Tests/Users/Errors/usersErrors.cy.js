describe ('Users Errors', () => {
    it('Handle invalid mutation input', () => {
      const query = `
          mutation {
            createUser(input: { name: "", email: "invalidemail" }) {
              id
              name
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
        expect(response.status).to.eq(400);
        expect(response.body.errors).to.exist;

        //console.log('Handled invalid mutation input:', response.body.errors[0].message);
        cy.log('Handled invalid mutation input:', response.body.errors[0].message);
      });
    });

    it('Handle non-existent user in mutation', () => {
      const query = `
          mutation {
            updateUser(id: 999999, input: { name: "Non Existent User" }) {
              id
              name
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


        console.log('Handled non-existent user in mutation:', response.body.errors);
        cy.log('Handled non-existent user in mutation:', response.body.errors);
      });
    });


    it('Handles query with incorrect syntax', () => {
      const query = `
          query {
            users {
              data {
                id
                name
                
          `; // Missing closing brace

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.errors).to.exist;
        expect(response.body.errors[0].message).to.include('Syntax Error');

        //console.log('Handled incorrect syntax in query:', response.body.errors[0].message);
        cy.log('Handled incorrect syntax in query:', response.body.errors[0].message);
      });
    });

    it('Handles query with wrong parameters', () => {
      const query = `
          query {
            user(name: "") {
              id
              username
              email
              address {
                geo {
                  lat
                  lng
                }
              }
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
      expect(response.status).to.eq(400); 

      expect(response.body).to.have.property('errors').that.is.an('array').and.is.not.empty;

      const errorMessage = response.body.errors[0].message;

      //console.log('Handled query with wrong parameters:', errorMessage);
      cy.log('Handled query with wrong parameters:', errorMessage);
      });
    });

  });