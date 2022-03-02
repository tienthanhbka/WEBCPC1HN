<template>
    <el-table
    :data="tableData">
        <el-table-column
        min-width="100px"
        prop="checkin"
        label="Checkin">
        </el-table-column>

        <el-table-column
        width="100px"
        prop="checkout"
        label="Checkout">
        </el-table-column>

        <el-table-column
        min-width="200px"
        prop="plan"
        label="Kế hoạch">
        </el-table-column>

        <el-table-column
        min-width="200px"
        prop="mission"
        label="Nhiệm vụ">
        </el-table-column>

        <el-table-column
        min-width="200px"
        prop="customer"
        label="Khách hangf">
        </el-table-column>

        <el-table-column
        min-width="200px"
        prop="address"
        label="Địa điểm">
        </el-table-column>

        <el-table-column
        min-width="100px"
        prop="status"
        label="Trạng thái">
        </el-table-column>
        
    </el-table>
</template>

<script>
export default {
    props: {
        callData: null
    },
    data(){
        return {
            tableData:[],
            callStatus : {
                '6': 'Đã duyệt',
                '10': 'Đã báo cáo'
            }
        }
    },
    methods: {
        showTable(){
            this.tableData = []
            for( let i = 0; i < this.callData.length; i++){
                this.tableData.push({
                    checkin: this.callData[i].timeCheckIn,
                    checkout: this.callData[i].timeCheckOut,
                    plan: this.callData[i].plan,
                    mission: this.callData[i].nameMission,
                    customer: this.callData[i].nameCustomer,
                    address: this.callData[i].namePlace,
                    status: this.callStatus[this.callData[i].status]   ,
                })
            }
        }
    },
    watch: {
        callData: function(){
            this.showTable()
        }
    },
    created(){
        this.showTable()
    }

}
</script>

<style lang="scss" scoped>
</style>

