<template>
  <div>
    <modal id="new-mission-em-modal" ref="new-mission-em-modal" v-cloak>
      <template slot="title"
        >Tạo Nhiệm vụ cho nhóm</template
      >
      <div style="width:1200px" slot="body">
        <el-row :gutter="20" style="height:455px">
          <el-col :span="8">
            <el-form
              ref="form"
              label-position="top"
              size="small"
              :model="form"
              :rules="rules"
              label-width="120px"
            >
              <el-form-item label="Tên nhiệm vụ" prop="title">
                <el-autocomplete
                  class="inline-input"
                  style="width:100%"
                  v-model="form.title"
                  :fetch-suggestions="querySearchName"
                  placeholder="Tên nhiệm vụ"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="Loại nhiệm vụ" prop="typeMission">
                <el-autocomplete
                  class="inline-input"
                  style="width:100%"
                  v-model="form.typeMission"
                  :fetch-suggestions="querySearchType"
                  placeholder="Loại nhiệm vụ"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="Hạn chót" prop="deadline">
                <el-date-picker
                  type="date"
                  placeholder="Chọn thời hạn"
                  v-model="form.deadline"
                  format="dd/MM/yyyy"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="Mục tiêu">
                <el-input v-model="form.target"></el-input>
              </el-form-item>
              <el-form-item label="Ghi chú">
                <el-input v-model="form.note"></el-input>
              </el-form-item>
              <el-form-item label="Thứ thực hiện">
                <el-checkbox-group
                  size="mini"
                  fill="#55efc4"
                  v-model="form.date"
                >
                  <el-checkbox-button
                    v-for="date in dates"
                    :label="date.value"
                    :key="date.value"
                    >{{ date.name }}</el-checkbox-button
                  >
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <el-dropdown @command="pickEmployee">
              <el-button size="small" type="primary">
                Thêm nhân viên
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(em, index) in employeeLst"
                  :key="index"
                  :command="em"
                  v-if="NotExistInemployeeMission(em)"
                  >{{ em.nameEmployee }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <el-button size="small" type="primary" @click="loadEm">
              <i class="fas fa-sync-alt" v-if="!isLoadingEm"></i
              ><i v-else class="el-icon-loading"></i>
            </el-button>
            <el-table
              style="margin-top:12px"
              max-height="330"
              size="small"
              :data="employeeMission"
              highlight-current-row
              border
              @current-change="employeeChange"
              fit
            >
              <el-table-column label="Nhân viên">
                <template slot-scope="scope">
                  {{ scope.row.nameEmployee }}
                  <el-button
                    type="text"
                    @click="removeEm(scope.row)"
                    size="small"
                  >
                    <i class="fas fa-times"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="8">
            <div>
              <el-button size="small" type="primary" @click="openModalPlace"
                >Thêm KHTC</el-button
              >
            </div>
            <el-table
              style="margin-top:12px"
              max-height="340"
              size="small"
              :data="selectedEm && selectedEm.places ? selectedEm.places : []"
              highlight-current-row
              border
              fit
            >
              <el-table-column label="Khách hàng tổ chức">
                <template slot-scope="scope">
                  {{ scope.row.namePlace }}
                  <el-button
                    type="text"
                    @click="deletePlace(scope.row)"
                    size="small"
                  >
                    <i class="fas fa-times-circle"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-button
            type="success"
            size="small"
            style="margin-bottom:10px;float: right;
    margin-right: 30px;"
            @click="createMission"
            >Tạo nhiệm vụ</el-button
          >
          <el-table size="mini" :data="missionLst" border>
            <el-table-column label="Tên nhiệm vụ">
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column label="Nhân viên">
              <template slot-scope="scope">{{
                scope.row.nameEmployee
              }}</template>
            </el-table-column>
            <el-table-column label="Loại nhiệm vụ">
              <template slot-scope="scope">{{
                scope.row.typeMission
              }}</template>
            </el-table-column>
            <el-table-column label="Mục tiêu">
              <template slot-scope="scope">{{ scope.row.target }}</template>
            </el-table-column>
            <el-table-column label="Ghi chú">
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title="KHTC"
                  width="400"
                  trigger="hover"
                >
                  <span style="white-space: pre-wrap;">{{
                    scope.row.places | placesToString
                  }}</span>
                  <el-tag size="mini" type="info" slot="reference"
                    >{{ scope.row.note }} -
                    {{ scope.row.places.length }} KHTC</el-tag
                  >
                </el-popover>
                <el-tag size="mini" type="success">{{
                  scope.row.date | dateToString
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Hạn chót">
              <template slot-scope="scope">
                {{ scope.row.deadline }}
                <el-button
                  type="text"
                  @click="removeMission(scope.row)"
                  size="small"
                  style="float:right;color:red"
                >
                  <i class="fas fa-trash"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>

      <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
        <el-button type="info" @click="closeModal">Hủy</el-button>
        <el-button type="success" @click="uploadMission"
          >Upload nhiệm vụ</el-button
        >
      </div>
    </modal>
    <el-dialog
      title="Thêm KHTC vào nhiệm vụ"
      :visible.sync="dialogAddPlace"
      custom-class="medium-modal"
    >
      <my-place-modal :employee="selectedEm"></my-place-modal>
    </el-dialog>
  </div>
</template>
<script>
import MyPlaceModal from "@/views/mission/mission/components/modal/myPlaceModal";
import {
  GetSuggestNameMission,
  GetSuggestTypeMission,
  AddLstMission
} from "@/api/mission";
import { GetPlaceByIdEmployee } from "@/api/place";
import { getEmployeesByIdGroup } from "@/api/groups";
export default {
  components: { MyPlaceModal },
  props: {
    modalId: String,
    IdGroup: String
  },
  data() {
    var validateDeadline = (rule, value, callback) => {
      if (value < new Date().toISOString().slice(0, 10)) {
        callback(new Error("Hãy chọn ngày trong tương lai"));
      } else {
        callback();
      }
    };
    return {
      isLoadingEm: false,
      dates: [
        { name: "T2", value: 2 },
        { name: "T3", value: 3 },
        { name: "T4", value: 4 },
        { name: "T5", value: 5 },
        { name: "T6", value: 6 },
        { name: "T7", value: 7 },
        { name: "CN", value: 8 }
      ],
      selectedEm: {},
      nameMissionLst: null,
      typeMissonLst: null,
      employeeMission: [],
      missionLst: [],
      placeEm: [],
      employeeLst: [],
      dialogAddPlace: false,
      rules: {
        title: [
          {
            required: true,
            message: "Hãy nhập tên nhiệm vụ",
            trigger: "change"
          }
        ],
        typeMission: [
          {
            required: true,
            message: "Hãy nhập loại nhiệm vụ",
            trigger: "change"
          }
        ],
        deadline: [
          { required: true, message: "Hãy chọn dealine", trigger: "change" },
          { validator: validateDeadline, trigger: "change" }
        ]
      },
      form: {
        title: "",
        typeMission: "",
        deadline: "",
        target: "",
        note: "",
        date: []
      }
    };
  },
  methods: {
    loadEm() {
      this.isLoadingEm = true;
      getEmployeesByIdGroup({ idGroup: this.IdGroup }).then(res => {
        this.isLoadingEm = false;
        for (var i in res.Data) {
          res.Data[i].places = [];
        }
        this.employeeLst = res.Data;
      });
    },
    uploadMission() {
      if (this.missionLst) {
        AddLstMission({ mission: this.missionLst }).then(res => {
          console.log(res);
          VoerroModal.hide("new-mission-em-modal");
          this.$emit("missionAdded", res.Data);
        });
      }
    },
    createMission() {
      for (let i in this.employeeMission) {
        let e = this.employeeMission[i];
        let missionProp = this.form;
        let mission = {
          idGroup: this.IdGroup,
          idEmployee: e.idEmployee,
          nameEmployee: e.nameEmployee,
          title: missionProp.title,
          typeMission: missionProp.typeMission,
          deadline: missionProp.deadline,
          target: missionProp.target,
          note: missionProp.note,
          places: e.places,
          date: missionProp.date
        };
        this.missionLst.push(mission);
      }
    },
    employeeChange(row, oldRow) {
      this.selectedEm = row;
    },
    openModalPlace() {
      this.dialogAddPlace = true;
    },
    NotExistInemployeeMission(em) {
      if (this.employeeMission.length == 0) return true;
      for (var i in this.employeeMission) {
        if (em.idEmployee == this.employeeMission[i].idEmployee) {
          return false;
        }
      }
      return true;
    },
    pickEmployee(em) {
      this.employeeMission.push(em);
    },
    removeEm(em) {
      var index = this.employeeMission.indexOf(em);
      if (index > -1) {
        this.employeeMission.splice(index, 1);
      }
      if (em.idEmployee == this.selectedEm.idEmployee) {
        this.selectedEm.places = [];
        this.selectedEm = null;
      }
    },
    deletePlace(place) {
      var index = this.selectedEm.places.indexOf(place);
      if (index > -1) {
        this.selectedEm.places.splice(index, 1);
      }
    },
    removeMission(mission) {
      var index = this.missionLst.indexOf(mission);
      if (index > -1) {
        this.missionLst.splice(mission, 1);
      }
    },
    createFilter(queryString) {
      return el => {
        return el.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    querySearchName(queryString, cb) {
      var lst = this.nameMissionLst;
      var results = queryString
        ? lst.filter(this.createFilter(queryString))
        : lst;
      cb(results);
    },
    querySearchType(queryString, cb) {
      var lst = this.typeMissonLst;
      var results = queryString
        ? lst.filter(this.createFilter(queryString))
        : lst;
      cb(results);
    },
    addMission(re) {
      this.$refs[re].validate(valid => {
        console.log(this.form);

        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closeModal() {
      VoerroModal.hide("new-mission-modal");
    }
  },

  created() {
    if (this.nameMissionLst == null) {
      GetSuggestNameMission().then(res => {
        this.nameMissionLst = res.Data;
      });
    }
    if (this.typeMissonLst == null) {
      GetSuggestTypeMission().then(res => {
        this.typeMissonLst = res.Data;
      });
    }
    var ms = new Date().getTime() + 7 * 24 * 3600 * 1000;
    this.form.deadline = new Date(ms).toISOString().substring(0, 10);
  },
  watch: {
    IdGroup: function() {
      this.missionLst = [];
      this.employeeMission = [];
      this.placeEm = [];
      this.employeeLst = [];
      getEmployeesByIdGroup({ idGroup: this.IdGroup }).then(res => {
        for (var i in res.Data) {
          res.Data[i].places = [];
        }
        this.employeeLst = res.Data;
      });
    }
  },
  filters: {
    placesToString(places) {
      var str = "";
      for (var i in places) {
        if (places[i].namePlace.length <= 42) {
          str += "-" + places[i].namePlace + "\n";
        } else {
          str += "-" + places[i].namePlace.substring(0, 38) + "...\n";
        }
      }
      return str;
    },
    dateToString(dates) {
      var str = "";
      for (var i in dates) {
        if (dates[i]) {
          str += ":" + dates[i];
        }
      }
      console.log(str);

      return str.replace("8", "CN").substr(1);
    }
  }
};
</script>
<style lang="css" scoped>
.el-form-item {
  margin-bottom: 0px;
}
.el-form-item label {
  padding: 0px;
}
.el-form--label-top .el-form-item__label{
  padding: 0px;
}
.el-table__row button {
  float: right;
  margin: -4px;
  color: #d63031;
}
</style>
