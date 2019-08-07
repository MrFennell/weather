import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const _ = require('lodash');
import axios from 'axios'
import moment from 'moment'
export default new Vuex.Store({
    state:{
        location: {},
        cities: [],
        uom: 'Imperial',
        loaded: false,
        chartRender: false,
        citySelect: false
    },
    getters: {
        dayList: (state) => { //return array of day names in order, no data in names just strings
            const flist = state.location.list;
            const day = flist => moment(flist.dt_txt).format('dddd');
            const days = _.groupBy(flist, day);
            let dayNames = Object.keys(days); 
            return dayNames;
        },
        days: (state) => { //return array of days as objects containing arrays of time stamp objects
            const flist = state.location.list;
            const day = flist => moment(flist.dt_txt).format('dddd');
            const days = _.groupBy(flist, day);
            return days;
        },
        tempByDay: (state, getters) => {
            const days = getters.days
            const dayNames = getters.dayList
            let dayName = '';
            let currentDay = [];
            let tempArray = [];
            let averageHighestTemp = 0;
            let averageLowestTemp = 0;
            let highestDailyAverageArr = [];
            let lowestDailyAverageArr = [];
            let newTemp = 0;
            let totalTemps = [];
            //sort temperatures into days
            for (let i=0; i < dayNames.length; i++){ //loop through day obj to separate each day.
                dayName = dayNames[i] //get current day name
                currentDay = days[dayName]  //get day as array from days obj using name
                averageHighestTemp = 0;
                averageLowestTemp = 0;
                //pull each day's array of temp as its own array.
                for (let d=0; d < currentDay.length; d++){
                    tempArray.push(currentDay[d].main.temp);
                    newTemp = currentDay[d].main.temp;
                    if (newTemp > averageHighestTemp) { //set higher temp if higher
                        averageHighestTemp = newTemp
                    }
                    if (newTemp < averageLowestTemp || averageLowestTemp === 0) { //set lower temp i flower
                        averageLowestTemp = newTemp
                    }
                }
                lowestDailyAverageArr.push(Math.round(averageLowestTemp));
                highestDailyAverageArr.push(Math.round(averageHighestTemp));
                tempArray = [];
            }
            totalTemps.push(highestDailyAverageArr,lowestDailyAverageArr)
            return totalTemps
        },
        dataForTempChart: (state, getters) => {
            let labels = getters.dayList;
            let highestDailyAverageTemp = getters.tempByDay[0]
            let lowestDailyAverageTemp = getters.tempByDay[1]
            return {labels, highestDailyAverageTemp, lowestDailyAverageTemp};
        },
        humidityByDay: (state, getters) => {
            const days = getters.days
            const dayNames = getters.dayList
            let dayName = '';
            let currentDay = [];
            let humArray = [];
            let averageHighestHumidity = 0;
            let averageLowestHumidity = 0;
            let highestDailyAverageHum = [];
            let lowestDailyAverageHum = [];
            let newHum = 0;
            let totalHum = [];
            //sort humidity into days
            for (let i=0; i < dayNames.length; i++){ //loop through day obj to separate each day.
                dayName = dayNames[i] //get current day name
                currentDay = days[dayName]  //get day as array from days obj using name
                averageHighestHumidity = 0;
                averageLowestHumidity = 0;
                //pull each day's array of humidity as its own array.
                for (let i=0; i < currentDay.length; i++){
                    humArray.push(currentDay[i].main.humidity);
                    newHum = currentDay[i].main.humidity;
                    if (newHum > averageHighestHumidity) { //set higher humidity if higher
                        averageHighestHumidity = newHum
                    }
                    if (newHum < averageLowestHumidity || averageLowestHumidity === 0) { //set lower humidity if lower
                        averageLowestHumidity = newHum
                    }
                }
                highestDailyAverageHum.push(averageHighestHumidity);
                lowestDailyAverageHum.push(averageLowestHumidity);
                humArray = [];
            }
            totalHum.push(highestDailyAverageHum, lowestDailyAverageHum)
            return totalHum
        },
        dataForHumChart: (state, getters) => {
            let labels = getters.dayList;
            let highestDailyAverageHum = getters.humidityByDay[0]
            let lowestDailyAverageHum = getters.humidityByDay[1]
            return {labels, highestDailyAverageHum, lowestDailyAverageHum};
        }
    },
    mutations:
    {
        setLocation(state, location){
            state.location = location;
        },
        setLoaded(state, loaded){
            state.loaded = loaded;
        },
        setChartRender(state, chartRender){
            state.chartRender = chartRender;
        },
        setCities(state, cities){
            state.cities = cities;
        },
        setCitySelect(state, citySelect){
            state.citySelect = citySelect;
        },
        setUom(state, uom){
            state.uom = uom;
        }
    },
    actions: 
    {
        async getLocation({commit}){
            const response = await axios.get('https://weatherfennell.herokuapp.com/getLocation')
            commit('setLocation', response.data);
            commit('setLoaded', true);
        },
        async setChartRender({commit}){
            commit('setChartRender', true);
        },
        async setUom({commit}, payload){
            commit('setUom', payload);
        },
        async searchCityList({commit}, payload){
            commit('setLoaded', false);
            const response = await axios.post('https://weatherfennell.herokuapp.com/searchCityList', payload)
            commit('setCities', response.data);
            commit('setCitySelect', true);
            commit('setLoaded', true);
        },
        async getCityWeather({commit}, payload){
            commit('setCitySelect', false);
            commit('setLoaded', false);
            const response = await axios.post('https://weatherfennell.herokuapp.com/getCityWeather', payload)
            commit('setLocation', response.data);
            
            commit('setLoaded', true);
        }
    }
})