<template>
    <div>
        <h1>{{userLoc.name}}</h1>
        <p>{{userLoc.sys.country}}</p>
        <p>{{userLoc.weather[0].description}}</p>
    </div>
</template>

<script>
// import axios from 'axios'
// import { mapGetters } from 'vuex'
export default {
  name: 'userWeather',
  computed: {
      userLoc(){
          return this.$store.state.userLocation;
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
