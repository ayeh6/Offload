const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');

router.route('/password/').put(apiController.updateUserPassword);
//{currPassword, newPassword, confirmPassword}
router.route('/signin').post(apiController.signInUser);
router.route('/signout').post(apiController.signOutUser);
router.route('/signup').post(apiController.signUpUser);
router.route('/posts/:username/').get(apiController.getPostsFromUser);
router.route('/favorites/:username').get(apiController.getFavoritePostsFromUser);

module.exports = router;