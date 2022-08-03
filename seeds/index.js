const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');
const {User, Post, Favorite, Comment} = require('../models');
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
        if(i == 3 || i == 5 || i == 9) {
            userindex++;
        }
        posts[i].userID = allUsers[userindex].dataValues.userID;
    }

    //seeding posts
    await Post.bulkCreate(posts);

    //making a list of favorites
    let allPosts = await Post.findAll({
        attributes: ['postID']
    });
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