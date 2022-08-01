const users = require('./users');
const posts = require('./posts');
const {User, Post, Favorite} = require('../models');
const sequelize = require('../config/connection');
const { post } = require('../routes/apiRoutes');

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
    for(let i=0; i<posts.length; i++) {
        if(i == 3 || i == 5 || i == 9) {
            userindex--;
        }
        fav = {
            userID: allUsers[userindex].dataValues.userID,
            postID: allPosts[i].dataValues.postID,
        }
        favorites.push(fav);
    }

    //seeding favorites
    await Favorite.bulkCreate(favorites);

    process.exit(0);
};

(async () => {
    await seeder();
})();