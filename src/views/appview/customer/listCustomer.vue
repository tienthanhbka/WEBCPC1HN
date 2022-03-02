<template>
  <div>
    <el-row :gutter="20" style="margin-bottom:10px">
      <el-col :xs="24" :sm="24" :lg="24">
        <!-- <div class="inline-block">
          <el-button
            @click="createPlace"
            icon="far fa-address-book"
            class="pan-btn blue-btn"
            >&#32;Tạo mới tổ chức
          </el-button>
        </div> -->
        <div class="inline-block">
          <el-input
            style="width:auto;"
            placeholder="Tìm kiếm theo tổ chức..."
            v-model="TextSearch"
            prefix-icon="el-icon-search"
          >
          </el-input>
        </div>
        <!-- <create-place
          modalId="new-place-modal"
          :place="rowData"
          @placeUpdated="updateOK"
          @placeAdded="addOK"
        ></create-place> -->
      </el-col>
    </el-row>
    <el-table
      class="el-mobile-table"
      :data="
        tableData.filter(
          data =>
            !TextSearch ||
            data.PlaceName.toLowerCase().includes(TextSearch.toLowerCase())
        )
      "
      v-loading="isLoading"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column align="center" min-width="120px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-tooltip content="Chỉnh sửa">
              <el-button @click="editPlace(scope.row)" type="text"
                ><i class="fas fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa">
              <el-button
                @click="delPlace(scope.row)"
                type="text"
                style="color:red;"
                ><i class="el-icon-delete"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Khách hàng">
              <router-link :to="'/khach-hang/ca-nhan/' + scope.row.PlaceId">
                <el-button type="text" style="color:green;margin-left:10px;"
                  ><i class="fas fa-users"></i></el-button></router-link
            ></el-tooltip>
            <el-tooltip content="Hồ sơ">
              <el-button
                @click="upFile(scope.row)"
                type="text"
                style="color:#909399;margin-left:10px;"
                ><i class="far fa-address-card"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" label="Mã BFO">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã BFO">
            {{ scope.row.BFOCode }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="90px" label="Mã hệ thống">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã hệ thống">
            {{ scope.row.PlaceId.substring(0, 15) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="Tên tổ chức">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên tổ chức">
            {{ scope.row.PlaceName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="Loại tổ chức">
        <template slot-scope="scope">
          <div class="dat-cell" label="Loại tổ chức">
            {{ scope.row.Type }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="Địa chỉ">
        <template slot-scope="scope">
          <div class="dat-cell" label="Địa chỉ">
            {{ scope.row.AddrLv3 }}-{{ scope.row.AddrLv2 }}-{{
              scope.row.AddrLv1
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="70px" label="Vùng">
        <template slot-scope="scope">
          <div class="dat-cell" label="Vùng">
            {{ scope.row.Area }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="100px" label="Vị trí">
        <template slot-scope="scope">
          <div class="dat-cell" label="Vị trí" style="display:grid;">
            <span>Vĩ độ: {{ scope.row.Latitude }}</span>
            <span>Kinh độ: {{ scope.row.Longitude }}</span>
            <span>Phạm vi: {{ scope.row.Range }}</span>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column
        min-width="100px"
        label="Thời gian tạo"
        sortable
        prop="Time"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian tạo">
            <span>{{ scope.row.Time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" label="Ghi chú">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.Note }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" label="Trạng thái" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | placeStatusColor">
              {{ scope.row.Status | placeStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Hồ sơ" min-width="50">
        <template slot-scope="scope">
           <div class="dat-cell" label="Hồ sơ">
           <el-tooltip content="Upload file"> <el-button @click="uploadFile(scope.row)" size="mini" type="success" ><i class="fas fa-cloud-upload-alt"></i></el-button></el-tooltip>
          </div>
        </template>
      </el-table-column>
       <el-table-column label="File" min-width="50">
        <template slot-scope="{row}">
          <div class="dat-cell" label="File">
          <el-tooltip content="dowload file"> <el-button size="mini" type="warning" ><i class="fas fa-file-download"></i></el-button></el-tooltip>
        </div>
        </template>
      </el-table-column> -->
    </el-table>
    <el-dialog :visible.sync="dialogFormDel" title="Xóa tổ chức">
      <del-place :place="row" @delOK="delOK" @PcancelOK="PcancelOK"></del-place>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormSys"
      title="Tạo tổ chức từ hệ thống"
      custom-class="medium-modal"
    >
      <place-sys @AddSysOK="addSysOK" @deletecancelOK="cancelOK"></place-sys>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormUpload" title="Hồ sơ KH">
      <upload-file :place="file" @cancelUp="cancelUp"> </upload-file>
    </el-dialog>
  </div>
</template>
<script>
import UploadFile from "@/views/customerV2/component/upfileCustomer";
import CreatePlace from "@/views/customerV2/component/createPlace";
import PlaceSys from "@/views/customerV2/component/createPlaceSys";
import DelPlace from "@/views/customerV2/component/deletePlace";
import { GetPlaceByUId } from "@/api/KDPlace";
import Cookies from "js-cookie";
export default {
  components: {
    CreatePlace,
    DelPlace,
    PlaceSys,
    UploadFile
  },
  data() {
    return {
      groupLst: [],
      emLst: [],
      token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      isLoading: false,
      tableData: [],
      dialogFormDel: false,
      dialogFormCreatePlace: false,
      dialogFormSys: false,
      dialogFormUpload: false,
      rowData: "",
      row: "",
      file: "",
      TextSearch: ""
    };
  },

  methods: {
    createPlace() {
      VoerroModal.show("new-place-modal");
      this.rowData = null;
    },
    upFile(row) {
      this.dialogFormUpload = true;
      this.file = row;
    },
    cancelUp() {
      this.dialogFormUpload = false;
    },
    updateOK() {
      this.fetchData();
    },
    addOK() {
      this.fetchData();
    },
    delPlace(row) {
      this.row = row;
      this.dialogFormDel = true;
    },
    delOK() {
      this.dialogFormDel = false;
      this.fetchData();
    },
    editPlace(data) {
      VoerroModal.show("new-place-modal");
      this.rowData = data;
    },
    createPlaceSys() {
      this.dialogFormSys = true;
    },
    addSysOK() {
      this.dialogFormSys = false;
      this.fetchData();
    },
    cancelOK() {
      this.dialogFormSys = false;
    },
    PcancelOK() {
      this.dialogFormDel = false;
    },
    fetchData() {
      this.isLoading = true;
      var req = {
        Token: this.token,
        UserName: this.UserName
      };
      GetPlaceByUId(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.PlaceLst;
        }
      });
      this.isLoading = false;
    },
    uploadFile(row) {
      this.row = row;
      this.dialogFormUpload = true;
    },
    uploadOK() {
      this.dialogFormUpload = false;
    }
    //  viewTimeLine(row) {
    //   const req = {
    //     UserName: this.UserName,
    //     Token: this.token,
    //     TimeStart: getStartDate(),
    //     TimeEnd: getEndDate(),
    //     CustomerID: row.CustomerId
    //   };
    //   GetReportTimelineByCus(req).then(res => {
    //     if (res.RespCode == 0) {
    //       console.log(res);
    //     }
    //   });
    // }
  },
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>
<style scoped>
.inline-block {
  display: inline-block;
}
.el-table__expanded-cell[class*="cell"] {
  padding: 15px 5px;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 5px;
}
.modal-class {
  max-width: 960px;
  width: 98%;
}
</style>
