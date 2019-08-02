var cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const app = express();
const path = require('path');
require('dotenv').config();

app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))

app.options('*', cors())

app.use(bodyParser.json())

var whitelist = ['https://weather.fennellweb.com', 'https://vigilant-lamarr-c21282.netlify.com', 'http://localhost:8080', 'localhost:8080']

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.get('/getLocation', cors(corsOptionsDelegate), async (req, res) => {
    const userLoc = await axios.get('http://ip-api.com/json/')
    const jsonUserLoc = (JSON.stringify(userLoc.data, null, 4))
    const jsonUserLocStr = JSON.parse(jsonUserLoc);
    const lat = jsonUserLocStr.lat;
    const lon = jsonUserLocStr.lon;

    if (jsonUserLoc){

        try{
            //get current weather api
            const responseWeather = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=imperial'+'&appid='+process.env.VUE_APP_WeatherAPI);
            const responseWeatherStr = JSON.stringify(responseWeather.data, null, 4);
            const response = JSON.parse(responseWeatherStr)

            //get weather forecast api
            const responseForecast = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units=imperial'+'&appid='+process.env.VUE_APP_WeatherAPI);
            const forecastStr = (JSON.stringify(responseForecast.data, null, 4))
            
            //copy the forecast list itself, it's all we need from forecast data
            const forecast = JSON.parse(forecastStr)
           
            const forecastList = forecast.list;
            
            //add the unit of measure to the response obj
            const tempScale = 'Imperial';
            response.tempScale = tempScale;

            //add forecast to current weather
            response.list = forecastList;            

            res.send(JSON.stringify(response, null, 4));
        }
        catch(err){
            console.log(err);
        }
        
    }
});

app.post('/getCityWeather', cors(corsOptionsDelegate), async (req, res) => {
    const lat = req.body.lat;
    const lon = req.body.lon;
    const tempUnit = req.body.tempUnit;
    try{
        //get current weather api
        const responseWeather = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units='+tempUnit+'&appid='+process.env.VUE_APP_WeatherAPI);
        const responseWeatherStr = JSON.stringify(responseWeather.data, null, 4);
        const response = JSON.parse(responseWeatherStr)
        
        //get weather forecast api
        const responseForecast = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units='+tempUnit+'&appid='+process.env.VUE_APP_WeatherAPI);
        const forecastStr = (JSON.stringify(responseForecast.data, null, 4))
    
        //copy the forecast list itself, it's all we need from forecast data
        const forecast = JSON.parse(forecastStr)
        const forecastList = forecast.list;

        //add the unit of measure to the response obj
        const tempScale = tempUnit;
        response.tempScale = tempScale;

        //add forecast to current weather
        response.list = forecastList;           
        
        res.send(JSON.stringify(response, null, 4)); 
    }       
        catch(err){
        console.log(err);
    }
});

app.get('/getforecast', cors(corsOptionsDelegate), async (req, res) => {
    const userLoc = await axios.get('http://ip-api.com/json/')
    const jsonUserLoc = (JSON.stringify(userLoc.data, null, 4))
    const jsonUserLocStr = JSON.parse(jsonUserLoc);
    const lat = jsonUserLocStr.lat;
    const lon = jsonUserLocStr.lon;

    if (jsonUserLoc){
        try{
            const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units=imperial'+'&appid='+process.env.VUE_APP_WeatherAPI);
            res.end(JSON.stringify(response.data, null, 4));
        }
        catch(err){
            console.log(err);
        }
        
    }
});

app.post('/searchCityList', cors(corsOptionsDelegate), async (req, res) => {
    let fs = require("fs");
    const tempUnit = req.body.tempUnit;
    const city = req.body.city;
    let citiesReturned = [];
    let cityName = '';
    let contents = JSON.parse(fs.readFileSync("city.list.json"));
    
    for(i=0;i<contents.length; i++){
        cityName = contents[i].name
        if (cityName === city){
            citiesReturned.push(contents[i]);
        }
    }    

    //add the unit of measure to the response obj
    const tempScale = tempUnit;
    citiesReturned.tempScale = tempScale;

    res.end(JSON.stringify(citiesReturned, null, 4)); 
});

app.use('/static', express.static(path.join(__dirname,"/dist/"))); 
app.get('/', function(req,res) {
    res.sendFile('index.html', { root: path.join(__dirname, '/dist/') });
 });
module.exports = app;