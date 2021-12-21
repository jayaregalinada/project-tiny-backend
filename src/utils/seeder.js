const { Seeder } = require('mongo-seeding');
const faker = require('faker');
const { database } = require('../../config');

const seeder = new Seeder({ database });

/**
 * @param {import('mongoose').Model} model
 * @param {import('mongoose').Model|any} factory
 * @param {Object} options
 * @param {Number} count
 */
module.exports = async (model, factory, options, count = 1) => {
  const documents = [];
  for (let i = 0; i < count; i++) {
    documents.push(await factory(faker));
  }

  const defaultOptions = {
    transformers: [
      Seeder.Transformers.setCreatedAtTimestamp,
      Seeder.Transformers.setUpdatedAtTimestamp,
      Seeder.Transformers.setTimestamps
    ]
  };

  try {
    await seeder.import(
      [
        {
          name: model.collection.name,
          documents
        }
      ],
      { ...defaultOptions, ...options }
    );
  } catch (error) {
    console.error(error);

    throw new Error('Unable to import');
  }
};
