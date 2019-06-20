const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const app = express();

app.set('views', './views');

// app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
// app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Setup sessions
// app.use(cookieParser());
// var SequelizeStore = require('connect-session-sequelize')(session.Store);
// var sessionStore = new SequelizeStore({
//     db: models.sequelize
// });
// sessionStore.sync();
// app.use(session({
//     secret: 'Shhhhh!',
//     store: sessionStore,
//     saveUninitialized: false,
//     resave: false
// }));

// app.use(function(request, response, next) {
//     if (request.session && request.session.campaign_id) {
//         models.Campaign.findByPk(request.session.campaign_id)
//             .then(function(campaign) {
//                 request.campaign = campaign;
//                 next();
//             })
//     } else {
//         next();
//     }
// });

// app.use(require('./routes'));

app.get('/', async (req, res) => {

    const response = await axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=772769dd002aa4f3cc706920eb26ef34');

    // res.end(JSON.stringify(response.data, null, 4)); looks prettier 

    res.json(response.data);
});
app.post('/searchCity', async (req, res) => {
    const appId = '772769dd002aa4f3cc706920eb26ef34';
    const city = req.body.city;
    console.log('city:'+city);
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+appId);

    res.end(JSON.stringify(response.data, null, 4)); 

    // res.json(response.data);
});

module.exports = app;