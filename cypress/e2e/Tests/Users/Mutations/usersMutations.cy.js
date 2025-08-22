import { validateUser, validateUsers, validateAlbum, validateAlbums } from '../../../../support/helpers';

describe('User Mutations', () => {

    it('Create a new user', () => {
        const mutation = `
    mutation {
      createUser(input: { name: "Test User", email: "testuser@example.com", username: "testuser" }) {
        id
        name
        email
        username
      }
    }
  `;

        cy.graphql(mutation).then((data) => {
            const user = data.createUser;

            // Use singular validateUser since this is a single user object
            validateUser(user);

            // Additional assertions checking that the returned data matches input
            expect(user.name, 'Name matches input').to.equal('Test User');
            expect(user.email, 'Email matches input').to.equal('testuser@example.com');
            expect(user.username, 'Username matches input').to.equal('testuser');

            cy.log('Created user:', JSON.stringify(user));
        });
    });



    it('Update an existing user', () => {
        const mutation = `
    mutation {
      updateUser(id: 1, input: { name: "Updated User", email: "updated@example.com", username: "UPdaUser" }) {
        id
        name
        email
        username
      }
    }
  `;

        cy.graphql(mutation).then((data) => {
            const user = data.updateUser;

            // Validate user object structure and types
            expect(user, 'Updated user object').to.be.an('object').and.not.be.null;

            // Validate user ID and other updated fields
            expect(user).to.have.property('id').that.is.a('string').and.equals('1');

            // Use helper to validate user fields thoroughly
            validateUser(user);

            // Additional specific assertions comparing to update input
            expect(user.name, 'Name matches update input').to.equal('Updated User');
            expect(user.email, 'Email matches update input').to.equal('updated@example.com');
            expect(user.username, 'Username matches update input').to.equal('UPdaUser');

            // Optionally, check trimmed and username pattern separately if needed
            expect(user.username.trim(), 'Trimmed username').to.have.length.greaterThan(0);
            expect(user.username, 'Username pattern').to.match(/^[a-zA-Z0-9_]{3,}$/);

            cy.log('Updated user:', JSON.stringify(user));
        });
    });


    it('Delete a user', () => {
        const mutation = `
    mutation {
      deleteUser(id: 1)
    }
  `;

        cy.graphql(mutation).then((data) => {
            // The deleteUser field should be true indicating simulated success
            expect(data, 'Response data').to.have.property('deleteUser', true);

            cy.log('User delete mutation returned true (API simulated deletion)');
        });
    });


});