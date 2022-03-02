<template>
  <div>
    <el-form
      ref="formTarget"
      label-position="top"
      size="small"
      :model="Target"
      :rules="rulesTarget"
      label-width="120px"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Tên sản phẩm" prop="ProductName">
            <el-input
              v-model="Target.ProductName"
              class="selectIDGroup"
              style="width:100%"
            >
            </el-input>
          </el-form-item>
          <!-- <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="Tên sản phẩm" prop="ProductName">
              <el-input
                v-model="Target.ProductName"
                class="selectIDGroup"
                style="width:100%"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="Lệnh sản xuất" prop="ProductOrder">
              <el-input
                v-model="Target.ProductOrder"
                class="selectIDGroup"
                style="width:100%"
              >
              </el-input>
            </el-form-item>
          </el-col> -->
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Điều kiện bảo quản" prop="Condition">
            <el-input
              v-model="Target.Condition"
              class="selectIDGroup"
              style="width:100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thời gian theo dõi" prop="Time">
            <el-input
              v-model="Target.Time"
              class="selectIDGroup"
              style="width:100%"
              placeholder="Nhập điều kiện..."
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div>
            <el-table style="width: 100%" :data="target.IndexLst">
              <el-table-column label="Chỉ tiêu">
                <template slot-scope="scope">
                  {{ scope.row.TargetName }}
                </template>
              </el-table-column>
              <el-table-column label="Tiêu chuẩn">
                <template slot-scope="scope">
                  {{ scope.row.Index }}
                </template>
              </el-table-column>
              <el-table-column label="Loại">
                <template slot-scope="scope">
                  {{ scope.row.TypeIndex }}
                </template>
              </el-table-column>
              <el-table-column label="Sai số">
                <template slot-scope="scope">
                  {{ scope.row.Error }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <div style="padding:5px;text-align:center;">
        <el-form-item size="large">
          <el-button type="danger" @click="cancelup" icon="el-icon-circle-close"
            >ĐÓNG</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { db } from "./firebase";
import { GetProductionOrder } from "@/api/productionOrder";
import { getStartDate, getEndDate } from "@/api/index";
export default {
  props: ["target"],
  components: {},
  computed: {},
  data() {
    return {
      fileList: [],
      ActiveElement: [],
      dialogTable: false,
      Target: {
        TargetID: "",
        ProductName: "",
        ProductID: "",
        ProductOrder: "",
        Batch: "",
        Time: "",
        IndexLst: Object,
        Condition: "",
        Creator: "",
        TimeCreate: "",
        Status: ""
      },
      rulesTarget: {
        ProductName: [
          {
            required: true,
            message: "Hãy nhập sản phẩm",
            trigger: "change"
          }
        ],
        Time: [
          {
            required: true,
            message: "Hãy chọn thời gian theo dõi",
            trigger: "change"
          }
        ],
        Condition: [
          {
            required: true,
            message: "Hãy nhập điều kiện bảo quản",
            trigger: "change"
          }
        ]
      },
      rulesIndex: {
        TargetName: [
          {
            required: true,
            message: "Hãy chọn chỉ tiêu",
            trigger: "change"
          }
        ],
        Index: [
          {
            required: true,
            message: "Hãy nhập chỉ số",
            trigger: "change"
          }
        ],
        TypeIndex: [
          {
            required: true,
            message: "Hãy chọn loại chỉ số",
            trigger: "change"
          }
        ]
      },
      IndexList: []
    };
  },
  methods: {
    initForm() {
      if (this.target) {
        (this.Target.TargetID = this.target.TargetID),
          (this.Target.ProductName = this.target.ProductName),
          (this.Target.ProductID = this.target.ProductID),
          (this.Target.TargetName = this.target.TargetName),
          (this.Target.ProductOrder = this.target.ProductOrder),
          (this.Target.Condition = this.target.Condition),
          (this.Target.Time = this.target.Time),
          (this.Target.Creator = this.target.Creator),
          (this.Target.TimeCreate = this.target.TimeCreate),
          (this.Target.Note = this.target.Note);
      } else {
        (this.Target.TargetID = ""),
          (this.Target.ProductName = ""),
          (this.Target.ProductID = ""),
          (this.Target.ProductOrder = ""),
          (this.Target.TargetName = ""),
          (this.Target.Condition = ""),
          (this.Target.Time = ""),
          (this.Target.Creator = ""),
          (this.Target.TimeCreate = ""),
          (this.Target.Status = ""),
          (this.Target.Note = "");
      }
    },
    cancelup() {
      this.$emit("cancelDetail");
    }
  },
  mounted() {},
  watch: {
    target() {
      this.initForm();
    }
  },
  created() {
    console.log(this.target);
    this.initForm();
  }
};
</script>
<style>
.el-dialog__body {
  padding: 0px 10px;
}
@media screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 95%;
  }
}
</style>
