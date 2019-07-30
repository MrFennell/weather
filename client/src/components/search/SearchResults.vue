<template>
<div v-if="!$store.state.loaded">
  <h2>Choose a city below:</h2>
  <div id="results-list" >
    <div class="results-list-item" v-on:click="searchCity(result)" v-for="(result, index) in results" v-bind:key="index">
        <h3 class="city-name">{{result.name}},  {{result.country}}</h3>
        <div class="city-coords">
          <p class="city-lat">Lat: {{result.coord.lat}}</p>
          <p class="city-lon">Lon: {{result.coord.lon}}</p>
        </div>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'SearchResults',
  computed:{
      results(){
        return this.$store.state.cities
      }
  },
  methods: {
    searchCity(result){
        try{
        let uLat = result.coord.lat
        let ulon = result.coord.lon
        let uom = this.$store.state.uom

        this.$store.dispatch('getCityWeather',
          { 
            lat:uLat,
            lon:ulon,
            tempUnit:uom
          })
        }catch(err){
          (error) => this.error = error.response.data.error
        }
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
#results-list{
  display: flex;
  width:100%;
  padding-bottom: 5px;
  flex-direction: column;
  border-top: 1px solid #dee2e6;
}
.results-list-item{
  width:100%;
  cursor: pointer;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 2em;
}
.results-list-item:hover{
 background-color: #dee2e6;
}
.city-coords{
  text-align: left;
  text-align: left;
  width: fit-content;
  margin: auto;
  line-height: .5em;
  padding-top: 21px;
}
</style>
