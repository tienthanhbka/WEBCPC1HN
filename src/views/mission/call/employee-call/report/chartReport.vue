<template>
  <div class="chart" style="height:500px;width:100%"></div>
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { GetNumCallReportOfGroup } from "@/api/call";
import TestChart from "./testChart";
export default {
  components: {
    TestChart
  },
  props: {
    currentDate: String,
    currentGroup: Object
  },
  data() {
    return {
      chart: null,
      chartData: {}
    };
  },

  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      });
    },
    fetchData() {
      GetNumCallReportOfGroup({
        month: this.currentDate.substring(0, 7),
        idGroup: this.currentGroup.idGroup
      }).then(res => {
        console.log(res);
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    currentDate(oldVal, newVal) {
      if (oldVal && newVal) {
        if (newVal.slice(0, 7) != oldVal.slice(0, 7)) {
          this.fetchData();
        }
      }
    },
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  }
};
</script>