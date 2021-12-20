/**
 * @param {Faker.FakerStatic} faker
 * @param {import('../../../typedefs').UserMongooseModel} user
 */
module.exports = (faker, user) => {
  const forHeroImage = [null, faker.image.imageUrl()];

  return {
    title: faker.lorem.words(),
    body: faker.lorem.paragraph(),
    heroImage: forHeroImage[Math.floor(Math.random() * forHeroImage.length)],
    user: user._id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
