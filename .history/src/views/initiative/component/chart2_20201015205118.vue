<template>
  <div>
    <div ref="cChart" class="chart" style="height:400px;width:100%"></div>
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
      rChartData: null
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
      var GPAvalues = [];
      var CPAVAlues = [];
      var NumberTLvalues = [];
      var NumberNvalues = [];
      var items = [];
      for (let i in this.rChartData) {
        GPAvalues.push({
          value: Number(this.rChartData[i].GPA),
          itemStyle: { color: Colors[i] }
        });
        CPAVAlues.push({
          value: Number(this.rChartData[i].CPA),
          itemStyle: { color: Colors[i] }
        });
        NumberTLvalues.push({
          value: Number(this.rChartData[i].NumberTL),
          itemStyle: { color: Colors[1] }
        });
        NumberNvalues.push({
          value: Number(this.rChartData[i].NumberN),
          itemStyle: { color: "#d63031" }
        });
        items.push(this.rChartData[i].StudentLevel);
      }

      this.chart.setOption({
        title: {
          text: "Biểu đồ học tập",
          textStyle: {
            color: "#2d3436",
            fontStyle: "normal",
            fontWeight: "700",
            fontFamily:
              "Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif",
            fontSize: 24
          },
          textAlign: "left"
        },
        legend: {
          data: ["CPA", "GPA", "TC tích lũy", "TC nợ"],
          position: "bottom",

          bottom: 10
        },
        label: {
          normal: {
            show: true,
            position: "bottom"
          }
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
        yAxis: [
          {
            type: "value",
            name: "TC tích lũy",
            min: 0,
            max: 200,
            interval: 50,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "Điểm",
            min: 0,
            max: 4,
            interval: 0.5,
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],

        series: [
          {
            data: CPAVAlues,
            type: "line",
            name: "CPA",
            barWidth: "60%",
            yAxisIndex: 1,
            smooth: false
          },
          {
            data: GPAvalues,
            type: "line",
            name: "GPA",
            smooth: false,
            barWidth: "60%",
            yAxisIndex: 1
          },
          {
            data: NumberTLvalues,
            type: "bar",
            name: "TC tích lũy",
            stack: "one",
            barWidth: "60%",
            yAxisIndex: 0
          },
          {
            data: NumberNvalues,
            type: "bar",
            name: "TC nợ",
            stack: "one",
            barWidth: "60%",
            yAxisIndex: 0
          }
        ]
      });
    },
    fetchData() {}
  },
  mounted() {
    this.rChartData = this.chartData;
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
    chartData: {
      deep: true,
      handler(val) {
        //this.setOptions(val);
      }
    }
  }
};
</script>
