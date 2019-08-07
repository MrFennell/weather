<template>
<b-container  >
   <b-row  v-if="!this.$store.state.loaded">
    <Loading />
   </b-row>
    <b-row  v-if="this.$store.state.citySelect">
     <b-col>
        <div class="centered">
          <weatherSearch /> 
          <SearchResults />
        </div>
     </b-col>
   </b-row>

  <b-row v-if="this.$store.state.loaded">
    <b-col v-if="!this.$store.state.citySelect">
        <div class="centered">
          <currentWeather />
          <div id="weather-search">
            <weatherSearch /> 
            <!-- <SearchResults /> -->
          </div>
        </div>
    </b-col>
  </b-row>
  <b-row v-if="!this.$store.state.citySelect">
    <b-col>
      <ChartContainer />
    </b-col>
  </b-row>
  <b-row v-if="!this.$store.state.citySelect">
    <b-col >     
      <forecast />
    </b-col>      
  </b-row> 
  
</b-container>
</template>

<script>

import CurrentWeather from './components/CurrentWeather.vue'
import WeatherSearch from './components/search/WeatherSearch.vue'
import SearchResults from './components/search/SearchResults.vue'
import ChartContainer from './components/chart/ChartContainer.vue';
import Forecast from './components/Forecast.vue'
import Loading from './components/loading/Loading.vue';

import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    WeatherSearch,
    SearchResults,
    CurrentWeather,
    ChartContainer,
    Forecast,
    Loading
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
.centered {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#weather-search{
  margin-top: 2em;
  margin-bottom: 2em;

}

</style>
