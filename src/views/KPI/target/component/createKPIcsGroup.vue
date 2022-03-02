<template size="mini">
  <modal id="new-target-KPIcs" ref="new-target-KPIcs" v-cloak>
    <template slot="title"
      >Tạo KPIcs</template
    >
    <div></div>
    <div slot="body">
      <div>
        <el-form
          ref="form"
          label-position="top"
          label-width="150px"
          size="mini"
        >
          <div>
            <div>
              <el-form-item label="Chỉ tiêu">
                <el-select v-model="form.IDAction" placeholder="Chọn loại việc">
                  <el-option
                    v-for="item in listAction"
                    :key="item.IDAction"
                    :label="item.Name"
                    :value="item.IDAction"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="khoi-luong">
              <el-form-item label="Khối lượng đích">
                <el-input
                  v-model="amount"
                  type="number"
                  placeholder="VD: Hoàn thành 240 call"
                ></el-input>
                <p>Khối lượng: {{ tCm }}</p>
              </el-form-item>
            </div>
          </div>

          <div>
            <div class="khoi-luong">
              <el-form-item label="Đơn vị">
                <el-input v-model="form.unit" placeholder="VD: call"></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="khoi-luong">
              <el-form-item label="Điểm KPI">
                <el-input v-model="target"></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="Ghi chú">
            <el-input v-model="form.Note"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="clear: both;"></div>
      <div style="width: 100%;color: red; margin: auto; font-weight: bold;">
        KPIcs = {{ target }} / {{ amount }} = {{ KPIcs }} (điểm /
        {{ form.unit }} )
      </div>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button
        type="success"
        icon="el-icon-success"
        @click="createTargetAction"
        >Thêm</el-button
      >
    </div>
  </modal>
</template>
<script>
import { getEmployee } from "@/api/getEmployee";
import {
  GetKPIList,
  CreateTargetAction,
  GetKPIListByGroupEmployee
} from "@/api/kpiList";
import Cookies from "js-cookie";
import { GetGroupEmployee } from "@/api/groups";
export default {
  props: ["row", "listAction"],
  data() {
    return {
      tableData: [],
      KPIcs: 0,
      target: 0,
      amount: 0,
      tCm: "0",
      selectedPlace: [],
      listKPICode: [{}],
      groups: "",
      groupBase: "",
      listEmployee: [{}],
      value: "",
      form: {
        KPICode: 0,
        Name: "Thành công",
        amount: 0,
        TargetRowID: 0,
        month: "",
        Status: 1,
        target: 0,
        IDAction: 0,
        idEmployee: "",
        Note: ""
      },
      links: [],
      state: ""
    };
  },

  methods: {
    closeModal() {
      VoerroModal.hide("new-target-KPIcs");
    },
    toCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    createTargetAction() {
      if (this.amount == 0 || this.target == 0 || this.form.IDAction == 0) {
        this.$notify({
          title: "Lỗi",
          message: "Vui lòng nhập đủ các thông tin",
          type: "warning",
          position: "top-left"
        });
      } else {
        this.form.KPICode = this.$props.row.IDService;
        this.form.TargetRowID = this.$props.row.RowID;
        this.form.month = this.$props.row.month;
        this.form.amount = this.amount;
        this.form.target = this.target;
        this.form.idEmployee = this.$props.row.idEmployee;
        //console.log(this.form);
        CreateTargetAction(this.form).then(response => {
          if (response.ResCode == 0) {
            this.$emit("click-something", response.Data[0]);
            //VoerroModal.hide('new-target-KPIcs');
            this.$notify({
              title: "Thành công",
              message: "Thêm chỉ tiêu thành công",
              type: "success",
              position: "top-left"
            });
            VoerroModal.hide("new-target-KPIcs");

            this.listLoading = false;
          }
        });
      }
    }
  },
  created() {
    //this.fetchEmployee();
    //this.fetchKPICode();
  },
  //  mounted() {
  //   this.links = this.listEmployee();
  // },

  watch: {
    target: function() {
      this.KPIcs = this.target / this.amount;
    },
    amount: function() {
      this.KPIcs = this.target / this.amount;
      this.tCm = this.toCommas(this.amount);
    }
    // groupBase:function(){
    //   this.fetchKPICode();
    // }
  }
};
</script>

<style>
.el-select {
  display: inline-block;
  position: relative;
  width: 100%;
}
</style>
