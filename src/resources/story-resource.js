const userResource = require('./user-resource');

module.exports = (storyModel) => {
  const { _id, title, body, heroImage, user, createdAt, updatedAt } =
    storyModel;

  return {
    id: _id,
    title,
    body,
    heroImage,
    author: userResource(user),
    createdAt,
    updatedAt,
  };
};
