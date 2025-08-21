describe('Users Queries', () => {

    it('List users', () => {
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
        body: { query },
      }).then((response) => {
        expect(response.status).to.eq(200);

        const users = response.body.data.users.data;
        expect(users).to.be.an('array');
        expect(users.length).to.be.greaterThan(0);

        const user = response.body.data.users.data[0];
        expect(user).to.have.property('id');
        expect(user).to.have.property('name');
        expect(user).to.have.property('email');

        expect(user.id).to.be.a('string').and.to.not.be.empty;
        expect(user.name).to.be.a('string').and.to.not.be.empty;
        expect(user.email).to.be.a('string').and.to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

        cy.log(`Fetched ${users.length} users.`);
        cy.log('First user details:', JSON.stringify(user));

        //console.log('Fetched users:', response.body.data.users.data);
        cy.log('Fetched users:', response.body.data.users.data);

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

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
      }).then((response) => {
        expect(response.status).to.eq(200);

        const user = response.body.data.user;
        expect(user).to.be.an('object');

        expect(user).to.have.property('id', '1');
        expect(user).to.have.property('name');
        expect(user).to.have.property('email');
        expect(user).to.have.property('username');

        expect(user.id).to.be.a('string').and.to.not.be.empty;
        expect(user.name).to.be.a('string').and.to.not.be.empty;
        expect(user.email).to.be.a('string').and.to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect(user.username).to.be.a('string').and.to.not.be.empty;



        //console.log('Fetched user:', user);
        cy.log('Fetched user:', user);

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

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
      }).then((response) => {
        expect(response.status).to.eq(200);


        const user = response.body.data.user;
        expect(user).to.be.an('object');
        expect(user.id).to.be.null;
        expect(user.name).to.be.null;

        //console.log('Fetched user with invalid ID:', user);
        cy.log('Fetched user with invalid ID:', user);

      });
    });


    it('Users with nested album data', () => {
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

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
      }).then((response) => {
        expect(response.status).to.eq(200);

        const users = response.body.data.users.data;
        expect(users.length).to.be.greaterThan(0);


        const user = users[0];
        expect(user).to.have.property('id');
        expect(user).to.have.property('name');
        expect(user).to.have.property('albums');


        expect(user.albums).to.be.an('object');
        expect(user.albums).to.have.property('data');
        expect(user.albums.data).to.be.an('array');
        expect(user.albums.data.length).to.be.greaterThan(0);

        //console.log('Users with nested album data:', JSON.stringify(users, null, 2));
        cy.log('Users with nested album data:', JSON.stringify(users, null, 2));
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

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
      }).then((response) => {
        expect(response.status).to.eq(200);

        const users = response.body.data.users.data;
        expect(users).to.be.an('array').and.to.have.length.greaterThan(0);

        // Try to find any user without albums
        const userWithoutAlbums = users.find(user =>
          Array.isArray(user.albums.data) && user.albums.data.length === 0
        );

        if (userWithoutAlbums) {
          // If found, check properties to ensure correctness
          expect(userWithoutAlbums).to.have.property('id').that.is.a('string').and.is.not.empty;
          expect(userWithoutAlbums).to.have.property('name').that.is.a('string').and.is.not.empty;
          expect(userWithoutAlbums.albums).to.have.property('data').that.is.an('array').that.is.empty;

          cy.log('User without albums:', userWithoutAlbums);
        } else {
          // No user without albums found, log this fact, test passes
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

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
      }).then((response) => {
        expect(response.status).to.eq(200);

        const users = response.body.data.users.data;
        expect(users).to.be.an('array').and.to.have.length.greaterThan(0);

        // Try to find any user with empty albums array
        const userWithoutAlbums = users.find(user => Array.isArray(user.albums.data) && user.albums.data.length === 0);

        // Assert that no user without albums was found
        expect(userWithoutAlbums).to.be.undefined;

        cy.log('Confirmed no users without albums exist.');
      });
    });


  });