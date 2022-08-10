const router = require('express').Router();
const publicController = require('./../../controllers/publicController');

/*

/                   goes to sign-in
/home               goes to homepage
/posts/:postID      goes to post with postID
/:username          goes to user's page with their posts

*/


router.route('/signin').get(publicController.getSignInPage);
router.route('/signup').get(publicController.getSignUpPage)
router.route('/createPost').get(publicController.getCreatePostPage);
router.route('/settings').get(publicController.getUserSettings)
router.route('/:username').get(publicController.getUserPage);
router.route('/posts/:postID').get(publicController.getPostPage);
router.route('*').get(publicController.getHomePage);

module.exports = router;