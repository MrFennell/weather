<template>
    <div>
      <LineChart :chart-data="datacollection" :options="options" ></LineChart>
    </div>
</template>
<script>
import LineChart from "@/components/chart/chartTypes/LineChart.js";
export default {
  name: 'HumChartLine',
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
      return this.$store.getters.dataForHumChart
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
            label: "Lowest Humidity",
            backgroundColor: "#357695",
            data: this.chartData.lowestDailyAverageHum
          },
          {
            label: "Highest Humidity",
            backgroundColor: "#ec6e4c",
            data: this.chartData.highestDailyAverageHum
          }
        ]
      },
      this.options = { //Chart.js options
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      callback: function(value) {
                      return value + '%';
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