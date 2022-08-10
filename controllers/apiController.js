const {User, Post, Comment, Image, Favorite} = require('../models');
const bcrypt = require('bcryptjs');
const sequelize = require('sequelize');
const { post } = require('../routes');
const cloudinary = require('cloudinary');

//return all posts
const getPosts = async (req,res) => {
    try{
        let allPosts = await Post.findAll({
            attributes: [
                'postID',
                'title',
                'description',
                'upvotes',
                'downvotes',
                [
                    sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE posts.postID = comments.postID)`),
                    'comment_count'
                ],
                [
                    sequelize.literal(`(SELECT username FROM users WHERE posts.userID = users.userID)`),
                    'username',
                ]
            ]
        });
        res.status(200).json(allPosts);
    } catch(error) {
        console.error(error);
        res.status(500).json({error});
    }
    //console.log(allPosts.dataValues);
}

//return post from input postID
const getPostFromID = async (req,res) => {
    try{
        let input_postID = req.params.postID;
        if(input_postID) {
            let post = await Post.findOne({
                attributes: [
                    'postID',
                    'title',
                    'description',
                    'upvotes',
                    'downvotes',
                    [
                        sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE posts.postID = comments.postID)`),
                        'comment_count',
                    ],
                    [
                        sequelize.literal(`(SELECT username FROM users WHERE posts.userID = users.userID)`),
                        'username',
                    ]
                ],
                where: {
                    postID: input_postID,
                }
            });
            res.status(200).json(post);
        } else {
            res.status(400).json("Error in getting post, check parameters");
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({error});
    }
}

//return posts from user using username
const getPostsFromUser = async (req,res) => {
    try{
        let input_username = req.params.username;
        if(input_username) {
            const user = await User.findOne({
                include: [
                    {
                        model: Post,
                        attributes: {
                            include: [
                                [
                                    sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE posts.postID = comments.postID)`),
                                    'comment_count',
                                ],
                                [
                                    sequelize.literal(`(SELECT username FROM users WHERE posts.userID = users.userID)`),
                                    'username',
                                ]
                            ],
                            exclude: [
                                'userID',
                                'createdAt',
                                'updatedAt',
                            ]
                        }
                    }
                ],
                attributes: {
                    exclude: [
                        'userID',
                        'password',
                        'createdAt',
                        'updatedAt',
                    ],
                },
                where: {
                    username: input_username,
                }
            });
            const posts = user.posts;
            res.status(200).json(user.posts);
        } else {
            res.status(400).json("Error in getting posts from user, check parameters");
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({error});
    }
}

//return comments from post using postID
const getCommentsFromPost = async (req,res) => {
    try {
        let input_postID = req.params.postID;
        if(input_postID) {
            const comments = await Comment.findAll({
                attributes: [
                    'commentID',
                    'comment',
                ],
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: [
                                'userID',
                                'password',
                                'createdAt',
                                'updatedAt',
                            ]
                        }
                    },
                ],
                where: {
                    postID: input_postID,
                }
            });
            res.status(200).json(comments);
        } else {
            res.status(400).json("Error in getting comments, check parameters");
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({error});
    }
}

//return imagePaths from post using postID
const getImagesFromPost = async (req,res) => {
    try {
        const input_postID = req.params.postID;
        if(input_postID) {
            const imagePaths = await Image.findAll({
                attributes: [
                    'imgPath'
                ],
                where: {
                    postID: input_postID,
                }
            });
            res.status(200).json(imagePaths);
        } else {
            res.status(400).json("Error in getting images, check parameters");
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({error});
    }
}

//return posts from user's favorite's list using username
const getFavoritePostsFromUser = async (req,res) => {
    try {
        const input_username = req.params.username;
        if(input_username) {
            const user = await User.findOne({
                include: {
                    model: Favorite,
                    as: 'favorites',
                    include: {
                        model: Post,
                        attributes: {
                            exclude: [
                                'userID',
                                'createdAt',
                                'updatedAt',
                            ],
                            include: [
                                [
                                    sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE favorites.postID = comments.postID)`),
                                    'comment_count'
                                ],
                                [
                                    sequelize.literal(`(SELECT username FROM users, posts WHERE  favorites.postID = posts.postID AND posts.userID = users.userID)`),
                                    'username'
                                ],
                            ]
                        }
                    },
                    attributes: {
                        exclude: [
                            'userID',
                            'postID',
                            'postPostID',
                            'userUserID',
                            'createdAt',
                            'updatedAt',
                            'postUserID',
                        ]
                    },
                },
                where: {
                    username: input_username,
                }
            });
            res.status(200).json(user.favorites);
        } else {
            res.status(400).json("Error getting posts from user, check parameters");
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({error});
    }
}

