<template>
  <div>
    <modal id="new-report-modal" ref="new-report-modal" v-cloak>
      <template slot="title"
        ><i class="fas fa-file-upload"></i>
        &#32;&#32;Báo cáo - kiểm tra thường xuyên
        </template>
      <div slot="body">
        <el-row :gutter="20" style="height:455px">
          <el-form
            ref="form"
            label-position="top"
            size="small"
            :model="form"
            :rules="rules"
            label-width="120px"
          >
            <el-col :span="24">
              <el-form-item label="Nhóm" prop="idGroup" multiple>
                <el-select
                class="border"
                  v-model="form.group"
                  placeholder="Chọn nhóm"
                  style="width:100%"
                  multiple
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
            </el-col>
            <el-col :span="12">
              <el-form-item label="Ngày kiểm tra" prop="title">
                    <el-date-picker
                    class="border"
                    v-model="form.deadline"
                    type="date"
                    format="dd/MM/yyyy"
                    placeholder="Ngày kiểm tra..."
                    style="width:100%">
                    </el-date-picker>
              </el-form-item>
              <el-form-item label="File tổng hợp kết quả">
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList">
                    <el-button size="small" type="info">chọn tệp</el-button>
                </el-upload>
              </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="Tháng" prop="title">
                    <el-date-picker
                    class="border"
                    v-model="form.note"
                    type="month"
                    format="MM/yyyy"
                    placeholder="Tháng..."
                    style="width:100%">
                    </el-date-picker>
              </el-form-item>
              <!-- <el-form-item label="Nội dung" prop="title">
                <el-input 
                v-model="form.note" 
                style="width:100%"
                placeholder="Nội dung..."
                type="textarea"
                autosize
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Slide/Xác nhận/Checklist">
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList">
                    <el-button size="small" type="info">chọn tệp</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="Bảng tổng hợp kết quả">
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList">
                    <el-button size="small" type="info">chọn tệp</el-button>
                </el-upload>
              </el-form-item> -->
            </el-col>
            <el-col :span="24">
            <el-form-item label="Ghi chú">
              <el-input 
              class="border"
                v-model="form.note" 
                style="width:100%"
                placeholder="Ghi chú..."
                type="textarea"
                autosize
               ></el-input>
            </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px;text-align:center">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="danger" @click="addMission('form')">Xác nhận</el-button>
    </div>
    </modal>
  </div>
</template>
<script>
import {
  GetSuggestNameMission,
  GetSuggestTypeMission,
  AddLstMission
} from "@/api/mission";
import { GetGroupEmployee } from "@/api/groups";
import MyPlaceModal from "@/views/mission/mission/components/modal/myPlaceModal";
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
      nameMissionLst: null,
      typeMissonLst: null,
      groupLst: null,
      placesLst: [],
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
          group:[],
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
      VoerroModal.show("my-place-modal");
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
        console.log(this.form);

        if (valid) {
          AddLstMission({
            mission: [this.form]
          }).then(res => {
            this.$emit("missionAdded", this.form);
            this.closeModal();
          });
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
  mounted() {},
  watch: {
    mission() {
      if (this.mission) {
        this.form.title = this.mission.title;
        this.form.typeMission = this.mission.typeMission;
        this.form.deadline = this.mission.deadline;
        this.form.target = this.mission.target;
        this.form.note = this.mission.note;
        this.form.date = this.mission.date;
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
<style>
.border .el-input__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #dcdfe6;
}
.border .el-textarea__inner{
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #dcdfe6;
}
.modal-box{
    width: 50%;
}
</style>
