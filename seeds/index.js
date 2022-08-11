const users = require('./users');
const posts = require('./posts');
const images = require('./images');
const comments = require('./comments');
const {User, Post, Favorite, Comment, Image} = require('../models');
const sequelize = require('../config/connection');

const seeder = async () => {
    await sequelize.sync({force: true});

    //seeding users
    await User.bulkCreate(users, {
        individualHooks: true,
    });
    let allUsers = await User.findAll({
        attributes: ['userID']
    });

    //setting userID to each post
    let userindex = 0;
    for(let i=0; i<posts.length; i++) {
        userindex++;
        if(userindex === allUsers.length) {
            userindex = 0;
        }
        posts[i].userID = allUsers[userindex].dataValues.userID;
    }

    //seeding posts
    await Post.bulkCreate(posts);


    //setting postID to each image
    let allPosts = await Post.findAll({
        attributes: ['postID'],
        order: [
            ['title','ASC']
        ]
    });

    let j=0;
    for(let i=0; i<images.length; i++) {
        images[i].postID = allPosts[j].dataValues.postID;
        if(i !== 7) {
            j++;
        }
    }

    await Image.bulkCreate(images);
    /*
    line 43: 00 11 22 33 44 55 66 77 87 98 109

    */
    








    //making a list of favorites
    let favorites = [];
    let fav = {};
    userindex = 0;
    for(let i=0; i<posts.length; i++) {
        userindex++;
        if(userindex === allUsers.length) {
            userindex = 0;
        }
        fav = {
            userID: allUsers[userindex].dataValues.userID,
            postID: allPosts[i].dataValues.postID,
        }
        favorites.push(fav);
    }

    //seeding favorites
    await Favorite.bulkCreate(favorites);


    //making comments
    let postindex = 0;
    userindex = 0;
    for(let i=0; i<comments.length; i++) {
        if(i !== 0 && i%3 === 0) {
            postindex++;
        }
        userindex++;
        if(userindex == allUsers.length) {
            userindex = 0;
        }
        //console.log(`postindex: ${postindex}, userindex:${userindex}`);
        comments[i].postID = allPosts[postindex].dataValues.postID;
        comments[i].userID = allUsers[userindex].dataValues.userID;
    }

    await Comment.bulkCreate(comments);

    process.exit(0);
};

(async () => {
    await seeder();
})();