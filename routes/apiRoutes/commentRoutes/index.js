const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');

router.route('/:postID').get(apiController.getCommentsFromPost);

module.exports = router;