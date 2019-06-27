const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const app = express();
const path = require('path');

app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('index', async (req, res) => {

    const response = await axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=772769dd002aa4f3cc706920eb26ef34');

    res.end(JSON.stringify(response.data, null, 4));

    // res.json(response.data);
});
app.post('/searchCity', async (req, res) => {
    const appId = '772769dd002aa4f3cc706920eb26ef34';
    const city = req.body.city;
    
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+appId);
    res.end(JSON.stringify(response.data, null, 4)); 

});
app.use('/static', express.static(path.join(__dirname,"/dist/"))); 
app.get('/', function(req,res) {
    res.sendFile('index.html', { root: path.join(__dirname, '/dist/') });
 });
module.exports = app;