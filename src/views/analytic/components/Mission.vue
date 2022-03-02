<template>
    <div class="mission-container">
        <el-card>
            <div slot="header">
                <span>Nhiệm vụ</span>
                <el-button style="padding: 3px 0 ; float:right" type="text" @click="showDetail" >{{setBtnText}}</el-button>
            </div>
            <div class="mission-detail" v-if="isDetail">
                <el-table :data="tableData">
                    <el-table-column min-width="50"
                    prop="index"
                    label="">
                    </el-table-column>
                    <el-table-column min-width="100"
                    prop="time"
                    label="Thời gian">
                    </el-table-column>
                    <el-table-column min-width="100"
                    prop="deadline"
                    label="Hạn chót">
                    </el-table-column>
                    <el-table-column min-width="200"
                    prop="type"
                    sortable
                    label="Loại nhiệm vụ"
                    >
                    </el-table-column>
                    <el-table-column min-width="200"
                    prop="title"
                    label="Tiêu đề">
                    </el-table-column>
                    <el-table-column min-width="200"
                    prop="target"
                    label="Mục tiêu">
                    </el-table-column>
                    <el-table-column min-width="100"
                    prop="status"
                    label="Trạng thái">
                    </el-table-column>
                </el-table>
            </div>
            <div class="mission-chart" v-else>
                <GChart
                type="PieChart"
                :data="chartData"
                :options="chartOptions"
                />
            </div>
            
        </el-card>
    </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import axios from 'axios'
import { getMission } from '@/api/analytic'
import { getIdUser } from '@/utils/auth'
export default {
    components:{
        GChart
    },
    props: {
        startDate: '',
        endDate: ''
    }
    ,data(){
        return {
            isDetail: false,
            chartData: [],
            chartOptions: {
                title: 'Thống kê nhiệm vụ',
                height: 300,
                slices: {
                    0: { color: '#48b8f9' },
                    1: { color: '#feca90' }
                }
            },
            missionStatus: {
                '1': 'Tự tạo',
                '2': 'Quản lí tạo'
            },
            tableData: [],
            missionsData:[],
        }
    },
    created() {
        this.fetchData()
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
            var numberOfMissionType1 = 0
            var numberOfMissionType2 = 0
            this.tableData = []
            getMission(postData).then(response => {
                this.missionsData = response.Data
                this.$emit('exportNumberOfMission', this.missionsData.length)

                for(let i = 0; i < this.missionsData.length; i ++){
                    let mission = this.missionsData[i]
                    if(mission.status === '1'){
                        numberOfMissionType1 += 1
                    }else {
                        numberOfMissionType2 += 1
                    }
                    this.tableData.push({
                        index: i + 1,
                        deadline: mission.deadline,
                        time: mission.time,
                        type: mission.typeMission,
                        title: mission.title,
                        target: mission.target,
                        status: this.missionStatus[mission.status]
                    })
                }

                this.chartData = [
                    ['Trang thai', 'Số lượng'],
                    ['Tự tạo',numberOfMissionType1],
                    ['Quản lí tạo',numberOfMissionType2]
                ]
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
    watch: {
        startDate:function() {
            this.fetchData()
        },
        endDate: function(){
            this.fetchData()
        }
    }

}
</script>

<style lang="scss" scoped>

.mission-container{
    margin-bottom: 15px;
}

.mission-chart{
    max-height: 35vh;
}

</style>

