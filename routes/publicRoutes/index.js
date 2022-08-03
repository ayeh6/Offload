const router = require('express').Router();
const publicController = require('./../../controllers/publicController');

/*

/                   goes to sign-in
/home               goes to homepage
/posts/:postID      goes to post with postID
/:username          goes to user's page with their posts

*/

router.route('/:username').get(publicController.getUserPage);
router.route('/posts/:postID').get(publicController.getPostPage);
router.route('/home').get(publicController.getHomePage);
router.route('*').get(publicController.getSignInPage);

module.exports = router;