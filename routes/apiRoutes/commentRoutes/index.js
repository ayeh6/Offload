const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');

router.route('/:postID').get(apiController.getCommentsFromPost);
router.route('/').post(apiController.postNewComment)
router.route('/:commentID').delete(apiController.deleteComment);

module.exports = router;