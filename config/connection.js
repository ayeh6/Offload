require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;

if(process.env.JAWSDB_URL){
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}else{
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
        }
    );
}
if(process.env.CLOUDINARY_URL){
    sequelize = new Sequelize(process.env.CLOUDINARY_URL);
// }else{
//     sequelize = new Sequelize(
//         process.env.CLOUD_NAME,
//         process.env.API_KEY,
//         process.env.API_SECRET,   
//         {
//             host: 'localhost',
//             dialect: 'mysql',
//         }
//     );
}
module.exports = sequelize;
