<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <currentWeather/>
    <weatherSearch />
  </div>
</template>

<script>
import currentWeather from './components/currentWeather.vue'
import weatherSearch from './components/weatherSearch.vue'

export default {
  name: 'app',
  components: {
    weatherSearch,
    currentWeather
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
