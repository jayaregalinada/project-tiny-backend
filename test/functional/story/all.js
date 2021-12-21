const { it, expect } = require('@jest/globals');
const storyModel = require('../../../src/models/story');
const request = require('../../utils/request');
const allStories = require('../../fixtures/story/all-stories');
const userModel = require('../../../src/models/user');

const path = '/stories';

module.exports = () => {
  it('Should return a response even if no stories yet', async () => {
    const { body } = await request
      .get(path)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        data: expect.any(Array)
      })
    );
  });

  it.each([
    {
      create: 5,
      expectedCount: 5,
      hasNextPage: false,
      name: 'Only 5 stories'
    },
    {
      create: 15,
      expectedCount: 15,
      hasNextPage: false,
      name: 'Only 15 stories'
    },
    {
      create: 30,
      expectedCount: 15,
      hasNextPage: true,
      name: 'Above the limit or 30 stories'
    }
  ])(
    'Should return multiple stories: $name',
    async ({ create, expectedCount, hasNextPage }) => {
      const user = await userModel.create({
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'email@example.com',
        password: 'password',
        username: 'foobar'
      });

      await storyModel.insertMany(allStories(create, user));

      const { body } = await request
        .get(path)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(body).toEqual(
        expect.objectContaining({
          data: expect.any(Array)
        })
      );

      expect(body.data).toHaveLength(expectedCount);
      expect(body.hasNextPage).toEqual(hasNextPage);
      expect(body.count).toEqual(create);
    }
  );

  it.each([
    {
      create: 16,
      expectedCount: 1,
      hasNextPage: false,
      page: 2
    },
    {
      create: 30,
      expectedCount: 15,
      hasNextPage: false,
      page: 2
    },
    {
      create: 40,
      expectedCount: 15,
      hasNextPage: true,
      page: 2
    },
    {
      create: 44,
      expectedCount: 14,
      hasNextPage: false,
      page: 3
    }
  ])(
    'Should expect $expectedCount stories on page $page when $create stories',
    async ({ create, expectedCount, hasNextPage, page }) => {
      const user = await userModel.create({
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'email@example.com',
        password: 'password',
        username: 'foobar'
      });

      await storyModel.insertMany(allStories(create, user));

      const { body } = await request
        .get(`${path}?page=${page}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(body).toEqual(
        expect.objectContaining({
          data: expect.any(Array)
        })
      );

      expect(body.data).toHaveLength(expectedCount);
      expect(body.hasNextPage).toEqual(hasNextPage);
      expect(body.count).toEqual(create);
    }
  );
};
