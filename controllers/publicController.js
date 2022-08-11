const fs = require('fs')
const path = require('path');
const {Post, Image, Comment, User} = require('../models');
const sequelize = require('sequelize');

const getHomePage = async function(req,res) {
    const signedIn = req.session.isLoggedIn;
    let currUsername;
    if(req.session.user) {
        currUsername = (req.session.user.username) ? req.session.user.username : undefined;
    }
    const postsData = await Post.findAll({
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
            ],
            [
                sequelize.literal(`(SELECT imagePath FROM images WHERE posts.postID = images.postID LIMIT 1)`),
                'imagePath'
            ]
        ]
    });
    const posts = postsData.map(post => post.get({plain: true}));
    //console.log(posts);
    for(let i=0; i<posts.length; i++) {
        posts[i].votes = posts[i].upvotes - posts[i].downvotes;
    }
    //console.log(posts);
    res.render('content', {
        // get posts from db
        posts,
        signedIn,
        currUsername,
    });
}

const getSignInPage = function(req,res) {
    res.render('signin', {
    });
}
const getSignUpPage = function (req, res) {
    res.render('signup', {
    });
}
const getUserPage = async (req,res) => {
    const signedIn = req.session.isLoggedIn;
    let currUsername;
    if(req.session.user) {
        currUsername = (req.session.user.username) ? req.session.user.username : undefined;
    }

    const username = req.params.username;
    const userData = await User.findOne({
        attributes: [
            'userID',
            'username',
            'about',
            'phone',
            'email',
        ],
        where: {
            username: username
        }
    });
    const user = userData.get({plain: true});
    const postsData = await Post.findAll({
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
            ],
            [
                sequelize.literal(`(SELECT imagePath FROM images WHERE posts.postID = images.postID LIMIT 1)`),
                'imagePath'
            ]
        ],
        where: {
            userID: user.userID,
        }
    });
    const posts = postsData.map(post => post.get({plain: true}));

    res.render('users', {
        signedIn,
        posts,
        user,
        currUsername,
    });
}

const getUserSettings = function(req,res) {
    const signedIn = req.session.isLoggedIn;
    let currUsername;
    if(req.session.user) {
        currUsername = (req.session.user.username) ? req.session.user.username : undefined;
    }

    res.render('settings', {
        signedIn,
        currUsername,
    });
}

const getPostPage = async (req,res) => {
    const postID = req.params.postID;
    const signedIn = req.session.isLoggedIn;
    let currUsername;
    if(req.session.user) {
        currUsername = (req.session.user.username) ? req.session.user.username : undefined;
    }

    const postQuery = await Post.findOne({
        attributes: [
            'postID',
            'title',
            'description',
            'location',
            [
                sequelize.literal(`(SELECT username FROM users WHERE posts.userID = users.userID)`),
                'username',
            ]
        ],
        where: {
            postID: postID,
        }
    });
    postQuery.dataValues.votes = postQuery.upvotes - postQuery.downvotes;
    const post = postQuery.get({plain: true});

    const imagesQuery = await Image.findAll({
        where: {
            postID: postID,
        }
    });
    const images = imagesQuery.map(image => image.get({plain: true}));

    const commentQuery = await Comment.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
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
            postID: postID,
        }
    });
    const comments = commentQuery.map(comment => comment.get({plain: true}));
    console.log(comments);

    res.render('post', {
        post,
        images,
        comments,
        signedIn,
        currUsername,
    });
}


const getCreatePostPage = function(req,res) {
    const signedIn = req.session.isLoggedIn;
    let currUsername;
    if(req.session.user) {
        currUsername = (req.session.user.username) ? req.session.user.username : undefined;
    }

    //console.log(signedIn);
    if(signedIn === undefined || signedIn === false) {
        return res.status(400).json("you need to be signed in");
    } else {
        res.render('createPost', {
            signedIn,
            currUsername,
        });
    }
}

module.exports = { getHomePage, getSignInPage, getSignUpPage, getUserPage, getUserSettings, getPostPage, getCreatePostPage};