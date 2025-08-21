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

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
      }).then((response) => {
        expect(response.status).to.eq(200);

        const album = response.body.data.createAlbum;
        expect(album).to.have.property('id');
        expect(album).to.have.property('title', 'New Album');
        expect(album.id).to.be.a('string').and.to.not.be.empty;
        expect(album.title).to.be.a('string').and.to.not.be.empty;

        expect(album.user).to.have.property('id', '1');
        expect(album.user).to.have.property('name');
        expect(album.user.id).to.be.a('string').and.to.not.be.empty;
        expect(album.user.name).to.be.a('string').and.to.not.be.empty;



        //console.log('Created album:', album);
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

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
      }).then((response) => {
        expect(response.status).to.eq(200);

        const album = response.body.data.updateAlbum;
        expect(album).to.have.property('id', '1');
        expect(album).to.have.property('title', 'Updated Album');
        expect(album.id).to.be.a('string').and.to.not.be.empty;
        expect(album.title).to.be.a('string').and.to.not.be.empty;


        //console.log('Updated album:', album);
        cy.log('Updated album:', album);
      });
    });

    it('Delete an album', () => {
      const query = `
        mutation {
          deleteAlbum(id: 1)
        }
      `;

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.deleteAlbum).to.eq(true);

        //console.log('Album deleted successfully');
        cy.log('Album deleted successfully');
      });
    });

  });