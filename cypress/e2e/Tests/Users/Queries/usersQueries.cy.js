import { validateUser, validateUsers, validateAlbum, validateAlbums } from '../../../../support/helpers';

describe('Users Queries', () => {

    it('List users', () => {
        const query = `
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
    `;

        cy.graphql(query).then((data) => {
            
            const users = data.users.data;

            expect(users).to.be.an('array').and.have.length.greaterThan(0);

            validateUsers(users);

            cy.log(`Fetched ${users.length} users`);
        });
    });


    it('Single user by valid ID', () => {
        const query = `
    query {
      user(id: 1) {
        id
        name
        email
        username
      }
    }
  `;

        cy.graphql(query).then((data) => {
            const user = data.user;

            expect(user, 'User object').to.be.an('object').and.not.be.null;

            expect(user).to.have.property('id', '1');

            validateUser(user);

            expect(user.username, 'Username format').to.match(/^[a-zA-Z0-9_]{3,}$/);

            expect(user.username).to.equal('Bret');

            cy.log('Fetched user with ID 1:', JSON.stringify(user));
        });
    });



    it('Single user by invalid ID', () => {
        const query = `
    query {
      user(id: 999999) {
        id
        name
      }
    }
  `;

        cy.graphql(query).then((data) => {
            const user = data.user;

            expect(user, 'User object presence').to.be.an('object').and.not.be.null;

            expect(user, 'User keys').to.have.all.keys('id', 'name');
            expect(user.id, 'User id should be null').to.be.null;
            expect(user.name, 'User name should be null').to.be.null;
            

            cy.log('Fetched user with invalid ID:', JSON.stringify(user));
        });
    });



    it('Users with nested album data', () => {
        const query = `
    query {
      users {
        data {
          id
          name
          email
          username
          albums {
            data {
              id
              title
              user {
                id
                name
              }
            }
          }
        }
      }
    }
  `;

        cy.graphql(query).then((data) => {
            const users = data.users.data;

            expect(users, 'Users array').to.be.an('array').and.have.length.greaterThan(0);

            const user = users[0];

            validateUser(user);

            expect(user).to.have.property('albums').that.is.an('object');
            expect(user.albums).to.have.property('data').that.is.an('array').and.have.length.greaterThan(0);

            validateAlbums(user.albums);

            cy.log(`Fetched ${users.length} users with nested album data`);
            cy.log('First user with albums:', JSON.stringify(user, null, 2));
            cy.log(`First user's first album: ${JSON.stringify(user.albums.data[0], null, 2)}`);
            cy.log(`All users with albums: ${JSON.stringify(users, null, 2)}`);
        });
    });


    it('User with nested album data for a specific user ID', () => {
        const query = `
    query {
      user(id: 1) {
        id
        name
        email
        username
        albums {
          data {
            id
            title
            user {
              id
              name
            }
          }
        }
      }
    }
  `;

        cy.graphql(query).then((response) => {
            expect(response, 'Response object').to.have.property('user');

            const user = response.user;

            validateUser(user);

            expect(user, 'User albums property')
                .to.have.property('albums')
                .that.is.an('object');

            expect(user.albums, 'Albums data array')
                .to.have.property('data')
                .that.is.an('array');

            validateAlbums(user.albums);
            

            cy.log('User with nested albums:', JSON.stringify(user, null, 2));
        });
    });



    it('Users without nested album data', () => {
        const query = `
    query {
      users {
        data {
          id
          name
          albums {
            data {
              id
              title
            }
          }
        }
      }
    }
  `;

        cy.graphql(query).then((data) => {
            const users = data.users.data;

            expect(users, 'Users array').to.be.an('array').and.have.length.greaterThan(0);

            // Find any user whose albums array is empty
            const userWithoutAlbums = users.find((u) => u.albums?.data && u.albums.data.length === 0);

            if (userWithoutAlbums) {
                validateUser(userWithoutAlbums);

                expect(userWithoutAlbums.albums.data, 'Albums data should be empty').to.be.empty;

                cy.log('Found user without albums:', userWithoutAlbums);
            } else {
                cy.log('No users without albums found, which is acceptable.');
            }
        });
    });



    it('No users without nested album data', () => {
        const query = `
    query {
      users {
        data {
          id
          name
          email
          username
          albums {
            data {
              id
              title
              user {
                id
                name
              }
            }
          }
        }
      }
    }
  `;

        cy.graphql(query).then((data) => {
            const users = data.users.data;

            // Validate all users
            users.forEach(user => {
                validateUser(user);

                // Validate albums container presence and structure
                expect(user, 'User albums property').to.have.property('albums').that.is.an('object');
                expect(user.albums, 'Albums data array').to.have.property('data').that.is.an('array');

                // Validate each album in user's albums
                validateAlbums(user.albums);

                // Assert no user has empty albums array if you want strict "no empty" check:
                expect(user.albums.data.length, 'Albums array should not be empty').to.be.greaterThan(0);
            });

            cy.log(`Fetched ${users.length} users with nested album data`);
        });
    });

});