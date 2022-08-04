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

/api/posts                  GET         gets all posts                              DONE
/api/posts                  POST        makes new post
                                        {title, description, userID, lat, lon}
/api/posts/:postID          GET         gets certain post                           DONE
/api/posts/:postID          DELETE      deletes post with postID

/api/comments               POST        makes new comment
                                        {comment, postID, userID}
/api/comments/:postID       GET         gets comments from postID                   DONE
/api/comments/:commentID    DELETE      deletes comment with commentID

/api/images                 POST        posts image to a post
                                        {imgPath, postID}
/api/images/:postID         GET         gets images from postID                     DONE? needs testing
/api/images/:imgID          DELETE      deletes image with imgID

/api/users/posts/:username  POST        gets posts from username                    DONE
/api/users/signin           POST        signs in user                               DONE
                                        {username, password}
/api/users/signup           POST        sign ups user                               DONE
                                        {username, password}
/api/users/signout          POST        signs out user, deletes SESSION             DONE
/api/users/settings         PUT         updates user
                                        {username, password}


*/