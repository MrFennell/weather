<template>
    <div v-if="location">
        <h1>{{location.name}}</h1>
        <p v-if="location.sys.country">{{location.sys.country}}</p>
        <img :src="'http://openweathermap.org/img/wn/' + location.weather[0].icon + '@2x.png'">
        <p>{{location.weather[0].description}}</p>
        
        <p id="temp-average">{{location.main.temp | round}}&deg;</p>
        <p id="temp-max">Highest temp:{{location.main.temp_max}}&deg;</p>
        <p id="temp-min">Lowest temp:{{location.main.temp_min}}&deg;</p>
    </div>
</template>

<script>
// import axios from 'axios'
// import { mapGetters } from 'vuex'
export default {
  name: 'currentWeather',
  computed: {
      location(){
          return this.$store.state.location;
      }
  },
  filters: {
    round: function (value){
      if (!value) return ''
      return Math.round(value);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
