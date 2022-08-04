const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');

router.route('/posts/:username/').get(apiController.getPostsFromUser);
router.route('/favorites/:username').get(apiController.getFavoritePostsFromUser);
router.route('/signin').post(apiController.signInUser);
router.route('/signout').post(apiController.signOutUser);
router.route('/signup').post(apiController.signUpUser);

module.exports = router;