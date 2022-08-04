const router = require('express').Router();
const publicController = require('./../../controllers/publicController');

/*

/                   goes to sign-in
/home               goes to homepage
/posts/:postID      goes to post with postID
/:username          goes to user's page with their posts

*/

router.route('*').get(publicController.getHomePage);
router.route('/signin').get(publicController.getSignInPage);
router.route('/signup').get(publicController.getSignUpPage)
router.route('/:username').get(publicController.getUserPage);
router.route('/settings/:username').get(publicController.getUserSettings)
router.route('/posts/:postID').get(publicController.getPostPage);

module.exports = router;