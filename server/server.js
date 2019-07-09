const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const app = express();
const path = require('path');
require('dotenv').config();

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

            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=imperial'+'&appid='+process.env.VUE_APP_WeatherAPI);
            res.end(JSON.stringify(response.data, null, 4));
        }
        catch(err){
            console.log(err);
        }
        
    }
});


app.post('/searchCity', async (req, res) => {
    const city2 = req.location;
    console.log("vuex"+city2);
    const city = req.body.city;
    const tempUnit = req.body.tempUnit;
    try{
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+process.env.VUE_APP_WeatherAPI+'&units='+tempUnit);
        res.end(JSON.stringify(response.data, null, 4)); 
    }       
        catch(err){
        console.log(err);
    }
});
app.get('/getForecast', async (req, res) => {
    
    const lat = req.body.lat;
    const lon = req.body.lon;
    var vuex = req.location;
    console.log('vuex:'+vuex);
        // try{
        //     const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units=imperial'+'&appid='+process.env.VUE_APP_WeatherAPI);
        //     res.end(JSON.stringify(response.data, null, 4));
        // }
        // catch(err){
        //     console.log(err);
        // }
    res.end('');
        
});

// app.get('/getCities', async (req, res) => {
//     var fs = require("fs");
//     var contents = fs.readFileSync("city.list.json");
//     var jsonContent = JSON.parse(contents);
//     var str = "Novinki";

//     res.end(JSON.stringify(cities, null, 4)); 
// });

app.use('/static', express.static(path.join(__dirname,"/dist/"))); 
app.get('/', function(req,res) {
    res.sendFile('index.html', { root: path.join(__dirname, '/dist/') });
 });
module.exports = app;