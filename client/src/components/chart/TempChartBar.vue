<template>
    <div>
      <BarChart :chart-data="datacollection" :options="options" ></BarChart>
    </div>
</template>
<script>
  import BarChart from "@/components/chart/chartTypes/BarChart.js";

  export default {
    name: 'TempChart',
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
        return this.$store.getters.dataForChart
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
        if(this.$store.state.chartRender === true){
          this.fillData();
        }
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