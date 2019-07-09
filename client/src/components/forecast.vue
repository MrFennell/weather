<template>
    <div>
    </div>
</template>

<script>
// import axios from 'axios'
// import { mapGetters } from 'vuex'
export default {
  name: 'forecast',
  computed: {
      forecast(){
        const location = this.$store.state.location;
        const lat = location.coord.lat;
        const lon = location.coord.lat;

        try{
            this.$store.dispatch('getForecast',
            { lat, lon})
            }
        catch(err){
        (error) => error.response.data.error
        }
        
          return location.coord.lat;
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
