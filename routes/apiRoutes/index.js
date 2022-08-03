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

/api/posts                      gets all posts
/api/posts/:postID              gets certain post
/api/comments/:postID           gets comments from postID
/api/images/:postID             gets images from postID
/api/users/posts/:username      gets posts from username
/api/users/signin/              input is username password      post request
/api/users/signout/             no input                        post request
                                    if(req.session.isLoggedIn){
                                        req.session.destroy(() => {
                                            res.json({success: true});
                                        });
                                    }


*/