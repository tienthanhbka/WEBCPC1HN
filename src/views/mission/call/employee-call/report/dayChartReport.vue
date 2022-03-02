<template>
  <div :class="className" :style="{height:height,width:width,'background-color': 'white'}" />
</template>

<script>
import echarts from "echarts";
import { GetCallOfIdGroupByDay } from "@/api/call";
import { text } from 'body-parser';
require("echarts/theme/macarons"); // echarts theme
import resize from '../resize';
export default {
  mixins:[resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    currentGroup: Object,
    currentDate: String
  },
  data() {
    return {
      text: "Thống kê call nhóm",
      subtext: this.currentDate,
      legendData: [],
      seriesData: [],
      xAxisData: [],
      chart: null
    };
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
    
    currentGroup() {
      this.fetchData();
    },
    currentDate() {
      this.fetchData();
      
    }
  },
  methods: {
    fetchData() {
        if(this.currentGroup.idGroup==''||this.currentGroup.idGroup==null || this.currentDate==null){
            return;
        }
      GetCallOfIdGroupByDay({
        idGroup: this.currentGroup.idGroup,
        date: this.currentDate.substring(0, 10)
      }).then(res => {
          this.legendData = [];
          this.seriesData=[];
          
          for(var i in res.Data){
              var e = res.Data[i];
              this.legendData.push(e.nameEmployee);
          var arrC = [];
          for (let i = 6; i <= 22; i++) {
            if (!e.data[i] || !e.data[i].numCall) {
              arrC.push(0);
            } else {
              arrC.push(e.data[i].numCall);
            }
          }
          this.seriesData.push({
            name: e.nameEmployee,
            type: "line",
            stack: "",
            data: arrC
          });
          }
        this.chartData = res.Data;
        
        this.setOptions(this.chartData);
      });
    },
    initChart() {
      this.xAxisData = [];
      for (let i = 6; i <= 22; i++) {
        this.xAxisData.push(i + "-" + (i + 1));
      }
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: this.text,
          subtext:this.subtext
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.legendData
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
            show:true,
          feature: {
            saveAsImage: {},
             restore : {show: true},
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xAxisData
        },
        yAxis: {
          type: "value"
        },
        series: this.seriesData
      });
    }
  }
};
</script>