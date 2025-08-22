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


            validateUser(user);

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

            expect(user, 'Updated user object').to.be.an('object').and.not.be.null;

            expect(user).to.have.property('id').that.is.a('string').and.equals('1');

            validateUser(user);


            expect(user.name, 'Name matches update input').to.equal('Updated User');
            expect(user.email, 'Email matches update input').to.equal('updated@example.com');
            expect(user.username, 'Username matches update input').to.equal('UPdaUser');


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
            expect(data, 'Response data').to.have.property('deleteUser', true);

            cy.log('User delete mutation returned true (API simulated deletion)');
        });
    });


});