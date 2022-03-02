<template>
  <div
    class="block"
    style="padding-left: 20px; padding-right: 20px; padding-top: 30px;padding-bottom: 30px;"
  >
    <el-table :data="lines" class="el-mobile-table" border="" show-header>
      <el-table-column align="center" width="100" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">{{ scope.$index + 1 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="Description" label="Tên">
        <template slot-scope="{ row }">
          <div class="dat-cell" label="Tên">{{ row.Description }}</div>
        </template>
      </el-table-column>

      <el-table-column label="Thời gian tạo">
        <template slot-scope="{ row }">
          <div class="dat-cell" label="Thời gian tạo">
            {{ Date.parse(row.TimeCreate).toString("dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Note" label="Lời nhắn">
        <template slot-scope="{ row }">
          <div class="dat-cell" label="Lời nhắn">{{ row.Note }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="Trạng thái">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | statusPaperColor">
              {{ scope.row.Status | statusPaperText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="">
        <template slot-scope="{ row }">
          <div class="dat-cell" label="">
            <el-tooltip content="Xem giấy" placement="top">
              <router-link :to="'chi-tiet-giay/' + row.RowID">
                <i class="far fa-eye"></i> </router-link
            ></el-tooltip>
            <el-tooltip
              style="margin-left:20px;"
              v-if="row.Status == 0 || row.Status == 100"
              content="Chỉnh sửa"
              placement="top"
              ><el-button @click="openModalEdit(row)" type="text">
                <i class="fas fa-edit"></i></el-button
            ></el-tooltip>

            <el-tooltip
              style="margin-left:20px;"
              v-if="row.Status == 0"
              content="Xóa"
              placement="top"
              ><el-button @click="openModalDel(row)" type="text">
                <i style="color: red;" class="far fa-trash-alt"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="Chỉnh sửa"
      style="margin-top: 1vh;"
      :visible.sync="dialogFormEdit"
    >
      <edit :row="rowData" @click="EditOK"></edit>
    </el-dialog>

    <el-dialog
      title="Xóa"
      style="margin-top: 1vh;"
      :visible.sync="dialogFormDel"
    >
      <delete :row="rowData" @click="DelOK"></delete>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie";
// import Confirm from '@/views/request/component/confirm'
// import { getStartMonth, getEndMonth} from '@/api/index'

export default {
  filters: {
    statusPaperText: function(value) {
      if (value == 0) {
        return "Mới tạo";
      }
      if (value == 1) {
        return "Xử lý";
      }
      if (value == 2) {
        return "Đã in";
      }
      if (value == 3) {
        return "Hoàn thành";
      }
      if (value == 100) {
        return "Chỉnh sửa";
      }
    },
    statusPaperColor: function(value) {
      if (value == 0) {
        return "";
      }
      if (value == 1) {
        return "success";
      }
      if (value == 2) {
        return "success";
      }
      if (value == 3) {
        return "primary";
      }
      if (value == 100) {
        return "warning";
      }
    }
  },
  components: {},
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
      dialogFormDel: false
    };
  },
  methods: {
    openModalEdit(row) {
      this.rowData = row;
      this.dialogFormEdit = true;
    },
    EditOK() {
      this.dialogFormEdit = false;
      this.fetchData();
    },

    openModalDel(row) {
      this.rowData = row;
      this.dialogFormDel = true;
    },
    DelOK() {
      this.dialogFormDel = false;
      this.fetchData();
    },
    fetchData() {
      var req = {};
      this.listLoading = true;
      //console.log(req);
      GetPaperStudentAllByToken(req).then(response => {
        //alert('ok')
        this.lines = response.HSPaperStudentInforLst;
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
    }
  },
  computed: {},
  created() {
    this.fetchData();
  },
  watch: {
    rowData: function() {
      this.fetchData();
    }
  }
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

<style>
element.style {
  margin-top: 1vh !important;
}
@media only screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 95%;
    margin-top: 1vh !important;
  }

  element.style {
    margin-top: 1vh !important;
  }
}
</style>
