const { nanoid } = require('nanoid');
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Image extends Model {}

Image.init(
    {
        imageID: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                notNull: true,
            }
        },
        imagePath: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            }
        },
        postID: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: true,
            },
            references: {
                model: 'posts',
                key: 'postID',
            },
        }
    },
    {
        sequelize,
        modelName: 'images',
    }
);

module.exports = Image;