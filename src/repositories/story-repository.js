const StoryModel = require('../models/story');

const DEFAULTS = {
  limit: 15
};

/**
 * TODO: Need to paginate.
 *
 * Find all stories.
 *
 * @returns {User[]}
 */
exports.findAll = (page = 1) => {
  return StoryModel.paginate(
    {},
    {
      populate: ['user'],
      useEstimatedCount: true,
      sort: {
        updatedAt: -1
      },
      lean: true,
      page,
      customLabels: {
        docs: 'data',
        totalDocs: 'count'
      },
      limit: DEFAULTS.limit
    }
  );
};
