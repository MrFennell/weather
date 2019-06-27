<template>
    <div>
        <h1>{{city.name}}</h1>
        <p>{{city.sys.country}}</p>
        <p>{{city.weather[0].description}}</p>
        
    </div>
</template>

<script>
// import axios from 'axios'
// import { mapGetters } from 'vuex'
export default {
  name: 'currentWeather',
  computed: {
      // ...mapGetters([
      //     'getCity'
      // ]),
      city(){
          return this.$store.state.city;
        // return this.$store.getters.getCity;
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
