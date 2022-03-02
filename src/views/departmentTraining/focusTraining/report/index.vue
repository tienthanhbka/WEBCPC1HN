<template>
<div class="container">
    <div class="header-container">
        <el-button type="success" @click="onModalReport">
            <i class="fas fa-plus"/>
            Tạo lịch
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
            <el-table-column label="Chủ đề" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.infoCompetition }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Diễn giả" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.timeStart }}</span>
                </template>
            </el-table-column>
            
            <el-table-column label="Thời gian" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.timeEnd }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Địa điểm" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.idTeacher }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hình thức" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.idTeacher }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Tài liệu" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.idTeacher }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Ghi chú" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.idTeacher }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
import reportModal from '@/views/departmentTraining/focusTraining/report/component/modal/reportModal'
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

