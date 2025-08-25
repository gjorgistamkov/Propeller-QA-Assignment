export const validateUser = (user) => {
  expect(user, 'User should be an object').to.be.an('object').and.not.be.null;

  expect(user).to.have.property('id').that.is.a('string').and.not.empty;
  expect(user).to.have.property('name').that.is.a('string').and.not.empty;

  expect(user).to.have.property('email').that.is.a('string').and.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format');

  expect(user).to.have.property('username').that.is.a('string').and.not.empty;
};

export const validateUsers = (users) => {
  expect(users, 'Users array').to.be.an('array').and.not.be.empty;

  users.forEach((user) => {
    validateUser(user);
  });
};

export const validateAlbum = (album) => {
  expect(album, 'Album object presence').to.be.an('object');

  expect(album).to.have.property('id').that.is.a('string').and.not.empty;
  expect(album).to.have.property('title').that.is.a('string').and.not.empty;

  if (album.user !== undefined && album.user !== null) {
    expect(album.user).to.be.an('object');
    expect(album.user).to.have.property('id').that.is.a('string').and.not.empty;
    expect(album.user).to.have.property('name').that.is.a('string').and.not.empty;
  }
};

export const validateAlbums = (albums) => {
  expect(albums).to.be.an('object');
  expect(albums).to.have.property('data').that.is.an('array');

  albums.data.forEach(validateAlbum);
};



export function createUser({ name, email, username }) {
  const mutation = `
    mutation {
      createUser(input: { name: "${name}", email: "${email}", username: "${username}" }) {
        id
        name
        email
        username
      }
    }
  `;
  return cy.graphql(mutation).then((data) => data.createUser);
}

export function updateUser(id, { name, email, username }) {
  const mutation = `
    mutation {
      updateUser(id: ${id}, input: { name: "${name}", email: "${email}", username: "${username}" }) {
        id
        name
        email
        username
      }
    }
  `;
  return cy.graphql(mutation).then((data) => data.updateUser);
}

export function deleteUser(id) {
  const mutation = `
    mutation {
      deleteUser(id: ${id})
    }
  `;
  return cy.graphql(mutation).then((data) => data.deleteUser);
}




export function createAlbum({ title, userId }) {
  const mutation = `
    mutation {
      createAlbum(input: { title: "${title}", userId: ${userId} }) {
        id
        title
        user {
          id
          name
        }
      }
    }
  `;
  return cy.graphql(mutation).then((data) => data.createAlbum);
}

export function updateAlbum(id, { title }) {
  const mutation = `
    mutation {
      updateAlbum(id: ${id}, input: { title: "${title}" }) {
        id
        title
      }
    }
  `;
  return cy.graphql(mutation).then((data) => data.updateAlbum);
}

export function deleteAlbum(id) {
  const mutation = `
    mutation {
      deleteAlbum(id: ${id})
    }
  `;
  return cy.graphql(mutation).then((data) => data.deleteAlbum);
}
