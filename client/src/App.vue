<template>
  <div id="app">
    <!-- <userLocation v-if="!getCity.name"/>
    <currentWeather v-if="getCity.name" /> -->
    <currentWeather />
    
    <!-- <ForcastChart /> -->

      <!-- <Visualisation></Visualisation> -->
    <weatherSearch />
    <!-- <citiesList /> -->

    <forecast />
  </div>
</template>

<script>
//  import Visualisation from './components/chart/Visualisation.vue';
import currentWeather from './components/currentWeather.vue'
import weatherSearch from './components/weatherSearch.vue'
// import citiesList from './components/citiesList.vue'
import forecast from './components/forecast.vue'
// import ForcastChart from './components/ForcastChart.vue'
// import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    weatherSearch,
    currentWeather,
    // Visualisation,
    forecast,
    // ForcastChart
  },
  mounted() {
    this.$store.dispatch('getLocation')
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
