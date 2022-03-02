<template>
  <div v-if="user" class="container-activity">
    <el-tabs v-model="activeActivity" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label" class="t-label-tabs"
          ><i class="fas fa-info-circle"></i> Thông tin cá nhân</span
        >
        <div class="block">
          <el-table :data="infoT()" :show-header="false">
            <el-table-column
              prop="name"
              align="left"
              label="Name"
            ></el-table-column>
            <el-table-column label="Count" align="left">
              <template slot-scope="scope">{{ scope.row.value }}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane name="second" v-loading="updating">
        <span slot="label" class="t-label-tabs"
          ><i class="fas fa-info-circle"></i> Thông tin gia đình</span
        >
        <div class=" text-center">
          <el-button @click="updateInfor" size="mini" type="primary" plain
            ><i class="far fa-edit"></i> Cập nhật</el-button
          >
        </div>
        <div class="block">
          <el-table
            :data="infoFamily()"
            :show-header="true"
            style="width: 100%"
            fit
          >
            <el-table-column
              prop="RelativePosition"
              align="left"
              label=""
              width="130"
            >
              <template slot-scope="scope">
                <el-tooltip
                  content="Chỉnh sửa thông tin"
                  effect="light"
                  popper-class="t-tooltip"
                >
                  <el-button @click="edit(scope.row)" size="mini" type="success"
                    ><i class="fas fa-user-edit"></i></el-button
                ></el-tooltip>
                <el-tooltip
                  content="Xóa thông tin"
                  effect="light"
                  popper-class="t-tooltip"
                >
                  <el-button @click="del(scope.row)" size="mini" type="danger"
                    ><i class="far fa-trash-alt"></i></el-button
                ></el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="RelativePosition"
              align="left"
              label="Người thân"
              width="120"
            >
              <template slot-scope="scope">{{
                scope.row.RelativePosition.slice(4)
              }}</template>
            </el-table-column>
            <el-table-column label="Họ và tên" align="left" min-width="120">
              <template slot-scope="scope">{{
                scope.row.RelativeName
              }}</template>
            </el-table-column>
            <el-table-column label="Số điện thoại" align="left" min-width="120">
              <template slot-scope="scope">{{
                scope.row.RelativePhone
              }}</template>
            </el-table-column>
            <el-table-column label="Ngày sinh" align="left" min-width="120">
              <template slot-scope="scope">{{
                scope.row.RelativeBirth
              }}</template>
            </el-table-column>
            <el-table-column label="Giới tính" align="left" min-width="80">
              <template slot-scope="scope">{{
                scope.row.RelativeSex
              }}</template>
            </el-table-column>
            <el-table-column
              label="Hộ khẩu thường trú"
              align="left"
              min-width="300"
            >
              <template slot-scope="scope">{{
                scope.row.RelativeAddress
              }}</template>
            </el-table-column>
            <el-table-column label="Nghề nghiệp" align="left" min-width="120">
              <template slot-scope="scope">{{
                scope.row.RelativeJob
              }}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane name="three" v-loading="updating">
        <!-- <div class=" text-center">    <el-button @click="updateInfor" size="mini" type="primary" plain><i class="far fa-edit"></i> Cập nhật</el-button> </div> -->
        <span slot="label" class="t-label-tabs"
          ><i class="fas fa-file-signature"></i> Quá trình ký HĐ</span
        >
        <div class="block">
          <el-table :data="infoProcess()" :show-header="true">
            <el-table-column
              prop="Type"
              align="left"
              label="Quá trình ký HĐ"
            ></el-table-column>
            <el-table-column label="Số HĐ" align="left">
              <template slot-scope="scope">{{ scope.row.CodeWork }}</template>
            </el-table-column>
            <el-table-column label="Từ ngày" align="left">
              <template slot-scope="scope">{{ scope.row.DateStart }}</template>
            </el-table-column>
            <el-table-column label="Đến ngày" align="left">
              <template slot-scope="scope">{{ scope.row.DateEnd }}</template>
            </el-table-column>
            <el-table-column label="Mức lương đóng BHXH" align="left">
              <template slot-scope="scope">{{ scope.row.BHXH }}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="BHXH" name="four" v-loading="updating">
        <!-- <div class=" text-center">    <el-button @click="updateInfor" size="mini" type="primary" plain><i class="far fa-edit"></i> Cập nhật</el-button> </div> -->
        <span slot="label" class="t-label-tabs"> BHXH</span>
        <div class="block">
          <el-table :data="infoBHXH()" :show-header="true">
            <el-table-column
              prop="Money"
              align="left"
              label="Mức đóng"
            ></el-table-column>
            <el-table-column label="Từ ngày" align="left">
              <template slot-scope="scope">{{ scope.row.DateStart }}</template>
            </el-table-column>
            <el-table-column label="Đến ngày" align="left">
              <template slot-scope="scope">{{ scope.row.DateEnd }}</template>
            </el-table-column>
            <el-table-column label="Lý do biến động" align="left">
              <template slot-scope="scope">{{ scope.row.Reason }}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Quyết định NS" name="fire" v-loading="updating">
        <!-- <div class=" text-center">    <el-button @click="updateInfor" size="mini" type="primary" plain><i class="far fa-edit"></i> Cập nhật</el-button> </div> -->
        <span slot="label" class="t-label-tabs"> Quyết định NS</span>
        <div class="block">
          <el-table :data="infoDecision()" :show-header="true">
            <el-table-column
              prop="DecisionName"
              align="left"
              label="Loại quyết định"
            ></el-table-column>
            <el-table-column label="Số quyết định" align="left">
              <template slot-scope="scope">{{
                scope.row.DecisionNumber
              }}</template>
            </el-table-column>
            <el-table-column label="Ngày ra quyết định" align="left">
              <template slot-scope="scope">{{ scope.row.Date }}</template>
            </el-table-column>
            <el-table-column label="Ngày hiệu lực" align="left">
              <template slot-scope="scope">{{ scope.row.DateStart }}</template>
            </el-table-column>
            <el-table-column label="Nội dung" align="left">
              <template slot-scope="scope">
                <el-tooltip
                  content="Xem chi tiết"
                  effect="light"
                  popper-class="t-tooltip"
                  ><router-link
                    :to="'/chi-tiet-quyet-dinh-nhan-su/' + scope.row.RowID"
                  >
                    <el-button size="mini" type="warning"
                      ><i class="far fa-eye"></i></el-button></router-link
                ></el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Trạng thái" name="six" v-loading="updating">
        <!-- <div class=" text-center">    <el-button @click="updateInfor" size="mini" type="primary" plain><i class="far fa-edit"></i> Cập nhật</el-button> </div> -->
        <span slot="label" class="t-label-tabs"> Trạng thái</span>
        <div class="block">
          <el-table :data="infoStatus()" :show-header="true">
            <el-table-column
              prop="Type"
              align="left"
              label="Trạng thái"
            ></el-table-column>
            <el-table-column label="Ngày bắt đầu" align="left">
              <template slot-scope="scope">{{ scope.row.DateStart }}</template>
            </el-table-column>
            <el-table-column label="Ngày kết thúc" align="left">
              <template slot-scope="scope">{{ scope.row.DateEnd }}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="Cập nhật thông tin gia đình"
      :visible.sync="dialogFormUpdate"
    >
      <updateInfor :user="user" @click-something="addOK"></updateInfor>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog title="Chỉnh sửa thông tin" :visible.sync="dialogFormEdit">
      <editInfor :row="rowData" @click-something="editOK"></editInfor>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-dialog title="Xóa thông tin" :visible.sync="dialogFormDel">
      <delInfor :row="rowData" @click-something="delOK"></delInfor>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
