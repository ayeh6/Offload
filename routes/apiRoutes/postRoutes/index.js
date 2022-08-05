const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');

router.route('/').get(apiController.getPosts);
router.route('/:postID').get(apiController.getPostFromID).delete(apiController.deletePost);

module.exports = router;