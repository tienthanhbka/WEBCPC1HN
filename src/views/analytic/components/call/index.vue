<template>
    <div class="mission-container">
        <el-card shadow="never">
            <div slot="header">
                <span>Cuộc hẹn</span>
                <el-button style="padding: 3px 0; float:right" type="text"  @click="showDetail">{{setBtnTitle}}</el-button>
            </div>
            <div v-if="isDetail">
                <call-detail
                :callData="exportCallData"></call-detail>
            </div>
            <div v-else>
                <el-row>
                    <el-col class="item" :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
                        <call-by-hour
                        :callData="exportCallData"></call-by-hour>
                    </el-col>
                    <el-col class="item" :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
                        <call-by-day
                        :callData="exportCallData"></call-by-day>
                    </el-col>
                    <el-col class="item" :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
                        <call-status style="margin-top: 30px"
                        :callData="exportCallData"></call-status>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
import CallDetail from "./CallDetail";
import CallByDay from './CallByDay'
import CalllByHour from './CallByHour'
import CallStatus from './CallStatus'
import {getCall} from '@/api/analytic'
import { getIdUser } from '@/utils/auth'
import { constants } from 'crypto';

export default {
    components:{
        'call-detail': CallDetail,
        'call-by-day': CallByDay,
        'call-by-hour': CalllByHour,
        'call-status': CallStatus
    },
    data(){
        return {
            isDetail: false,
            callData: [],
        }
    },
    props: {
        startDate:'',
        endDate:''
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

            getCall(postData).then(response => {
                console.log(response)
                this.callData = response.Data
            
                this.$emit('exportNumberOfCall', this.callData.length)
            })
        }
    },
    computed:{
        setBtnTitle(){
            if(this.isDetail){
                return 'Tổng quan'
            }
            return 'Chi tiết'
        },
        exportCallData(){
            return this.callData
        }
    },
    watch: {
        startDate: function(){
            this.fetchData()
        },
        endDate: function(){
            this.fetchData()
        }
    },
    created() {
        this.fetchData()
    }
}
</script>

<style lang="scss" scoped>
.mission-container{
    margin-bottom: 15px
}
</style>
