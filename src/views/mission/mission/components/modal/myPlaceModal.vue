<template>
  <div>
    <div slot="body">
      <el-input v-model="search"></el-input>
      <el-table
        size="mini"
        border
        ref="placeTableModal"
        :data="currentTableData"
        @row-click="rowclick"
        @selection-change="rowchange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
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
        <el-table-column min-width="80px" label="Ghi chú">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ghi chú">
              {{ scope.row.NoteEm }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="150px" label="Tần suất (F) " align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tần suất (F)">
              <span style="font-weight:700;color:#02bc77"
                >F{{ scope.row.Frequency }}</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :total="tableData.length"
        :small="true"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="fetchData"
        background
        :pager-count="5"
        layout="-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" @click="addPlace">Thêm</el-button>
    </div>
  </div>
</template>
<script>
import { GetPlaceByUId } from "@/api/KDPlace";
import { GetMyPlace, GetPlaceByIdEmployee } from "@/api/place";
import Cookies from "js-cookie";
export default {
  props: {
    employee: Object,
    modalId: String,
    str: String,
    placeLst: Array
  },
  data() {
    return {
      search: "",
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      currentTableData: [],
      selectedPlace: []
    };
  },

  methods: {
    fetchData() {
      this.currentTableData = this.tableData
        .filter(o => {
          return o.PlaceName.toLowerCase().includes(this.search.toLowerCase());
        })
        .slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    },
    rowclick(row, col, e) {
      if (row) {
        this.$refs.placeTableModal.toggleRowSelection(row);
      }
    },
    rowchange: function(cur) {
      this.selectedPlace = cur;
    },
    closeModal: function() {
      this.$emit("closeModal");
    },
    addPlace: function() {
      if (this.placeLst != null) {
        this.selectedPlace.forEach(e => {
          var allowAdd = true;
          this.placeLst.forEach(o => {
            if (o.PlaceId == e.PlaceId) {
              allowAdd = false;
            }
          });
          if (allowAdd) {
            this.placeLst.push(e);
          }
        });
      }
      if (this.employee != null) {
        this.employee.places = this.selectedPlace;
      }

      this.$emit("ModalMyPlaceChange", this.selectedPlace);
      this.$emit("closeModal");
    },
    fetchMyPlace() {
      if (this.employee == null) {
        var req = {
          Token: Cookies.get("token"),
          UserName: Cookies.get("idEmployee"),
          UserCode: Cookies.get("idEmployee")
        };
        GetPlaceByUId(req).then(res => {
          if (res.RespCode == 0) {
            this.isLoading = false;
            res.PlaceLst.forEach(item => {
              let obj = {
                idPlace: item.PlaceId
              };
              Object.assign(item, obj);
            });
            this.tableData = res.PlaceLst;

            this.fetchData();
          }
        });
      }
    }
  },
  created() {
    this.fetchMyPlace();
  },
  watch: {
    search() {
      this.fetchData();
    },
    employee: function() {
      GetPlaceByIdEmployee({ idEmployee: this.employee.idEmployee }).then(
        res => {
          this.tableData = res.Data;
          this.fetchData();
        }
      );
    },
    pageSize() {
      this.fetchData();
    }
  }
};
</script>
