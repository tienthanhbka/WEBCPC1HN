<template>
  <div slot="body">
    <el-form
      ref="form"
      label-position="left"
      :model="form"
      :rules="rules"
      class="form-custom"
      label-width="120px"
      size="mini"
    >
      <el-row :gutter="20" v-if="mode > 3">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Nhân viên">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.EmployeeName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="SĐT">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.EmployeeID"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Khách hàng" prop="PlaceName">
        <el-select
          class="selectIDGroup"
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.PlaceName"
          @change="changePlace"
          filterable
          clearable
          placeholder="Chọn khách hàng..."
          style="width:100%"
        >
          <el-option
            v-for="(item, index) in places"
            :key="index"
            :label="item.PlaceName"
            :value="item"
          >
            <span style="float: left">{{ item.PlaceName }}</span>
            <span style="float: right; color: #8492a6; font-size: 10px">{{
              item.PlaceId
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Tần suất" prop="Frequency">
            <el-input
              class="selectIDGroup"
              type="number"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.Frequency"
              placeholder="Tần suất viếng thăm"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="DS dự kiến">
            <!-- <el-input
            type="number"
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.Sales"
              placeholder="Doanh số dự kiến"
            ></el-input> -->
            <cleave
              class="selectIDGroup el-input__inner"
              size="small"
              v-model="form.Sales"
              :options="{
                numeral: true,
                numeralThousandsGroupStyle: 'thousand'
              }"
            ></cleave>
            <div
              style="line-height: 22px;
                font-style: italic;
                color: #2980b9;font-size:10pt;
                word-break:break-word"
            >
              {{ form.Sales | toText }} đồng
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Ghi chú" prop="Note">
        <el-input
          class="selectIDGroup"
          :disabled="mode > 2 ? isDisable : !isDisable"
          v-model="form.Note"
          type="textarea"
          autosize
          rows="4"
          placeholder="Nhập ghi chú..."
        ></el-input>
      </el-form-item>
      <el-row :gutter="20" v-if="mode > 2 && form.EmployeeID">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Người tạo">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.EmployeeID"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Thời gian">
            <el-input
              class="selectIDGroup"
              :disabled="mode > 2 ? isDisable : !isDisable"
              v-model="form.TimeCreate"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:center;margin:10px 0" v-if="mode != 3">
      <el-button
        v-if="mode < 4"
        type="primary"
        size="small"
        icon="el-icon-check"
        @click="create"
      >
        Xác nhận
      </el-button>
    </div>
  </div>
</template>
<script>
import { CreateSaleF, UpdateSaleF } from "@/api/oce";
import { NumberToText } from "@/utils/index";

export default {
  props: {
    row: {
      type: Object,
      require: true
    },
    mode: Number,
    places: Array,
    month: Object
  },
  filters: {
    toText: function(num) {
      return NumberToText(Number(num));
    }
  },
  components: {},
  data() {
    return {
      isDisable: true,
      form: {
        RowID: "",
        OCE_Header: "",
        PlaceID: "",
        PlaceName: "",
        Frequency: "",
        Sales: "",
        Month: "",
        Year: "",
        Note: "",
        EmployeeID: "",
        TimeCreate: "",
        TimeUpdate: "",
        ManagerID: "",
        TimeApprove: "",
        Status: ""
      },

      rules: {
        PlaceName: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        Frequency: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ]
      }
    };
  },

  methods: {
    create(val) {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.mode == 1) {
            if (this.month) {
              this.form.Month = Date.parse(this.month).toString("MM");
              this.form.Year = Date.parse(this.month).toString("yyyy");
            }

            CreateSaleF({
              SaleFInfo: this.form
            }).then(response => {
              if (response.RespCode == 0) {
                this.$notify({
                  title: "Thành công",
                  message: "Thêm phiếu thành công",
                  type: "success",
                  position: "top-left"
                });
                this.$emit("createOK");
                this.initData();
              }
            });
          } else if (this.mode == 2) {
            UpdateSaleF({
              SaleFInfo: this.form
            }).then(response => {
              if (response.RespCode == 0) {
                this.$notify({
                  title: "Thành công",
                  message: "Cập nhật phiếu thành công",
                  type: "success",
                  position: "top-left"
                });
                this.$emit("createOK");
                this.clearData();
              }
            });
          } else if (this.mode == 4) {
            AcceptSaleF({
              DocumentID: this.form.DocumentID,
              Type: val,
              NoteCN: this.form.NoteCN
            }).then(response => {
              if (response.RespCode == 0) {
                this.$notify({
                  title: "Thành công",
                  message: "Xác nhận phiếu thành công",
                  type: "success",
                  position: "top-left"
                });
                this.$emit("createOK");
                this.clearData();
              }
            });
          }
        }
      });
    },
    changePlace(place) {
      this.form.PlaceID = place.PlaceId;
      this.form.PlaceName = place.PlaceName;
    },
    initData() {
      if (this.row) {
        this.form.RowID = this.row.RowID;
        this.form.OCE_Header = this.row.OCE_Header;
        this.form.PlaceID = this.row.PlaceID;
        this.form.PlaceName = this.row.PlaceName;
        this.form.Frequency = this.row.Frequency;
        this.form.Sales = this.row.Sales;
        this.form.Month = this.row.Month;
        this.form.Year = this.row.Year;
        this.form.Note = this.row.Note;
        this.form.EmployeeID = this.row.EmployeeID;
        this.form.TimeCreate = this.row.TimeCreate;
        this.form.TimeUpdate = this.row.TimeUpdate;
        this.form.ManagerID = this.row.ManagerID;
        this.form.TimeApprove = this.row.TimeApprove;
        this.form.Status = this.row.Status;
      } else {
        this.clearData();
      }
    },
    clearData() {
      this.form.RowID = "";
      this.form.OCE_Header = "";
      this.form.PlaceID = "";
      this.form.PlaceName = "";
      this.form.Frequency = "";
      this.form.Sales = "";
      this.form.Month = "";
      this.form.Year = "";
      this.form.Note = "";
      this.form.EmployeeID = "";
      this.form.TimeCreate = "";
      this.form.TimeUpdate = "";
      this.form.ManagerID = "";
      this.form.TimeApprove = "";
      this.form.Status = "";
    }
  },
  created() {
    this.initData();
  },
  watch: {
    row() {
      this.initData();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
