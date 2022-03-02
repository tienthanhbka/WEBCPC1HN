<template>
  <div
    class="block"
    style="padding-left: 20px; padding-right: 20px; padding-top: 30px;padding-bottom: 30px;"
  >
    <el-table
      :data="lines"
      v-loading="loadingTableData"
      style="width:100%"
      border=""
      fit
      show-header
      class="el-mobile-table"
    >
      <el-table-column align="center" width="120" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}

            <el-tooltip content="Chỉnh sửa" placement="top" effect="light"
              ><el-button @click="openModalEdit(scope.row)" type="text">
                <i class="fas fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Chỉnh sửa" placement="top" effect="light"
              ><el-button @click="openModalDel(scope.row)" type="text">
                <i style="color: red;" class="far fa-trash-alt"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Phụ trách" placement="top" effect="light"
              ><el-button @click="openaddCurator(scope.row)" type="text">
                <i style="color: #02bc77;" class="fas fa-users"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="TypePaper" width="120px;" label="Mã">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã">
            {{ scope.row.TypePaper }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        prop="Description"
        label="Tên thủ tục hành chính"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên thủ tục hành chính">
            {{ scope.row.Description }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" prop="TypeService" label="Loại thủ tục">
        <template slot-scope="scope">
          <div class="dat-cell" label="Loại thủ tục">
            {{ scope.row.TypeService }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Office" width="140px" label="Đơn vị">
        <template slot-scope="scope">
          <div class="dat-cell" label="Đơn vị">
            {{ scope.row.Office }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="Curator" min-width="150px" label="Người phụ trách">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người phụ trách">
            {{ scope.row.Curator }}
          </div>
        </template>
      </el-table-column> -->

      <el-table-column
        min-width="150px"
        prop="FullName"
        label="Người định nghĩa"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Người định nghĩa">
            {{ scope.row.FullName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="TimeCreate" min-width="160px" label="Ngày tạo">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngày tạo">
            {{ scope.row.TimeCreate }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="FilePath" min-width="150px" label="Tên File">
        <template slot-scope="scope">
          <div class="dat-cell" label="tên File">
            {{ scope.row.FilePath }}
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Chỉnh sửa" :visible.sync="dialogFormEdit">
      <edit :row="rowData" @click="EditOK"></edit>
    </el-dialog>

    <el-dialog title="Khóa thủ tục" :visible.sync="dialogFormDel">
      <delete :row="rowData" @click="DelOK"></delete>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormAddCurator">
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 16pt;"
        ><i class="fas fa-users"></i> &#32;&#32;Danh sách phụ trách
      </span>
      <list-curator :row="rowData"></list-curator>
      <span slot="footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import { GetPaper } from "@/api/paper";
import Cookies from "js-cookie";
import Edit from "@/views/paper/editPaper/index";
import Delete from "@/views/paper/listPaperDefine/component/delete";
import AddCurator from "./component/addCurator";
import ListCurator from "./component/listCurator";

// import Confirm from '@/views/request/component/confirm'
// import { getStartMonth, getEndMonth} from '@/api/index'

export default {
  filters: {
    statusPaperText: function(value) {
      if (value == 0) {
        return "Mới tạo";
      }
      if (value == 2) {
        return "Đã duyệt";
      }
      if (value == 3) {
        return "Hoàn thành";
      }
    },
    statusPaperColor: function(value) {
      if (value == 0) {
        return "aa";
      }
      if (value == 2) {
        return "success";
      }
      if (value == 3) {
        return "primary";
      }
    }
  },
  components: {
    Edit,
    Delete,
    AddCurator,
    ListCurator
  },
  props: {},
  data() {
    return {
      url:
        "https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png",
      url1:
        "https://ssl.gstatic.com/docs/templates/thumbnails/1mNJe_n2CMclvGS8ZCBFUQxx_PSODuzFa6uEQ1JABtBA_400_1.png",
      url2:
        "https://fn.vinhphuc.edu.vn/UploadImages/thkimlong/admin/CNTT/b2ap3_thumbnail_word_2013_400.jpg?w=700",
      lines: [],
      rowData: [],
      dialogFormEdit: false,
      dialogFormDel: false,
      loadingTableData: false,
      dialogFormAddCurator: false
    };
  },
  methods: {
    openModalEdit(row) {
      //this.fetchData()
      this.rowData = row;
      this.dialogFormEdit = true;
    },
    openModalDel(row) {
      this.rowData = row;
      this.dialogFormDel = true;
    },
    fetchData() {
      this.loadingTableData = true;
      var req = {};
      this.listLoading = true;
      //console.log(req);
      GetPaper(req).then(response => {
        //alert('ok')
        this.loadingTableData = false;
        this.lines = response.HSPaperLst;
        //console.log(this.lines)
      });
    },
    Edit(line) {
      //alert(line.TypePaper)

      this.$router.push({ path: `/chinh-sua-giay/${line.TypePaper}` });
      // router.push({ name: '/chinh-sua-giay/', params: { id: line.TypePaper } })
    },
    Remove(line) {
      //alert(line.TypePaper)

      this.$router.push({ path: `/xoa-giay/${line.TypePaper}` });
      // router.push({ name: '/chinh-sua-giay/', params: { id: line.TypePaper } })
    },
    EditOK() {
      this.dialogFormEdit = false;
    },
    DelOK() {
      this.dialogFormDel = false;
    },
    openaddCurator(row) {
      this.dialogFormAddCurator = true;
      this.rowData = row;
    }
  },
  computed: {},
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.col1 {
  border: 1px solid #eeeeee;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 20px;
}

.paper {
  display: none;
  //background: red;
}
.wrap-paper:hover .paper {
  display: block;
}
</style>
