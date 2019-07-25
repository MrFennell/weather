<template>
    <div>
        <b-tabs align="center">
          <b-tab @click="chart = 'Temp'" title="Temperature"></b-tab>
          <b-tab @click="chart = 'Hum'" title="Humidity"></b-tab>

        </b-tabs>

        <div id="tempCharts" v-if="chart === 'Temp'">
          <TempChartBar v-if="chartType === 'Bar'" />
          <TempChartLine v-if="chartType === 'Line'" />
        </div>
        <div id="humCharts" v-if="chart === 'Hum'">
          <HumChartBar v-if="chartType === 'Bar'" />
          <HumChartLine v-if="chartType === 'Line'" />
        </div>
        <b-form-group class="chart-switch">

            <b-form-radio-group
              v-model="chartType" 
              :options="options"
              buttons
              button-variant="outline-primary"
              size="sm"
              name="radio-btn-outline"
            ></b-form-radio-group>

        </b-form-group>

    </div>
</template>
<script>
  import TempChartBar from "@/components/chart/TempChartBar.vue";
  import HumChartBar from "@/components/chart/HumChartBar.vue";
  import TempChartLine from "@/components/chart/TempChartLine.vue";
  import HumChartLine from "@/components/chart/HumChartLine.vue";


  export default {
    name: 'ChartContainer',
    components: {
      TempChartBar,
      HumChartBar,
      TempChartLine,
      HumChartLine
    },
    data() {
      return {
        chart: 'Temp',
        chartType: 'Bar',
        options:[
            {text: 'Bar', value: 'Bar'},
            {text: 'Line', value: 'Line'}
        ]
      }
    }
  };
</script>
<style>
.chart-switch{
      text-align: center;
}
</style>