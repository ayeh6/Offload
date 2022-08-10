const fs = require('fs')
const path = require('path');

const getHomePage = function(req,res) {
    res.render('content', {
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

const getPostPage = function(res,res) {
    res.render('content', {
    });
}


const getCreatePostPage = function(req,res) {
    res.render('createPost', {
    })
}

module.exports = { getHomePage, getSignInPage, getSignUpPage, getUserPage, getUserSettings, getPostPage, getCreatePostPage};