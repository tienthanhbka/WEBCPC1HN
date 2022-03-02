<template>
  <div>
    <div>
      <span style="font-weight: bold;"> Nhân viên: </span>
      {{ userDetail[0].nameEmployee }}
    </div>
    <div>
      <span style="font-weight: bold;"> Loại nhân viên:</span>
      {{ userDetail[0].TypeEmployee }}
    </div>
    <div><span style="font-weight: bold;"> Nhóm:</span> {{ idGroup }}</div>
    <div>
      <span style="font-weight: bold;"> Quản lý loại 2:</span> {{ Sta2 }}
    </div>
    <div>
      <span style="font-weight: bold;">Quản lý loại 3:</span> {{ Sta3 }}
    </div>
    <div>
      <span style="font-weight: bold;">Quản lý loại 4:</span> {{ Sta4 }}
    </div>

    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      size="small"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="Nhóm">
        <!-- <el-input v-model="form.name" ></el-input> -->
        <el-autocomplete
          style="width:100%"
          class="selectIDGroup"
          v-model="form.idGroup"
          :fetch-suggestions="querySearch2"
          placeholder="Gõ gợi ý và chọn"
          @select="handleSelect2"
        >
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="handleIconClick2"
          >
          </i>
          <template slot-scope="{ item }">
            <div class="idGroup">{{ item.idGroup }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="Quyền">
        <el-select
          style="width:100%"
          class="selectIDGroup"
          v-model="form.status"
          placeholder="Chọn loại"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <div style="text-align:center">
        <el-button type="primary" size="small" @click="modalOK">
          Xác nhận</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
import {
  GetDetailEmployee,
  GetEmployeeDefine,
  GetLstGroup,
  UpdateGroup
} from "@/api/employeeAdmin";
export default {
  props: ["user"],
  data() {
    return {
      lstGroup: [],
      form: {
        idGroup: "",
        status: "",
        idEmployee: ""
      },
      options: [
        {
          value: 1,
          label: "Nhân viên"
        },
        {
          value: 2,
          label: "Quản lý cấp 2"
        },
        {
          value: 3,
          label: "Quản lý cấp 3"
        },
        {
          value: 4,
          label: "Quản lý cấp 4"
        }
      ],
      userDetail: "",
      idGroup: "",
      Sta2: "",
      Sta3: "",
      Sta4: ""
    };
  },
  methods: {
    querySearch2(queryString, cb) {
      var links = this.lstGroup;
      //console.log(links)
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      // call callback function to return suggestion objects
      cb(results);
    },
    handleIconClick2(ev) {
      //console.log(ev);
    },

    handleSelect2(item) {
      this.form.idGroup = item.idGroup;
      //this.changeGroup();
      //this.IDService = item.IDService;
      //console.log(item);
    },
    createFilter2(queryString) {
      return link => {
        //console.log(link)
        link = JSON.parse(JSON.stringify(link));
        //console.log(link)
        return (
          link.idGroup.toLowerCase().includes(queryString.toLowerCase()) ===
          true
        );
      };
    },
    fetchGroup() {
      GetLstGroup().then(res => {
        // alert('ok')
        this.lstGroup = res.Data;
      });
    },
    fetchData() {
      var req = {
        idEmployee: this.user.idEmployee,
        EmployeeID: this.user.EmployeeID
      };
      GetDetailEmployee(req).then(res => {
        this.userDetail = res.Data;
        var this_ = this;
        this.userDetail.forEach(function(item, index, arr) {
          if (item.status == 1) {
            this_.idGroup += item.idGroup + ", ";
          }

          if (item.status == 2) {
            this_.Sta2 += item.idGroup + ", ";
          }

          if (item.status == 3) {
            this_.Sta3 += item.idGroup + ", ";
          }

          if (item.status == 4) {
            this_.Sta4 += item.idGroup + ", ";
          }
        });
      });
    },
    modalOK() {
      this.form.idEmployee = this.user.idEmployee;
      UpdateGroup(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Cập nhật nhóm thành công",
          position: "top-left",
          type: "success"
        });
        this.initForm();
      });
    },
    initForm() {
      this.idGroup = "";
      this.Sta2 = "";
      this.Sta3 = "";
      this.Sta4 = "";
      this.fetchData();
    }
  },
  created() {
    this.fetchGroup();
    this.initForm();
  },
  watch: {
    user() {
      this.initForm();
      this.fetchGroup();
    }
  }
};
</script>
