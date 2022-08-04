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

/api/posts                  GET                      gets all posts
/api/posts/:postID          GET                      gets certain post
/api/comments/:postID       GET                      gets comments from postID
/api/images/:postID         GET                      gets images from postID
/api/users/posts/:username  POST                      gets posts from username
/api/users/signin/          GET                      input is username password      post request
/api/users/signout/         GETno input                        post request
                                    if(req.session.isLoggedIn){
                                        req.session.destroy(() => {
                                            res.json({success: true});
                                        });
                                    }


*/