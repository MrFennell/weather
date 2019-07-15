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

            //add forecast to current weather
            response.list = forecastList;            

            res.send(JSON.stringify(response, null, 4));
        }
        catch(err){
            console.log(err);
        }
        
    }
});

app.post('/searchCity', async (req, res) => {
    const city = req.body.city;
    const tempUnit = req.body.tempUnit;
    try{
        //get current weather api
        const responseWeather = await axios.get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+process.env.VUE_APP_WeatherAPI+'&units='+tempUnit);
        const responseWeatherStr = JSON.stringify(responseWeather.data, null, 4);
        const response = JSON.parse(responseWeatherStr)
        
        //get weather forecast api
        const responseForecast = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+process.env.VUE_APP_WeatherAPI+'&units='+tempUnit);
        const forecastStr = (JSON.stringify(responseForecast.data, null, 4))
    
        //copy the forecast list itself, it's all we need from forecast data
        const forecast = JSON.parse(forecastStr)
        const forecastList = forecast.list;

        //add forecast to current weather
        response.list = forecastList;           
        
        res.send(JSON.stringify(response, null, 4)); 
    }       
        catch(err){
        console.log(err);
    }
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