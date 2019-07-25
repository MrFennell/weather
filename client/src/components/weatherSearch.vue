<template>
<div>
    <b-button v-if="minimized === true" @click="minimized=false"><a>Search for another city.</a></b-button>
  
    <b-card v-if="minimized === false" bg-variant="light">
    <form @submit.prevent="search" enctype="multipart/form-data" id="search">
    <b-button-close @click="minimized=true">&times;</b-button-close>
      <b-form-group
        label="Search for another city."
        label-for="citySearch"
      >
        
        <b-input-group>
          <b-form-input v-model="city" id="citySearch" name="city"></b-form-input>
          <b-input-group-append>
            <b-dropdown id="unitDropdown" v-bind:text="tempUnit" v-model="tempUnit">
              <b-dropdown-item id="imperial" @click="tempUnit = 'Imperial'">Imperial</b-dropdown-item>
              <b-dropdown-item id="metric" @click="tempUnit = 'Metric'">Metric</b-dropdown-item>
              <b-dropdown-item id="kelvin" @click="tempUnit = 'Kelvin'" >Kelvin</b-dropdown-item>
            </b-dropdown>
            <b-button type="submit" id="input-horizontal" value="search">Search</b-button>
          </b-input-group-append>
          

        </b-input-group>
        <p v-if="error">{{error}}</p>
    </b-form-group>
    </form>
  </b-card>


</div>

</template>

<script>
// import axios from 'axios'
export default {
  name: 'WeatherSearch',
  props: {
 
  },
  data() {
    return{
      city: '',
      tempUnit: 'Imperial',
      error:null,
      minimized: true
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
