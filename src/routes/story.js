const storyController = require('../controllers/story.controller');

const router = require('express').Router();

router.get('/', storyController.index);
router.post('/', storyController.store);

module.exports = router;
