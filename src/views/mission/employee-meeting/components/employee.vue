<template>
  <div class="employee-mission-container">
    <el-dialog
      v-if="!isGroupPage"
      title="Đăng ký lịch"
      :visible.sync="meetingScheduleVisible"
      custom-class="modal-class"
    >
      <meeting-schedule-modal
        custom-class="modal-class"
        :meetingHeader="currentMeetingHeader"
        @meetingAdded="onMeetingAdded"
        @closeModal="meetingScheduleVisible=false"
      ></meeting-schedule-modal>
    </el-dialog>
    <el-dialog

      title="Báo cáo tổng hợp"
      :visible.sync="meetingReportTHVisible"
      custom-class="modal-class"
    :close-on-click-modal="false"
    >
      <meeting-report-th
        custom-class="modal-class"
        :option="exportOption"
        :visible="meetingReportTHVisible"
      ></meeting-report-th>
    </el-dialog>
    <el-dialog
      title="Chi tiết chấm điểm"
      :visible.sync="detailModalVisible"
      custom-class="modal-class"
    >
      <meeting-pointing-detail :meeting="currentDetail"></meeting-pointing-detail>
    </el-dialog>
    <div>
      <div v-if="!isGroupPage">
        <el-button type="primary" icon="el-icon-refresh" class="inline-block" @click="fetchData"></el-button>

        <el-button
          type="warning"
          icon="el-icon-document"
          class="inline-block"
          @click="addNewMeeting"
        >Đăng ký lịch gặp</el-button>
        <el-popover
    placement="bottom"
    title="Báo cáo"
    width="250"
    trigger="click"
    >
    <div>
      <label for="">Từ</label>
       <el-date-picker
      v-model="exportOption.start"
      type="date"
      format="dd/MM/yyyy"
      value-format="yyyy-MM-dd"
      placeholder="Chọn ngày bắt đầu"
      >
    </el-date-picker>
    <label for="">Đến</label>
     <el-date-picker
      v-model="exportOption.end"
      type="date"
      format="dd/MM/yyyy"
      value-format="yyyy-MM-dd"
      placeholder="Chọn ngày kết thúc"
      >
    </el-date-picker>
    
      <el-checkbox style="margin-top: 10px;" v-model="exportOption.notCt">Không tính check ở công ty</el-checkbox>
      <el-checkbox v-model="exportOption.twicePDay">Tối đa 2 lần/ngày</el-checkbox>
  <el-button style="margin-top:5px;"  type="primary" @click="meetingReportTHVisible=true">BC Tổng</el-button>
  <el-button v-loading="exporting" style="margin-top:5px;float:right" type="success" @click="report()">BC Chi tiết</el-button>
    </div>
    <el-button slot="reference" type="success"><i class="fas fa-file-alt"></i></el-button>
  </el-popover>
      </div>
      <el-row v-if="isGroupPage" :gutter="10">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-popover
    placement="bottom"
    title="Báo cáo"
    width="250"
    trigger="click"
    >
    <div>
      <label for="">Từ</label>
       <el-date-picker
      v-model="exportOption.start"
      type="date"
      format="dd/MM/yyyy"
      value-format="yyyy-MM-dd"
      placeholder="Chọn ngày bắt đầu"
      >
    </el-date-picker>
    <label for="">Đến</label>
     <el-date-picker
      v-model="exportOption.end"
      type="date"
      format="dd/MM/yyyy"
      value-format="yyyy-MM-dd"
      placeholder="Chọn ngày kết thúc"
      >
    </el-date-picker>
    
      <el-checkbox style="margin-top: 10px;" v-model="exportOption.notCt">Không tính check ở công ty</el-checkbox>
      <el-checkbox v-model="exportOption.twicePDay">Tối đa 2 lần/ngày</el-checkbox>
      <el-radio v-model="exportOption.em" :label="currentEm">NV đang chọn</el-radio>
  <el-radio v-model="exportOption.em" label="all">Tất cả các NV</el-radio>
  <el-button style="margin-top:5px;"  type="primary" @click="meetingReportTHVisible=true">BC Tổng</el-button>
  <el-button style="margin-top:5px;float:right" type="success" @click="report()">BC Chi tiết</el-button>
    </div>
    <el-button slot="reference" type="success"><i class="fas fa-file-alt"></i></el-button>
  </el-popover>
          
          <el-select
            style="width: calc(100% - 57px); margin-bottom:10px"
            v-model="currentGroup"
            placeholder="Select"
          >
            <el-option
              v-for="group in groupLst"
              :key="group.idGroup"
              :label="group.idGroup"
              :value="group.idGroup"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :xs="24" :sm="12" :lg="12">
          <el-select style="width:100%;margin-bottom:10px" v-model="currentEm" placeholder="Select">
            <el-option
              v-for="em in emLst"
              :key="em.idEmployee"
              :label="em.nameEmployee"
              :value="em.idEmployee"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-table
        ref="myCallTable"
        :data="tableData"
        v-loading="isLoading"
        fit
        style="width: 100%"
        @expand-change="expandRow"
        border
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <result @detailClicked="onDetailClicked" :meetingHeader="scope.row"></result>
          </template>
        </el-table-column>
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">
            {{ scope.$index + 1 + (currentPage - 1)*pageSize}}
            <el-popover placement="top-start" trigger="hover" v-if="scope.row.Status==1">
              <div>
                <el-button
                  style="color:#f1c40f"
                  type="text"
                  size="medium"
                  icon="el-icon-edit"
                  @click="editMeetingHeader(scope.row)"
                >Sửa</el-button>

                <el-button
                  style="color:#c0392b"
                  type="text"
                  size="medium"
                  icon="el-icon-delete"
                  @click="deleteMeetingHeader(scope.row)"
                >Hủy</el-button>
              </div>
              <el-button
                style="color:#2980b9"
                type="text"
                size="medium"
                icon="el-icon-s-operation"
                slot="reference"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="nameMission" width="150" label="Loại">
          <template slot-scope="{row}">{{row.Type}}</template>
        </el-table-column>
        <el-table-column prop="nameMission" min-width="300" label="Nội dung">
          <template slot-scope="{row}">{{row.Content}}</template>
        </el-table-column>
        <el-table-column prop="nameMission" min-width="300" label="Khách hàng tổ chức">
          <template slot-scope="{row}">{{row.namePlace}}</template>
        </el-table-column>
        <el-table-column prop="nameMission" width="240" label="Thời gian">
          <template
            slot-scope="{row}"
          >{{Date.parse(row.TimeStart).toString('dd/MM/yyyy')}} {{Date.parse(row.TimeStart).toString('HH:mm')}} - {{Date.parse(row.TimeEnd).toString('HH:mm')}}</template>
        </el-table-column>
        <el-table-column prop="nameMission" width="300" label="Ghi chú">
          <template slot-scope="{row}">{{row.Note}}</template>
        </el-table-column>
        <el-table-column prop="Status" width="150" label="Trạng thái">
          <template slot-scope="{row}">
            <el-tag slot="reference" :type="row.Status|meetingHeaderStatusColor ">
              <i class="fas fa-info"></i>
              {{ row.Status|meetingHeaderStatusText }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

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
  </div>
</template>

<script>
import MeetingScheduleModal from "@/views/mission/employee-meeting/components/meeting-schedule-modal";
import MeetingReportTh from "@/views/mission/employee-meeting/components/meeting-report-th";
import { GetGroupMeetingOfMe,GetMeetingOfMe, DeleteMeetingHeader,MeetingFullReport } from "@/api/mission";
import Result from "@/views/mission/employee-meeting/components/result";
import MeetingPointingDetail from "./meeting-pointing-detail";
import { GetListGroupAdminByToken, getEmployeesByIdGroup } from "@/api/groups";
export default {
  components: {
    MeetingScheduleModal,
    Result,
    MeetingPointingDetail,
    MeetingReportTh
  },
  data() {
    return {
      meetingReportTHVisible:false,
      detailModalVisible: false,
      currentDetail: null,
      currentMeetingHeader: null,
      placeModalVisibel: false,
      meetingScheduleVisible: false,
      downloading: false,
      isLoading: false,
      count: 100,
      currentPage: 1,
      dataLength: 0,
      pageSize: 10,
      tableData: [],
      isGroupPage: false,
      groupLst:[],
      emLst:[],
      currentGroup:'',
      currentEm:'',
      
      exportOption:{
        start:'',
        end:'',
        notCt:true,
        twicePDay:true,
        em:'me'
      },
      exporting:false
    };
  },
  created() {
    
    this.exportOption.start = (1).months().ago().set({day:1}).toString('yyyy-MM-dd');
    this.exportOption.end=Date.today().set({day:1}).add(-1).day().toString('yyyy-MM-dd');
    if (this.$router.currentRoute.path.includes("nhom")) {
      this.isGroupPage = true;
    } else {
      this.isGroupPage = false;
    }
    if(this.isGroupPage){
      this.exportOption.em='all'
    }else{
      this.exportOption.em='me'
    }
    if (this.isGroupPage) {
      GetListGroupAdminByToken().then(res => {
        this.groupLst = res.Data;
        this.currentGroup = this.groupLst[0].idGroup;
      });
    }
    this.fetchData();
  },
  mounted() {

  },
  methods: {
    report(){
      if(!this.exportOption.start||!this.exportOption.end){
        this.$message({
          message: 'Hãy chọn ngày',
          type: 'warning'
        });
        return;
      }
      this.exporting = true;
      MeetingFullReport({
        fullReport:true,
        em:this.exportOption.em,
        start:this.exportOption.start,
        end:this.exportOption.end,
        notCt:this.exportOption.notCt,
        twicePDay:this.exportOption.twicePDay,
      }).then(res=>{
         this.exporting = false;
         this.exportEXL(res.Data);
      })
    },
    exportEXL(data) {
      this.exporting=true;
      var tHeader = [];
      var filterVal = [];
     
        tHeader = [
          "HeaderID",
          "Nhóm",
          "IDASM",
          "MNV ASM",
          "Tên ASM",
          "Loại",
          "KH",
          "Thời gian tạo",
          "Từ",
          "Đến",
          "Nội dung",
          "Ghi chú",
          "LineID",
          "IDTDV",
           "MNV TDV",
          "Tên TDV",
          "Trạng thái",
          "Khoảng thời gian",
          "Khoảng cách"
        ]
        filterVal = [
          "HeaderID",
          "IdGroup",
          "IdASM",
           "ASMCode",
          "ASMName",
          "Type",
          "KH",
          "TimeCreate",
          "TimeStart",
          "TimeEnd",
          "Content",
          "Note",
          "LineID",
          "IdEmployee",
          "ECode",
          "EName",
          "StatusText",
          "TimeDiff",
          "Distance"
        ]
      

      var data2 = this.formatJson(filterVal, data);

      var self = this;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: data2,
          filename: "CoachingCall"+this.exportOption.start+"-"+this.exportOption.end, //Optional
          autoWidth: true, //Optional
          bookType: "xlsx" //Optional
        });
      });
      this.exporting = false;
    },
    formatJson(filterVal, jsonData) {
      
        return jsonData.map(v =>
          filterVal.map(j => {
            if (j == 'TimeCreate' || j == 'TimeStart'||j=="TimeEnd") {
              if (v[j] != null) return Date.parse(v[j]).toString('yyyy-MM-dd HH:mm');
            }else {
              return v[j];
            }
          })
        );
      
    },
    onDetailClicked(meeting) {
      this.detailModalVisible = true;
      this.currentDetail = meeting;
    },
    addNewMeeting() {
      (this.currentMeetingHeader = null), this.openModal();
    },
    editMeetingHeader(row) {
      this.currentMeetingHeader = row;
      this.openModal();
    },
    deleteMeetingHeader(row) {
      this.$confirm("Bạn có muốn dòng này phiếu này?", "Thông báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        DeleteMeetingHeader({
          id: row.RowID
        }).then(res => {
          row.Status = 0;
        });
      });
    },
    onMeetingAdded(e) {
      console.log(e);

      this.tableData.unshift(e);
    },
    expandRow() {},
    openModal() {
      this.meetingScheduleVisible = true;
    },
    fetchData() {
      this.isLoading = true;
      if(this.isGroupPage){
        if(this.currentEm){
          GetGroupMeetingOfMe({
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        idEmployee: this.currentEm
      }).then(res => {
        this.dataLength = res.TotalRows;
        res.Data.forEach(e => {
          e.line = null;
        });
        this.isLoading = false;
        this.tableData = res.Data;
      });
        }
      }else{
        GetMeetingOfMe({
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
      }).then(res => {
        this.dataLength = res.TotalRows;
        res.Data.forEach(e => {
          e.line = null;
        });
        this.isLoading = false;
        this.tableData = res.Data;
      });
      }
      
    }
  },
  computed: {},
  watch: {
    pageSize() {
      this.fetchData();
    },
    currentGroup() {

      if (this.isGroupPage&&this.currentGroup != "") {
        getEmployeesByIdGroup({
          idGroup: this.currentGroup
        }).then(res => {
          this.emLst = res.Data;
          for(var i in this.emLst){
            if(Number(this.emLst[i].role)>1){
              this.currentEm = this.emLst[i].idEmployee;
              break;
            }
          }
          
        });
      }
    },
    currentEm(){
      if (this.isGroupPage&&this.currentGroup != null) {
        this.fetchData();
      }
    }
  
  }
};
</script>

<style>
.modal-class {
  max-width: 960px;
  width: 98%;
  margin-top: 5px !important;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
}

.employee-mission-container {
  padding: 5px;
}

.pagination {
  margin-top: 10px;
}
</style>

