import { validateAlbum, validateAlbums, validateUser, validateUsers } from "../../../../support/helpers";

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

        cy.graphql(query).then((data) => {
            const albums = data.albums.data;

            // Assert albums array is present and not empty
            expect(albums, 'Albums array').to.be.an('array').and.have.length.greaterThan(0);

            // Use your existing helper to validate the albums container and all contained albums
            validateAlbums(data.albums);

            // Additionally, validate the first album’s user fields explicitly
            const album = albums[0];
            expect(album.user).to.have.property('username').that.is.a('string').and.not.empty;

            cy.log('Fetched albums:', albums);
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

        cy.graphql(query).then((data) => {
            const albums = data.user.albums.data;

            expect(albums, 'Albums array').to.be.an('array').and.have.length.greaterThan(0);

            // Use validateAlbums helper to validate the albums container and each album
            validateAlbums(data.user.albums);

            // Additional explicit checks for the first album's fields
            const album = albums[0];
            expect(album.id, 'Album id').to.be.a('string').and.not.be.empty;
            expect(album.title, 'Album title').to.be.a('string').and.not.be.empty;

            cy.log('Albums for user:', albums);
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

        cy.graphql(query).then((data) => {
            const album = data.album;

            expect(album, 'Album object').to.be.an('object');
            expect(album).to.have.property('id', '1');
            expect(album).to.have.property('title').that.is.a('string').and.not.empty;

            // Use your helper to validate album user object
            if (album.user) {
                expect(album.user).to.have.property('id').that.is.a('string').and.not.empty;
                expect(album.user).to.have.property('name').that.is.a('string').and.not.empty;
                expect(album.user).to.have.property('username').that.is.a('string').and.not.empty;
            }

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
    }
  `;

        cy.graphql(query).then((data) => {
            const album = data.album;

            expect(album, 'Album object presence').to.be.an('object');

            // Check that album's fields are null as expected for invalid ID
            expect(album.id, 'Album id should be null').to.be.null;
            expect(album.title, 'Album title should be null').to.be.null;

            // User object exists but all fields null
            expect(album.user, 'Album user object').to.be.an('object');
            expect(album.user.id, 'Album user id should be null').to.be.null;
            expect(album.user.name, 'Album user name should be null').to.be.null;

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

        cy.graphql(query).then((data) => {
            const albums = data.albums.data;

            expect(albums, 'Albums array').to.be.an('array').and.have.length.greaterThan(0);

            // Use your existing helper to validate the albums container and all contained albums
            validateAlbums(data.albums);

            // Additionally, validate the first album’s user fields explicitly
            const album = albums[0];
            expect(album.user).to.have.property('id').that.is.a('string').and.not.empty;
            expect(album.user).to.have.property('name').that.is.a('string').and.not.empty;

            cy.log('Albums with nested user data:', albums);
        });
    });

});