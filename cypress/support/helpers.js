export const validateUser = (user) => {
  expect(user).to.have.property('id').that.is.a('string').and.not.empty;
  expect(user).to.have.property('name').that.is.a('string').and.not.empty;
  expect(user).to.have.property('email')
    .that.is.a('string')
    .and.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

export const validateAlbums = (albums) => {
  expect(albums).to.have.property('data').that.is.an('array');
};
