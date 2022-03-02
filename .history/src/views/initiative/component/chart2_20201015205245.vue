<template>
  <div>
    <div ref="cChart" class="chart" style="height:200px;width:100%"></div>
  </div>
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./resize";
import { Colors } from "@/utils/const.js";
export default {
  mixins: [resize],
  data() {
    return {
      chart: null,
      colors: null
    };
  },
  props: {
    chartData: Array
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.cChart, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions({ expectedData, actualData } = {}) {
      var values = [];
      var items = [];
      for (let i in this.chartData) {
        values.push({
          value: Number(this.chartData[i].Quantity.toFixed(0)),
          itemStyle: { color: this.colors[i] }
        });
        items.push("T" + this.chartData[i].Month);
      }

      this.chart.setOption({
        title: {
          text: "Kết quả",
          textStyle: {
            color: "#0e2452",
            fontStyle: "normal",
            fontWeight: "700",
            fontFamily:
              "Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif",
            fontSize: 13
          },
          textAlign: "left"
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          data: items,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: values,
            type: "line",
            name: "KQ",
            smooth: false,
            barWidth: "60%"
          }
        ]
      });
    },
    fetchData() {}
  },

  mounted() {
    this.colors = Colors;
    this.$nextTick(() => {
      this.initChart();
      //this.setOptions();
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
    chartData: {
      deep: true,
      handler(val) {}
    }
  }
};
</script>
