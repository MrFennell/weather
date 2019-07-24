import Vue from 'vue'
import Vuex from 'vuex'
// import moment from 'moment'

Vue.use(Vuex)
const _ = require('lodash');
import axios from 'axios'
import moment from 'moment'
export default new Vuex.Store({
    state:{
        location: {},
        loaded: false,
        chartRender: false
    },
    getters: {
        dayList: (state) => {
            const flist = state.location.list;
            const day = flist => moment(flist.dt_txt).format('dddd');
            const days = _.groupBy(flist, day);
            let dayNames = Object.keys(days); 
            return dayNames;
        },
        days: (state) => {
            const flist = state.location.list;
            const day = flist => moment(flist.dt_txt).format('dddd');
            const days = _.groupBy(flist, day);
            return days;
        },
        tempByDay: (state) => {
            const flist = state.location.list;
            const day = flist => moment(flist.dt_txt).format('dddd');
            const days = _.groupBy(flist, day);     
            let dayNames = Object.keys(days); 
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
                lowestDailyAverageArr.push(averageLowestTemp);
                highestDailyAverageArr.push(averageHighestTemp);
                tempArray = [];
            }
            totalTemps.push(highestDailyAverageArr,lowestDailyAverageArr)
            return totalTemps
        },
        dataForChart: (state, getters) => {
            let labels = getters.dayList;

            let highestDailyAverageTemp = getters.tempByDay[0]
            let lowestDailyAverageTemp = getters.tempByDay[1]
            return {labels, highestDailyAverageTemp, lowestDailyAverageTemp};
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
        setUserLocation(state, userLocation){
            state.userLocation = userLocation;
        },
        getUserWeather(state, userWeather){
            state.userWeather = userWeather;
        },
        setChartRender(state, chartRender){
            state.chartRender = chartRender;
        },
        setCities(state, cities){
            state.cities = cities;
        },

    },
    actions: 
    {
        async getLocation({commit}){
            const response = await axios.get('/getLocation')
            commit('setLocation', response.data);
            commit('setLoaded', true);
        },

        async getUserLocation({commit}){
            const response = await axios.get('/getUserLocation')
            commit('setLocation', response.data);
        },
        async getUserWeather({commit}){
            const response = await axios.get('/getUserWeather')
            commit('setUserWeather', response.data);
        },
        async setChartRender({commit}){
            commit('setChartRender', true);
        },
        async searchCity({commit}, payload){
            const response = await axios.post('/searchCity', payload)
            commit('setLocation', response.data);
        },
        async getCities({commit}){
            const response = await axios.get('/getCities')
            commit('setLocation', response.data);
        }
    }
})