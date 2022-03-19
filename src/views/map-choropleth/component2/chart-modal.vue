<template>
  <div>
    <div ref="cChart" class="chart" style="height:220px;width:100%"></div>
  </div>
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/views/initiative/component/resize";
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
    data: Array,
    value: Object
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.cChart, "macarons");
      this.setOptions(this.data);
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: this.value.type,
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
          data: ["Cấp 1", "Cấp 2", "Cấp 3", "Cấp 4", "Chưa có"]
        },
        series: [
          {
            name: this.value.type,
            type: "pie",
            color: ["#43b549", "#fef22f", "#f36b21", "#ed2625", "#9CA3AF"],
            radius: "75%",
            center: ["50%", "60%"],
            data: this.data,
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
    data() {
      this.initChart();
    }
  }
};
</script>
