const { hash } = require('bcrypt');
const { it, expect } = require('@jest/globals');
const { auth } = require('../../../config');
const request = require('../../utils/request');
const userModel = require('../../../src/models/user');

const path = '/auth/me';

module.exports = () => {
  it('Should be able to retrieve my profile information', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const hashedPassword = await hash(password, auth.saltOrRounds);

    const { _id } = await userModel.create({
      firstName: 'Foo',
      lastName: 'Bar',
      email,
      password: hashedPassword,
      username: 'foobar'
    });

    const loginResponse = await request
      .post('/auth/login')
      .send({ email, password })
      .then();

    const { accessToken } = loginResponse.body;

    const { body } = await request
      .get(path)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        sub: expect.any(String)
      })
    );

    expect(body.sub).toBe(_id.toString());
  });

  it('Should fail if no Authorization headers was set', async () => {
    const { body } = await request
      .get(path)
      .expect('Content-Type', /json/)
      .expect(401);

    expect(body).toEqual(
      expect.objectContaining({
        error: expect.stringMatching(/Unauthorized/)
      })
    );
  });

  const bearerTokens = [
    {
      name: 'Valid JWT Token but not a user',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    },
    {
      name: 'Invalid JWT Token',
      token: 'invalid-authorization-token'
    }
  ];
  it.each(bearerTokens)(
    'Should fail if invalid Authorization header: ($name)',
    async ({ token }) => {
      const { body } = await request
        .get(path)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(401);

      expect(body).toEqual(
        expect.objectContaining({
          error: expect.stringMatching(/Unauthorized/)
        })
      );
    }
  );
};
