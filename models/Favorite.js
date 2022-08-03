const { nanoid } = require('nanoid');
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Favorite extends Model {}

Favorite.init(
    {
        favoriteID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: nanoid,
        },
        postID: {
            type: DataTypes.UUID,
            references: {
                model: 'posts',
                key: 'postID',
            },
        },
        userID: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'userID',
            },
        }
    },
    {
        sequelize,
        modelName: 'favorites',
    }
);

module.exports = Favorite;