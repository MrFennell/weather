<template>
    <div>
    </div>
</template>

<script>
import axios from 'axios'
// import { mapGetters } from 'vuex'
export default {
  name: 'citiesList',
  computed: {
      cities(){
        //   return axios.get('/citiesList');
        this.$store.dispatch('getCities');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
