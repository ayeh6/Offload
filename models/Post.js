//import { nanoid } from 'nanoid';

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const {nanoid} = require('nanoid');

class Post extends Model {}

Post.init(
    {
        postID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: nanoid,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            },
        },
        upvotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        downvotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        userID: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'userID',
            },
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lon: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'posts',
    }
);

module.exports = Post;