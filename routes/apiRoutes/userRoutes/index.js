const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');

router.route('/posts/:username/').get(apiController.getPostsFromUser);
router.route('/favorites/:username').get(apiController.getFavoritePostsFromUser);
router.route('/signin').get(apiController.signInUser);
router.route('/signout').get(apiController.signOutUser);
router.route('/signup').get(apiController.signUpUser);

module.exports = router;