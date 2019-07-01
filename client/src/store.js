import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
    state:{
        location: {},
        userLocation: {},
        userWeather: {},
        city: {}
    },
    getters: {
        getCity: (state) => {return state.city}
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
        setCity(state, city){
            state.city = city;
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
        async searchCity({commit}, payload){
            const response = await axios.post('/searchCity', payload)
            commit('setLocation', response.data);
        }
    }
})