// import Resource from '@/api/resource';
// const userResource = new Resource('users');
import UpdateInfor from "@/views/user/components/CreateRelative";
import EditInfor from "@/views/user/components/EditRelative";
import DelInfor from "@/views/user/components/deleteRelative";

export default {
  props: ["user", "update"],
  components: { UpdateInfor, EditInfor, DelInfor },
  watch: {
    update() {
      if (this.update) {
        this.updateInfor();
        this.update = false;
      }
    }
  },
  data() {
    return {
      activeActivity: "second",
      rowData: "",
      dialogFormUpdate: false,
      dialogFormEdit: false,
      dialogFormDel: false,
      carouselImages: [
        "https://cdn.laravue.dev/photo1.png",
        "https://cdn.laravue.dev/photo2.png",
        "https://cdn.laravue.dev/photo3.jpg",
        "https://cdn.laravue.dev/photo4.jpg"
      ],
      updating: false
    };
  },
  methods: {
    edit(row) {
      this.rowData = row;
      this.dialogFormEdit = true;
    },
    editOK() {
      this.dialogFormEdit = false;
    },
    del(row) {
      this.rowData = row;
      this.dialogFormDel = true;
    },
    delOK() {
      this.dialogFormDel = false;
    },
    addOK(form) {
      var a = {
        EmployeeID: this.user[0].EmployeeID,
        RelativeAddress: form.RelativeAddress,
        RelativeBirth: form.RelativeBirth,
        RelativeJob: form.RelativeJob,
        RelativeName: form.RelativeName,
        RelativePhone: form.RelativePhone,
        RelativePosition: form.RelativePosition,
        RelativeSex: form.RelativeSex,
        RowID: 0,
        Status: 1
      };
      this.user[0].EmployeeInforFamily.push(a);
      this.dialogFormUpdate = false;
    },
    updateInfor() {
      this.dialogFormUpdate = true;
    },
    handleClick(tab, event) {},
    infoT() {
      return [
        {
          name: "MNV",
          value: this.user[0].EmployeeCode
        },
        {
          name: "Email cá nhân",
          value: this.user[0].Email
        },
        {
          name: "Email công ty",
          value: this.user[0].EmailCompany
        },
        {
          name: "Link facebook",
          value: this.user[0].LinkFace
        },
        {
          name: "Số CMND",
          value: this.user[0].CMND
        },
        {
          name: "Ngày cấp",
          value: Date.parse(this.user[0].DateCMND).toString("dd-MM-yyyy")
        },
        {
          name: "Nơi cấp",
          value: this.user[0].PlaceCMND
        },
        {
          name: "Giới tính",
          value: this.user[0].Sex
        },
        {
          name: "Quốc tịch",
          value: this.user[0].Nationality
        },
        {
          name: "Dân tộc",
          value: this.user[0].Folk
        },
        {
          name: "Tôn giáo",
          value: this.user[0].Religion
        },
        {
          name: "Tình trạng hôn nhân",
          value: this.user[0].Matrimony
        },
        {
          name: "Ngày sinh",
          value: Date.parse(this.user[0].BirthDay).toString("dd-MM-yyyy")
        },

        {
          name: "Nơi sinh",
          value: this.user[0].BirthAddress
        },
        {
          name: "Nguyên quán",
          value: this.user[0].Address
        },
        {
          name: "Hộ khẩu thường trú",
          value: this.user[0].AddressOften
        },
        {
          name: "Nơi ở hiện nay",
          value: this.user[0].AddressNow
        },
        {
          name: "Tình trạng sức khỏe",
          value: this.user[0].Health
        },
        {
          name: "Năng khiếu nổi bật",
          value: this.user[0].Gifted
        }
      ];
    },
    infoFamily() {
      return this.user[0].EmployeeInforFamily;
    },
    infoDecision() {
      return this.user[0].EmployeeDecision;
    },
    infoBHXH() {
      return this.user[0].EmployeeBHXH;
    },
    infoStatus() {
      return this.user[0].EmployeeStatus;
    },
    infoProcess() {
      return this.user[0].EmployeeProcess;
    },
    onSubmit() {
      this.updating = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {
    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }
    img {
      width: 40px;
      height: 40px;
      float: left;
    }
    :after {
      clear: both;
    }
    .img-circle {
      border-radius: 50%;
      border: 2px solid #d2d6de;
      padding: 2px;
    }
    span {
      font-weight: 500;
      font-size: 12px;
    }
  }
  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;
    .image {
      width: 100%;
    }
    .user-images {
      padding-top: 20px;
    }
  }
  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;
    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }
    .link-black {
      &:hover,
      &:focus {
        color: #999;
      }
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
.container-activity {
  border-radius: 16px;
  padding: 20px 10px;
  background-color: #fff;
  box-shadow: 0 0.46875rem 2.1875rem rgba(90, 97, 105, 0.1),
    0 0.9375rem 1.40625rem rgba(90, 97, 105, 0.1),
    0 0.25rem 0.53125rem rgba(90, 97, 105, 0.12),
    0 0.125rem 0.1875rem rgba(90, 97, 105, 0.1);
}
.t-label-tabs {
  color: gray;
  font-size: 10pt;
  font-weight: bold;
  &:hover {
    color: #0277bc;
  }
}
</style>
