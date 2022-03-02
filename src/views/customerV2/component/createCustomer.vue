<template>
  <div>
    <modal id="new-customer-modal" ref="new-customer-modal" v-cloak>
      <template slot="title"
        ><i class="fas fa-user-plus"></i>
        &#32;&#32;Tạo mới khách hàng cá nhân
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
            <!-- <el-col :xs="24" :sm="24" :lg="24">
              <el-form-item label="Họ và tên" prop="CustomerName">
                <el-input
                  class="selectIDGroup"
                  v-model="form.CustomerName"
                  style="width:100%"
                  placeholder="Nhập Họ và tên..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Họ và tên" prop="CustomerName">
                <el-input
                  class="selectIDGroup"
                  v-model="form.CustomerName"
                  style="width:100%"
                  placeholder="Nhập Họ và tên..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Loại khách hàng" prop="TypeCus">
                <el-select
                  v-model="form.TypeCus"
                  placeholder="Chọn Loại khách hàng..."
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in PositionLst"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Chuyên môn" prop="Job">
                <el-autocomplete
                  class="selectIDGroup"
                  style="width:100%"
                  v-model="form.Job"
                  :fetch-suggestions="querySearch"
                  placeholder="Chọn chuyên môn..."
                  @select="handleSelect"
                >
                  <template slot-scope="{ item }">
                    <div class="value">{{ item.label }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <el-form-item label="Trình độ" prop="Degree">
                <el-select
                  v-model="form.Degree"
                  placeholder="Chọn trình độ..."
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in DegreeLst"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Chức vụ" prop="Position">
                <el-select
                  v-model="form.Position"
                  placeholder="Chọn chức vụ..."
                  class="selectIDGroup"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in PositionLst"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Địa chỉ" prop="Address">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Address"
                  style="width:100%"
                  placeholder="Nhập địa chỉ..."
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Số điện thoại">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Phone"
                  style="width:100%"
                  placeholder="Nhập số điện thoại..."
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Email">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Email"
                  style="width:100%"
                  placeholder="Nhập email..."
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Ngân hàng">
                <el-input
                  class="selectIDGroup"
                  v-model="form.BankName"
                  style="width:100%"
                  placeholder="Nhập tên ngân hàng..."
                >
                </el-input>
              </el-form-item>
              <el-form-item label="STK">
                <el-input
                  class="selectIDGroup"
                  v-model="form.BankCode"
                  style="width:100%"
                  placeholder="Nhập STK..."
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Ghi chú">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Note"
                  style="width:100%"
                  placeholder="Nhập ghi chú..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div
        slot="footer"
        style="margin:10px;margin-left:auto;margin-right:20px;text-align:center"
      >
        <el-button class="pan-btn grey-btn" @click="closeModal">Hủy</el-button>
        <el-button
          v-if="this.customer == null"
          icon="el-icon-check"
          class="pan-btn blue-btn"
          @click="addCustomer('form')"
          >Xác nhận</el-button
        >
        <el-button
          v-if="this.customer != null"
          icon="el-icon-edit"
          class="pan-btn yellow-btn"
          @click="addCustomer('form')"
          >Chỉnh sửa</el-button
        >
      </div>
    </modal>
  </div>
</template>
<script>
import { CreateCustomer, UpdateCustomer } from "@/api/KDCustomer";
import Cookies from "js-cookie";
export default {
  props: ["customer", "place"],
  data() {
    return {
      JobLst: [],
      DegreeLst: [],
      CommuneLst: [],
      rules: {
        CustomerName: [
          {
            required: true,
            message: "Hãy nhập tên khách hàng",
            trigger: "change"
          }
        ],
        Area: [
          {
            required: true,
            message: "Hãy chọn vùng",
            trigger: "change"
          }
        ],
        AddrLv1: [
          {
            required: true,
            message: "Hãy chọn tỉnh/ thành phố",
            trigger: "change"
          }
        ],
        AddrLv2: [
          {
            required: true,
            message: "Hãy chọn quận/ huyện",
            trigger: "change"
          }
        ],
        AddrLv3: [
          {
            required: true,
            message: "Hãy chọn hoặc nhập phường/ xã",
            trigger: "change"
          }
        ],
        Type: [
          {
            required: true,
            message: "Hãy chọn loại tổ chức",
            trigger: "change"
          }
        ],
        Latitude: [
          {
            required: true,
            message: "Chưa có vĩ độ",
            trigger: "change"
          }
        ],
        Longitude: [
          {
            required: true,
            message: "Chưa có kinh độ",
            trigger: "change"
          }
        ],
        Range: [
          {
            required: true,
            message: "Chưa có phạm vi",
            trigger: "change"
          }
        ]
      },
      JobLst: [
        {
          value: "1",
          label: "Sản"
        },
        {
          value: "2",
          label: "Nhi"
        },
        {
          value: "3",
          label: "Sơ Sinh"
        },
        {
          value: "4",
          label: "Nội Tổng Hợp"
        },
        {
          value: "5",
          label: "Nội Hô Hấp"
        },
        {
          value: "6",
          label: "Nội Tim Mạch"
        },
        {
          value: "7",
          label: "Nội Tiêu Hóa"
        },
        {
          value: "8",
          label: "Nội Tiết"
        },
        {
          value: "9",
          label: "Nội Nhi"
        },
        {
          value: "10",
          label: "Ngoại  Tổng Hợp"
        },
        {
          value: "11",
          label: "Ngoại Tiêu Hóa"
        },
        {
          value: "12",
          label: "Ngoại Lồng Ngực"
        },
        {
          value: "13",
          label: "Ngoại Thần Kinh"
        },
        {
          value: "14",
          label: "Chấn Thương"
        },
        {
          value: "15",
          label: "Ngoại Tiết Liệu"
        },
        {
          value: "16",
          label: "Ngoại Tim Mạch"
        },
        {
          value: "17",
          label: "Cấp Cứu"
        },
        {
          value: "18",
          label: "Chống Độc"
        },
        {
          value: "19",
          label: "Khám Bệnh"
        },
        {
          value: "20",
          label: "Khám Bệnh Theo Yêu Cầu"
        },
        {
          value: "21",
          label: "Truyền Nhiễm (Lây)"
        },
        {
          value: "22",
          label: "Y Học Cổ Truyền"
        },
        {
          value: "23",
          label: "Phục Hồi Chức Năng"
        },
        {
          value: "24",
          label: "Mắt"
        },
        {
          value: "25",
          label: "Đáy Mắt - Màng Bồ Đào"
        },
        {
          value: "26",
          label: "Glocom"
        },
        {
          value: "27",
          label: "Kết Giác Mạc"
        },
        {
          value: "28",
          label: "Khúc Xạ"
        },
        {
          value: "29",
          label: "Tai Mũi Họng"
        },
        {
          value: "30",
          label: "Răng Hàm Mặt"
        },
        {
          value: "31",
          label: "Nhà Thuốc Bệnh Viện"
        },
        {
          value: "32",
          label: "Khoa Dược"
        },
        {
          value: "33",
          label: "Gây Mê Hồi Sức "
        },
        {
          value: "34",
          label: "Ung Bướu"
        },
        {
          value: "35",
          label: "Xạ Trị"
        },
        {
          value: "36",
          label: "Chống đau"
        },
        {
          value: "37",
          label: "Chuẩn Đoán Hình Ảnh"
        },
        {
          value: "38",
          label: "Kế Toán"
        },
        {
          value: "39",
          label: "Khác"
        },
        {
          value: "40",
          label: "Da Liễu"
        },
        {
          value: "41",
          label: "Nội Soi"
        },
        {
          value: "42",
          label: "Khoa Hồi Sức Cấp Cứu"
        },
        {
          value: "43",
          label: "Khoa Bệnh Phổi"
        }
      ],
      DegreeLst: [
        {
          value: "1",
          label: "Bác sỹ"
        },
        {
          value: "2",
          label: "Bác sỹ nội trú"
        },
        {
          value: "3",
          label: "Bác sỹ CK I"
        },
        {
          value: "4",
          label: "Bác sỹ CK II"
        },
        {
          value: "5",
          label: "Thạc sỹ"
        },
        {
          value: "6",
          label: "Tiến sỹ"
        },
        {
          value: "7",
          label: "Phó giáo sư"
        },
        {
          value: "8",
          label: "Giáo sư"
        },
        {
          value: "9",
          label: "Dược sỹ"
        },
        {
          value: "10",
          label: "Khác"
        }
      ],
      PositionLst: [
        {
          value: "1",
          label: "Nhân viên"
        },
        {
          value: "2",
          label: "Giám đốc"
        },
        {
          value: "3",
          label: "Trưởng phòng"
        },
        {
          value: "4",
          label: "Quản lý"
        },
        {
          value: "5",
          label: "Cộng tác viên"
        },
        {
          value: "6",
          label: "Thực tập"
        },
        {
          value: "7",
          label: "Y tá trưởng"
        },
        {
          value: "8",
          label: "Điều dưỡng trưởng"
        },
        {
          value: "9",
          label: "Bác sỹ"
        },
        {
          value: "10",
          label: "Trưởng khoa"
        },
        {
          value: "11",
          label: "Phó khoa"
        },
        {
          value: "12",
          label: "Phó giám đốc"
        },
        {
          value: "13",
          label: "Bác sỹ nội trú"
        },
        {
          value: "14",
          label: "Thủ kho"
        },
        {
          value: "15",
          label: "Kế toán"
        }
      ],
      form: {
        PlaceId: "",
        CustomerId: "",
        CustomerName: "",
        Phone: "",
        Email: "",
        Degree: "",
        Position: "",
        Address: "",
        Job: "",
        Note: "",
        BankCode: "",
        TypeCus: "",
        BankName: ""
      }
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var links = this.JobLst;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      cb(results);
    },
    handleSelect(item) {
      this.form.Job = item.label;
    },
    createFilter(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.label.toLowerCase().includes(queryString.toLowerCase()) === true
        );
      };
    },

    addCustomer(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          if (this.customer == null) {
            var req = {
              Token: Cookies.get("token"),
              UserName: Cookies.get("idEmployee"),
              CustomerInfo: this.form
            };
            CreateCustomer(req).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: " Tạo khách hàng thành công",
                  type: "success"
                });
                this.$emit("customerAdded", this.form);
                this.closeModal();
              } else {
                this.$message({
                  message: res.RespText,
                  type: "warning"
                });
              }
            });
          } else {
            var req = {
              Token: Cookies.get("token"),
              UserName: Cookies.get("idEmployee"),
              CustomerInfo: this.form
            };
            UpdateCustomer(req).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: " Chỉnh sửa tổ chức thành công",
                  type: "success"
                });
                this.$emit("customerUpdated", this.form);
                this.closeModal();
              } else {
                this.$message({
                  message: res.RespText,
                  type: "warning"
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    closeModal() {
      VoerroModal.hide("new-customer-modal");
    },
    initForm() {
      if (this.customer) {
        this.form.PlaceId = this.place.PlaceId;
        this.form.CustomerId = this.customer.CustomerId;
        this.form.CustomerName = this.customer.CustomerName;
        this.form.Phone = this.customer.Phone;
        this.form.Email = this.customer.Email;
        this.form.Degree = this.customer.Degree;
        this.form.Position = this.customer.Position;
        this.form.Address = this.customer.Address;
        this.form.Job = this.customer.Job;
        this.form.Note = this.customer.Note;
        this.form.BankCode = this.customer.BankCode;
        this.form.BankName = this.customer.BankName;
        this.form.TypeCus = this.customer.TypeCus;
      } else {
        this.form.PlaceId = this.place.PlaceId;
        this.form.CustomerId = null;
        this.form.CustomerName = null;
        this.form.Phone = null;
        this.form.Email = null;
        this.form.Degree = null;
        this.form.Position = null;
        this.form.Address = null;
        this.form.Job = null;
        this.form.Note = null;
        this.form.BankCode = null;
        this.form.BankName = null;
        this.form.TypeCus = null;
      }
    }
  },
  mounted() {},
  watch: {
    customer() {
      this.initForm();
    }
  },
  created() {
    this.initForm();
  }
};
</script>
<style>
.selectIDGroup .el-input__inner {
  border: 0 !important;
  border-radius: 0 !important;
  border-bottom: 1px solid #dcdfe6 !important;
}
.selectIDGroup .el-textarea__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #dcdfe6;
}
.modal-box {
  width: 50%;
}
</style>
