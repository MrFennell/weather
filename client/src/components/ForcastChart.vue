<template>
    <div>   
        
    </div>
</template>

<script>
// const _ = require('lodash');
// import moment from 'moment'

export default {
  name: 'ForcastChart',
    computed: {
        forecasts(){
            return this.$store.state.forecast.list
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
