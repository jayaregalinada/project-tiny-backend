const { hash } = require('bcrypt');
const { auth } = require('../../../config');
const userModel = require('../../../src/models/user');
const request = require('../../utils/request');

const path = '/auth/login';

module.exports = () => {
  it('Should be able to retrieve access token', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const hashedPassword = await hash(password, auth.saltOrRounds);
    await userModel.create({
      email,
      firstName: 'Foo',
      lastName: 'Bar',
      password: hashedPassword,
      username: 'foobar'
    });

    const { body } = await request
      .post(path)
      .send({ email, password })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String)
      })
    );
  });

  it('Should be able to say that the credential is invalid', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const hashedPassword = await hash(password, auth.saltOrRounds);

    await userModel.create({
      email,
      firstName: 'Foo',
      lastName: 'Bar',
      password: hashedPassword,
      username: 'foobar'
    });

    const { body } = await request
      .post(path)
      .send({
        email,
        password: 'invalid-password'
      })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(body).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });
};
