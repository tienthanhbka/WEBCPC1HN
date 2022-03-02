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
            
            chartData: [],
            chartOptions: {
                chart: {
                    title: 'Company Performance',
                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                },
                bar:'vertical',
                title:'Thống kê cuộc hẹn theo giờ',
                bar: {groupWidth: "90%"},
                legend: {position: 'top', maxLines: 2},
                series: {
                    0: { color: '#48b8f9' }, 
                    
                }

            }
        }
    },
    props: {
        callData: null
    },
    methods: {
        showChart(){
            let callByHours =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

            for( let i = 0; i < this.callData.length; i++){
                let hour = new Date(this.callData[i].timeCheckIn).getHours()
                callByHours[hour] += 1
            }

            this.chartData = [
                ['Giờ', 'Số cuộc hẹn    '],
                ['6h',  callByHours[6]],
                ['7h',  callByHours[7]],
                ['8h',  callByHours[8]],
                ['9h',  callByHours[9]],
                ['10h', callByHours[10]],
                ['11h', callByHours[11]],
                ['12h', callByHours[12]],
                ['13h', callByHours[13]],
                ['14h', callByHours[14]],
                ['15h', callByHours[15]],
                ['16h', callByHours[16]],
                ['17h', callByHours[17]],
                ['18h', callByHours[18]],
                ['19h', callByHours[19]],
                ['20h', callByHours[20]],
            ]

        }
    },
    created(){
        this.showChart()
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

