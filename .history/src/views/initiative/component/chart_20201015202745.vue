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
  created() {},
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
      this.chart.setOption({
        title: {
          text: "Ý tưởng",
          textStyle: {
            color: "#0e2452",
            fontStyle: "normal",
            fontWeight: "700",
            fontFamily:
              "Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif",
            fontSize: 13
          },
          left: "center"
        },
        textStyle: {
          fontFamily:
            "Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif",
          fontSize: 13
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["Mới tạo", "Đã duyệt", "Đã đánh giá"]
        },
        series: [
          {
            name: "Ý tưởng",
            type: "pie",
            color: ["#5ab1ef", "#34bfa3", "#909399"],
            radius: "75%",
            center: ["50%", "60%"],
            data: this.chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
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
    chartData() {
      this.initChart();
    }
  }
};
</script>
