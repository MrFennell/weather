<template>
  <div id="app">
    <!-- <userLocation v-if="!getCity.name"/>
    <currentWeather v-if="getCity.name" /> -->
    <currentWeather />
    <weatherSearch />
  </div>
</template>

<script>
import currentWeather from './components/currentWeather.vue'
import weatherSearch from './components/weatherSearch.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    weatherSearch,
    currentWeather,
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
