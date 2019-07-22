<template>
    <div>
      <chart :chart-data="datacollection"></chart>
    </div>
</template>
<script>
  import Chart from "@/components/chart/Chart.js";
  export default {
    name: 'Visualisation',
    components: {
      Chart
    },
    data() {
      return {
        datacollection: null,
      }
    },
    computed: {
      chartData(){
        return this.$store.getters.dataForChart
      }
    },
    watch: {
      chartData: function(newValue){
        if (newValue){
          this.fillData();
        }
      }
    },
    methods: {
      fillData() {
        this.datacollection = {
          labels: this.chartData.labels,
          datasets: [
            {
              label: "Lowest Temp",
              backgroundColor: "#A5CC82",
              data: this.chartData.lowestDailyAverageTemp
            },
            {
              label: "Highest Temp",
              backgroundColor: "#f87979",
              data: this.chartData.highestDailyAverageTemp
            }
            
          ]
        };
      },
    }
  };
</script>
<style>
</style>