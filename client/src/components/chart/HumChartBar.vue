<template>
    <div>
      <BarChart :chart-data="datacollection" :options="options" ></BarChart>
    </div>
</template>
<script>
  import BarChart from "@/components/chart/chartTypes/BarChart.js";

  export default {
    name: 'HumChartBar',
    components: {
      BarChart,
    },
    props: ['chartType'],
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
    watch: {
      chartData: function(newValue){
        if (newValue){
          this.setChartRender()
          this.fillData();
        }
      }
    },
    mounted(){
        // if(this.$store.state.chartRender === true){ //set to remove duplicate rendering at first load
          this.fillData();
        // }
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