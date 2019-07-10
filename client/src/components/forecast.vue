<template>
    <div>

        <div v-for="forecast in forecasts" v-bind:key="forecast.dt">
            <div id="icon">
              <img :src="'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '.png'">
                <p>{{forecast.main.temp | round}}&deg;</p>

              <p>{{forecast.weather[0].description}}</p>
            </div>
            <div id="date">
              <p> {{forecast.dt_txt | time}}</p>
              <p>{{forecast.dt_txt | weekday}}, {{forecast.dt_txt | monthAndDay}}</p>
            </div>
            

        </div>
      

    </div>
</template>

<script>
// import axios from 'axios'
// import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'forecast',
  computed: {
      forecasts(){
        return this.$store.state.forecast.list;
      }
  },
  filters: {
    monthAndDay: function (value){
      if (!value) return ''
      return moment(String(value)).format('MMMM Do YYYY')
    },
    time: function (value){
      if (!value) return ''
      return moment(String(value)).format('h:mm a')
    },
    weekday: function (value){
      if (!value) return ''
      return moment(String(value)).format('dddd')
    },    
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
