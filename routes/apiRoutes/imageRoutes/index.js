const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');

router.route('/').post(apiController.postImageToPost);
router.route('/:postID').get(apiController.getImagesFromPost);
router.route('/:imageID').delete(apiController.deleteImage);

module.exports = router;