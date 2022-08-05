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

/api/posts                  POST        makes new post
                                        {title, description, userID, lat, lon}
/api/posts/:postID          DELETE      deletes post with postID

/api/comments               POST        makes new comment
                                        {comment, postID, userID}
/api/comments/:commentID    DELETE      deletes comment with commentID

/api/images                 POST        posts image to a post
                                        {imageID, imagePath, postID}
/api/images/:postID         GET         gets images from postID                     DONE? needs testing
/api/images/:imageID          DELETE      deletes image with imgID

/api/users/settings         PUT         updates user
                                        {username, password}


*/