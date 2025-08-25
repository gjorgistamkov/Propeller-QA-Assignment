import { validateUser, validateUsers, validateAlbum, validateAlbums, createUser, updateUser, deleteUser } from '../../../../support/helpers';

describe('User Mutations', () => {


  it('Create a new user', () => {

    const testCreateData = {
      name: "Test User",
      email: "testuser@example.com",
      username: "testuser"
    };

    let createdUserId;
    createUser(testCreateData).then(user => {
      createdUserId = user.id;
      validateUser(user);

      expect(user.name).to.equal(testCreateData.name);
      expect(user.email).to.equal(testCreateData.email);
      expect(user.username).to.equal(testCreateData.username);

      cy.log('Created user:', JSON.stringify(user));
    });
  });



  it('Update an existing user', () => {
    const existingUserId = '2';
    const testUpdateData = {
      name: "Updated User",
      email: "updated@example.com",
      username: "UPdaUser"
    };

    updateUser(existingUserId, testUpdateData).then(user => {
      validateUser(user);

      expect(user.id).to.equal(existingUserId);
      expect(user.name).to.equal(testUpdateData.name);
      expect(user.email).to.equal(testUpdateData.email);
      expect(user.username).to.equal(testUpdateData.username);

      cy.log('Updated user:', JSON.stringify(user));
    });
  });


  it('Delete user', () => {
    const USER_ID_TO_DELETE = '3'; // ID of user to delete

    deleteUser(USER_ID_TO_DELETE).then(result => {
      expect(result).to.equal(true);
      cy.log(`Delete mutation returned true for user ID ${USER_ID_TO_DELETE}`);
/*
      cy.graphql(`
    query {
      users {
        data {
          id
          name
          email
          username
        }
      }
    }
  `).then(response => {
        const users = response.users.data;
        const userExists = users.some(user => user.id === USER_ID_TO_DELETE);
        expect(userExists, `User with ID ${USER_ID_TO_DELETE} should NOT be present after deletion`).to.be.false.;
      });
*/
    });
  

  });
});
