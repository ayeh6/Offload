const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');

router.route('/:postID').get(apiController.getImagesFromPost);

module.exports = router;