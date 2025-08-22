import { validateUser, validateUsers, validateAlbum, validateAlbums } from "../../../../support/helpers";

describe('Users Errors', () => {
    it('Handle invalid mutation input', () => {
        const query = `
    mutation {
      createUser(input: { name: "", email: "invalidemail" }) {
        id
        name
      }
    }
  `;

        cy.graphql(query, {}, { failOnStatusCode: false, returnFullResponse: true }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.errors, 'GraphQL errors should exist').to.exist;

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

        cy.graphql(query, {}, { failOnStatusCode: false, returnFullResponse: true }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.errors, 'No GraphQL errors expected').to.be.undefined;

            const updatedUser = response.body.data.updateUser;

            expect(updatedUser, 'Updated user object').to.be.an('object');
            expect(updatedUser.id, 'Updated user id').to.be.null;
            expect(updatedUser.name, 'Updated user name').to.equal('Non Existent User');

            cy.log('Handled non-existent user in mutation:', JSON.stringify(response.body.errors));
        });
    });

    it('Handles query with incorrect syntax', () => {
        const query = `
    query {
      users {
        data {
          id
          name
  `; // missing closing braces 

        cy.graphql(query, {}, { failOnStatusCode: false, returnFullResponse: true }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.errors, 'GraphQL errors should exist').to.exist;
            expect(response.body.errors[0].message, 'Error message should mention syntax error').to.include('Syntax Error');

            cy.log('Handled incorrect syntax in query:', response.body.errors.message);
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

        cy.graphql(query, {}, { failOnStatusCode: false, returnFullResponse: true }).then((response) => {
            expect(response.status).to.eq(400);

            expect(response.body, 'Response body').to.have.property('errors').that.is.an('array').and.is.not.empty;

            const errorMessage = response.body.errors[0].message;

            cy.log('Handled query with wrong parameters:', errorMessage);
        });
    });


});