const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');

class User extends Model {}

User.init(
    {
        userID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: nanoid,
        },
        username: {
            type: DataTypes.STRING(32),
            allowNull: false,
            validate: {
                notNull: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [6],
            }
        },
        about: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "(empty)"
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "N/A",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "N/A",
        },
        darkmode: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        sequelize,
        modelName: 'users',
        hooks: {
            beforeCreate: async (user) => {
                try {
                    const hashedPassword = await bcrypt.hash(user.password, 8);
                    user.password = hashedPassword;
                    return user;
                } catch (error) {
                    throw new Error(error);
                }
            },
            beforeUpdate: async (user) => {
                if(user.password.trim().length > 0){
                    try {
                        const hashedPassword = await bcrypt.hash(user.password, 8);
                        user.password = hashedPassword;
                        return user;
                    } catch (error) {
                        throw new Error(error);
                    }
                }
            },
        }
    }
);

module.exports = User;