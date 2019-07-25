<template>
<!-- <div id="app"> -->
<b-container >
  <b-row>

      <b-col>
        <div id="main">
        <currentWeather />
        <div id="weather-search">
          <weatherSearch />
        </div>
        </div>
      </b-col>
    
    </b-row>
     <b-row>
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

import CurrentWeather from './components/CurrentWeather.vue'
import WeatherSearch from './components/WeatherSearch.vue'
// import TempChart from './components/chart/TempChart.vue';
import ChartContainer from './components/chart/ChartContainer.vue';
// import citiesList from './components/citiesList.vue'
import Forecast from './components/Forecast.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    WeatherSearch,
    CurrentWeather,
    // TempChart,
    ChartContainer,
    Forecast,
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

<style lang="scss">
  @import 'assets/custom.scss';
  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';
  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  $blue: #357695;
#main {
  

  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#weather-search{
  margin-top: 2em;
    margin-bottom: 2em;

}

</style>
