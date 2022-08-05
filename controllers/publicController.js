const fs = require('fs')
const path = require('path');

const getHomePage = function(req,res) {
    res.render('dummy', {
    });

}

const getSignInPage = function(req,res) {
    res.render('dummy', {
    });
}
const getSignUpPage = function (req, res) {
    res.render('dummy', {
    });
}
const getUserPage = function(req,res) {
    res.render('dummy', {
    });
}

const getUserSettings = function(req,res) {
    res.render('dummy', {
    });
}

const getPostPage = function(res,res) {
    res.render('dummy', {
    });
}


module.exports = { getHomePage,getSignInPage,  getSignUpPage, getUserPage, getUserSettings, getPostPage};