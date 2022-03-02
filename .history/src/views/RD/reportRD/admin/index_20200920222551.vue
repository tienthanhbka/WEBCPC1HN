<template>
  <div class="blank-table" style="padding:20px;">
    <!-- <div class="inline-block" style="float:right;">
        <el-input
        style="width:auto;"
          placeholder="Tìm kiếm..."
          v-model="TextSearch"
          prefix-icon="el-icon-search"
          size="mini"
        >
        </el-input>
      </div>
        <el-table 
        class="el-mobile-table"
        v-loading="listLoading"
         :data="IdeaLst"
          element-loading-text="Loading"
         border
        highlight-current-row>
         
            <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">
              <div class="dat-cell" label="STT">{{ (scope.$index + 1)  }} </div>
          </template>

        </el-table-column>

          <el-table-column align="center" width="255px" label="Action">
          <template slot-scope="scope">
            <div class="dat-cell" label="Action">
            <el-button-group>
                 <el-tooltip content="Phê duyệt"> <el-button @click="acceptIdea(scope.row)" size="mini" type="warning" ><i class="far fa-edit"></i></el-button></el-tooltip>
                  <el-tooltip content="Thêm NCV"> <el-button @click="addUser(scope.row)" size="mini" type="danger" ><i class="fas fa-user-plus"></i></el-button></el-tooltip>
                   <el-tooltip content="Hồ sơ NC"> <router-link :to="'/ho-so/y-tuong/'+scope.row.IdeaId"><el-button  size="mini" type="danger" ><i class="fas fa-user-plus"></i></el-button> </router-link></el-tooltip>
                   <el-tooltip content="Đề xuất SP"> <router-link :to="'/nghien-cuu/de-xuat-sp/'+scope.row.IdeaId"><el-button  size="mini" type="danger" ><i class="fas fa-user-plus"></i></el-button> </router-link></el-tooltip>

            </el-button-group>
            </div>
          </template>
        </el-table-column>
        
              <el-table-column label="Tên ý tưởng"  min-width="100">
                <template slot-scope="scope">
                    <div class="dat-cell" label="Tên ý tưởng">{{ scope.row.IdeaName }}</div>
                </template>
            </el-table-column>
               <el-table-column label="Nội dung"  min-width="100">
                <template slot-scope="scope">
                    <div class="dat-cell" label="Nội dung">{{ scope.row.IdeaContent }}</div>
                </template>
            </el-table-column>
             <el-table-column label="Hoạt chất"  min-width="100">
                <template slot-scope="scope">
                    <div class="dat-cell" label="Hoạt chất">{{ scope.row.ActiveElement }}</div>
                </template>
            </el-table-column>
             <el-table-column label="Cách bào chế"  min-width="100">
                <template slot-scope="scope">
                    <div class="dat-cell" label="Cách bào chế">{{ scope.row.Preparation }}</div>
                </template>
            </el-table-column>
              <el-table-column label="Mô tả thêm"  min-width="100">
                <template slot-scope="scope">
                    <div class="dat-cell" label="Mô tả thêm">{{ scope.row.MoreInfo }}</div>
                </template>
            </el-table-column>
             
              <el-table-column label="Khởi tạo" align="center" min-width="100">
                <template slot-scope="scope">
                    <div class="dat-cell" label="Khởi tạo">{{ scope.row.TimeCreate }}</div>
                </template>
            </el-table-column>
             <el-table-column label="Trạng thái" align="right" min-width="100">
                <template slot-scope="scope">
                    <div class="dat-cell" label="Trạng thái">
                     <el-tag
                    :type="scope.row.Status | ideaStatusColor">
                    {{ scope.row.Status | ideaStatusText}}
                    </el-tag>
                    </div>
                </template>
            </el-table-column>
             
        </el-table>

          <el-dialog title="Phê duyệt ý tưởng" :visible.sync="dialogFormAccept">
        <accept  :idea="rowData" @acceptOK="acceptOK" ></accept>
        
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>

      <el-dialog title="Thêm nhân viên xem ý tưởng" :visible.sync="dialogFormAddUser">
        <addUser  :idea="rowData" @addUserOK="addUserOK" ></addUser>
        
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog> -->
    Không có dữ liệu
  </div>
</template>
<script>
import { GetIdeaByUser } from "@/api/idea";
import Accept from "@/views/RD/idea/admin/component/acceptIdea";
import AddUser from "@/views/RD/idea/admin/component/addUser";
import Cookies from "js-cookie";
export default {
  components: { Accept, AddUser },
  data() {
    return {
      IdeaLst: [],
      rowData: "",
      listLoading: false,
      dialogFormAccept: false,
      dialogFormAddUser: false
    };
  },
  methods: {
    acceptIdea(row) {
      this.dialogFormAccept = true;
      this.rowData = row;
    },
    acceptOK() {
      this.dialogFormAccept = false;
      //this.fetchData()
    },
    addUser(row) {
      this.dialogFormAddUser = true;
      this.rowData = row;
    },
    addUserOK() {
      this.dialogFormAddUser = false;
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      GetIdeaByUser({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        TimeStart: "2020-01-01",
        TimeEnd: "2020-10-10"
      }).then(res => {
        this.IdeaLst = res.IdeaLst;
      });
      this.listLoading = false;
    }
  },
  created() {
    //this.fetchData()
  },
  watch: {}
};
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
}
</style>
