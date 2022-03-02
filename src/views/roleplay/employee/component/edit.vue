<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="Tiêu đề">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

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
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Sản phẩm">
        <!-- <el-input v-model="form.name" ></el-input> -->
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="value"
          :fetch-suggestions="querySearch2"
          placeholder="Gõ gợi ý và chọn"
          @select="handleSelect2"
        >
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="handleIconClick2"
          >
          </i>
          <template slot-scope="{ item }">
            <div class="idGroup">{{ item.ProductName }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>

      <!-- <el-form-item label="Sản phẩm">
        <el-input v-model="form.product"></el-input>
      </el-form-item> -->
      <el-form-item label="Chi tiết">
        <el-input v-model="form.note"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="info" @click="closeModal">Hủy</el-button>
    <el-button type="success" @click="modalOK">{{
      meetingHeader == null ? "Thêm" : "Sửa"
    }}</el-button>
  </div>
</template>
<script>
import { GetGroupEmployee, GetAllEmployeesByIdGroup } from "@/api/groups";
import { GetProductLst, updateRole } from "@/api/roleplay";
export default {
  props: {
    meetingHeader: Object
  },
  components: {},
  created() {
    GetGroupEmployee().then(res => {
      this.groupLst = res.Data;
      if (this.meetingHeader) {
        this.form.idGroup = this.meetingHeader.IDGroup;
      }
    });

    GetProductLst().then(res => {
      this.proLst = res.Data;
    });

    this.form.title = this.meetingHeader.Title;
    this.form.note = this.meetingHeader.Note;
    this.value = this.meetingHeader.Product;
    //this.form.idGroup = this.meetingHeader.IDGroup
    //this.initValue();
  },

  methods: {
    querySearch2(queryString, cb) {
      var links = this.proLst;
      //console.log(links)
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      // call callback function to return suggestion objects
      cb(results);
    },
    handleIconClick2(ev) {
      //console.log(ev);
    },

    handleSelect2(item) {
      this.value = item.ProductName;
      //this.changeGroup();
      //this.IDService = item.IDService;
      //console.log(item);
    },
    createFilter2(queryString) {
      return link => {
        //console.log(link)
        link = JSON.parse(JSON.stringify(link));

        //console.log(link)
        return (
          link.ProductName.toLowerCase().includes(queryString.toLowerCase()) ===
          true
        );
      };
    },

    modalOK() {
      this.form.product = this.value;
      var OK = false;
      // console.log(this.value)
      //console.log(this.proLst)
      var _this = this;
      this.proLst.forEach(fun);

      function fun(item, index, arr) {
        //console.log(item.ProductName)
        //console.log(" "+_this.value+ " ")
        if (
          item.ProductName == _this.value ||
          item.ProductName == " " + _this.value + " " ||
          item.ProductName == " " + _this.value
        ) {
          //console.log('ok')
          OK = true;
        }
      }

      if (OK == true) {
        this.form.RowID = this.meetingHeader.RowID;
        //this.form.title = this.form.number + " - " + this.form.month
        //this.form.note = "Đối tượng: "+ this.form.obj + "; Lịch sử trình dược: " + this.form.history + "; Thông tin: " + this.form.infor + "; Mục tiêu: "+ this.form.target
        updateRole(this.form).then(res => {
          if (res.ResCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Chỉnh sửa thành công",
              position: "top-left",
              type: "success"
            });
            this.$emit("click", "ok");
          }
        });
      } else {
        this.$notify({
          title: "Lỗi",
          message: "Bạn cần chọn lại sản phẩm trong danh sách",
          position: "top-left",
          type: "warning"
        });
      }
    },
    closeModal() {
      this.$emit("closeModal");
    }
  },
  watch: {
    meetingHeader() {
      this.form.title = this.meetingHeader.Title;
      this.form.note = this.meetingHeader.Note;
      this.value = this.meetingHeader.Product;
      //this.form.idGroup = this.meetingHeader.IDGroup
    }
  },
  data() {
    var validateTime = (rule, value, callback) => {
      if (value == null || this.form.start == null || this.form.end == null) {
        callback(new Error("Hãy chọn đủ ngày"));
      } else if (this.form.start >= this.form.end) {
        callback(new Error("Thời gian bắt đầu và kết thúc không hợp lệ"));
      } else {
        callback();
      }
    };
    var validateEmlst = (rule, value, callback) => {
      if (this.form.employees.length <= 0) {
        callback(new Error("Hãy chọn nhân viên gặp"));
      } else {
        callback();
      }
    };
    return {
      typeLst: [
        { id: "HOP", name: "Họp" },
        { id: "TRAINING", name: "Coaching" }
      ],
      placeModalVisible: false,
      groupLst: [],
      proLst: [],
      value: "",
      form: {
        title: "",
        idGroup: null,
        type: null,
        content: "",
        date: null,
        start: null,
        end: null,
        note: "",
        product: "",
        obj: "",
        history: "",
        target: "",
        infor: "",
        employees: [],
        number: "",
        month: "",
        RowID: 0
      },
      NumberLst: [
        {
          value: "Lần 1",
          id: 1
        },
        {
          value: "Lần 2",
          id: 2
        }
      ],
      MonthLst: [
        {
          value: "Tháng 1",
          id: 1
        },
        {
          value: "Tháng 2",
          id: 2
        },
        {
          value: "Tháng 3",
          id: 3
        },
        {
          value: "Tháng 4",
          id: 4
        },
        {
          value: "Tháng 5",
          id: 5
        },
        {
          value: "Tháng 6",
          id: 6
        },
        {
          value: "Tháng 7",
          id: 7
        },
        {
          value: "Tháng 8",
          id: 8
        },
        {
          value: "Tháng 9",
          id: 9
        },
        {
          value: "Tháng 10",
          id: 10
        },
        {
          value: "Tháng 11",
          id: 11
        },
        {
          value: "Tháng 12",
          id: 12
        }
      ],
      rules: {
        idGroup: [
          {
            required: true,
            message: "Hãy chọn nhóm",
            trigger: "change"
          }
        ],
        idPlace: [
          {
            required: true,
            message: "Hãy chọn nơi gặp",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "Hãy nhập nội dung",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "Hãy nhập loại nhiệm vụ",
            trigger: "change"
          }
        ],
        date: [
          {
            validator: validateTime,

            trigger: "change"
          }
        ],

        employees: [
          {
            required: true,

            validator: validateEmlst
          }
        ]
      }
    };
  }
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
