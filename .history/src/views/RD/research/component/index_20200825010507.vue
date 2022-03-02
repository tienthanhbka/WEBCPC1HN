<template>
  <div class="container">
    <div class="inline-block">
      <el-button @click="createResearch" type="success" icon="fas fa-plus-circle"> Thêm đề xuất</el-button>
    </div>
     <!-- <transition name="el-fade-in-linear">
        <div v-show="show" class="transition-box" style="border: 2px Dashed #ccc; margin:10px;">
        <create-research
        :idea="rowData"
        @cancelForm="cancelForm"
        @addResearched="addResearched"
      ></create-research>
    </div>
    </transition>
    <span></span> -->
    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      :data="ResearchLst"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
       <el-table-column min-width="60px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1}}
              <el-tooltip content="Chỉnh sửa">
                  <el-button @click="editResearch(scope.row)" type="text"
                    ><i class="far fa-edit"></i></el-button
                ></el-tooltip>
                <el-tooltip content="Xóa">
                  <el-button @click="delResearch(scope.row)" type="text" style="color:red;"
                    ><i class="far fa-trash-alt"></i></el-button
                ></el-tooltip>
            </div>
          </template>
        </el-table-column>
      <el-table-column label="Mã sản phẩm" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã sản phẩm">
          <span>{{ scope.row.ProductId }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Tên sản phẩm" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên sản phẩm">
          <span>{{ scope.row.ProductName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Hoạt chất chính" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Hoạt chất chính">
          <span>{{ scope.row.ActiveElement }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Hàm lượng" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Hàm lượng">
          <span>{{ scope.row.Concentration }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Dạng đóng gói" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Dạng đóng gói">
          <span>{{ scope.row.Packing }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Link báo cáo" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Link báo cáo">
          <span>{{ scope.row.LinkReport }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" min-width="100" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
         <el-tag :type="scope.row.Status | ideaStatusColor">
                {{ scope.row.Status | ideaStatusText }}
              </el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormCreate" custom-class="medium-modal">
      <span slot="title" style="font-weight:700;"
        ><i class="fas fa-capsules"></i> &#32;&#32;Đề xuất sản phẩm
      </span>
      <create-research
        modalId="new-research-modal"
        :research="rowData"
        :idea="IdeaId"
        @addResearched="addResearched"
        @updateResearched="updateResearched"
        @cancelForm="cancelForm"
      ></create-research>
    </el-dialog>
    <el-dialog title="Xóa nghiên cứu" :visible.sync="dialogFormDel">
      <delete :research="rowData" @delResearchOK="delOK"></delete>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
import { GetIdeaById } from "@/api/idea"
import { GetResearchByIdea, RemoveResearch } from "@/api/research"
import CreateResearch from "@/views/RD/research/component/createResearch"
import Delete from "@/views/RD/research/component/deleteResearch"
import Cookies from "js-cookie"
export default {
  components: { CreateResearch, Delete },
  data() {
    return {
      ResearchLst: [],
      rowData: "",
      listLoading: false,
      dialogFormCreate: false,
      dialogFormDel: false,
      UserName: Cookies.get('idEmployee'),
      Token: Cookies.get('token'),
      IdeaId: this.$route.params.id,
      IdeaName:''
    }
  },
  methods: {
    // addOK(form) {
    //   this.dialogFormUpdate = false
    //   this.fetchData()
    // },
    // updateOK() {
    //   this.dialogFormUpdate = false
      
    // },
    createResearch() {
      this.rowData = null
      this.dialogFormCreate = true
    },
    addResearched(){
      this.dialogFormCreate = false
      this.fetchData()
    },
    editResearch(row) {
      this.rowData = row
      this.show = true
    },
    cancelForm(){
      this.dialogFormCreate = false
    },
    delResearch(row) {
      this.$confirm('Xác nhận xóa đề xuất '+row.ProductName+'. Continue?', 'Xóa đề xuất', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy',
          type: 'error'
        }).then(() => {
           var rep ={
                Token: this.Token,
                UserName: this.UserName,
                ResearchId: row.ResearchId
            }
          RemoveResearch(rep).then(res=>{
            if(res.RespCode == 0){
              this.$message({
                  message:'Xóa đề xuất thành công',
                  type: 'success'
              })
              this.fetchData()
            }
            else{
              this.$message({
                  message: res.RespText,
                  type: 'warning'
              })
            }
          })
          }).catch(() => {
                    
          });
    },
    delOK() {
      this.dialogFormDel = false
      //this.fetchData()
    },
    fetchData() {
      var req = {
        Token: this.Token,
        UserName: this.UserName,
        IdeaId: this.IdeaId
      }
      this.listLoading = true
      GetResearchByIdea(req).then(res1 => {
        if(res1.RespCode == 0){
          this.ResearchLst = res1.ResearchLst
        }
        this.listLoading = false
      })
      GetIdeaById(req).then(res2 => {
        if(res2.RespCode == 0){
          this.IdeaName = res2.IdeaInfo.IdeaName
        }
      })
    },
    addResearched(){
      this.show = false
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
    
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
.container {
  padding: 5px;
  background-color: #e9ebee;
  min-height: 100vh;
}
.inline-block {
  display: inline-block;
  max-width: 100vh;
  padding: 5px 0px;
}
</style>

