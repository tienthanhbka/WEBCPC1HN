<template>
  <div>
    <modal id="new-mission-modal" ref="new-mission-modal" v-cloak>
      <template slot="title"
        >Nhiệm vụ</template
      >

      <div slot="body">
        <el-row :gutter="20" style="height:455px">
          <el-col :span="12">
            <el-form
              ref="form"
              label-position="top"
              size="small"
              :model="form"
              :rules="rules"
              label-width="120px"
            >
              <el-form-item label="Nhóm" prop="idGroup">
                <el-select
                  v-model="form.idGroup"
                  placeholder="Chọn nhóm"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in groupLst"
                    :key="item.idGroup"
                    :label="item.idGroup"
                    :value="item.idGroup"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
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
                <el-select
                  style="width:100%"
                  v-model="form.typeMission"
                  placeholder="Chọn loại nhiệm vụ"
                >
                  <el-option
                    v-for="item in typeMissonLst"
                    :key="item.attribute"
                    :label="item.value"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
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

          <el-col :span="12" v-if="!this.mission">
            <div>
              <el-button size="small" type="primary" @click="openModalPlace"
                >Thêm KHTC</el-button
              >
            </div>
            <el-table
              style="margin-top:12px"
              max-height="340"
              size="small"
              :data="placesLst"
              highlight-current-row
              border
              fit
            >
              <el-table-column label="Khách hàng tổ chức">
                <template slot-scope="scope">
                  {{ scope.row.PlaceName }}
                  <el-button
                    type="text"
                    @click="deletePlace(scope.row)"
                    style="float:right"
                    size="small"
                  >
                    <i class="fas fa-times-circle" style="color:red"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>

      <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
        <el-button type="info" @click="closeModal">Hủy</el-button>
        <el-button type="success" @click="addMission('form')">Thêm</el-button>
      </div>
    </modal>
    <el-dialog
      title="Thêm KHTC vào nhiệm vụ"
      :visible.sync="dialogAddPlace"
      custom-class="medium-modal"
    >
      <my-place-modal
        style="z-index:1001"
        :placeLst="placesLst"
        @closeModal="closeModalPlace"
      ></my-place-modal>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetSuggestNameMission,
  GetSuggestTypeMission,
  AddLstMission,
  UpdateMissionByMId
} from "@/api/mission";
import { GetGroupEmployee } from "@/api/groups";
import MyPlaceModal from "./myPlaceModal.vue";
export default {
  props: {
    modalId: String,
    mission: Object
  },
  components: {
    MyPlaceModal
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
      dates: [
        { name: "T2", value: "2" },
        { name: "T3", value: "3" },
        { name: "T4", value: "4" },
        { name: "T5", value: "5" },
        { name: "T6", value: "6" },
        { name: "T7", value: "7" },
        { name: "CN", value: "8" }
      ],
      nameMissionLst: null,
      typeMissonLst: null,
      groupLst: null,
      placesLst: [],
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
        idGroup: "",
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
    deletePlace(place) {
      var index = this.placesLst.indexOf(place);
      if (index > -1) {
        this.placesLst.splice(index, 1);
      }
    },
    openModalPlace() {
      this.dialogAddPlace = true;
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
        this.form.places = this.placesLst;
        this.form.time = Date.today().toString("yyyy-MM-dd");
        this.form.status = 1;

        if (valid) {
          if (!this.mission)
            AddLstMission({
              mission: [this.form]
            }).then(res => {
              this.$emit("missionAdded", this.form);
              this.closeModal();
            });
          else {
            let MissionInfo = {
              GroupId: this.form.idGroup,
              MissionId: this.form.idMission,
              EmployeeId: this.form.idEmployee,
              EmployeeName: this.form.nameEmployee,
              Target: this.form.target,
              Deadline: Date.parse(this.form.deadline).toString(
                "yyyy-MM-dd HH:mm:ss"
              ),
              Note: this.form.note,
              MissionType: this.form.typeMission,
              MissionName: this.form.title,
              Report: this.form.report,
              ExecDate: this.form.date.join(":")
            };
            UpdateMissionByMId({
              MissionInfo: MissionInfo
            }).then(res => {
              if (res.RespCode == 0) {
                this.$emit("missionAdded", this.form);
                this.closeModal();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    closeModal() {
      VoerroModal.hide("new-mission-modal");
    },
    closeModalPlace() {
      this.dialogAddPlace = false;
    }
  },
  mounted() {},
  watch: {
    mission() {
      if (this.mission) {
        this.form.title = this.mission.title;
        this.form.typeMission = this.mission.typeMission;
        this.form.idEmployee = this.mission.idEmployee;
        this.form.nameEmployee = this.mission.nameEmployee;

        this.form.idMission = this.mission.idMission;
        this.form.deadline = this.mission.deadline;
        this.form.target = this.mission.target;
        this.form.note = this.mission.note;
        this.form.date = this.mission.date.split(":");
        this.placesLst = JSON.parse(JSON.stringify(this.mission.places));
      } else {
        this.form.title = "";
        this.form.typeMission = "";
        this.form.deadline = "";
        this.form.target = "";
        this.form.note = "";
        this.form.date = [];
        this.placesLst = [];
      }
    }
  },
  created() {
    if (this.nameMissionLst == null) {
      GetSuggestNameMission().then(res => {
        this.nameMissionLst = res.Data;
      });
    }
    if (this.groupLst == null) {
      GetGroupEmployee().then(res => {
        this.groupLst = res.Data;
        this.form.idGroup = res.Data[0].idGroup;
      });
    }
    if (this.typeMissonLst == null) {
      GetSuggestTypeMission().then(res => {
        this.typeMissonLst = res.Data;
      });
    }
    var ms = new Date().getTime() + 7 * 24 * 3600 * 1000;
    this.form.deadline = new Date(ms).toString("yyyy-MM-dd");
  }
};
</script>
