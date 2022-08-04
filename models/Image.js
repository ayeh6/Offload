const { nanoid } = require('nanoid');
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Image extends Model {}

Image.init(
    {
        imgID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: nanoid,
        },
        imgPath: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            }
        },
        postID: {
            type: DataTypes.UUID,
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