<template>
  <div>
    <modal id="new-report-modal" ref="new-report-modal" v-cloak>
      <template slot="title"
        ><i class="fas fa-file-upload"></i>
        &#32;&#32;Báo cáo - Lô nhảy
      </template>
      <div slot="body">
        <el-form
          ref="form"
          label-position="top"
          size="small"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-form-item label="Sản phẩm" prop="ProductName">
                <el-autocomplete
                  class="selectIDGroup"
                  style="width:100%"
                  v-model="form.ProductName"
                  :fetch-suggestions="querySearch2"
                  placeholder="Chọn sản phẩm..."
                  @select="handleSelect"
                >
                  <i
                    class="el-icon-search el-input__icon"
                    slot="suffix"
                    @click="handleIconClick2"
                  >
                  </i>
                  <template slot-scope="{ item }">
                    <div class="value">
                      {{ item.ProductionOrderIDBFO }} -
                      {{ item.ProductionBatch }}
                    </div>
                    <span style="float:right;font-size:12px;color:#b4b4b4;">{{
                      item.ProductID
                    }}</span>
                    <span class="link">{{ item.Product }}</span>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Lệnh sản xuất" prop="ProductionOrderID">
                <el-input
                  class="selectIDGroup"
                  v-model="form.ProductionOrderID"
                  style="width:100%"
                  placeholder="Chọn lệnh SX..."
                  disabled
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Số lô" prop="LotCode">
                <el-input
                  class="selectIDGroup"
                  v-model="form.LotCode"
                  style="width:100%"
                  placeholder="Nhập số lô..."
                  disabled
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Cỡ kiện" prop="BoxSize">
                <el-radio-group v-model="form.BoxSize">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-radio label="Nhỏ"></el-radio>
                    </el-col>
                    <el-col :span="8">
                      <el-radio label="Vừa"></el-radio>
                    </el-col>
                    <el-col :span="8">
                      <el-radio label="Lớn"></el-radio>
                    </el-col>
                  </el-row>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Loại kiện" prop="BoxType">
                <el-radio-group v-model="form.BoxType" @change="changeNote">
                  <el-row>
                    <el-col :span="12">
                      <el-radio :label="1">Kiện lẻ</el-radio>
                    </el-col>
                    <el-col :span="12">
                      <el-radio :label="0">Kiện nguyên</el-radio>
                    </el-col>
                  </el-row>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Số bắt đầu" prop="NumberStart">
                <el-input
                  class="selectIDGroup"
                  v-model.number="form.NumberStart"
                  style="width:100%"
                  placeholder="Nhập số bắt đầu..."
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Số kết thúc" prop="NumberEnd">
                <el-input
                  class="selectIDGroup"
                  v-model.number="form.NumberEnd"
                  style="width:100%"
                  placeholder="Nhập số kết thúc..."
                  @change="QuantityChange"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Mã TT thiếu">
                <el-select
                  class="selectIDGroup"
                  style="width:100%"
                  v-model="NumMiss"
                  placeholder="Nhập mã TT thiếu..."
                  @change="ChangeQuantity"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                >
                  <el-option
                    v-for="item in NumMiss"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
                <span
                  style="font-style: italic; font-size: 11px;color: #f56c6c;"
                  v-if="form.Quantity"
                  >Số lượng thiếu: {{ count }}</span
                >
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Số lượng" prop="Quantity">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Quantity"
                  style="width:100%"
                  placeholder="Số lượng..."
                  disabled
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="24">
            <el-form-item label="Ca" prop="Shift" :inline="true">
              <el-radio-group v-model="form.Shift">
                <el-col :xs="24" :sm="6" :lg="6">
                  <el-radio label="Ca 1"></el-radio>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="6">
                  <el-radio label="Ca 2"></el-radio>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="6">
                  <el-radio label="Ca 3"></el-radio>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="6">
                  <el-radio label="Hành chính"></el-radio>
                </el-col>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-form-item label="Ghi chú">
            <el-input
              class="selectIDGroup"
              v-model="form.Note"
              style="width:100%"
              placeholder="Ghi chú..."
              type="textarea"
              autosize
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div
        slot="footer"
        style="margin:10px;margin-left:auto;margin-right:20px;text-align:center"
      >
        <el-button class="pan-btn grey-btn" @click="closeModal">Hủy</el-button>
        <el-button
          v-if="this.report == null"
          icon="el-icon-check"
          class="pan-btn blue-btn"
          @click="addReport('form')"
          >Xác nhận</el-button
        >
        <el-button
          v-if="this.report != null"
          icon="el-icon-edit"
          class="pan-btn yellow-btn"
          @click="updateReport('form')"
          >Chỉnh sửa</el-button
        >
      </div>
    </modal>
    <el-dialog :visible.sync="dialogFormScanBoxCode" title="Quét mã kiện">
      <q-r-box-code @data="ScanOK"></q-r-box-code>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetProductionOrderBFO,
  GetProductionOrder
} from "@/api/productionOrder";
import QRBoxCode from "@/views/manufacturing/reportJumpLot/Report/component/QRBoxCode";
import {
  CreateReportQuotaBox,
  DelReportQuotaBox,
  UpdateReportQuotaBox
} from "@/api/reportBox";
import { getStartDate, getEndDate } from "@/api/index";
import Cookies from "js-cookie";
export default {
  props: ["report"],
  components: {
    QRBoxCode
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
      count: "",
      ProductionOrderBFOLst: [],
      placesLst: [],
      TimeStart: getLastYear(),
      TimeEnd: getNewYear(),
      NumMiss: [],
      dialogFormScanBoxCode: false,
      rules: {
        ProductionOrderID: [
          {
            required: true,
            message: "Hãy chọn lệnh sản xuất",
            trigger: "change"
          }
        ],
        ProductName: [
          {
            required: true,
            message: "Hãy chọn sản phẩm",
            trigger: "change"
          }
        ],
        NumberStart: [
          {
            required: true,
            message: "Hãy nhập số bắt đầu",
            trigger: "change"
          },
          { type: "number", message: "Vui lòng nhập số" }
        ],
        NumberEnd: [
          {
            required: true,
            message: "Hãy nhập số kết thúc",
            trigger: "change"
          },
          { type: "number", message: "Vui lòng nhập số" }
        ],
        LotCode: [
          {
            required: true,
            message: "Hãy nhập số lô",
            trigger: "change"
          }
        ],
        BoxType: [
          {
            required: true,
            message: "Hãy chọn loại kiện",
            trigger: "change"
          }
        ],
        Shift: [
          {
            required: true,
            message: "Hãy chọn ca",
            trigger: "change"
          }
        ],
        BoxSize: [
          {
            required: true,
            message: "Hãy chọn cỡ",
            trigger: "change"
          }
        ]
      },
      form: {
        DocumentID: "",
        ProductionOrderID: "",
        ProductName: "",
        ProductID: "",
        LotCode: "",
        NumberStart: "",
        NumberEnd: "",
        Quantity: "",
        BoxCode: "",
        BoxType: "",
        BoxSize: "",
        LotCode: "",
        Shift: "",
        Note: "",
        NumberDeficit: ""
      }
    };
  },
  methods: {
    querySearch2(queryString, cb) {
      var links = this.ProductionOrderBFOLst;
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      cb(results);
    },
    handleSelect(item) {
      this.form.ProductName = item.Product;
      this.form.ProductID = item.ProductID;
      this.form.LotCode = item.ProductionBatch;
      this.form.ProductionOrderID = item.ProductionOrderIDBFO;
    },
    handleIconClick2(ev) {},
    createFilter2(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.ProductionBatch.toLowerCase().indexOf(
            queryString.toLowerCase()
          ) === 0
        );
      };
    },
    changeNote(box) {
      if (box == 1) this.form.Note = "Kiện lẻ";
      else {
        this.form.Note = "";
      }
    },
    fetchData() {
      var req = {
        token: Cookies.get("token"),
        DateStart: this.TimeStart,
        DateEnd: this.TimeEnd,
        Search: ""
      };
      GetProductionOrder(req).then(res => {
        if (res.RespCode == 0) {
          this.ProductionOrderBFOLst = res.ProductionOrderLst;
        }
      });
    },
    ScanBoxCode() {
      this.dialogFormScanBoxCode = true;
    },
    ScanOK(data) {
      this.dialogFormScanBoxCode = false;
      this.form.BoxCode = data;
    },
    addReport(re) {
      this.$refs[re].validate(valid => {
        if (this.NumMiss) {
          var parsedobj = JSON.parse(JSON.stringify(this.NumMiss));
          var selectAn = "";
          if (parsedobj) {
            parsedobj.forEach(function(item, index, arr) {
              if (index == 0) {
                selectAn += item;
              } else {
                selectAn += ";" + item;
              }
            });
          }
          this.form.NumberDeficit = selectAn;
        } else {
          this.form.NumberDeficit = "";
        }
        var req = {
          Token: Cookies.get("token"),
          UserName: Cookies.get("idEmployee"),
          ReportQuotaBoxInfo: this.form
        };
        if (valid) {
          CreateReportQuotaBox(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: "Tạo báo cáo thành công",
                type: "success"
              });
              this.closeModal();
              this.$emit("reportAdded", this.form);
            } else {
              this.$message({
                message: res.RespText,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateReport(form) {
      this.$refs[form].validate(valid => {
        var parsedobj = JSON.parse(JSON.stringify(this.NumMiss));
        var selectAn = "";
        if (parsedobj) {
          parsedobj.forEach(function(item, index, arr) {
            if (index == 0) {
              selectAn += item;
            } else {
              selectAn += ";" + item;
            }
          });
        }
        this.form.NumberDeficit = selectAn;
        var req = {
          Token: Cookies.get("token"),
          UserName: Cookies.get("idEmployee"),
          ReportQuotaBoxInfo: this.form
        };
        if (valid) {
          UpdateReportQuotaBox(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: "Chỉnh sửa thành công",
                type: "success"
              });
              this.closeModal();
              this.$emit("reportAdded");
            } else {
              this.$message({
                message: res.RespText,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closeModal() {
      VoerroModal.hide("new-report-modal");
    },
    initForm() {
      if (this.report) {
        this.form.DocumentID = this.report.DocumentID;
        this.form.ProductionOrderID = this.report.ProductionOrderID;
        this.form.ProductName = this.report.ProductName;
        this.form.ProductID = this.report.ProductID;
        this.form.LotCode = this.report.LotCode;
        this.form.NumberStart = this.report.NumberStart;
        this.form.NumberEnd = this.report.NumberEnd;
        this.form.Quantity = this.report.Quantity;
        this.form.BoxCode = this.report.BoxCode;
        this.form.BoxType = this.report.BoxType;
        this.form.BoxSize = this.report.BoxSize;
        this.form.Shift = this.report.Shift;
        this.form.Note = this.report.Note;
        if (this.report.NumberDeficit) {
          this.NumMiss = this.report.NumberDeficit.split(";", 100);
        }
        this.count = this.NumMiss.length;
      } else {
        this.form.DocumentID = null;
        this.form.ProductionOrderID = null;
        this.form.ProductName = null;
        this.form.LotCode = null;
        this.form.NumberStart = null;
        this.form.NumberEnd = null;
        this.form.Quantity = null;
        this.form.BoxCode = null;
        this.form.BoxType = null;
        this.form.BoxSize = null;
        this.form.Shift = null;
        this.form.Note = null;
        this.NumMiss = null;
        this.form.ProductID = null;
      }
    }
  },
  computed: {
    ChangeQuantity() {
      // if((Number(this.form.NumberEnd)-Number(this.form.NumberStart))<0){
      //   this.$message({
      //     message: 'Số kết thúc nhỏ hơn số bắt đầu',
      //     type: 'warning'
      //   })
      // }
      // if(this.form.Quantity<0){
      //   this.$message({
      //     message: 'Số lượng âm',
      //     type: 'warning'
      //   })
      // }
      if (this.NumMiss) {
        this.count = this.NumMiss.length;
        this.form.Quantity =
          Number(this.form.NumberEnd) -
          Number(this.form.NumberStart) +
          1 -
          Number(this.NumMiss.length);
      }
    },
    QuantityChange() {
      if (this.form.NumberEnd) {
        this.form.Quantity =
          Number(this.form.NumberEnd) - Number(this.form.NumberStart) + 1;
      }
    }
  },
  mounted() {},
  watch: {
    report() {
      this.initForm();
    }
  },
  created() {
    this.fetchData();
    this.initForm();
  }
};
</script>
<style lang="scss">
.modal-box {
  width: 50%;
}
.el-autocomplete-suggestion {
  li {
    line-height: normal;
    padding: 7px;

    .value {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .link {
      font-size: 12px;
      color: #b4b4b4;
    }
  }
}
</style>
