require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const expsesh = require('express-session');


const SequelizeStore = require('connect-session-sequelize')(expsesh.Store);
const sequelize = require('./config/connection');
const routes = require('./routes');

// handlebars helpers
const helpers = require('./utils/helpers');

// handlebars init
const hbs = exphbs.create({
    helpers,
});

// express session settings
const sessionSettings = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    // maxAge: sesh_expiration_time_millisec,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

const app = express();
// Added cloudinary config
const cloudinary = require('cloudinary').v2
// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

const PORT = process.env.PORT || 3001;

// handlebars template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middlewares
app.use(express.static('public'));

app.use(expsesh(sessionSettings));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/favicon.ico', (req, res) => res.status(204));
app.use(routes);

// server listener + sequelize sync
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('server up'));
});

module.exports = {cloudinary};