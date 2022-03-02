<template>
  <div class= "container">
      <div class="inline-block">
        <el-date-picker
          v-model="TimeStart"
          type="date"
          placeholder="Từ ngày"
          size="mini"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-date-picker 
        v-model="TimeEnd" 
        type="date" 
        placeholder="Đến ngày"
        size="mini">
        </el-date-picker>
      </div>
      <div class="inline-block" style="float:right;">
        <el-button
          :loading="downloading"
          type="success"
          @click="ExportExcel"
          icon="el-icon-document"
          class="inline-block"
          plain
          size="mini"
          >Xuất danh sách</el-button
        >
      </div>
      <div style="float:right;" class="inline-block">
        <el-button 
        @click="show = !show"
        type="primary" 
        plain icon="fas fa-plus-circle"
        size="mini"
        >Thêm ý tưởng</el-button>
      </div>
      <transition name="el-fade-in-linear">
         <div v-show="show" class="transition-box" style="border: 2px Dashed #ccc; margin:10px;">
         <create
          :idea="rowData"
          @createIdeaOK="addOK"
          @updateIdeaOK="updateOK"
          @cancelForm="cancelForm"
        ></create>
      </div>
      </transition>
      <div class="body">
      <el-divider></el-divider>
      <el-table
        class="el-mobile-table"
        v-loading="listLoading"
        :data="IdeaLst"
        style="width: 100%"
        border
        fit
        :header-row-style="{color:'#1c456f'}"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column width="75px" label="STT" prop="STT">
         
        </el-table-column>
        <!-- <el-table-column label="Trạng thái" align="right" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag :type="scope.row.Status | missionStatusColor">
                {{ scope.row.Status | missionStatusText }}
              </el-tag>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="Mã sản phẩm" min-width="90" prop="MSP">
          
        </el-table-column>

        <el-table-column label="Phân nhóm" min-width="100" prop="PN">
          
        </el-table-column>
        <el-table-column label="Tình trạng" min-width="100" prop="TT">
          
        </el-table-column>
        <el-table-column label="Dạng bào chế" min-width="100" prop="DBC">
          
        </el-table-column>
        <el-table-column label="Nhóm dược lý" min-width="100" prop="NDL">
          
        </el-table-column>
        <el-table-column label="Người order" min-width="100" prop="NOD">
          
        </el-table-column>
        <!-- <el-table-column label="Action" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Action">
               <el-tooltip placement="top" effect="light">
              <div slot='content'>{{scope.row.MoreInfo}}</div>
              <el-button
                size="mini"
                type="success"
                @click="downloadMoreInfo(scope.row)"
                plain
                ><i class="fas fa-download"></i>
              </el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column width="155px" label="Action">
          <template slot-scope="scope">
            <div class="dat-cell" label="Action">
              <el-button-group>
                <el-tooltip content="Chỉnh sửa">
                  <el-button @click="edit(scope.row)" type="text" style="color:#e6a23c;"
                    ><i class="el-icon-edit"></i></el-button
                ></el-tooltip>
                <!-- <el-tooltip content="Chỉ xem">
                  <el-button @click="del(scope.row)" type="text" style="margin-left:10px;"
                    ><i class="el-icon-view"></i></el-button
                ></el-tooltip> -->
                <el-tooltip content="Xóa">
                  <el-button @click="del(scope.row)" type="text" style="margin-left:10px;color:#f78989;"
                    ><i class="el-icon-error"></i></el-button
                ></el-tooltip>
                <el-tooltip content="Yêu cầu">
                  <el-button @click="message(scope.row)" type="text" style="margin-left:10px;"
                    ><i class="far fa-comment-dots"></i></el-button
                ></el-tooltip>
                <el-tooltip content="Phê duyệt">
                  <el-button @click="Save(scope.row)" type="text" style="margin-left:10px;color:green;"
                    ><i class="el-icon-circle-check"></i></el-button
                ></el-tooltip>
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <Message modalId="new-message-modal"></Message>
      <el-dialog title="Phê duyệt ý tưởng" :visible.sync="dialogFormAccept">
        <accept :idea="rowData" @acceptOK="acceptOK"></accept>
        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog>
      <el-dialog
        title="Thêm/ Chỉnh sửa ý tưởng"
        :visible.sync="dialogFormUpdate"
      >
        <create
          :idea="rowData"
          @createIdeaOK="addOK"
          @updateIdeaOK="updateOK"
          @updatecancelOK="UpdateCancelOK"
        ></create>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
      <el-dialog title="Xóa ý tưởng" :visible.sync="dialogFormDel">
        <delete
          :idea="rowData"
          @delIdeaOK="delOK"
          @deletecancelOK="DeleteCancelOK"
        ></delete>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
      <el-pagination
        class="pagination"
        :total="dataLength"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="fetchData"
        background
        layout="total,-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>
