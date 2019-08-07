<template>
    <div>
      <BarChart :chart-data="datacollection" :options="options" ></BarChart>
    </div>
</template>
<script>
  import BarChart from "@/components/chart/chartTypes/BarChart.js";

  export default {
    name: 'TempChartBar',
    components: {
      BarChart,
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
    watch: {
      chartData: function(newValue){
        if (newValue ){
          this.setChartRender()
          this.fillData();
        }
      }
    },
    mounted(){
      this.fillData();
    },
    methods: {
      setChartRender(){
        this.$store.dispatch('setChartRender');
      },
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
                  //  scaleLabel:{
                  //     display: true,
                  //     labelString: 'Degrees'
                  //   },
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