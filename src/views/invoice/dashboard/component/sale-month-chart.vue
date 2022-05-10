<template>
  <div>
    <div ref="cChart" class="chart" style="height:300px;width:100%"></div>
  </div>
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./resize";
import { Colors } from "@/utils/const.js";
import { GetSaleAnalysicByMonth } from "@/api/saleHeader";
import { getIdUser } from "@/utils/auth";
export default {
  mixins: [resize],
  props: ["employee", "startDate", "endDate"],
  data() {
    return {
      chart: null,
      colors: null,
      dayData: [],
      cusData: [],
      invData: [],
      amountData: [],
      proData: [],
      typeSaleData: [],
      data: [],
      sumAmount: 0,
      countCus: 0,
      countPro: 0,
      countTypeSale: 0
    };
  },

  created() {
    //console.log(this.data, "created");
  },
  methods: {
    fetchData() {
      this.dayData = [];
      this.cusData = [];
      this.invData = [];
      this.amountData = [];
      this.proData = [];
      this.typeSaleData = [];
      this.sumAmount = 0;
      this.countCus = 0;
      this.countPro = 0;
      this.countTypeSale = 0;
      const req = {
        EmployeeID: this.employee ? this.employee.EmployeeID : getIdUser(),
        DateStart: this.startDate,
        DateEnd: this.endDate
      };
      GetSaleAnalysicByMonth(req).then(res => {
        if (res.RespCode == 0) {
          this.data = res.Data;
          let _this = this;
          _this.data.forEach(i => {
            _this.dayData.push(i.DaySale);
            _this.cusData.push(i.CountCus);
            _this.invData.push(i.CountInv);
            _this.amountData.push(i.AmountSale);
            _this.proData.push(i.CountPro);
            _this.typeSaleData.push(i.CountTypeSale);
          });
          _this.sumAmount = _this.amountData.reduce((a, b) => a + b, 0);
          _this.countCus = _this.cusData.reduce((a, b) => a + b, 0);
          _this.countPro = _this.proData.reduce((a, b) => a + b, 0);
          _this.countTypeSale = _this.typeSaleData.reduce((a, b) => a + b, 0);
          this.$emit(
            "getSale",
            _this.sumAmount,
            _this.countCus,
            _this.countPro,
            _this.countTypeSale
          );
          _this.initChart();
        }
      });
    },
    initChart() {
      // const chartData = [
      //   ["2022-03-01", 116000000],
      //   ["2022-03-02", 129000000],
      //   ["2022-03-03", 135000000],
      //   ["2022-03-04", 86000000],
      //   ["2022-03-05", 73000000],
      //   ["2022-03-06", 85000000],
      //   ["2022-03-07", 73000000],
      //   ["2022-03-08", 68000000],
      //   ["2022-03-09", 92000000],
      //   ["2022-03-10", 130000000],
      //   ["2022-03-11", 245000000],
      //   ["2022-03-12", 139000000],
      //   ["2022-03-13", 115000000],
      //   ["2022-03-14", 111000000],
      //   ["2022-03-15", 309000000],
      //   ["2022-03-16", 206000000],
      //   ["2022-03-17", 137000000],
      //   ["2022-03-18", 128000000],
      //   ["2022-03-19", 85000000],
      //   ["2022-03-20", 94000000],
      //   ["2022-03-21", 71000000],
      //   ["2022-03-22", 106000000],
      //   ["2022-03-23", 84000000],
      //   ["2022-03-24", 93000000],
      //   ["2022-03-25", 85000000],
      //   ["2022-03-26", 73000000],
      //   ["2022-03-27", 83000000],
      //   ["2022-03-28", 125000000],
      //   ["2022-03-29", 107000000],
      //   ["2022-03-30", 82000000],
      //   ["2022-03-31", 44000000]
      // ];

      this.chart = echarts.init(this.$refs.cChart, "macarons");
      this.setOptions();
    },
    setOptions(chartData) {
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        // axisPointer: [
        //   {
        //     show: "auto",
        //     z: 50,
        //     type: "line",
        //     snap: false,
        //     triggerTooltip: true,
        //     value: null,
        //     status: null,
        //     animation: null,
        //     animationDurationUpdate: 200,
        //     lineStyle: {
        //       color: "#B9BEC9",
        //       width: 1,
        //       type: "dashed"
        //     },
        //     shadowStyle: {
        //       color: "rgba(210,219,238,0.2)"
        //     },
        //     label: {
        //       show: true,
        //       formatter: null,
        //       precision: "auto",
        //       margin: 3,
        //       color: "#fff",
        //       padding: [5, 7, 5, 7],
        //       backgroundColor: "auto",
        //       borderColor: null,
        //       borderWidth: 0,
        //       borderRadius: 3
        //     },
        //     handle: {
        //       show: false,
        //       icon:
        //         "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",

        //       size: 45,
        //       margin: 50,
        //       color: "#333",
        //       shadowBlur: 3,
        //       shadowColor: "#aaa",
        //       shadowOffsetX: 0,
        //       shadowOffsetY: 2,
        //       throttle: 40
        //     }
        //   }
        // ],
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["Khách hàng", "Đơn hàng", "Doanh số"]
        },
        xAxis: [
          {
            type: "category",
            data: this.dayData,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "Số khách hàng | đơn hàng",
            min: 0,
            max: 20,
            interval: 2,
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "Doanh số",
            min: 0,
            max: 350000000,
            interval: 50000000,
            axisLabel: {
              formatter: "{value} đ",
              show: true,
              inside: false,
              rotate: 0,
              showMinLabel: null,
              showMaxLabel: null,
              margin: 8,
              fontSize: 12,
              lineStyle: {
                color: "#6E7079",
                width: 1,
                type: "solid"
              }
            },
            boundaryGap: [0, 0],
            axisLine: {
              show: "auto",
              onZero: true,
              onZeroAxisIndex: null
            }
          }
        ],
        series: [
          {
            name: "Khách hàng",
            type: "bar",
            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: this.cusData
          },
          {
            name: "Đơn hàng",
            type: "bar",
            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: this.invData
          },
          {
            name: "Doanh số",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: this.amountData
            // z: 3,
            // coordinateSystem: "cartesian2d",
            // legendHoverLink: true,
            // clip: true,
            // label: { position: top },
            // endLabel: { show: false, valueAnimation: true, distance: 8 },
            // lineStyle: { width: 2, type: "solid" },
            // emphasis: {
            //   scale: true
            // },
            // step: false,
            // smooth: false,
            // smoothMonotone: null,
            // symbol: "emptyCircle",
            // symbolSize: 4,
            // symbolRotate: null,
            // showSymbol: true,
            // showAllSymbol: "auto",
            // connectNulls: false,
            // sampling: "none",
            // animationEasing: "linear",
            // progressive: 0,
            // hoverLayerThreshold: Infinity,
            // universalTransition: {
            //   divideShape: "clone"
            // },
            // triggerLineEvent: false
          }
        ],
        grid: [
          {
            show: false,
            z: 0,
            left: "10%",
            top: 60,
            right: "10%",
            bottom: 30,
            containLabel: false,
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 1,
            borderColor: "#ccc"
          }
        ]
      };

      this.chart.setOption(option);
    }
  },
  mounted() {
    this.fetchData();
    // this.$nextTick(() => {
    //   this.initChart();
    //   //this.setOptions();
    // });
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
    },
    employee: {
      deep: true,
      handler(val) {
        this.fetchData();
      }
    },
    startDate() {
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
.chart {
}
</style>
