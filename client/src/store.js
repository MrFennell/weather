import Vue from 'vue'
import Vuex from 'vuex'
// import moment from 'moment'

Vue.use(Vuex)

import axios from 'axios'
// import moment from 'moment'
export default new Vuex.Store({
    state:{
        location: {},
        userLocation: {},

        cities: {},
        forecast: {}
    },
    getters: {
        // getLocation: (state) => {
        //     let loc = state.location[0];
        //     return JSON.parse(loc);
        
        // },
        // getLocation: (state) =>{return state.location[0]}
        // getLat: (state) => {return state.location.coord.lat},
        // getLon: (state) => {return state.location.coord.lon}
        // getCurrentWeekday: (state) => {return moment(state.location.list[0].dt).format('dddd')}
        // getCurrentWeekday: state => {
        //     let d = state.location.list[0].dt_txt;
        //     console.log(d)
        //     return d;
        // }

    },
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
        setCities(state, cities){
            state.cities = cities;
        },

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