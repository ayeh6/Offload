const {User, Post, Comment, Image, Favorite} = require('../models');
const bcrypt = require('bcryptjs');

//return all posts
const getPosts = async (req,res) => {
    let test = {
        test1: 'here',
        test2: 'now',
    }
    res.json(JSON.parse(test));
}

//return post from input postID
const getPostFromID = async (req,res) => {

}

//return posts from user using username
const getPostsFromUser = async (req,res) => {

}

//return comments from post using postID
const getCommentsFromPost = async (req,res) => {

}

//return imagePaths from post using postID
const getImagesFromPost = async (req,res) => {

}

//return posts from user's favorite's list using userID
const getFavoritePostsFromUser = async (req,res) => {

}

module.exports = {getPosts, getPostFromID, getPostsFromUser, getCommentsFromPost, getImagesFromPost, getFavoritePostsFromUser};