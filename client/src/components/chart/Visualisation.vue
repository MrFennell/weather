<template>
    <div>
      <chart :chart-data="datacollection" :options="options"></chart>
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
        options: null
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
        },
        this.options = { //Chart.js options
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: true
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                display: true
            },
            responsive: true,
            maintainAspectRatio: false
        }
        
      },
    }
  };
</script>
<style>
</style>