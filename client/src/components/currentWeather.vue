<template>
    <div v-if="$store.state.loaded">
        <h1>{{location.name}}</h1>
        <div id="current-weather">
          <img :src="'http://openweathermap.org/img/wn/' + location.weather[0].icon + '@2x.png'">
            <p id="icon-description">{{location.weather[0].description}}</p>
        </div>
        <div id="temp-container">
          <p id="temp-average">{{location.main.temp | round}}&deg;</p>
          <p id="temp-max">{{location.main.temp_max | round}}&deg;</p>
          <p id="temp-min">{{location.main.temp_min | round}}&deg;</p>
        </div>
        <div id="location-description">
          <div id="left-side">
            <p id="country" v-if="location.sys.country.length > 0">Country: {{location.sys.country}}</p>
            <p id="coord-lat">Latitude: {{location.coord.lat}}</p>
            <p id="coord-lat">Longitude: {{location.coord.lon}}</p>
          </div>
          <div id="right-side">
            <p>Humidity:  {{location.main.humidity}}%</p>
            <p>Cloudiness:  {{location.clouds.all}}%</p>
            <p>Wind Speed:  {{location.wind.speed}} {{this.windUom}}</p>
          </div>
        </div>        
    </div>
</template>

<script>
export default {
  name: 'CurrentWeather',
  computed: {
      location(){
          return this.$store.state.location;
      },
      windUom(){
          const tempScale = this.$store.state.location.tempScale
          if (tempScale === 'Imperial'){
            return 'miles/hour'
          }
          else{
            return 'meter/sec'
          }
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
#icon-description{
  margin-top: -10px;
  
}
#temp-max{
  color: #ec6e4c;
  
}
#temp-min{
  color: #357695;
  margin-left: 5px;
}
#temp-container{
  display: flex;
  align-items: center;
  justify-content: center;
}
#temp-average{
  font-size: 2.5em;
  margin-right: 2rem;
}
#location-description{
  
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* width: max-content;
    margin: auto; */
    /* justify-items: start; */
}
#right-side{
  text-align: left;
  margin-left: 1rem;
}
#left-side{
  text-align: right;
  margin-right: 1rem;
}
</style>
