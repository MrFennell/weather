<template>
<div>
    <form @submit.prevent="search" enctype="multipart/form-data" id="search">
        <input v-model="city" name="city">
        <input type="submit" value="search">
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
      city: ''
    }
  },
  methods: {
    search(){
      try{
        // var searchCity = this.city;
        this.$store.dispatch('searchCity',
        { city: this.city})
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
</style>
