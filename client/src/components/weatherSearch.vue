<template>
<div>
    <p v-if="error">{{error}}</p>
    <form @submit.prevent="search" enctype="multipart/form-data" id="search">
        <input v-model="city" name="city">

        <input type="submit" value="search">
          <br>
        <input type="radio" id="imperial" value="imperial" v-model="tempUnit">
        <label for="imperial">Imperial</label>
        <br>
        <input type="radio" id="metric" value="metric" v-model="tempUnit">
        <label for="metric">Metric</label>
        <br>
        <input type="radio" id="kelvin" value="kelvin" v-model="tempUnit">
        <label for="kelvin">Kelvin</label>
    </form>
</div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'weatherSearch',
  props: {
 
  },
  data() {
    return{
      city: '',
      tempUnit: 'imperial',
      error:null
    }
  },
  methods: {
    search(){
      this.error = null;
      const city = this.city;
      if(city !== ''){
        try{
          this.$store.dispatch('searchCity',
          { city: this.city, tempUnit: this.tempUnit})
        }catch(err){
          (error) => this.error = error.response.data.error
        }
      }
      else{
        this.error = "Enter a city first."
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
</style>
