<template>
  <div slot="body">
    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      label-width="130px"
      size="mini"
    >
      <el-form-item label="Bộ phận">
        <el-input v-model="row.IDGroup"></el-input>
      </el-form-item>
      <el-form-item label="Kế hoạch">
        <el-input v-model="row.Type"></el-input>
      </el-form-item>
      <el-form-item label="Lý do">
        <el-input v-model="row.Reason"></el-input>
      </el-form-item>
      <div>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="Thời gian bắt đầu">
              <el-date-picker
                style="width:100%"
                v-model="row.TimeStart"
                type="date"
                placeholder="Chọn ngày"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="Thời gian kết thúc">
              <el-date-picker
                style="width:100%"
                v-model="row.TimeEnd"
                type="date"
                placeholder="Chọn ngày"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div style="margin-left:130px" v-if="listDate.length > 0">
        <div
          v-for="(item, index) in listDate"
          :key="index"
          style="margin-bottom:5px"
        >
          <span style="font-weight:600;font-size:10pt;margin-right:20px">{{
            item.Date
          }}</span>
          <!-- item.Index (0->CN;1->T2;2->T3;3->T4;4->T5;5->T6;6->T7) -->
          <!-- Chiều T7, Chủ nhật nghỉ-->
          <el-radio-group v-model="item.Half">
            <el-radio :label="1">Sáng</el-radio>
            <el-radio :label="2">Chiều</el-radio>
            <el-radio :label="3">Cả ngày</el-radio>
          </el-radio-group>
        </div>
        <p
          style="color:red;font-style:italic;margin: 0 0 10px 0px;font-size:10pt;font-weight:700"
        >
          Số ngày đăng kí : {{ NumberNP }}
        </p>
      </div>
      <el-form-item label="Ghi chú">
        <el-input type="textarea" :rows="1" v-model="row.Note"></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label" style="font-size:10pt;font-weight:600;color:#02bc77;"
          >Ghi chú QL</span
        >
        <el-input type="textarea" :rows="1" v-model="row.Comment"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:center;">
      <el-button size="small" type="info" @click="cancelMission"
        >Không đồng ý</el-button
      >
      <el-button
        size="small"
        type="success"
        icon="el-icon-success"
        @click="editMission"
      >
        Đồng ý</el-button
      >
    </div>
  </div>
</template>
<script>
import { ApproveMissionVacation } from "@/api/missionVacation";
import { GetGroupEmployee } from "@/api/groups";
export default {
  props: ["row", "typeList"],
  data() {
    return {
      options: [{}],
      value: "",
      form: {
        Reason: "",
        Type: "",
        Note: "",
        TimeStart: "",
        TimeEnd: "",
        IDGroup: "",
        Half: "0"
      },
      listDate: [],
      NumberNP: 0
    };
  },

  methods: {
    cancelModal() {
      this.$emit("cancel");
    },
    fetchOffice() {
      this.listDate = this.$props.row.ExtraData
        ? JSON.parse(this.$props.row.ExtraData)
        : "";
      if (this.listDate.length > 0) {
        this.CaculNP();
      }
      this.listLoading = true;
      GetGroupEmployee().then(response => {
        this.options = response.Data;
        //console.log(this.options);
        this.listLoading = false;
      });
    },
    cancelMission() {
      const req = {
        Status: 5,
        DocumentID: this.row.RowID,
        Comment: this.row.Comment
      };
      ApproveMissionVacation(req).then(response => {
        if (response.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Xác nhận không duyệt thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("click-something");
          this.listLoading = false;
        }
      });
    },
    editMission() {
      const req = {
        Status: 3,
        DocumentID: this.row.RowID
      };
      ApproveMissionVacation(req).then(response => {
        if (response.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Duyệt phiếu thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("click-something");
          this.listLoading = false;
        }
      });
    },
    //Hàm tính số ngày nghỉ
    CaculNP() {
      let NumberNP = 0;
      this.listDate.forEach(item => {
        let count = 0;
        switch (item.Half) {
          case 1:
            count = 0.5;
            break;
          case 2:
            count = 0.5;
            break;
          case 3:
            count = 1;
            break;
          default:
            0;
        }
        NumberNP += count;
      });
      this.NumberNP = NumberNP;
    }
  },
  created() {
    this.fetchOffice();
  },
  mounted() {},
  watch: {
    row() {
      this.fetchOffice();
    }
  }
};
</script>

<style></style>
