<template>
    <div>
        <div>
            <el-button @click="create" type="success">Thêm hồ sơ</el-button>
        </div>
        <el-table v-loading="listLoading"
         :data="ReportMarketLst"
          element-loading-text="Loading"
         border
        highlight-current-row>
            <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1)  }}
          </template>

        </el-table-column>

          <el-table-column align="center" width="155px" label="Action">
          <template slot-scope="scope">
            <el-button-group>
                 <el-tooltip content="Chỉnh sửa"> <el-button @click="edit(scope.row)" size="mini" type="warning" ><i class="far fa-edit"></i></el-button></el-tooltip>
                  <el-tooltip content="Xóa"> <el-button @click="del(scope.row)" size="mini" type="danger" ><i class="far fa-trash-alt"></i></el-button></el-tooltip>
            
            </el-button-group>
          </template>
        </el-table-column>
        
              <el-table-column label="Tên ý tưởng"  min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.IdeaName }}</span>
                </template>
            </el-table-column>
               <el-table-column label="Nội dung"  min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.IdeaContent }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Hoạt chất"  min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.ActiveElement }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Cách bào chế"  min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Preparation }}</span>
                </template>
            </el-table-column>
              <el-table-column label="Mô tả thêm"  min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.MoreInfo }}</span>
                </template>
            </el-table-column>
             
              <el-table-column label="Khởi tạo" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.TimeCreate }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Trạng thái" align="right" min-width="100">
                <template slot-scope="scope">
                      <el-tag
                    :type="scope.row.Status | ideaStatusColor">
                    {{ scope.row.Status | ideaStatusText}}
                    </el-tag>
                </template>
            </el-table-column>
             
           
        </el-table>

          <el-dialog title="Thêm/ Chỉnh sửa hồ sơ" :visible.sync="dialogFormUpdate">
        <create :idea="rowData"  @createIdeaOK="addOK" @updateIdeaOK="updateOK" ></create>
        
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>

       <el-dialog title="Xóa hồ sơ" :visible.sync="dialogFormDel">
        <delete :idea="rowData"   @delIdeaOK="delOK" ></delete>  
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
    </div>
</template>
<script>
import { GetReportMarketByIdea } from '@/api/reportRD'
import Create from '@/views/RD/idea/component/updateIdea'
import Delete from '@/views/RD/idea/component/deleteIdea'
import Cookies from 'js-cookie'
export default {
    components: { Create,Delete },
    data(){
        
        return{
            ReportMarketLst:[],
            rowData:'',
            listLoading: false,
            dialogFormUpdate: false,
            dialogFormDel: false
        }
    }
    ,methods:{
        addOK(form){
                this.dialogFormUpdate= false
                this.fetchData()
        },
        updateOK(){
             this.dialogFormUpdate= false
                //this.fetchData()
        },
        create(){
            this.rowData=null
            this.dialogFormUpdate= true
        },
          edit(row){
              this.rowData=row
            this.dialogFormUpdate= true
        },
           del(row){
              this.rowData=row
            this.dialogFormDel= true
        },
        delOK(){
            this.dialogFormDel= false
            this.fetchData()
        },
        fetchData(){
            this.listLoading= true
            GetReportMarketByIdea({
                Token: Cookies.get('token'),
                UserName: Cookies.get('idEmployee'),
                IdeaId: this.$route.params.id
            }).then(res=>{
                this.ReportMarketLst = res.ReportMarketLst
                this.listLoading=false
            })
        },
      
    },
    created(){
        this.fetchData()
    },
    watch:{

    }
}
</script>
<style>
.el-autocomplete {
    position: relative;
    display: inline-block;
    width: 100%;
}
@media screen and (max-width: 600px){
.el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 95%;
}
}

</style>