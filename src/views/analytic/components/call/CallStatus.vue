<template>
    <GChart class="m-chart"
        type="PieChart"
        :data="chartData"
        :options="chartOptions"
    />
            
</template>

<script>
import {GChart} from 'vue-google-charts'
export default {
    components:{
        GChart
    },
    props: {
        callData: null
    }
    ,data(){
        return {
            // Array will be automatically processed with visualization.arrayToDataTable function
            chartData: [],
            chartOptions: {
                title: 'Trạng thái cuộc hẹn',
                slices: {
                    1: { color: '#48b8f9' },
                    0: { color: '#feca90' }
                }
            },
        }
    },
    created(){
       this.showChart()
    },
    watch: {
        callData: function(){
            this.showChart()
        }
    },
    methods: {
        showChart(){
            let callStatus = {
                '6': 0 ,//Đã duyệt
                '10': 0 //Đã báo cáo

            }
            for(let i = 0; i < this.callData.length; i++){
                if(this.callData[i].status === '6'){
                    callStatus['6'] += 1
                }else {
                    callStatus['10'] += 1
                }
            }

            this.chartData = [
                ['Trạng thái', 'Số lượng'],
                ['Đã duyệt',     callStatus['6']],
                ['Đã báo cáo',      callStatus['10']]
            ]
        }
    }

}
</script>

<style lang="scss" scoped>
    .m-chart{
        padding: 10px;
        max-height: 35vh;
    }
</style>

