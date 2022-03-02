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
      <el-row>
        <el-col :span="24">
          <el-form-item label="Tên sản phẩm" prop="ProductName">
            <el-input
              v-model="Target.ProductName"
              class="selectIDGroup"
              style="width:100%"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span style="color:#02bc77;font-size:10pt;font-weight:700;"
            ><i class="fas fa-clipboard-list"></i> Danh sách chỉ tiêu</span
          >
        </div>
        <el-form
          ref="formIndex"
          label-position="top"
          size="small"
          :model="Index"
          :rules="rulesIndex"
          label-width="120px"
        >
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Chỉ tiêu" prop="TargetName">
                <el-select
                  v-model="Index.TargetName"
                  placeholder="Chọn chỉ tiêu"
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in TargetList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Loại" prop="TypeIndex">
                <el-select
                  v-model="Index.TypeIndex"
                  placeholder="Chọn loại chỉ tiêu"
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in TypeIndexLst"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Mức chất lượng" prop="Index">
                <el-input
                  v-model="Index.Index"
                  class="selectIDGroup"
                  style="width:100%"
                  placeholder="Nhập mức chất lượng..."
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Đơn vị" prop="Unit">
                <el-input
                  v-model="Index.Unit"
                  class="selectIDGroup"
                  style="width:100%"
                  placeholder="Nhập đơn vị..."
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center;">
          <el-button
            icon="el-icon-plus"
            @click="addIndex"
            size="mini"
            style="background-color:#02bc77;color:#fff;"
            >THÊM</el-button
          >
        </div>
      </el-card>
      <el-row>
        <el-col :span="24">
          <div>
            <el-table style="width: 100%" :data="IndexList">
              <el-table-column label="Chỉ tiêu">
                <template slot-scope="scope">
                  {{ scope.row.TargetName }}
                </template>
              </el-table-column>
              <el-table-column label="Mức chất lượng" width="180">
                <template slot-scope="scope">
                  {{ scope.row.Index }}
                </template>
              </el-table-column>
              <el-table-column label="Đơn vị" width="100">
                <template slot-scope="scope">
                  {{ scope.row.Unit }}
                </template>
              </el-table-column>
              <el-table-column width="80">
                <template slot-scope="scope">
                  <el-button
                    @click="del(scope.$index)"
                    type="text"
                    style="color:red;"
                    ><i class="far fa-trash-alt"></i
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <div style="padding:5px;text-align:right">
        <el-form-item size="large">
          <el-button type="danger" @click="cancelup" icon="el-icon-circle-close"
            >Hủy</el-button
          >
          <el-button
            icon="fas fa-plus"
            style="background-color:#02bc77;color:white;"
            @click="addTarget('formTarget')"
            >Tạo mới</el-button
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
      Time: "",
      IndexList: [],
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
      Index: {
        TargetName: "",
        Index: "",
        Unit: "",
        TypeIndex: "",
        Error: ""
      },
      TypeIndexLst: [
        {
          value: "1",
          label: "Dạng số"
        },
        {
          value: "2",
          label: "Dạng chữ"
        }
      ],
      TargetList: [
        {
          value: "1",
          label: "Tính chất"
        },
        {
          value: "2",
          label: "Độ trong"
        },
        {
          value: "3",
          label: "Độ đồng nhất"
        },
        {
          value: "4",
          label: "Đồng đều hàm lượng"
        },
        {
          value: "5",
          label: "Thể tích"
        },
        {
          value: "6",
          label: "Đồng đều khối lượng"
        },
        {
          value: "7",
          label: "pH"
        },
        {
          value: "8",
          label: "Giới hạn nhiễm khuẩn"
        },
        {
          value: "9",
          label: "Giới hạn tạp chất"
        },
        {
          value: "10",
          label: "Định tính"
        },
        {
          value: "11",
          label: "Kích thước tiểu phân"
        },
        {
          value: "12",
          label: "Độ rã"
        },
        {
          value: "13",
          label: "Độ hòa tan"
        },
        {
          value: "14",
          label: "Thử vô khuẩn"
        },
        {
          value: "15",
          label: "Độ nhớt"
        },
        {
          value: "16",
          label: "Tỷ trọng"
        },
        {
          value: "17",
          label: "Nội độc tố"
        },
        {
          value: "18",
          label: "Đồng đều phân liều"
        },
        {
          value: "19",
          label: "Áp suất thẩm thấu"
        },
        {
          value: "20",
          label: "Độ ẩm"
        },
        {
          value: "21",
          label: "Độ mịn"
        }
      ],
      ConditionLst: [
        {
          value: "1",
          label: "Dưới 30 °C"
        },
        {
          value: "2",
          label: "Dưới 25 °C"
        },
        {
          value: "3",
          label: "Dưới 15 °C"
        },
        {
          value: "4",
          label: "Dưới 8 °C"
        },
        {
          value: "5",
          label: "Bảo quản lạnh"
        },
        {
          value: "6",
          label: "Bảo quản mát"
        }
      ],
      TimeLst: [
        {
          value: "1",
          label: "3 ngày"
        },
        {
          value: "2",
          label: "5 ngày"
        },
        {
          value: "3",
          label: "7 ngày"
        },
        {
          value: "4",
          label: "2 tuần"
        },
        {
          value: "5",
          label: "3 tuần"
        },
        {
          value: "6",
          label: "4 tuần"
        },
        {
          value: "7",
          label: "2 tháng"
        },
        {
          value: "8",
          label: "3 tháng"
        },
        {
          value: "9",
          label: "6 tháng"
        }
      ],
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      ProductionOrderLst: [],
      DateStart: getStartDate(),
      DateEnd: getEndDate()
    };
  },
  methods: {
    querySearch2(queryString, cb) {
      var links = this.ProductionOrderLst;
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      cb(results);
    },
    handleSelect(item) {
      this.Target.ProductName = item.Product;
      this.Target.ProductOrder = item.ProductionOrderIDBFO;
      this.Target.ProductID = item.ProductID;
      this.Target.Batch = item.ProductionBatch;
    },
    handleIconClick2(ev) {},
    createFilter2(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.Product.toLowerCase().includes(queryString.toLowerCase()) ===
          true
        );
      };
    },
    addTarget(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          let date = new Date();
          let v =
            Math.random()
              .toString(36)
              .substring(2) + Date.now().toString(36);
          db.ref("/TargetList/" + v.toString(16)).set(
            {
              TargetID: v,
              ProductName: this.Target.ProductName,
              Creator: Cookies.get("idEmployee"),
              TimeCreate: date.toLocaleString(),
              IndexLst: Object.assign({}, this.IndexList),
              Status: 1
            },
            function(error) {
              if (error) {
                console.log(error);
              } else {
                console.log("tạo thành công");
              }
            }
          );
          this.$message({
            message: "Tạo chỉ tiêu thành công",
            type: "success"
          });
          this.$emit("TargetAdded");
        } else {
          return false;
        }
        this.$refs.formTarget.resetFields();
        this.Target = {
          TargetID: "",
          ProductName: "",
          ProductID: "",
          Batch: "",
          ProductOrder: "",
          Time: "",
          IndexLst: Object,
          Condition: "",
          Creator: "",
          TimeCreate: "",
          Status: ""
        };
        this.IndexList = [];
      });
    },
    addIndex() {
      this.$refs.formIndex.validate(valid => {
        if (valid) {
          this.IndexList.push({
            TargetName: this.Index.TargetName,
            Index: this.Index.Index,
            Unit: this.Index.Unit,
            TypeIndex: this.Index.TypeIndex
          });
          this.$refs.formIndex.resetFields();
        }
      });
    },
    initForm() {
      // if (this.target) {
      //   (this.Target.TargetID = this.target.TargetID),
      this.Target.ProductName = this.target.ProductName;
      //     (this.Target.Time = this.target.Time),
      //     (this.Target.ProductOrder = this.target.ProductOrder),
      //     (this.Target.Condition = this.target.Condition),
      //     (this.Target.TimeCreate = this.target.TimeCreate),
      //     (this.Target.Note = this.target.Note);
      //   this.IndexList = this.target.IndexLst;
      // } else {
      //   this.Target = {
      //     TargetID: "",
      //     ProductName: "",
      //     ProductID: "",
      //     ProductOrder: "",
      //     Batch: "",
      //     Time: "",
      //     IndexLst: Object,
      //     Condition: "",
      //     Creator: "",
      //     TimeCreate: "",
      //     Status: ""
      //   };
      //   this.IndexList = [];
      // }
    },
    cancelup() {
      this.$emit("cancel");
    },
    del(index) {
      this.IndexList.splice(index, 1);
    }
  },
  mounted() {},
  watch: {
    target() {
      this.initForm();
    }
  },
  created() {
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
