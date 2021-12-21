const storyModel = require('../models/story');
const storyRepository = require('../repositories/story-repository');
const storyResource = require('../resources/story-resource');
const url = require('../utils/url');

/**
 * List of all stories
 *
 * @param {Request} request
 * @param {Response} response
 */
exports.index = async (request, response) => {
  const { query } = request;
  const parsePage = parseInt(query.page);

  try {
    const page = isNaN(parsePage) ? 1 : parsePage;
    const stories = await storyRepository.findAll(page);

    stories.data = stories.data.map(storyResource);
    // TODO: Make pagination response better
    stories.nextPageUrl = stories.hasNextPage
      ? url(request, { page: stories.nextPage })
      : null;
    stories.previousPageUrl = stories.hasPrevPage
      ? url(request, { page: stories.prevPage })
      : null;

    response.status(200).json(stories);
  } catch (error) {
    console.error(error);

    response.status(400).json({
      error: 'Something went wrong.'
    });
  }
};

/**
 * Save a story
 *
 * @param {Request} request
 * @param {Response} response
 */
exports.store = async (request, response) => {
  const { title, body, heroImage } = request.body;

  try {
    const model = storyModel.create({ title, body, heroImage });
    model.user = request.body.user;
    const story = await model.save();
    const storyWithUser = await story.populate('user');

    response.status(201).json(storyResource(storyWithUser));
  } catch (error) {
    console.error(error);
    response.status(400).json({
      error: 'Something went wrong.'
    });
  }
};
