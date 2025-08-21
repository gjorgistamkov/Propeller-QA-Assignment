describe('Albums Queries', () => {

    it('List albums', () => {
      const query = `
        query {
          albums {
            data {
              id
              title
              user {
                id  
                name
                username
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

        const albums = response.body.data.albums.data;
        expect(albums).to.be.an('array');
        expect(albums.length).to.be.greaterThan(0);

        const album = albums[0];
        expect(album).to.have.property('id');
        expect(album).to.have.property('title');
        expect(album.id).to.be.a('string').and.to.not.be.empty;
        expect(album.title).to.be.a('string').and.to.not.be.empty;

        expect(album.user).to.have.property('id');
        expect(album.user).to.have.property('name');
        expect(album.user).to.have.property('username');

        expect(album.user.id).to.be.a('string').and.to.not.be.empty;
        expect(album.user.name).to.be.a('string').and.to.not.be.empty;
        expect(album.user.username).to.be.a('string').and.to.not.be.empty;

        //console.log('Fetched albums:', response.body.data.albums.data);
        cy.log('Fetched albums:', response.body.data.albums.data);
      });
    });


    it('Return albums for a specific user', () => {
      const query = `
        query {
          user(id: 1) {
            albums {
              data {
                id
                title
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

        const albums = response.body.data.user.albums.data;
        expect(albums.length).to.be.greaterThan(0);

        const album = albums[0];
        expect(album).to.have.property('id');
        expect(album).to.have.property('title');

        expect(album.id).to.be.a('string').and.to.not.be.empty;
        expect(album.title).to.be.a('string').and.to.not.be.empty;


        //console.log('Albums for user:', response.body.data.user.albums.data);
        cy.log('Albums for user:', response.body.data.user.albums.data);

      });
    });


    it('Album by valid ID', () => {
      const query = `
      query {
        album(id: 1) {
          id
          title
          user {
            id
            name
            username
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


        const album = response.body.data.album;
        expect(album).to.have.property('id', '1');
        expect(album).to.have.property('title');

        expect(album.id).to.be.a('string').and.to.not.be.empty;
        expect(album.title).to.be.a('string').and.to.not.be.empty;

        expect(album.user).to.have.property('id');
        expect(album.user).to.have.property('name');

        expect(album.user.id).to.be.a('string').and.to.not.be.empty;
        expect(album.user.name).to.be.a('string').and.to.not.be.empty;
        expect(album.user.username).to.be.a('string').and.to.not.be.empty;

        //console.log('Album:', album);
        cy.log('Album:', album);

      });
    });

    it('Album by invalid ID', () => {
      const query = `
        query {
          album(id: 999999) {
            id
            title 
            user {
              id
              name
            }
          }
        }`

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
      }).then((response) => {
        expect(response.status).to.eq(200);

        const album = response.body.data.album;

        expect(album).to.be.an('object');
        expect(album.id).to.be.null;
        expect(album.title).to.be.null;

        expect(album.user).to.be.an('object');
        expect(album.user.id).to.be.null;
        expect(album.user.name).to.be.null;


        //console.log('Album with invalid ID:', album);
        cy.log('Album with invalid ID:', album);
      });
    });


    it('Albums with nested user data', () => {
      const query = `
        query {
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
      `;

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
      }).then((response) => {
        expect(response.status).to.eq(200);

        const albums = response.body.data.albums.data;
        expect(albums.length).to.be.greaterThan(0);

        const album = albums[0];
        expect(album).to.have.property('id');
        expect(album).to.have.property('title');
        expect(album.id).to.be.a('string').and.to.not.be.empty;
        expect(album.title).to.be.a('string').and.to.not.be.empty;

        expect(album.user).to.have.property('id');
        expect(album.user).to.have.property('name');
        expect(album.user.id).to.be.a('string').and.to.not.be.empty;
        expect(album.user.name).to.be.a('string').and.to.not.be.empty;


        //console.log('Albums with nested user data:', albums);
        cy.log('Albums with nested user data:', albums);
      });
    });

  });