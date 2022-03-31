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
      <el-row>
        <el-col :span="24">
          <el-form-item label="Tên KH tổ chức" prop="PlaceName">
            <el-input
              class="selectIDGroup"
              v-model="form.PlaceName"
              style="width:100%"
              placeholder="Nhập tên KH tổ chức..."
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Loại" prop="Type">
            <el-select
              v-model="form.Type"
              placeholder="Chọn loại KH tổ chức..."
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="item in TypeLst"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Người đại diện" prop="Delegate">
            <el-input
              class="selectIDGroup"
              v-model="form.Delegate"
              style="width:100%"
              placeholder="Nhập Người đại diện..."
            >
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Mã số thuế">
            <el-input
              class="selectIDGroup"
              v-model="form.TaxCode"
              style="width:100%"
              placeholder="Nhập mã số thuế..."
            >
            </el-input>
          </el-form-item>

          <el-form-item label="Số điện thoại">
            <el-input
              class="selectIDGroup"
              v-model="form.Contact"
              style="width:100%"
              placeholder="Nhập SĐT người đại diện..."
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thời hạn thanh toán">
            <el-select
              v-model="form.TypePay"
              placeholder="Chọn thời hạn thanh toán..."
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="item in TypePay"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Ghi chú" prop="Note">
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
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Tỉnh" prop="AddrLv1">
            <el-autocomplete
              class="selectIDGroup"
              style="width:100%"
              v-model="form.AddrLv1"
              :fetch-suggestions="querySearch"
              placeholder="Chọn tỉnh/thành phố..."
              @select="handleSelect"
            >
              <template slot-scope="{ item }">
                <div class="value">{{ item.city }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Quận/huyện" prop="AddrLv2">
            <el-select
              v-model="form.AddrLv2"
              placeholder="Chọn Quận/huyện..."
              class="selectIDGroup"
              style="width:100%"
              @change="getCommuneNow"
            >
              <el-option
                v-for="item in DistrictLst"
                :key="item.District"
                :label="item.District"
                :value="item.District"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Phường/xã" prop="AddrLv3">
            <el-select
              v-model="form.AddrLv3"
              placeholder="Chọn Phường/xã..."
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="item in CommuneLst"
                :key="item.Commune"
                :label="item.Commune"
                :value="item.Commune"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Vùng" prop="Area">
            <el-select
              v-model="form.Area"
              placeholder="Chọn vùng..."
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="item in AreaLst"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-button type="success" plain size="mini" @click="ShowMap"
            ><i class="fas fa-map-marked"></i> vị trí</el-button
          >
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="Kinh độ" prop="Longitude">
            <el-input
              class="selectIDGroup"
              v-model="form.Longitude"
              style="width:100%"
              placeholder="Kinh độ..."
              disable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="Vĩ độ" prop="Latitude">
            <el-input
              class="selectIDGroup"
              v-model="form.Latitude"
              style="width:100%"
              placeholder="Vĩ độ..."
              disable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="Phạm vi" prop="Range">
            <el-input
              class="selectIDGroup"
              v-model="form.Range"
              style="width:100%"
              placeholder="Phạm vi..."
              disable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Địa chỉ">
            <el-input
              class="selectIDGroup"
              v-model="form.Address"
              style="width:100%"
              placeholder="Hãy chọn vị trí..."
              disable
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div
      slot="footer"
      style="margin:10px;margin-left:auto;margin-right:20px;text-align:center"
    >
      <el-button size="small" type="info" @click="closeModal">Hủy</el-button>
      <el-button
        v-if="this.place == null"
        icon="el-icon-check"
        size="small"
        type="primary"
        @click="addPlace('form')"
        >Xác nhận</el-button
      >
      <el-button
        v-if="this.place != null"
        size="small"
        type="warning"
        icon="el-icon-edit"
        @click="addPlace('form')"
        >Chỉnh sửa</el-button
      >
    </div>
    <el-dialog
      custom-class="medium-modal"
      title="Chọn trên bản đồ"
      append-to-body
      :visible.sync="mapPickerVisible"
    >
      <map-picker
        :address="address"
        @valueSelected="onValueSelected"
      ></map-picker>
    </el-dialog>
  </div>
</template>
<script>
import { CreatePlace, UpdatePlaceByPId } from "@/api/KDPlace";
import MapPicker from "@/components/Map/map-picker";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict
} from "@/api/default";
import Cookies from "js-cookie";
export default {
  props: ["place"],
  components: { MapPicker },
  data() {
    return {
      City: [],
      DistrictLst: [],
      CommuneLst: [],
      rules: {
        PlaceName: [
          {
            required: true,
            message: "Hãy nhập tên tổ chức",
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
            message: "Hãy chọn phường/ xã",
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
        ],
        Delegate: [
          {
            required: true,
            message: "Chưa có người đại diện",
            trigger: "change"
          }
        ]
      },
      AreaLst: [
        {
          value: "1",
          label: "Miền Bắc"
        },
        {
          value: "2",
          label: "Miền Trung"
        },
        {
          value: "3",
          label: "Miền Nam"
        }
      ],
      TypePay: [
        {
          value: "1",
          label: "30 ngày"
        },
        {
          value: "2",
          label: "45 ngày"
        },
        {
          value: "3",
          label: "60 ngày"
        },
        {
          value: "4",
          label: "90 ngày"
        },
        {
          value: "5",
          label: "120 ngày"
        },
        {
          value: "6",
          label: "Gối mã"
        },
        {
          value: "7",
          label: "TTN"
        }
      ],
      TypeLst: [
        {
          value: "1",
          label: "Trạm y tế"
        },
        {
          value: "2",
          label: "Bệnh viện"
        },
        {
          value: "3",
          label: "Bệnh viện tư nhân"
        },
        {
          value: "4",
          label: "Chi nhánh"
        },
        {
          value: "5",
          label: "Công ty"
        },
        {
          value: "6",
          label: "Phòng khám chuyên khoa"
        },
        {
          value: "7",
          label: "Phòng khám đa khoa"
        },
        {
          value: "8",
          label: "Sở y tế"
        },
        {
          value: "9",
          label: "Trung tâm y tế"
        },
        {
          value: "10",
          label: "Bảo hiểm xa hội Tỉnh/TP"
        },
        {
          value: "11",
          label: "Nhà xe"
        },
        {
          value: "12",
          label: "Quầy thuốc/Nhà thuốc"
        },
        {
          value: "13",
          label: "Tạp Hóa"
        },
        {
          value: "14",
          label: "Siêu Thị"
        }
      ],
      LstCode: [],
      mapPickerVisible: false,
      form: {
        PlaceId: "",
        PlaceName: "",
        Area: "",
        Type: "",
        Note: "",
        Address: "",
        AddrLv1: "",
        AddrLv2: "",
        AddrLv3: "",
        Latitude: "",
        Longitude: "",
        Range: "",
        TaxCode: "",
        OfUser: "",
        TypePay: "",
        Delegate: "",
        Contact: "",
        frequency: "",
        noteEm: ""
      },
      position: null,
      errorStr: null,
      address: ""
    };
  },
  methods: {
    ShowMap() {
      this.mapPickerVisible = true;
      this.address =
        this.form.AddrLv3 + " " + this.form.AddrLv2 + " " + this.form.AddrLv1;
    },
    onValueSelected(val) {
      this.mapPickerVisible = false;
      this.form.Latitude = val.lat;
      this.form.Longitude = val.lng;
      this.form.Range = val.radius;
      if (val.address) {
        this.form.Address = val.address;
      } else {
        this.form.Address =
          this.form.AddrLv3 + " " + this.form.AddrLv2 + " " + this.form.AddrLv1;
      }
    },
    querySearch(queryString, cb) {
      var links = this.City;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      cb(results);
    },
    handleSelect(item) {
      this.form.AddrLv1 = item.city;
      this.form.AddrLv2 = null;
      this.form.AddrLv3 = null;
      GetDistrictByCity({
        token: Cookies.get("token"),
        City: this.form.AddrLv1
      }).then(res => {
        this.DistrictLst = res.Data;
      });
    },
    createFilter(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.city.toLowerCase().includes(queryString.toLowerCase()) === true
        );
      };
    },
    addPlace(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          if (this.place == null) {
            var req = {
              Token: Cookies.get("token"),
              UserName: Cookies.get("idEmployee"),
              PlaceInfo: this.form
            };
            CreatePlace(req).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: " Tạo tổ chức thành công",
                  type: "success"
                });
                this.$emit("placeAdded", this.form);
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
              PlaceInfo: this.form
            };
            UpdatePlaceByPId(req).then(res => {
              if (res.RespCode == 0) {
                this.$message({
                  message: " Chỉnh sửa tổ chức thành công",
                  type: "success"
                });
                this.$emit("placeUpdated", this.form);
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
      this.$emit("closeOK");
    },
    changeEvaluate(value) {},
    fetchData() {},
    initForm() {
      if (this.place) {
        this.form.PlaceId = this.place.PlaceId;
        this.form.PlaceName = this.place.PlaceName;
        this.form.Area = this.place.Area;
        this.form.Type = this.place.Type;
        this.form.Address = this.place.Address;
        this.form.AddrLv1 = this.place.AddrLv1;
        this.form.AddrLv2 = this.place.AddrLv2;
        this.form.AddrLv3 = this.place.AddrLv3;
        this.form.Latitude = this.place.Latitude;
        this.form.Longitude = this.place.Longitude;
        this.form.Range = this.place.Range;
        this.form.TypePay = this.place.TypePay;
        this.form.Delegate = this.place.Delegate;
        this.form.Contact = this.place.Contact;
        this.form.TaxCode = this.place.TaxCode;
        this.form.Note = this.place.Note;
        this.form.frequency = this.place.frequency;
        this.form.noteEm = this.place.noteEm;
      } else {
        this.form.PlaceId = null;
        this.form.PlaceName = null;
        this.form.Area = null;
        this.form.Type = null;
        this.form.Address = null;
        this.form.AddrLv1 = null;
        this.form.AddrLv2 = null;
        this.form.AddrLv3 = null;
        this.form.Latitude = null;
        this.form.Longitude = null;
        this.form.Range = null;
        this.form.TypePay = null;
        this.form.Delegate = null;
        this.form.Contact = null;
        this.form.TaxCode = null;
        this.form.Note = null;
        this.form.frequency = null;
        this.form.noteEm = null;
      }
    },
    getCommuneNow() {
      GetCommuneByCityAndDistrict({
        City: this.form.AddrLv1,
        District: this.form.AddrLv2,
        token: Cookies.get("token")
      }).then(res => {
        this.CommuneLst = res.Data;
      });
    }
  },
  mounted() {
    // if(navigator.geolocation){
    //    navigator.geolocation.getCurrentPosition(position => {
    //     this.position = position.coords;
    //   })
    // }
    // else{
    //       this.$message({
    //         message: "Geolocation is not supported by this browser.",
    //         type: "warning"
    //       });
    //     }
  },
  watch: {
    place() {
      this.initForm();
    }
  },
  created() {
    this.initForm(),
      GetCity({ token: Cookies.get("token") }).then(res => {
        if (res.ResCode == 0) {
          this.City = res.Data;
        }
      });
    this.fetchData();
  }
};
</script>
<style></style>
