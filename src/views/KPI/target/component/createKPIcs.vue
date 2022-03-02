<template>
  <div>
    <el-form
      ref="form"
      class="form-custom"
      label-width="120px"
      size="small"
      label-position="left"
    >
      <el-form-item label="Chỉ tiêu">
        <el-select
          v-model="form.Name"
          filterable
          clearable
          placeholder="Chọn đơn vị"
          @change="handleSelect"
        >
          <el-option
            v-for="(item, index) in listAction"
            :key="index"
            :label="item.Name"
            :value="item"
          >
          </el-option>
        </el-select>
        <!-- <el-autocomplete
          style="width:100%"
          v-model="form.Name"
          :fetch-suggestions="querySearch"
          placeholder="Chọn loại việc..."
          clearable
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <div class="value">{{ item.Name }}</div>
          </template>
        </el-autocomplete> -->
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Khối lượng đích">
            <el-input
              v-model="amount"
              type="number"
              placeholder="VD: Hoàn thành 240 call"
            ></el-input>
            <p>Khối lượng: {{ tCm }}</p>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Đơn vị">
            <el-select v-model="form.unit" placeholder="Chọn đơn vị">
              <el-option
                v-for="item in units"
                :key="item.OtherId"
                :label="item.Value"
                :value="item.Value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Điểm KPI">
        <div style="display:flex">
          <el-input v-model="target" type="number"></el-input>
          <div
            style=" width: 100%;color: red; margin-left: 20px; font-weight: bold; "
          >
            KPIcs = {{ target }} / {{ amount }} = {{ KPIcs }} (điểm /
            {{ form.unit }} )
          </div>
        </div>
      </el-form-item>
      <el-form-item label="Ghi chú">
        <el-input v-model="form.Note" placeholder="Nhập ghi chú"></el-input>
      </el-form-item>
    </el-form>

    <div style="text-align:center">
      <el-button
        type="primary"
        icon="el-icon-success"
        @click="createTargetAction"
        >Thêm</el-button
      >
    </div>
  </div>
</template>
<script>
import { GetDefaultValue } from "@/api/default";
import { CreateTargetAction, GetUnitWorkCode } from "@/api/kpiList";
export default {
  props: ["row", "listAction"],
  data() {
    return {
      KPIcs: 0,
      target: 0,
      amount: 0,
      tCm: "0",
      groups: "",
      groupBase: "",
      value: "",
      form: {
        Name: "",
        KPICode: "",
        amount: "",
        TargetRowID: "",
        month: "",
        target: "",
        IDAction: "",
        unit: "",
        Note: ""
      },
      units: []
    };
  },

  methods: {
    querySearch(queryString, cb) {
      var links = this.listAction;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      cb(results);
    },
    handleSelect(item) {
      this.form.Name = item.Name;
      this.form.IDAction = item.IDAction;
      GetUnitWorkCode({
        WorkCode: item.CodeWork
      }).then(res => {
        if (res.RespCode == 0) {
          this.form.unit = res.Unit;
        }
      });
    },
    createFilter(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return link.Name.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
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
        //console.log(this.form);
        CreateTargetAction(this.form).then(response => {
          if (response.ResCode == 0) {
            this.$emit("click-something", this.form);
            this.$notify({
              title: "Thành công",
              message: "Thêm chỉ tiêu thành công",
              type: "success",
              position: "top-left"
            });
          }
        });
      }
    },
    fetchDefault() {
      GetDefaultValue({ Table: "" }).then(res => {
        if (res.RespCode == 0) {
          let a = [];
          res.OtherLst.forEach(element => {
            if (element.Table == "WorkUnit") {
              a.push(element);
            }
          });
          this.units = a;
        }
      });
    }
  },
  created() {
    this.fetchDefault();
  },

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
