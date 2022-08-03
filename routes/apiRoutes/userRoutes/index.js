const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');

router.route('/:username/posts').get(apiController.getPostsFromUser);

module.exports = router;