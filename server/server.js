const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const app = express();
const path = require('path');

app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/getLocation', async (req, res) => {
    const userLoc = await axios.get('http://ip-api.com/json/')
    const jsonUserLoc = (JSON.stringify(userLoc.data, null, 4))
    const jsonUserLocStr = JSON.parse(jsonUserLoc);
    const lat = jsonUserLocStr.lat;
    const lon = jsonUserLocStr.lon;

    if (jsonUserLoc){

        try{
            const appId = '772769dd002aa4f3cc706920eb26ef34';
            // const appId = process.env.WeatherAPI;
            console.log("WeatherAPI" + process.env.VUE_APP_WeatherAPI);
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+appId);
            res.end(JSON.stringify(response.data, null, 4));
        }
        catch(err){
            console.log(err);
        }
        
    }
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