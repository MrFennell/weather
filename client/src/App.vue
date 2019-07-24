<template>
<!-- <div id="app"> -->
<b-container >
  <b-row>

    <b-col>
      <div id="main">
      <currentWeather />
      <weatherSearch />
      </div>
    </b-col>

    <b-col>
      <!-- <TempChart /> -->
      <ChartContainer/>
    </b-col>
    </b-row>
    <b-row>
      <b-col>     
        <forecast />
      </b-col>      
    </b-row> 
  
</b-container>
<!-- </div> -->
</template>

<script>

import currentWeather from './components/currentWeather.vue'
import weatherSearch from './components/weatherSearch.vue'
// import TempChart from './components/chart/TempChart.vue';
import ChartContainer from './components/chart/ChartContainer.vue';
// import citiesList from './components/citiesList.vue'
import forecast from './components/forecast.vue'

import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    weatherSearch,
    currentWeather,
    // TempChart,
    ChartContainer,
    forecast,
  },
  mounted() {
    this.$store.dispatch('getLocation')
  },
  computed: {
        ...mapGetters([
          'dayList'
        ]),
        dayLabels(){
          return this.$store.getters.dayList
        }
      },

}
</script>

<style>
#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
