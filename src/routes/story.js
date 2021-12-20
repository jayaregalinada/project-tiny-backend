const StoryController = require('../controllers/story.controller');

const router = require('express').Router();

router.get('/', StoryController.index);
router.post('/', StoryController.store);

module.exports = router;
