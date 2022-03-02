<template>
  <div :class="className" :style="{height:height,width:width,'background-color': 'white'}" />
</template>

<script>
import echarts from 'echarts'
import { GetNumCallReportOfGroup,GetCallOfIdGroupByDay } from "@/api/call";
import resize from '../resize';
require('echarts/theme/macarons') // echarts theme

var colName={
  numCall: 'Số call hoàn thành',
  evaluated : 'Số call đã duyệt',
  numCus : 'Khách hàng đã gặp',
  numPlace : 'Địa điểm đã đến'
};




export default {
  mixins:[resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '150%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    currentGroup:Object,
    currentDate:String
    
  },
  data() {

    return {
     text:'Thống kê call nhóm',
     subtext:this.currentDate,
     legendData:[],
     seriesData:[],
     xAxisData:[],
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    currentGroup(){
      this.fetchData();
      
    },
    currentDate(){
      this.fetchData();
      
     
      
    }
  },
  methods: {
    fetchData(){
       
      
      GetNumCallReportOfGroup({
        idGroup:this.currentGroup.idGroup,
        month:this.currentDate.substring(0,7)
        }).then(res=>{
          
          this.subtext=this.currentDate;
          
          
          this.xAxisData=[];
          var colData={
            numCall:[],
            evaluated:[],
            numCus:[],
            numPlace:[],
          };
          this.seriesData=[]
          res.Data.forEach(e => {
           // if(this.currentGroup[e.idEmployee]&&this.currentGroup[e.idEmployee].show==true){
              this.xAxisData.push(e.nameEmployee);
            colData.numCall.push(e.numCall);
            colData.evaluated.push(e.evaluated);
            colData.numCus.push(e.numCus);
            colData.numPlace.push(e.numPlace);
            //}
            
          });
          for(var v in colData){
            this.legendData.push(colName[v])
            this.seriesData.push(
              {
            name:colName[v],
            type:'bar',
            data:colData[v],
            markPoint : {
                data : [
                    {type : 'max', name: 'Biểu đồ 8'},
                    {type : 'min', name: 'Biểu đồ 9'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: 'Biểu đồ 7'}
                ]
            }
        }
            );
          }
          this.setOptions(this.chartData);
        })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption( {title : {
        text: this.text,
        subtext: this.subtext
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:this.legendData
    },
    grid: {
          top: 100,
          left: '2%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : this.xAxisData
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : this.seriesData})
    }
  }
}
</script>