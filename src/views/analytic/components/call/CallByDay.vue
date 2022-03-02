<template>
    <GChart class="m-chart"
        type="ColumnChart"
        :data="chartData"
        :options="chartOptions"
    />
            
</template>

<script>
import {GChart} from 'vue-google-charts'
export default {
    components:{
        GChart
    }
    ,data(){
        return {
            // Array will be automatically processed with visualization.arrayToDataTable function
            chartData: [],
            chartOptions: {
                bar:'vertical',
                title:'Thống kê cuộc hẹn theo ngày',
                bar: {groupWidth: "95%"},
                legend: {position: 'top', maxLines: 2},
                series: {
                    0: { color: '#48b8f9' }, 
                    
                }
            },
        }
    },
    props: {
        callData: null
    },
    created(){
        // console.log(new Date().getDay())
        this.showChart()
    },
    methods: {
        showChart(){
            var callByDay = [0,0,0,0,0,0,0]
            for( let i = 0; i < this.callData.length; i++){
                let day = new Date(this.callData[i].timeCheckIn).getDay()
                callByDay[day] += 1 
            }

            this.chartData = [
                ['Thứ', 'Số cuộc hẹn'],
                ['T2', callByDay[0]],
                ['T3', callByDay[1]],
                ['T4', callByDay[2]],
                ['T5', callByDay[3]],
                ['T6', callByDay[4]],
                ['T7', callByDay[5]],
                ['CN', callByDay[6]],
            ]
        }
    },
    watch: {
        callData: function(){
            this.showChart()
        }
    }
}
</script>

<style lang="scss" scoped>
    .m-chart{
        max-height: 35vh;
        padding: 10px;
    }
</style>

