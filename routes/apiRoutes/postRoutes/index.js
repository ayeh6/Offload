const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');

router.route('/')
    .get(apiController.getPosts)
    .post(apiController.createNewPost)
router.route('/:postID')
    .get(apiController.getPostFromID)
    .delete(apiController.deletePost);

module.exports = router;