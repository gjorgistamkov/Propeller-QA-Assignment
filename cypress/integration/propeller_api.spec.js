const fetch = require('cross-fetch');

describe('GraphQL API Tests with Cypress', () => {
  it('Fetch list of users successfully', () => {
    const query = `
      query {
        users {
          data {
            id
            name
            email
          }
        }
      }
    `;

    cy.request({
      method: 'POST',
      url: 'https://graphqlzero.almansi.me/api',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        query: query,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.users.data.length).to.be.greaterThan(0);
      const user = response.body.data.users.data[0];
      expect(user).to.have.property('id');
      expect(user).to.have.property('name');
      expect(user).to.have.property('email');
    });
  });
});
