import { createAlbum, updateAlbum, deleteAlbum, validateAlbum, validateAlbums } from '../../../../support/helpers';

describe('Albums Mutations', () => {

  it('Create a new album', () => {
    createAlbum({ title: 'New Album', userId: 1 }).then(album => {
      validateAlbum(album);
      expect(album.title).to.equal('New Album');
      expect(album.user).to.have.property('id', '1');
      cy.log('Created album:', album);
    });
  });


  it('Update an existing album', () => {
    updateAlbum(1, { title: 'Updated Album' }).then(album => {
      validateAlbum(album);
      expect(album).to.have.property('id', '1');
      expect(album.title).to.equal('Updated Album');
      cy.log('Updated album:', album);
    });
  });



  it('Delete Album', () => {
    const ALBUM_ID_TO_DELETE = 1;

    deleteAlbum(ALBUM_ID_TO_DELETE).then(deleted => {
      expect(deleted).to.be.true;
      cy.log('Album deleted successfully');


//Deletion check
/*
      cy.graphql(`
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
    `).then(response => {
        const albums = response.albums.data;
        const albumExists = albums.some(album => album.id === ALBUM_ID_TO_DELETE.toString());
        expect(albumExists, `Album with ID ${ALBUM_ID_TO_DELETE} should NOT be present after deletion`).to.be.false;
      });
      */
    });
  });



});