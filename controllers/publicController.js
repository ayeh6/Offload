const fs = require('fs')
const path = require('path');
const {Post} = require('../models');

const getHomePage = async function(req,res) {
    const postsData = await Post.findAll();
    const posts = postsData.map(post => post.get({plain: true}));
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
    res.render('settings', {
    });
}

const getPostPage = function(res,res) {
    res.render('content', {
    });
}


const getCreatePostPage = function(req,res) {
    res.render('createPost', {
    })
}

module.exports = { getHomePage, getSignInPage, getSignUpPage, getUserPage, getUserSettings, getPostPage, getCreatePostPage};