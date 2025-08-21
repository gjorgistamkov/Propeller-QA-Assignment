describe('User Mutations', () => {

    it('Create a new user', () => {
      const query = `
      mutation {
        createUser(input: { name: "Test User", email: "testuser@example.com", username: "testuser" }) {
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

        const user = response.body.data.createUser;
        expect(user).to.have.property('id');
        expect(user).to.have.property('name', 'Test User');
        expect(user).to.have.property('email', 'testuser@example.com');
        expect(user).to.have.property('username', 'testuser');

        expect(user.id).to.be.a('string').and.to.not.be.empty;
        expect(user.name).to.be.a('string').and.to.not.be.empty;
        expect(user.email).to.be.a('string').and.to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect(user.username).to.be.a('string').and.to.not.be.empty;


        //console.log('Created user:', user);
        cy.log('Created user:', user);
      });
    });

    it('Update an existing user', () => {
      const query = `
      mutation {
        updateUser(id: 1, input: { name: "Updated User", email: "updated@example.com", username: "UPdaUser" }) {
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

        const user = response.body.data.updateUser;
        expect(user).to.have.property('id', '1');
        expect(user).to.have.property('name', 'Updated User');
        expect(user).to.have.property('email', 'updated@example.com');
        expect(user).to.have.property('username', 'UPdaUser');

        expect(user.id).to.be.a('string').and.to.not.be.empty;
        expect(user.name).to.be.a('string').and.to.not.be.empty;
        expect(user.email).to.be.a('string').and.to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect(user.username).to.be.a('string').and.to.not.be.empty;

        //console.log('Updated user:', user);
        cy.log('Updated user:', user);
      });
    });


    it('Delete a user', () => {
      const query = `
      mutation {
        deleteUser(id: 1)
      }
    `;

      cy.request({
        method: 'POST',
        url: 'https://graphqlzero.almansi.me/api',
        headers: { 'Content-Type': 'application/json' },
        body: { query },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.deleteUser).to.eq(true);


        //console.log('User deleted successfully');
        cy.log('User deleted successfully');
      });
    });


  });