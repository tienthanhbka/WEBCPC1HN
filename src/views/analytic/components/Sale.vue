<template>
    <div class="sale-container">
        <el-card>
            <div slot="header">
                <span>Doanh số</span>
                <el-button style="padding: 3px 0 ; float:right" type="text" @click="showDetail" >{{setBtnText}}</el-button>
            </div>
            <div class="sale-detail" v-if="isDetail">
                <el-table :data="dataTable">
                    <el-table-column
                    min-width="100"
                    prop="time"
                    label="Thời gian"></el-table-column>
                    <el-table-column
                    min-width="200"
                    prop="address"
                    label="Địa điểm"></el-table-column>
                    <el-table-column
                    min-width="100"
                    prop="product"
                    label="Sản phẩm"></el-table-column>
                    <el-table-column
                    min-width="100"
                    prop="type"
                    label="Loại"></el-table-column>
                    <el-table-column
                    min-width="100"
                    prop="count"
                    label="Số lượng"></el-table-column>
                    <el-table-column
                    min-width="100"
                    prop="amount"
                    label="Số tiền"></el-table-column>  
                </el-table>
            </div>
            <div class="sale-chart" v-else>
                <GChart class="m-chart"
                    type="ColumnChart"
                    :data="chartData"
                    :options="chartOptions"
                />
            </div>
            
        </el-card>
    </div>
</template>

<script>
import { getSales } from '@/api/analytic'
import {GChart} from 'vue-google-charts'
import { parseTime } from '@/utils/index'
import { getIdUser } from '@/utils/auth'

export default {
    components: {
        GChart
    },
    data(){
        return {
            isDetail: false,
            dataTable:[],
            salesData: [],
            amountSales: 0,
            chartData : [],
            chartOptions: {
                isStacked: true,
                height: 300,
                legend: {position: 'top', maxLines: 2},
            }
        }
    },
    props: {
        startDate: '',
        endDate: ''
    },
    methods:{
        showDetail(){
            this.isDetail = !this.isDetail
        },
        fetchData(){
            var postData = {
                id: getIdUser(),
                startDate: this.startDate,
                endDate: this.endDate
            }
            this.tableData = []
            getSales(postData).then(response => {
                var arrAT = []
                var arrCB = []
                var arrKD = []
                var arrPM = []
                var arrTH = []
                var arrTM = []

                var arrCK = []
                var arrQT = []
                var arrTB = []
                var arrTD = []
                var arrTitle = []

                let temp = new Date(this.startDate)
                let endDate = new Date(this.endDate)
                while(temp < endDate){
                    arrTitle.push(parseTime(temp, '{y}-{m}-{d}'))
                    arrAT.push(0)
                    arrCB.push(0)
                    arrKD.push(0)
                    arrPM.push(0)
                    arrTH.push(0)
                    arrTM.push(0)
                    arrCK.push(0)
                    arrQT.push(0)
                    arrTB.push(0)
                    arrTD.push(0)
                    temp = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 1)
                }

                this.salesData = response.Data
                for(let i = 0; i < this.salesData.length; i++){
                    this.chartData = []
                    let amount = Math.ceil(parseFloat(this.salesData[i].amoutVAT))
                    this.amountSales += amount
                    this.dataTable.push({
                        time: this.salesData[i].orderDate,
                        address: this.salesData[i].billAddress,
                        product: this.salesData[i].Description,
                        type: this.salesData[i].billCustomerTemplateCode,
                        count: Math.ceil(parseFloat(this.salesData[i].Quantity)),
                        amount: amount
                    })


                    let code = this.salesData[i].billCustomerTemplateCode
                    let date = parseTime(new Date(this.salesData[i].orderDate), '{y}-{m}-{d}')
                    let index = arrTitle.indexOf(date)
                    
                    switch (code) {
                        case 'AT':
                            arrAT[index] += amount
                            break;
                        case 'CB':
                            arrCB[index] += amount
                            break;
                        case 'KD':
                            arrKD[index] += amount
                            break;
                        case 'PM':
                            arrPM[index] += amount
                            break;
                        case 'TH':
                            arrTH[index] += amount
                            break;
                        case 'TM':
                            arrTM[index] += amount
                            break;
                        case 'CK':
                            arrTM[index] += amount
                            break;
                        case 'QT':
                            arrTM[index] += amount
                            break;
                        case 'TB':
                            arrTM[index] += amount
                            break;
                        case 'TD':
                            arrTM[index] += amount
                            break;
                        
                        default:
                            break;
                    }


                }

                this.chartData.push(['Ngay ', 'AT', 'CB', 'KD', 'PM','TH', 'TM','CK','QT','TB','TD'])
                for(let i = 0; i < arrAT.length; i++){
                    this.chartData.push([arrTitle[i],arrAT[i],arrCB[i],arrKD[i],arrPM[i],arrTH[i],arrTM[i],arrCK[i],arrQT[i],arrTB[i],arrTD[i]])
                }

                this.$emit('exportAmountSales',Math.ceil(this.amountSales))
            })
        }
    },
    computed:{
        setBtnText(){
            if(this.isDetail){
                return 'Tổng quát'
            }
            return 'Chi tiết'
        }
    },
    created(){
        this.fetchData()
    },
    watch: {
        startDate: function(){
            this.fetchData()
        },
        endDate: function(){
            this.fetchData()
        }
    }

}
</script>

<style lang="scss" scoped>
.sale-container{
    margin-bottom: 15px;
}
</style>

