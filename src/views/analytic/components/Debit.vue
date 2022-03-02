<template>
    <div class="debit-container">
        <el-card>
            <div slot="header">
                <span>Công nợ</span>
                <el-button style="padding: 3px 0 ; float:right" type="text" @click="showDetail" >{{setBtnText}}</el-button>
            </div>
            <div class="debit-detail" v-if="isDetail">
                <el-table :data="tableData">
                    <el-table-column
                    min-width="100"
                    prop="code"
                    label="Mã sản phẩm"></el-table-column>
                    <el-table-column
                    min-width="100"
                    prop="time"
                    label="Thời gian"></el-table-column>
                    <el-table-column
                    min-width="100"
                    prop="type"
                    label="Loại"></el-table-column>
                    <el-table-column
                    min-width="100"
                    prop="customer"
                    label="Khách hàng"></el-table-column>
                    <el-table-column
                    min-width="100"
                    prop="amount"
                    label="Số tiền"></el-table-column>
                </el-table>
            </div>
            <div class="debit-chart" v-else>Tong quat</div>
            
        </el-card>
    </div>
</template>

<script>
import {getInfo} from '@/api/user'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { parseTime } from '@/utils/index'
import { getIdUser } from '@/utils/auth'
import {getDebt} from '@/api/analytic'

export default {
    data(){
        return {
            isDetail: false,
            tableData: [
                {
                    code: 'No_12232312313',
                    time: '2019-12-12 12:12:12',
                    type: 'KD',
                    customer: 'Benh vien Abc ,Khoa XYZ',
                    amount: 100000000
                }
            ]
        }
    },
    props: {
        startDate: '',
        endDate: '',
    },
    methods:{
        fetchData(){
            var postData = {
                id: getIdUser(),
                startDate: this.startDate,
                endDate: this.endDate
            }

            getDebt(postData).then(response => {
                console.log(response)
                // this.callData = response.Data
            
                // this.$emit('exportNumberOfCall', this.callData.length)
            })
        },
        showDetail(){
            this.isDetail = !this.isDetail
            this.fetchData()
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
    created() {
        this.fetchData()
        console.log('IDUSER', getIdUser())
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
.debit-container{
    margin-bottom: 15px;
}
</style>

