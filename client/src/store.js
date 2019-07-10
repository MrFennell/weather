import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
    state:{
        location: {},
        userLocation: {},
        userWeather: {},
        city: {},
        cities: {},
        forecast: {}
    },
    // getters: {
    //     getCity: (state) => {return state.city},
    //     getLat: (state) => {return state.location.coord.lat},
    //     getLon: (state) => {return state.location.coord.lon}
    // },
    mutations:
    {
        setLocation(state, location){
            state.location = location;
        },
        setUserLocation(state, userLocation){
            state.userLocation = userLocation;
        },
        getUserWeather(state, userWeather){
            state.userWeather = userWeather;
        },
        setCity(state, city){
            state.city = city;
        },
        setCities(state, cities){
            state.cities = cities;
        },
        setforecast(state, forecast){
            state.forecast = forecast;
        }
    },
    actions: 
    {
        async getLocation({commit}){
            const response = await axios.get('/getLocation')
            commit('setLocation', response.data);
        },
        async getUserLocation({commit}){
            const response = await axios.get('/getUserLocation')
            commit('setLocation', response.data);
        },
        async getUserWeather({commit}){
            const response = await axios.get('/getUserWeather')
            commit('setUserWeather', response.data);
        },
        async getForecast({commit}, payload){
            const response = await axios.get('/getforecast', payload)
            commit('setforecast', response.data);
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