<template>
    <div class="overview-container">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="6">
                <el-card shadow="nerver" class="overview-item">
                    <img class="image" src="@/assets/img/call.png" alt="call">
                    <div class="content">
                        <div class="title">Số cuộc hẹn</div>
                        <div class="value">{{numberOfCall}}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
                <el-card shadow="nerver" class="overview-item">
                    <img class="image" src="@/assets/img/mission.png" alt="mission">
                    <div class="content">
                        <div class="title">Số nhiệm vụ</div>
                        <div class="value">{{numberOfMission}}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
                <el-card shadow="nerver" class="overview-item">
                    <img class="image" src="@/assets/img/sales.png" alt="sales">
                    <div class="content">
                        <div class="title">Doanh số</div>
                        <div class="value">{{amountSales}}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
                <el-card shadow="nerver" class="overview-item">
                    <img class="image" src="@/assets/img/debt.png" alt="debt">
                    <div class="content">
                        <div class="title">Công nợ</div>
                        <div class="value">{{amountDebt}}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: {
        numberOfCall: 0,
        numberOfMission: 0,
        amountSales: 0,
        amountDebt: 0
    },
    components: {
    }
}
</script>

<style lang="scss" scoped>
    .overview-container{
        /* margin: 30px; */
        height: 30px;

        .overview-item{
            height: 120px;
            background: #fff;
            margin-bottom: 15px !important;
            .image{
            float: left;
            width: 80px;
            height: 80px;
            vertical-align: center;
            background-color:#48b8f9;
            border-radius: 10px;
            padding: 15px;
            }

            .content{
                float:right;
                height: 80px;
                // max-width: 100px;

                .title{
                    font-size: 16px;
                    color: darkgray;
                    font-style: bold;
                }

                .value{
                    font-size: 20px;
                    margin-top:10px;
                    color: rgba(0, 0, 0, 0.7);
                    font-style: bold;
                }
            }
            
        }
    }
</style>
