<template>
    <div>
      <LineChart :chart-data="datacollection" :options="options" ></LineChart>
    </div>
</template>
<script>
  import LineChart from "@/components/chart/chartTypes/LineChart.js";

  export default {
    name: 'TempChartLine',
    components: {
      LineChart
    },
    data() {
      return {
        datacollection: null,
        options: null,
      }
    },
    computed: {
      chartData(){
        return this.$store.getters.dataForChart
        
      }
    },
    mounted(){
      if (this.datacollection === null){
          this.fillData();
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
      }
    }
  };
</script>
<style>
</style>