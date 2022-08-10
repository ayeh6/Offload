const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Image = require('./Image');
const Favorite = require('./Favorite');

//user has many posts, posts belong to one user
Post.belongsTo(User, {
    foreignKey: 'userID',
});
User.hasMany(Post, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
});

//post has many comments, comment belongs to one post
Comment.belongsTo(Post, {
    foreignKey: 'postID',
});
Post.hasMany(Comment, {
    foreignKey: 'postID',
    onDelete: 'CASCADE',
});

//user has many comments, comments belong to one user
Comment.belongsTo(User, {
    foreignKey: 'userID',
});
User.hasMany(Comment, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
});

//post has many images, image belongs to one post
Image.belongsTo(Post, {
    foreignKey: 'postID',
});
Post.hasMany(Image, {
    foreignKey: 'postID',
    onDelete: 'CASCADE',
});

//user belongs to many posts as favorites, post belong to many users as favorites
// User.belongsToMany(Post, {
//     through: Favorite
// });
// Post.belongsToMany(User, {
//     through: Favorite,
// });

//user has many favorites, favorite go to one user
Favorite.belongsTo(User, {
    foreignKey: 'userID',
});
User.hasMany(Favorite, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
});

//post can be in many favorites, favorites go to one post
Favorite.belongsTo(Post, {
    foreignKey: 'postID',
});
Post.hasMany(Favorite, {
    foreignKey: 'postID',
    onDelete: 'CASCADE',
});

module.exports = {
    User,
    Post,
    Comment,
    Image,
    Favorite,
};