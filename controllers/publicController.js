const fs = require('fs')
const path = require('path');
const {Post, Image, Comment} = require('../models');
const sequelize = require('sequelize');

const getHomePage = async function(req,res) {
    // title, username, location
    const postsData = await Post.findAll();
    const posts = postsData.map(post => post.get({plain: true}));
    //console.log(posts);
    res.render('content', {
        // get posts from db
        posts
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
const getUserPage = function(req,res) {
    res.render('users', {
    });
}

const getUserSettings = function(req,res) {
    res.render('profile', {
    });
}

const getPostPage = async (req,res) => {
    const postID = req.params.postID;
    const signedIn = req.session.isLoggedIn;
    const postQuery = await Post.findOne({
        attributes: [
            'postID',
            'title',
            'description',
            'upvotes',
            'downvotes',
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
        where: {
            postID: postID
        }
    });
    const comments = commentQuery.map(comment => comment.get({plain: true}));

    console.log(comments);

    res.render('post', {
        post,
        images,
        comments,
        signedIn
    });
}


const getCreatePostPage = function(req,res) {
    res.render('createPost', {
    })
}

module.exports = { getHomePage, getSignInPage, getSignUpPage, getUserPage, getUserSettings, getPostPage, getCreatePostPage};