describe('Albums Mutations', () => {

    it('Create a new album', () => {
        const query = `
    mutation {
      createAlbum(input: { title: "New Album", userId: 1 }) {
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
            const album = data.createAlbum;

            expect(album, 'Created album object').to.be.an('object');
            expect(album).to.have.property('id').that.is.a('string').and.not.empty;
            expect(album).to.have.property('title', 'New Album');

            expect(album.user, 'Album user object').to.be.an('object');
            expect(album.user).to.have.property('id', '1');
            expect(album.user.id, 'User id').to.be.a('string').and.not.empty;
            expect(album.user).to.have.property('name').that.is.a('string').and.not.empty;

            cy.log('Created album:', album);
        });
    });


    it('Update an existing album', () => {
        const query = `
    mutation {
      updateAlbum(id: 1, input: { title: "Updated Album" }) {
        id
        title
      }
    }
  `;

        cy.graphql(query).then((data) => {
            const album = data.updateAlbum;

            expect(album, 'Updated album object').to.be.an('object');
            expect(album).to.have.property('id', '1');
            expect(album).to.have.property('title', 'Updated Album');
            expect(album.id, 'Album id').to.be.a('string').and.not.empty;
            expect(album.title, 'Album title').to.be.a('string').and.not.empty;

            cy.log('Updated album:', album);
        });
    });


    it('Delete an album', () => {
        const query = `
    mutation {
      deleteAlbum(id: 1)
    }
  `;

        cy.graphql(query).then((data) => {
            expect(data).to.have.property('deleteAlbum', true);

            cy.log('Album deleted successfully');
        });
    });


});