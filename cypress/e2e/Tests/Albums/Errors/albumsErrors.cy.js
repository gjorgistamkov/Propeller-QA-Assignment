describe('Albums Errors', () => {
    it('Handle non-existent album in mutation', () => {
        const query = `
    mutation {
      updateAlbum(id: 999999, input: { title: "Non Existent Album" }) {
        id
        title
      }
    }
  `;

        cy.graphql(query, {}, { failOnStatusCode: false, returnFullResponse: true }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.errors, 'No GraphQL errors expected').to.be.undefined;

            const album = response.body.data.updateAlbum;

            expect(album, 'Updated album object').to.be.an('object');
            expect(album.id, 'Album id should be null').to.be.null;
            expect(album.title, 'Album title should be null').to.be.string("Non Existent Album");

            cy.log('Handled non-existent album in mutation:', JSON.stringify(response.body.errors));
        });
    });


    it('User albums missing required fields (id or title)', () => {
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

            expect(users, 'Users array').to.be.an('array').and.not.empty;

            users.forEach((user, userIndex) => {
                expect(user.albums.data, `User ${userIndex} albums`).to.be.an('array');

                user.albums.data.forEach((album, albumIndex) => {
                    expect(album, `User ${userIndex} Album ${albumIndex}`).to.be.an('object');
                    expect(album).to.have.property('id').that.is.a('string').and.not.empty;
                    expect(album).to.have.property('title').that.is.a('string').and.not.empty;
                });
            });
        });
    });


    it('Users with empty albums array are handled correctly', () => {
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

            expect(users, 'Users array').to.be.an('array').and.not.empty;

            const usersWithEmptyAlbums = users.filter(user => Array.isArray(user.albums.data) && user.albums.data.length === 0);

            usersWithEmptyAlbums.forEach((user, index) => {
                expect(user, `User ${index}`).to.have.property('id').that.is.a('string').and.not.empty;
                expect(user.albums.data, `User ${index} albums`).to.be.an('array').that.is.empty;
            });

            cy.log(`Found ${usersWithEmptyAlbums.length} users with empty albums array.`);
        });
    });


    it('Albums with excessively long titles', () => {
        const MAX_TITLE_LENGTH = 100;

        const query = `
    query {
      users {
        data {
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

            expect(users, 'Users array').to.be.an('array').and.not.empty;

            users.forEach((user, userIndex) => {
                expect(user.albums.data, `User ${userIndex} albums`).to.be.an('array');

                user.albums.data.forEach((album, albumIndex) => {
                    expect(album.title, `User ${userIndex} Album ${albumIndex} title`).to.be.a('string');
                    expect(album.title.length, `User ${userIndex} Album ${albumIndex} title length`).to.be.lte(MAX_TITLE_LENGTH);
                });
            });
        });
    });



    it('Albums have unique IDs within each user', () => {
        const query = `
    query {
      users {
        data {
          id
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

            expect(users, 'Users array').to.be.an('array').and.not.empty;

            users.forEach((user, idx) => {
                expect(user.albums.data, `User ${idx} albums`).to.be.an('array');
                const albumIds = user.albums.data.map(album => album.id);
                const uniqueAlbumIds = new Set(albumIds);

                expect(albumIds.length, `User ${idx} number of albums`).to.equal(uniqueAlbumIds.size);
            });
        });
    });



    it('Albums title contains only valid characters', () => {
        const query = `
    query {
      users {
        data {
          albums {
            data {
              title
            }
          }
        }
      }
    }
  `;

        const validTitleRegex = /^[\w\s\-.,!'":;?()&]+$/; // Adjust based on allowed characters

        cy.graphql(query).then((data) => {
            const users = data.users.data;

            expect(users, 'Users array').to.be.an('array').and.not.empty;

            users.forEach((user, userIdx) => {
                expect(user.albums.data, `User ${userIdx} albums`).to.be.an('array');

                user.albums.data.forEach((album, albumIdx) => {
                    expect(album.title, `User ${userIdx} Album ${albumIdx} title`).to.match(validTitleRegex);
                });
            });
        });
    });



});