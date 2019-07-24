<template>
    <div>
        <TempChartBar v-if="chartType === 'Bar'" />
        <TempChartLine v-if="chartType === 'Line'" />
        <b-form-group>

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
  import TempChartLine from "@/components/chart/TempChartLine.vue";

  export default {
    name: 'ChartContainer',
    components: {
      TempChartBar,
      TempChartLine
    },
    data() {
      return {
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
</style>