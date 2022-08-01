const router = require('express').Router();

const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const imageRoutes = require('./imageRoutes');
const userRoutes = require('./userRoutes');

router.use('/posts',postRoutes);
router.use('/comments',commentRoutes);
router.use('/images',imageRoutes);
router.use('/users',userRoutes);

module.exports = router;

/*

/posts                      gets all posts
/posts/:postID              gets certain post
/comments/:postID           gets comments from postID
/images/:postID             gets images from postID
/users/:username/posts      gets posts from username

*/