const signInUser = async (req,res) => {
    try {
        //console.log(req.body);
        const existingUser = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if(!existingUser) {
            return res.status(401).json({error: 'invalid credentials'});
        }
        //console.log(existingUser);
        const passwordMatch = await bcrypt.compare(req.body.password, existingUser.password);
        //console.log(passwordMatch);

        if(!passwordMatch) {
            return res.status(401).json({error: 'invalid credentials'});
        } else {
            //console.log('outside saving cookie');
            req.session.save(() => {
                //console.log("saving user to cookie");
                req.session.user = existingUser;
                req.session.isLoggedIn = true;
                res.json({success: true});
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
}

const signOutUser = async (req,res) => {
    if(req.session.isLoggedIn){
        req.session.destroy(() => {
            res.json({success: true});
        });
    }
}

const signUpUser = async (req,res) => {
    try {
        // adds signup data to database
        // post data: { username: '', password: ''}
        const newUser = await User.create(req.body);

        // saves user session with new user data
        req.session.save(() => {
            req.session.user = newUser;
            req.session.isLoggedIn = true;
            res.json({success: true});
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
}


const createNewPost = async (req,res) => {
    //{title, description, location, images: {image1, image2}}
    try {
        //console.log(req.body);
        //console.log(req.session.user);
        let newPost;
        const images = req.body.images;
        if(req.body.location === '') {
            newPost = await Post.create({
                title: req.body.title,
                description: req.body.description,
                userID: req.session.user.userID,
            });
        } else {
            newPost = await Post.create({
                title: req.body.title,
                description: req.body.description,
                location: req.body.location,
                userID: req.session.user.userID,
            });
        }
        //console.log(newPost.postID);
        if(images.length > 0) {
            for(let i=0; i<images.length; i++) {
                await Image.create({
                    postID: newPost.postID,
                    imageID: images[i].imageID,
                    imagePath: images[i].imagePath,
                });
            }
        }
        res.status(200).json(newPost)
    } catch (error) {
        console.error(error);
        res.status(500).json({error}); 
    }
}

const postNewComment = async (req,res) => {
    try {
        // Adds new comment to the database
        // post data: { comment: 'String:, PostId: 'String', UserId:'String'
        const comment = req.body.comment
        //console.log(comment);
        const postId = req.body.postID
        //console.log(postId);
        const userId = req.session.user.userID;
        //console.log(userId);
        if(userId === undefined) {
            res.status(400).json("you need to be signed in");
        } else {
            const newComment = {comment: comment, postID: postId, userID: userId};
            await Comment.create(newComment);
            res.status(200).json(newComment);
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
};

const postImageToPost = async (req,res) => {
    const imageID = req.body.imageID;
    const imagePath = req.body.imagePath;
    const postID = req.body.postID;
    try {
        const newImage = Image.create({
            imageID: imageID,
            imagePath: imagePath,
            postID: postID,
        });
    } catch(e) {
        console.error(error);
        res.status(500).json({error});
    }
}

const deleteImage = async (req,res) => {
    const imageID = req.params.imageID;
    try {
        await Image.destroy({
            where: {
                imageID: imageID
            }
        });
        cloudinary.v2.api.destroy(imageID, (error, result) => {
            //console.log(result, error);
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({error});
    }
}

const deleteComment = async (req, res) => {
    const commentID = req.params.commentID;
    try {
        await Comment.destroy({
            where: {
                commentID: commentID,
            }
        });
    } catch(e) {
        console.error(error);
        res.status(500).json({error});
    }
}

const deletePost = async (req,res) => {
    const postID = req.params.postID;
    try {
        await Post.destroy({
            where: {
                postID: postID,
            }
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({error});
    }
}

const updateUserPassword = async (req,res) => {
    console.log("updating password");
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    if(newPassword !== confirmPassword) {
        return res.status(401).json("Passwords don't match");
    }

    //const currUser = req.session.user;
    const currUser = await User.findOne({
        where: {
            userID: req.session.user.userID
        }
    });
    //console.log(currUser);
    const passwordMatch = await bcrypt.compare(req.body.currentPassword, currUser.password);

    if(passwordMatch) {
        await currUser.update({password: newPassword});
        return res.json("true");
    }
}

const getImageCredentials = async (req,res) => {

}

const updateAboutYou = async (req,res) => {
    const aboutYou = req.body.aboutYou;
    const userID = req.session.user.userID;
    try{
        await User.update(
            {
                about: aboutYou,
            },  
            {
                where: {
                    userID: userID
                }
            }
        );
        res.status(200).json("success");
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
}

const updateContactInfo = async (req,res) => {
    const email = req.body.email;
    const phone = req.body.phone;
    const contact = {};
    if(email === '' && phone === '') {
        res.status(400).json("Please enter an email or phone number");
    } else if(email === '') {
        contact.phone = phone;
    } else if(phone === '') {
        contact.email = email;
    }
    console.log(contact);
    const userID = req.session.user.userID;
    try {
        await User.update(
            contact,
            {
                where: {
                    userID: userID
                }
            }
        );
        res.status(200).json("success");
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
}

const getUserInfo = async (req,res) => {
    username = req.body.username;
    try{
        const user = await User.findOne({
            attributes: [
                'username',
                'about',
                'phone',
                'email',
            ],
            where: {
                username: username,
            }
        });
        res.status(200).json(user);
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
}


module.exports = {
    createNewPost,
    postNewComment,
    getPosts,
    getPostFromID,
    getPostsFromUser,
    getCommentsFromPost,
    getImagesFromPost,
    getFavoritePostsFromUser,
    signInUser,
    signOutUser,
    signUpUser,
    postImageToPost,
    deleteImage,
    deleteComment,
    deletePost,
    updateUserPassword,
    getImageCredentials,
    updateAboutYou,
    updateContactInfo,
    getUserInfo,
};
