<template>
  <div id="app">
    <!-- <userLocation v-if="!getCity.name"/>
    <currentWeather v-if="getCity.name" /> -->
    <currentWeather />
    <weatherSearch />
    <!-- <citiesList /> -->
    <forecast />
  </div>
</template>

<script>
import currentWeather from './components/currentWeather.vue'
import weatherSearch from './components/weatherSearch.vue'
// import citiesList from './components/citiesList.vue'
import forecast from './components/forecast.vue'
// import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    weatherSearch,
    currentWeather,
    // citiesList,
    forecast
  },
  mounted() {
    this.$store.dispatch('getLocation'),
    this.$store.dispatch('getForecast')
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
