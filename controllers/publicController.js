const path = require('path');

const getSignInPage = function(req,res) {
    const signInPage = path.join(__dirname,('signIn'));
    res.render(signInPage);
}

const getHomePage = function(req,res) {
    const homePage = path.join(__dirname,('landing_page'));
    res.render(homePage);
}

const getUserPage = function(req,res) {
    const userPage = path.join(__dirname,('user_page'));
    res.render(userPage);
}

const getPostPage = function(res,res) {
    const postPage = path.join(__dirname,('post_page'));
    res.render(postPage);
}

module.exports = {getSignInPage, getHomePage, getUserPage, getPostPage};