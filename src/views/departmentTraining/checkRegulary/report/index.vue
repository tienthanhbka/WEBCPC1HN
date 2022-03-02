<template>
<div class="container">
    <div class="header-container">
        <el-button type="success" @click="onModalReport">
            <i class="fas fa-file-upload"/>
            Báo cáo
        </el-button>
    </div>
    <report-modal modalId='new-report-modal'></report-modal>
    <div class="content-container">
    <el-table
    v-loading="listLoading" 
    :data="examList" 
    element-loading-text="Loading"
    @expand-change="expandRow"
    border
    highlight-current-row>
            <el-table-column  min-width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.infoCompetition }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Mã báo cáo" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.infoCompetition }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Nhóm" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.timeStart }}</span>
                </template>
            </el-table-column>
            
            <el-table-column label="Ngày kiểm tra" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.timeEnd }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Tháng" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.idTeacher }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Người báo cáo" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.idTeacher }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Trạng thái" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.idTeacher }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
import reportModal from '@/views/departmentTraining/checkRegulary/report/component/modal/reportModal'
export default {
    components: {reportModal},
    methods:{
        onModalReport(){
            VoerroModal.show('new-report-modal');
        }
    }
}
</script>


<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
    padding: 10px 20px;
    background-color: $bg;
    min-height: 100vh;
    margin-bottom: 5px;

    .header-container {
    display: inline-block;
    margin-bottom: 5px;
    }

    .table-pagination {
        margin-top: 10px
    }     
}  
</style>