</template>
<script>
import { GetIdeaByUser } from "@/api/idea"
import { getStartDate, getEndDate } from "@/api/index"
import Accept from "@/views/RD/idea/admin/component/acceptIdea"
import Create from "@/views/RD/idea/component/updateIdea"
import Delete from "@/views/RD/idea/component/deleteIdea"
import Message from "@/views/RD/idea/component/message"
import Cookies from "js-cookie"
import baseUrl from "@/utils/baseURLRD"
import { parseTime } from '@/utils'
export default {
  components: { Create, Delete, Accept,Message },
  data() {
    return {
      IdeaLst: [{
        STT: '1',
        MSP: 'RD0001',
        PN: 'Mỹ Phẩm',
        TT:'Chưa duyệt',
        DBC:'Dung dịch tiêm',
        NDL:'A01A D',
        NOD: 'Nguyễn Tiến Thành'
      },
      {
        STT: '2',
        MSP: 'RD0002',
        PN: 'Thực Phẩm Chức Năng',
        TT:'Chưa duyệt',
        DBC:'Dung dịch uống',
        NDL:'A01A B',
        NOD: 'Nguyễn Tiến Thành'
      },
      {
        STT: '3',
        MSP: 'RD0003',
        PN: 'Thuốc',
        TT:'Hủy',
        DBC:'Dung dịch nhỏ mắt',
        NDL:'A01A C',
        NOD: 'Nguyễn Tiến Thành'
      }
      ],
      admin: false,
      rowData: "",
      listLoading: false,
      dialogFormAccept: false,
      dialogFormUpdate: false,
      dialogFormDel: false,
      TimeStart: getStartDate(),
      TimeEnd: getEndDate(),
      fileList: "",
      currentPage: 1,
      dataLength: 10,
      pageSize: 2,
      downloading: false,
      show: false,
      
    }
  },
  methods: {
    acceptIdea(row) {
      this.dialogFormAccept = true
      this.rowData = row
    },
    acceptOK() {
      this.dialogFormAccept = false
    },
    cancelForm() {
      this.show = false
    },
    DeleteCancelOK() {
      this.dialogFormDel = false
    },
    addOK(form) {
      this.dialogFormUpdate = false
      this.fetchData()
      // var sta = {
      //     ActiveElement: form.ActiveElement,
      //     CreaterId: form.CreaterId,
      //     DocumentId: form.DocumentId,
      //     IdeaContent: form.IdeaContent,
      //     IdeaName: form.IdeaName,
      //     MoreInfo: form.MoreInfo,
      //     Preparation: form.Preparation,
      //     Status: 1,
      //     TimeApprove: "",
      //     TimeCreate: "",
      //     TimeUpdate: "",
      //     UpdateId: "",
      // }
      //  this.IdeaLst.push(sta)
    },
    updateOK() {
      this.fetchData()
      this.dialogFormUpdate = false
    },
    create() {
      this.rowData = null
      this.dialogFormUpdate = true
    },
    edit(row) {
      this.$message({
        message:'Tính năng này đang được phát triển',
        type:'warning'
      })
    },
    del(row) {
      this.rowData = row
      this.dialogFormDel = true
    },
    delOK() {
      this.dialogFormDel = false
      this.fetchData()
    },
    Save(){
      this.$message({
        message:'Tính năng này đang được phát triển',
        type:'warning'
      })
    },
    message(){
      VoerroModal.show("new-message-modal")
    },
    ExportExcel() {
      this.downloading = true
      const tHeader = [
        "Mã ý tưởng",
        "Tên ý tưởng",
        "Nội dung",
        "Hoạt chất",
        "Cách bào chế",
        "Thời gian tạo",
        "Trạng thái"
      ]
      const filterHeader = [
        "DocumentId",
        "IdeaName",
        "IdeaContent",
        "ActiveElement",
        "Preparation",
        "TimeCreate",
        "Status"
      ]
      GetIdeaByUser({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd
      }).then(response => {
        var data = response.IdeaLst

        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách ý tưởng từ "+parseTime(this.TimeStart,'{d}-{m}-{y}').substring(0,10)+' đến '+parseTime(this.TimeEnd,'{d}-{m}-{y}'), //Optional
            autoWidth: true,
            bookType: "xlsx"
          });
        });
        this.downloading = false
      });
    },
    formatJson(filterVal, jsonData) {
      console.log(this.filterVal)
      console.log(this.jsonData)
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.missionStatusText(v[j])
          }
          // else if(j === 'Deadline'){
          //   return this.$options.filters.toDate(v[j])
          // }
          else {
            return v[j]
          }
        })
      )
    },
    fetchData() {
      // this.listLoading = true
      // GetIdeaByUser({
      //   Token: Cookies.get("token"),
      //   UserName: Cookies.get("idEmployee"),
      //   TimeStart: this.TimeStart,
      //   TimeEnd: this.TimeEnd
      // }).then(res => {
      //   this.IdeaLst = res.IdeaLst
      //   this.admin = res.Admin
      //   this.listLoading = false
      // })
    },
    downloadMoreInfo(row) {
      let url =
        baseUrl +
        "File/DownloadFileIdea" +
        "?UserName=" +
        Cookies.get("idEmployee") +
        "&Token=" +
        Cookies.get("token") +
        "&DocumentId=" +
        row.DocumentId;
      //return url;
      window.open(url);
    }
  },
  created() {
    this.fetchData(),
      this.TimeStart = getStartDate(),
      this.TimeEnd = getEndDate()
  },
  watch: {
    TimeStart() {
      this.fetchData()
    },
    TimeEnd() {
      this.fetchData()
    },
    currentPage() {
      this.fetchData()
    },
    pageSize() {
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;
}
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin-bottom: 24px;
    margin-top: 5px;
}
.inline-block {
  display: inline-block;
  max-width: 100vh;
}
.pagination {
  margin-top: 10px;
}

</style>
