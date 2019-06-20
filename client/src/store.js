import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
    state:{
        city: {}
    },
    getters: {
        getCity: (state) => {return state.city}
    },
    mutations:
    {
        setCity(state, city){
            state.city = city;
        }
    },
    actions: 
        {
        async searchCity({commit}, payload){
            const response = await axios.post('/searchCity', payload)
            commit('setCity', response.data);
        }
    }
})