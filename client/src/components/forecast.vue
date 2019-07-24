<template>
<div v-if="$store.state.loaded">
      
    <ul class="nav nav-tabs">
      <li class="nav-item"><a v-on:click="setDay('')" class="nav-link" v-bind:class="{ 'active': activeTab === ''}">Full Forecast</a></li>   
      <div v-for="(forecast, index) in forecastsByDay" v-bind:key="forecast.dt">
          <li class="nav-item"><a v-on:click="setDay([index][0])" class="nav-link" v-bind:class="{ 'active': activeTab === index}">{{forecast[0].dt_txt | weekday}}</a></li>
      </div>
    </ul>

  <div id="forecast-list-container">
      <div id="v-for-forecastsFilter" >
        <div v-for="(array, index) in forecastsByDay" v-bind:key="array.dt">
            <!-- {{forecastsByDay[0]}} -->
            <transition name="slide-fade">
                <div v-if="currentDay === [index][0]">
                    <div class="weekday-header"><p>{{array[0].dt_txt | weekday}}</p></div>
                    <div class="forecast-list" v-for="forecast in array" v-bind:key="forecast.dt">
                      <div id="icon">
                      <img :src="'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '@2x.png'">
                    </div>
                    <div id="date">
                      <p class="temp">{{forecast.main.temp | round}}&deg;</p>
                      <p> {{forecast.dt_txt | time}}</p>
                      <p>{{forecast.dt_txt | weekday}}, {{forecast.dt_txt | monthAndDay}}</p>
                    </div>
                    <div id="details">
                      <p>{{forecast.weather[0].description}}</p>
                      <p>Humidity: {{forecast.main.humidity | round}}%</p>
                      <p>Wind: {{forecast.wind.speed | round}} mph</p>
                      <p>Cloudiness: {{forecast.clouds.all | round}}%</p>
                    </div>
                  </div>
              </div>
            </transition>
        </div>
        <transition name="slide-fade">
        <div v-if="currentDay === ''">
         <div v-for="(array) in forecastsByDay" v-bind:key="array.dt" >
            <div>
                <div class="weekday-header"><p>{{array[0].dt_txt | weekday}}</p></div>
                <div class="forecast-list" v-for="forecast in array" v-bind:key="forecast.dt">
                  <div id="icon">
                  <img :src="'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '@2x.png'">
                </div>
                <div id="date">
                  <p class="temp">{{forecast.main.temp | round}}&deg;</p>
                  <p> {{forecast.dt_txt | time}}</p>
                  
                  <p>{{forecast.dt_txt | weekday}}, {{forecast.dt_txt | monthAndDay}}</p>
                </div>
                <div id="details">
                  <p>{{forecast.weather[0].description}}</p>
                  <p>Humidity: {{forecast.main.humidity | round}}%</p>
                  <p>Wind: {{forecast.wind.speed | round}} mph</p>
                  <p>Cloudiness: {{forecast.clouds.all | round}}%</p>
                </div>
              </div>
          </div>
        </div> 
      </div>
      </transition>
    </div>
  </div>

</div>
  
</template>

<script>
// import axios from 'axios'
const _ = require('lodash');
import moment from 'moment'

export default {
  name: 'Forecast',
  data(){
    return{
      currentDay: '',
       activeTab: ''
    }
  },

  computed: {
      forecasts(){
        return this.$store.state.location.list
      }, 
      forecastsByDay(){
          let flist = this.$store.state.location.list;
          const day = flist => moment(flist.dt_txt).format('dddd');
          const result = _.groupBy(flist, day);
          return result;
      },
        //spits out the current day
        forecastsByDayTest(){
          const flist = this.$store.state.location.list;
          const day = flist => moment(flist.dt_txt).format('dddd');
          const days = _.groupBy(flist, day);
          
          //get array of days
          let dayNames = Object.keys(days);
          return dayNames[0];
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
  },
  methods: {
    setDay(i){
      this.currentDay = i;
      this.activeTab = i
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.active {
  font-weight: 700;
}
.selected {
  background: black;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
.weekday-header{
  display: flex;
  width:100%;
  border-bottom: 1px solid black;
  align-items: center;
  height: 100px;
}
.forecast-list{
  display: flex;
  width:100%;
  border-bottom: 1px solid black;
}
#forecastTabs li{
  

}
#icon{
   display: flex;
  justify-content: center;
       
}
#date{
  text-align: start;
    align-items: center;
    justify-content: center;
        display: flex;
    flex-direction: column;
}
#details{
  text-align: start;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    min-width: 30%;
    margin-left: auto;
}
.temp{
  font-size: 2.5em;
}
p{
  margin:0;
  width:100%;
}
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
