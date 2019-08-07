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
      return this.$store.getters.dataForTempChart
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
            backgroundColor: "#357695",
            data: this.chartData.lowestDailyAverageTemp
          },
          {
            label: "Highest Temp",
            backgroundColor: "#ec6e4c",
            data: this.chartData.highestDailyAverageTemp
          }
        ]
      },
      this.options = { //Chart.js options
          scales: {
              yAxes: [{
                  // scaleLabel:{
                  //   display: true,
                  //   labelString: 'Degrees'
                  // },
                  ticks: {
                      beginAtZero: true,
                      callback: function(value) {
                      return value + '\u00B0';
                  }
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