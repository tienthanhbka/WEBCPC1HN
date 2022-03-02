<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      label-width="120px"
    >
      <div></div>
      <div style="margin-top: 15px;">
        Ảnh đại diện
        <el-upload
          class="upload-demo"
          action="https://icpc1hn.work/api/File/UploadImageEmployee"
          multiple
          :limit="1"
          accept="image/png, image/jpeg"
          :data="token"
          :on-success="uploadImageOk"
          :file-list="image"
        >
          <el-button size="small" type="primary"
            >Click to upload image</el-button
          >
          <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
        </el-upload>
      </div>
      <el-row>
        <el-col :xs="24" :lg="6">
          <el-form-item label="Họ và tên">
            <el-input v-model="form.EmployeeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="6">
          <el-form-item label="Giới tính" prop="Sex">
            <el-select
              v-model="form.Sex"
              placeholder="Chọn giới tính"
              style="width:100%"
            >
              <el-option
                v-for="item in Sex"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="6">
          <el-form-item label="Quốc tịch" prop="Nationality">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="form.Nationality"
              :fetch-suggestions="querySearch6"
              placeholder="Gõ gợi ý và chọn"
              @select="handleSelect6"
            >
              <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClick6"
              >
              </i>
              <template slot-scope="{ item }">
                <div class="value">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="6">
          <el-form-item label="Dân tộc" prop="Folk">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="form.Folk"
              :fetch-suggestions="querySearchFolk"
              placeholder="Gõ gợi ý và chọn"
              @select="handleSelectFolk"
            >
              <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClickFolk"
              >
              </i>
              <template slot-scope="{ item }">
                <div class="value">{{ item.value }}</div>
              </template>
            </el-autocomplete>

            <!-- <el-select v-model="form.Folk" placeholder="Chọn dân tộc"  style="width:100%">
          <el-option
            v-for="item in Folk"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Tôn giáo" prop="Religion">
            <el-select
              v-model="form.Religion"
              placeholder="Chọn tôn giáo"
              style="width:100%"
            >
              <el-option
                v-for="item in Religion"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Ngày sinh" prop="date">
            <el-date-picker
              style="width:100%"
              type="date"
              placeholder="Chọn ngày"
              v-model="form.BirthDay"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
              default-value="2000-01-01"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :lg="8">
          <el-form-item label="Nơi sinh" prop="Matrimony">
            <el-select
              v-model="form.BirthAddress"
              placeholder="Chọn tỉnh thành phố"
            >
              <el-option
                v-for="item in City"
                :key="item.city"
                :label="item.city"
                :value="item.city"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Số điện thoại">
            <el-input v-model="form.Phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Email cá nhân">
            <el-input type="email" v-model="form.Email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Link facebook">
            <el-input v-model="form.LinkFace"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :lg="6">
          <el-radio v-model="mst" label="1">Có MST</el-radio>
        </el-col>
        <el-col :xs="24" :lg="6">
          <el-radio v-model="mst" label="0">Chưa có MST</el-radio>
        </el-col>
        <el-col v-if="mst == 1" :xs="24" :lg="12">
          <!-- <el-form-item v-if="mst == 1" label="Nhập MST">
            <el-input v-model="form.MST"></el-input>
          </el-form-item> -->

          <span style="width: 30%;">Nhập MST: </span
          ><el-input
            style="width: 70%;"
            size="mini"
            placeholder="Nhập MST"
            v-model="form.MST"
          ></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px;">
        <el-col :xs="24" :lg="6">
          <el-radio v-model="bhxh" label="1">Đã tham gia BHXH</el-radio>
        </el-col>
        <el-col :xs="24" :lg="6">
          <el-radio v-model="bhxh" label="0">Chưa tham gia BHXH</el-radio>
        </el-col>
        <el-col v-if="bhxh == 1" :xs="24" :lg="12">
          <!-- <el-form-item v-if="bhxh == 1" label="Nhập mã số BHXH">
            <el-input v-model="form.BHXH"></el-input>
          </el-form-item> -->

          <span style="width: 30%;">Nhập mã BHXH: </span
          ><el-input
            style="width: 70%;"
            size="mini"
            placeholder="Nhập mã BHXH"
            v-model="form.BHXH"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :lg="6">
          <el-form-item label="Số tài khoản cá nhân">
            <el-input v-model="form.TK_Employee"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="6">
          <el-form-item label="Ghi chú ngân hàng, chi nhánh của TK cá nhân">
            <el-input v-model="form.TK_Employee_Note"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="6">
          <el-form-item label="Số tài khoản công ty">
            <el-input v-model="form.TK_Company"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="6">
          <el-form-item label="Ghi chú STK công ty">
            <el-input v-model="form.TK_Company_Note"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Đơn vị (Chi nhánh)" prop="Branch">
            <el-select
              v-model="form.Branch"
              placeholder="Chọn chi nhánh"
              @change="getOffice"
              style="width:100%"
            >
              <el-option
                v-for="item in Branch"
                :key="item.Branch"
                :label="item.Branch"
                :value="item.Branch"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Phòng ban" prop="Office">
            <el-select
              v-model="form.Office"
              placeholder="Chọn phòng ban"
              @change="getPosition"
              style="width:100%"
            >
              <el-option
                v-for="item in Office"
                :key="item.Office"
                :label="item.Office"
                :value="item.Office"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Chức danh" prop="Position">
            <el-select
              v-model="form.Position"
              placeholder="Chọn chức danh"
              @change="getPlace"
              style="width:100%"
            >
              <el-option
                v-for="item in Position"
                :key="item.Position"
                :label="item.Position"
                :value="item.Position"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="displayOption" label="Loại nhân viên" prop="Place">
        <el-radio v-model="form.typeOption" label="1">Chính thức</el-radio>
        <el-radio v-model="form.typeOption" label="0">Thời vụ</el-radio>
      </el-form-item>

      <el-form-item v-if="displayPlace" label="Địa bàn" prop="Place">
        <el-select
          v-model="form.Place"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Chọn địa bàn"
        >
          <el-option
            v-for="item in Place"
            :key="item.City"
            :label="item.City"
            :value="item.City"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <div>
        Nguyên quán:
        <el-row>
          <el-col :xs="24" :lg="6">
            <el-form-item label="Tỉnh (Thành phố)" prop="Matrimony">
              <el-select
                v-model="form.AddressCity"
                @change="getDistrict"
                placeholder="Chọn tỉnh thành phố"
              >
                <el-option
                  v-for="item in City"
                  :key="item.city"
                  :label="item.city"
                  :value="item.city"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :lg="6">
            <el-form-item label="Quận (huyện)" prop="Matrimony">
              <el-select
                v-model="form.AddressDistrict"
                @change="getCommune"
                placeholder="Chọn quận huyện"
              >
                <el-option
                  v-for="item in District"
                  :key="item.District"
                  :label="item.District"
                  :value="item.District"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :lg="6">
            <el-form-item label="Xã (Phường)" prop="Matrimony">
              <el-select
                v-model="form.AddressCommune"
                placeholder="Chọn xã phường"
              >
                <el-option
                  v-for="item in Commune"
                  :key="item.Commune"
                  :label="item.Commune"
                  :value="item.Commune"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :lg="6">
            <el-form-item label="Số nhà (phố/ thôn/ xóm)">
              <el-input v-model="form.Address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div>
        Hộ khẩu thường trú:
        <el-row>
          <el-col :xs="24" :lg="6">
            <el-form-item label="Tỉnh (Thành phố)" prop="Matrimony">
              <el-select
                v-model="form.AddressOftenCity"
                @change="getDistrictOften"
                placeholder="Chọn tỉnh thành phố"
              >
                <el-option
                  v-for="item in City"
                  :key="item.city"
                  :label="item.city"
                  :value="item.city"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :lg="6">
            <el-form-item label="Quận (huyện)" prop="Matrimony">
              <el-select
                v-model="form.AddressOftenDistrict"
                @change="getCommuneOften"
                placeholder="Chọn quận huyện"
              >
                <el-option
                  v-for="item in DistrictOften"
                  :key="item.District"
                  :label="item.District"
                  :value="item.District"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :lg="6">
            <el-form-item label="Xã (Phường)" prop="Matrimony">
              <el-select
                v-model="form.AddressOftenCommune"
                placeholder="Chọn xã phường"
              >
                <el-option
                  v-for="item in CommuneOften"
                  :key="item.Commune"
                  :label="item.Commune"
                  :value="item.Commune"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :lg="6">
            <el-form-item label="Số nhà (phố/ thôn/ xóm)">
              <el-input v-model="form.AddressOften"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div>
        Nơi ở hiện nay:
        <el-row>
          <el-col :xs="24" :lg="6">
            <el-form-item label="Tỉnh (Thành phố)" prop="Matrimony">
              <el-select
                v-model="form.AddressNowCity"
                @change="getDistrictNow"
                placeholder="Chọn tỉnh thành phố"
              >
                <el-option
                  v-for="item in City"
                  :key="item.city"
                  :label="item.city"
                  :value="item.city"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :lg="6">
            <el-form-item label="Quận (huyện)" prop="Matrimony">
              <el-select
                v-model="form.AddressNowDistrict"
                @change="getCommuneNow"
                placeholder="Chọn quận huyện"
              >
                <el-option
                  v-for="item in DistrictNow"
                  :key="item.District"
                  :label="item.District"
                  :value="item.District"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :lg="6">
            <el-form-item label="Xã (Phường)" prop="Matrimony">
              <el-select
                v-model="form.AddressNowCommune"
                placeholder="Chọn xã phường"
              >
                <el-option
                  v-for="item in CommuneNow"
                  :key="item.Commune"
                  :label="item.Commune"
                  :value="item.Commune"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :lg="6">
            <el-form-item label="Số nhà (phố/ thôn/ xóm)">
              <el-input v-model="form.AddressNow"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <el-row>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Số CMND/ Thẻ CCCD">
            <el-input v-model="form.CMND"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Ngày cấp" prop="DateCMND">
            <el-date-picker
              style="width:100%"
              type="date"
              placeholder="Chọn ngày"
              v-model="form.DateCMND"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Nơi cấp">
            <el-select
              v-model="form.PlaceCMND"
              placeholder="Chọn tỉnh/ thành phố"
            >
              <el-option
                v-for="item in PlaceCMND"
                :key="item.city"
                :label="item.city"
                :value="item.city"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Tình trạng hôn nhân" prop="Matrimony">
            <el-select
              v-model="form.Matrimony"
              placeholder="Chọn tình trạng"
              style="width:100%"
            >
              <el-option
                v-for="item in Matrimony"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Tình trạng sức khỏe" prop="Health">
            <!-- <el-select v-model="form.Health" placeholder="Chọn tình trạng"  style="width:100%">
                  <el-option
                    v-for="item in Health"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select> -->
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="form.Health"
              :fetch-suggestions="querySearch5"
              placeholder="Gõ gợi ý và chọn"
              @select="handleSelect5"
            >
              <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClick5"
              >
              </i>
              <template slot-scope="{ item }">
                <div class="value">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :lg="6">
          <el-form-item label="Trình độ chuyên môn" prop="Qualification">
            <el-select
              v-model="form.Qualification"
              placeholder="Chọn trình độ"
              style="width:100%"
            >
              <el-option
                v-for="item in Qualification"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="6">
          <el-form-item label="Khối ngành" prop="SpecializedFather">
            <el-select
              v-model="form.SpecializedFather"
              placeholder="Chọn khối ngành"
              style="width:100%"
            >
              <el-option
                v-for="item in SpecializedFather"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="6">
          <el-form-item label="Chuyên ngành">
            <!-- <el-input v-model="form.name" ></el-input> -->
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="form.Specialized"
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
                <div class="value">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="6">
          <el-form-item label="Bằng cấp">
            <!-- <el-input v-model="form.name" ></el-input> -->
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="form.Degree"
              :fetch-suggestions="querySearch"
              placeholder="Gõ gợi ý và chọn"
              @select="handleSelect"
            >
              <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClick"
              >
              </i>
              <template slot-scope="{ item }">
                <div class="value">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Xếp loại bằng cấp" prop="Degree">
            <el-select
              v-model="form.DegreeLevel"
              placeholder="Chọn xếp loại"
              style="width:100%"
            >
              <el-option
                v-for="item in DegreeLevel"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="8">
          <!-- <el-form-item label="Nơi đào tạo">
              <el-input v-model="form.TrainingPlaces"></el-input>
            </el-form-item> -->

          <el-form-item label="Nơi đào tạo">
            <!-- <el-input v-model="form.name" ></el-input> -->
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="form.TrainingPlaces"
              :fetch-suggestions="querySearch3"
              placeholder="Gõ gợi ý và chọn"
              @select="handleSelect3"
            >
              <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClick3"
              >
              </i>
              <template slot-scope="{ item }">
                <div class="value">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Thời gian đào tạo">
            <!-- <el-input v-model="form.TranningTime"></el-input> -->
            <div class="block">
              <el-date-picker
                width="100%"
                v-model="form.TranningTime"
                type="monthrange"
                value-format="MM/yyyy"
                format="MM/yyyy"
                range-separator="-"
                start-placeholder="Bắt đầu"
                end-placeholder="Kết thúc"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Năng khiếu nổi bật (nếu có)">
        <el-input v-model="form.Gifted"></el-input>
      </el-form-item>

      <el-row>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Email công ty">
            <el-input type="email" v-model="form.EmailCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Mã nhân viên">
            <el-input v-model="form.EmployeeCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="8">
          <el-form-item label="Ngày bắt đầu làm việc" prop="DateCMND">
            <el-date-picker
              style="width:100%"
              type="date"
              placeholder="Chọn ngày"
              v-model="form.DateStartWork"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :lg="8">
           
          </el-col> -->
      </el-row>
    </el-form>
    <el-button type="warning" @click="cancel">Không đạt</el-button>
    <el-button type="primary" @click="updateOK">Cập nhật</el-button>
    <el-button type="success" @click="modalOK">Xác nhận</el-button>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import {
  GetPlace,
  GetBranch,
  GetOffice,
  GetPosition,
  AcceptInforHC
} from "@/api/employeeInfor";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict,
  GetDH,
  GetSpecialized,
  GetDegree,
  GetSpecializedFather
} from "@/api/default";
export default {
  props: ["user"],
  data() {
    return {
      token: {
        token: Cookies.get("token")
      },
      mst: null,
      bhxh: null,
      form: {
        EmployeeID: "",
        EmployeeName: "",
        Img: "",
        Office: "",
        Position: "",
        Sex: "",
        BirthDay: "",
        BirthAddress: "",
        BirthAddressCity: "",
        BirthAddressDistrict: "",
        BirthAddressCommune: "",
        Address: "",
        AddressCity: "",
        AddressDistrict: "",
        AddressCommune: "",
        AddressOften: "",
        AddressOftenCity: "",
        AddressOftenDistrict: "",
        AddressOftenCommune: "",
        AddressNow: "",
        AddressNowCity: "",
        AddressNowDistrict: "",
        AddressNowCommune: "",
        Phone: "",
        CMND: "",
        DateCMND: "",
        PlaceCMND: "",
        Email: "",
        Matrimony: "",
        Health: "",
        Qualification: "",
        TrainingPlaces: "",
        Specialized: "",
        SpecializedFather: "",
        Degree: "",
        DegreeLevel: "",
        TranningTime: "",
        Gifted: "",
        Branch: "",
        Place: [],
        Folk: "",
        Nationality: "",
        MST: null,
        BHXH: null,
        EmailCompany: "",
        DateStartWork: "",
        EmployeeCode: "",
        Status: 0,
        LinkFace: "",
        typeOption: "",
        TK_Employee: "",
        TK_Employee_Note: "",
        TK_Company: "",
        TK_Company_Note: ""
      },
      City: [],
      District: [],
      DistrictBirth: [],
      DistrictOften: [],
      DistrictNow: [],
      Commune: [],
      CommuneBirth: [],
      CommuneOften: [],
      CommuneNow: [],
      image: [],
      Place: [],
      Branch: [],
      Office: [],
      Position: [],
      Nationality: [
        {
          value: "Việt Nam"
        },
        {
          value: "England"
        },
        {
          value: "Thailand"
        },
        {
          value: "China"
        },
        {
          value: "Cambodia"
        },
        {
          value: "Laos"
        },
        {
          value: "..."
        }
      ],
      Sex: [
        {
          value: "Nam"
        },
        {
          value: "Nữ"
        },
        {
          value: "Khác"
        }
      ],
      Religion: [
        {
          value: "Không"
        },
        {
          value: "Thiên Chúa giáo"
        },
        {
          value: "Phật giáo"
        },
        {
          value: "Khác"
        }
      ],
      Matrimony: [
        {
          value: "Độc thân"
        },
        {
          value: "Đã kết hôn"
        },
        {
          value: "Đã ly hôn"
        }
      ],
      StatusWork: [
        {
          value: "Đang làm việc"
        },
        {
          value: "Đang nghỉ thai sản"
        },
        {
          value: "Đã nghỉ việc"
        }
      ],
      Health: [
        {
          value: "Rất khỏe"
        },
        {
          value: "Khỏe"
        },
        {
          value: "Trung bình"
        },
        {
          value: "Yếu"
        },
        {
          value: "Rất yếu"
        }
      ],
      Qualification: [
        {
          value: "Tiến sĩ"
        },
        {
          value: "Thạc sĩ"
        },
        {
          value: "Đại học"
        },
        {
          value: "Cao đẳng"
        },
        {
          value: "Trung cấp"
        },
        {
          value: "Lao động phổ thông"
        }
      ],
      DegreeLevel: [
        {
          value: "Xuất sắc"
        },
        {
          value: "Giỏi"
        },
        {
          value: "Khá"
        },
        {
          value: "Trung bình khá"
        },
        {
          value: "Trung bình"
        }
      ],
      PlaceCMND: [
        { city: "Cục trưởng Cục cảnh sát ĐKQL cư trú và DLQG về dân cư" },
        {
          city: "Cục trưởng Cục cảnh sát Quản lý hành chính về trật tự xã hội"
        },
        { city: "CA Tỉnh Hòa Bình" },
        { city: "CA Tỉnh Sơn La" },
        { city: "CA Tỉnh Điện Biên" },
        { city: "CA Tỉnh Lai Châu" },
        { city: "CA Tỉnh Lào Cai" },
        { city: "CA Tỉnh Yên Bái" },
        { city: "CA Tỉnh Phú Thọ" },
        { city: "CA Tỉnh Hà Giang" },
        { city: "CA Tỉnh Tuyên Quang" },
        { city: "CA Tỉnh Cao Bằng" },
        { city: "CA Tỉnh Bắc Kạn" },
        { city: "CA Tỉnh Thái Nguyên" },
        { city: "CA Tỉnh Lạng Sơn" },
        { city: "CA Tỉnh Bắc Giang" },
        { city: "CA Tỉnh Quảng Ninh" },
        { city: "CA TP Hà Nội" },
        { city: "CA Tỉnh Bắc Ninh" },
        { city: "CA Tỉnh Hà Nam" },
        { city: "CA Tỉnh Hải Dương" },
        { city: "CA Tỉnh Hải Phòng" },
        { city: "CA Tỉnh Hưng Yên" },
        { city: "CA Tỉnh Nam Định" },
        { city: "CA Tỉnh Thái Bình" },
        { city: "CA Tỉnh Vĩnh Phúc" },
        { city: "CA Tỉnh Ninh Bình" },
        { city: "CA Tỉnh Thanh Hóa" },
        { city: "CA Tỉnh Nghệ An" },
        { city: "CA Tỉnh Hà Tĩnh" },
        { city: "CA Tỉnh Quảng Bình" },
        { city: "CA Tỉnh Quảng Trị" },
        { city: "CA Tỉnh Thừa Thiên Huế" },
        { city: "CA TP Đã Nẵng" },
        { city: "CA Tỉnh Quảng Nam" },
        { city: "CA Tỉnh Quảng Ngãi" },
        { city: "CA Tỉnh Bình Định" },
        { city: "CA Tỉnh Phú Yên" },
        { city: "CA Tỉnh Khánh Hòa" },
        { city: "CA Tỉnh Ninh Thuận" },
        { city: "CA Tỉnh Bình Thuận" },
        { city: "CA Tỉnh Kon Tum" },
        { city: "CA Tỉnh Gia Lai" },
        { city: "CA Tỉnh Đắk Lắk" },
        { city: "CA Tỉnh Đắk Nông" },
        { city: "CA Tỉnh Lâm Đồng" },
        { city: "CA TP Hồ Chí Minh" },
        { city: "CA Tỉnh Bà Rịa Vũng Tàu" },
        { city: "CA Tỉnh Bình Dương" },
        { city: "CA Tỉnh Bình Phước" },
        { city: "CA Tỉnh Đồng Nai" },
        { city: "CA Tỉnh Tây Ninh" },
        { city: "CA Tỉnh An Giang" },
        { city: "CA Tỉnh Bạc Liêu" },
        { city: "CA Tỉnh Bến Tre" },
        { city: "CA Tỉnh Cà Mau" },
        { city: "CA Tỉnh Cần Thơ" },
        { city: "CA Tỉnh Đồng Tháp" },
        { city: "CA Tỉnh Hậu Giang" },
        { city: "CA Tỉnh Kiên Giang" },
        { city: "CA Tỉnh Long An" },
        { city: "CA Tỉnh Sóc Trăng" },
        { city: "CA Tỉnh Tiền Giang" },
        { city: "CA Tỉnh Trà Vinh" },
        { city: "CA Tỉnh Vĩnh Long" }
      ],
      Degree: [],
      DH: [],
      Specialized: [],
      SpecializedFather: [],
      displayPlace: false,
      displayOption: false,
      Folk: [
        { value: "Kinh" },
        { value: "Tày" },
        { value: "Thái" },
        { value: "Mường" },
        { value: "Hoa" },
        { value: "Khmer" },
        { value: "Nùng" },
        { value: "HMông" },
        { value: "Dao" },
        { value: "Gia-rai" },
        { value: "Ê-đê" },
        { value: "Ba-na" },
        { value: "Sán chay" },
        { value: "Chăm" },
        { value: "Xê-đăng" },
        { value: "Sán Dìu" },
        { value: "Hrê" },
        { value: "Cơ-ho" },
        { value: "Ra Glay" },
        { value: "M'Nông" },
        { value: "Thổ" },
        { value: "Xtiêng" },
        { value: "Khơ Mú" },
        { value: "Bru-Vân Kiều" },
        { value: "Giáy" },
        { value: "Cơ-tu" },
        { value: "Gié-Triêng" },
        { value: "Tà Ôi" },
        { value: "Mạ" },
        { value: "Co" },
        { value: "Chơ Ro" },
        { value: "Hà Nhì" },
        { value: "Xinh Mun" },
        { value: "Chu-ru" },
        { value: "Lào" },
        { value: "La Chí" },
        { value: "Phù Lá" },
        { value: "La Hủ" },
        { value: "Kháng" },
        { value: "Lự" },
        { value: "Pà Thẻn" },
        { value: "Lô Lô" },
        { value: "Chứt" },
        { value: "Mảng" },
        { value: "Cờ lao" },
        { value: "Bố Y" },
        { value: "La Ha" },
        { value: "Cống" },
        { value: "Ngái" },
        { value: "Si La" },
        { value: "Pu Péo" },
        { value: "Brâu" },
        { value: "Rơ Măm" },
        { value: "Ơ Đu" }
      ]
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel", "ok");
    },
    querySearch(queryString, cb) {
      var links = this.Degree;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      cb(results);
    },
    handleIconClick(ev) {
      //console.log(ev);
    },
    handleSelect(item) {
      this.form.Degree = item.value;
    },
    createFilter(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    querySearch6(queryString, cb) {
      var links = this.Nationality;
      var results = queryString
        ? links.filter(this.createFilter6(queryString))
        : links;
      cb(results);
    },
    handleIconClick6(ev) {
      //console.log(ev);
    },
    handleSelect6(item) {
      this.form.Nationality = item.value;

      if (this.form.Nationality !== "Việt Nam") {
        this.Folk = [];
      }
    },
    createFilter6(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    querySearch2(queryString, cb) {
      var links = this.Specialized;
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      cb(results);
    },
    handleIconClick2(ev) {
      //console.log(ev);
    },
    handleSelect2(item) {
      this.form.Specialized = item.value;
    },
    createFilter2(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    querySearch3(queryString, cb) {
      var links = this.DH;
      var results = queryString
        ? links.filter(this.createFilter3(queryString))
        : links;
      cb(results);
    },
    handleIconClick3(ev) {
      //console.log(ev);
    },
    handleSelect3(item) {
      this.form.TrainingPlaces = item.value;
    },
    createFilter3(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    querySearch5(queryString, cb) {
      var links = this.Health;
      var results = queryString
        ? links.filter(this.createFilter5(queryString))
        : links;
      cb(results);
    },
    handleIconClick5(ev) {
      //console.log(ev);
    },
    handleSelect5(item) {
      this.form.TrainingPlaces = item.value;
    },
    createFilter5(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    querySearchFolk(queryString, cb) {
      var links = this.Folk;
      var results = queryString
        ? links.filter(this.createFilterFolk(queryString))
        : links;
      cb(results);
    },
    handleIconClickFolk(ev) {
      //console.log(ev);
    },
    handleSelectFolk(item) {
      this.form.TrainingPlaces = item.value;
    },
    createFilterFolk(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    uploadImageOk(res, file, fileList) {
      this.image.push(res.Data.fileName);
      //console.log(this.image)
    },
    getPlace() {
      if (this.form.Position != null) {
        //var n = this.form.Position.includes("world");
        if (
          this.form.Position.includes("ETC") ||
          this.form.Position.includes("OTC") ||
          this.form.Position.includes("PS")
        ) {
          this.displayPlace = true;
        }
        if (this.form.Position.includes("Nhân Viên Xưởng Sản Xuất")) {
          this.displayOption = true;
        }
        var rep = "MB";

        if (this.form.Branch.includes("Hà Nội")) {
          rep = "MB";
        }

        if (this.form.Branch.includes("Đà Nẵng")) {
          rep = "MT";
        }

        if (this.form.Branch.includes("Hồ")) {
          rep = "MN";
        }
        GetPlace({ Region: rep }).then(res => {
          this.Place = res.Data;
        });
      }
    },
    getBranch() {
      GetBranch().then(res => {
        this.Branch = res.Data;
      });
    },
    getOffice() {
      this.form.Office = null;
      this.form.Position = null;
      this.displayPlace = false;
      GetOffice({ Branch: this.form.Branch }).then(res => {
        this.Office = res.Data;
      });
    },
    getPosition() {
      this.form.Position = null;
      this.displayPlace = false;
      GetPosition({ Office: this.form.Office, Branch: this.form.Branch }).then(
        res => {
          this.Position = res.Data;
        }
      );
    },
    getDistrictBirth() {
      this.form.BirthAddressDistrict = null;
      this.form.BirthAddressCommune = null;
      GetDistrictByCity({ City: this.form.BirthAddressCity }).then(res => {
        this.DistrictBirth = res.Data;
      });
    },
    getDistrict() {
      this.form.AddressDistrict = null;
      this.form.AddressCommune = null;
      GetDistrictByCity({ City: this.form.AddressCity }).then(res => {
        this.District = res.Data;
      });
    },
    getDistrictOften() {
      this.form.AddressOftenDistrict = null;
      this.form.AddressOftenCommune = null;
      GetDistrictByCity({ City: this.form.AddressOftenCity }).then(res => {
        this.DistrictOften = res.Data;
      });
    },
    getDistrictNow() {
      this.form.AddressNowDistrict = null;
      this.form.AddressNowCommune = null;
      GetDistrictByCity({ City: this.form.AddressNowCity }).then(res => {
        this.DistrictNow = res.Data;
      });
    },
    getCommuneBirth() {
      this.form.BirthAddressCommune = null;
      GetCommuneByCityAndDistrict({
        City: this.form.BirthAddressCity,
        District: this.form.BirthAddressDistrict
      }).then(res => {
        this.CommuneBirth = res.Data;
      });
    },
    getCommune() {
      this.form.AddressCommune = null;
      GetCommuneByCityAndDistrict({
        City: this.form.AddressCity,
        District: this.form.AddressDistrict
      }).then(res => {
        this.Commune = res.Data;
      });
    },
    getCommuneOften() {
      this.form.AddressOftenCommune = null;
      GetCommuneByCityAndDistrict({
        City: this.form.AddressOftenCity,
        District: this.form.AddressOftenDistrict
      }).then(res => {
        this.CommuneOften = res.Data;
      });
    },
    getCommuneNow() {
      this.form.AddressNowCommune = null;
      GetCommuneByCityAndDistrict({
        City: this.form.AddressNowCity,
        District: this.form.AddressNowDistrict
      }).then(res => {
        this.CommuneNow = res.Data;
      });
    },
    initForm() {
      //console.log
      this.mst = null;
      this.bhxh = null;
      if (this.user[0].RowID) {
        this.form.EmployeeID = this.user[0].EmployeeID;
        this.form.EmployeeName = this.user[0].EmployeeName;
        this.form.Img = this.user[0].Img;

        this.form.Sex = this.user[0].Sex;
        this.form.BirthDay = this.user[0].BirthDay;
        this.form.BirthAddress = this.user[0].BirthAddress;
        if (this.user[0].Address !== null) {
          this.form.Address = this.user[0].Address.split(", ")[0];
          this.form.AddressCity = this.user[0].Address.split(", ")[3];
          this.getDistrict();
          this.form.AddressDistrict = this.user[0].Address.split(", ")[2];
          this.getCommune();
          this.form.AddressCommune = this.user[0].Address.split(", ")[1];
        }

        if (this.user[0].AddressOften !== null) {
          this.form.AddressOften = this.user[0].AddressOften.split(", ")[0];
          this.form.AddressOftenCity = this.user[0].AddressOften.split(", ")[3];
          this.getDistrictOften();
          this.form.AddressOftenDistrict = this.user[0].AddressOften.split(
            ", "
          )[2];
          this.getCommuneOften();
          this.form.AddressOftenCommune = this.user[0].AddressOften.split(
            ", "
          )[1];
        }

        if (this.user[0].AddressNow !== null) {
          this.form.AddressNow = this.user[0].AddressNow.split(", ")[0];
          this.form.AddressNowCity = this.user[0].AddressNow.split(", ")[3];
          this.getDistrictNow();
          this.form.AddressNowDistrict = this.user[0].AddressNow.split(", ")[2];
          this.getCommuneNow();
          this.form.AddressNowCommune = this.user[0].AddressNow.split(", ")[1];
        }

        this.form.Phone = this.user[0].Phone;
        this.form.CMND = this.user[0].CMND;
        this.form.DateCMND = this.user[0].DateCMND;
        this.form.PlaceCMND = this.user[0].PlaceCMND;
        this.form.Email = this.user[0].Email;
        this.form.Matrimony = this.user[0].Matrimony;
        this.form.Health = this.user[0].Health;
        this.form.Qualification = this.user[0].Qualification;
        this.form.TrainingPlaces = this.user[0].TrainingPlaces;
        this.form.Specialized = this.user[0].Specialized;
        this.form.SpecializedFather = this.user[0].SpecializedFather;
        this.form.Degree = this.user[0].Degree;
        this.form.DegreeLevel = this.user[0].DegreeLevel;
        if (this.user[0].TranningTime !== null) {
          this.form.TranningTime = this.user[0].TranningTime.split(" đến ");
        }
        this.form.Nationality = this.user[0].Nationality;
        this.form.Folk = this.user[0].Folk;
        this.form.Gifted = this.user[0].Gifted;
        this.form.Branch = this.user[0].Branch;

        this.getOffice();
        this.form.Office = this.user[0].Office;
        this.getPosition();
        this.form.Position = this.user[0].Position;
        this.getPlace();
        if (this.user[0].Place !== null) {
          this.form.Place = this.user[0].Place.split(",");
        } else {
          this.form.Place = [];
        }

        this.form.MST = this.user[0].MST;
        this.form.BHXH = this.user[0].BHXH;
        if (this.user[0].MST != null) {
          this.mst = "1";
        }
        if (this.user[0].BHXH != null) {
          this.bhxh = "1";
        }

        this.form.EmailCompany = this.user[0].EmailCompany;
        this.form.EmployeeCode = this.user[0].EmployeeCode;
        this.form.DateStartWork = this.user[0].DateStartWork;
        this.form.Religion = this.user[0].Religion;
        this.form.LinkFace = this.user[0].LinkFace;
        this.form.typeOption = this.user[0].TypeOption;
        this.form.TK_Employee = this.user[0].TK_Employee;
        this.form.TK_Employee_Note = this.user[0].TK_Employee_Note;
        this.form.TK_Company = this.user[0].TK_Company;
        this.form.TK_Company_Note = this.user[0].TK_Company_Note;
        if (this.form.Position != null) {
          if (this.form.Position.includes("Nhân Viên Xưởng Sản Xuất")) {
            this.displayOption = true;
          }
        }
      } else {
        this.form.EmployeeName = "";
        this.form.Img = "";
        this.form.Office = "";
        this.form.Position = "";
        this.form.Sex = "";
        this.form.BirthDay = "";
        this.form.BirthAddress = "";
        this.form.BirthAddressCity = "";
        this.form.BirthAddressDistrict = "";
        this.form.BirthAddressCommune = "";
        this.form.Address = "";
        this.form.AddressCity = "";
        this.form.AddressDistrict = "";
        this.form.AddressCommune = "";
        this.form.AddressOften = "";
        this.form.AddressOftenCity = "";
        this.form.AddressOftenDistrict = "";
        this.form.AddressOftenCommune = "";
        this.form.AddressNow = "";
        this.form.AddressNowCity = "";
        this.form.AddressNowDistrict = "";
        this.form.AddressNowCommune = "";
        this.form.Phone = "";
        this.form.CMND = "";
        this.form.DateCMND = "";
        this.form.PlaceCMND = "";
        this.form.Email = "";
        this.form.Matrimony = "";
        this.form.Health = "";
        this.form.Qualification = "";
        this.form.TrainingPlaces = "";
        this.form.Specialized = "";
        this.form.SpecializedFather = "";
        this.form.Degree = "";
        this.form.DegreeLevel = "";
        this.form.TranningTime = "";
        this.form.Gifted = "";
        this.form.Branch = "";
        this.form.Place = [];
        this.form.Folk = "";
        this.form.MST = null;
        this.form.BHXH = null;
        this.form.EmailCompany = null;
        this.form.EmployeeCode = null;
        this.form.DateStartWork = null;
        this.form.Religion = null;
        this.form.LinkFace = null;
        this.form.typeOption = null;
      }
    },
    modalOK() {
      this.form.Status = 2;
      if (this.image.length > 0) {
        this.form.Img = this.image.join();
      }
      if (this.form.TranningTime) {
        if (this.form.TranningTime.length > 0) {
          this.form.Place = this.form.Place.join();
        } else {
          this.form.Place = null;
        }

        if (this.form.TranningTime.length > 0) {
          this.form.TranningTime = this.form.TranningTime.join(" đến ");
        } else {
          this.form.TranningTime = null;
        }
        this.form.Address =
          this.form.Address +
          ", " +
          this.form.AddressCommune +
          ", " +
          this.form.AddressDistrict +
          ", " +
          this.form.AddressCity;
        this.form.AddressOften =
          this.form.AddressOften +
          ", " +
          this.form.AddressOftenCommune +
          ", " +
          this.form.AddressOftenDistrict +
          ", " +
          this.form.AddressOftenCity;
        this.form.AddressNow =
          this.form.AddressNow +
          ", " +
          this.form.AddressNowCommune +
          ", " +
          this.form.AddressNowDistrict +
          ", " +
          this.form.AddressNowCity;
        AcceptInforHC(this.form).then(res => {
          this.$notify({
            title: "Thành công",
            message: "Phê duyệt thông tin thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("click-something", "ok");
        });
      } else {
        this.$notify({
          title: "Lỗi",
          message: "Chưa có thời gian đào tạo",
          type: "warning",
          position: "top-left"
        });
      }
    },

    updateOK() {
      this.form.Status = 1;
      if (this.image.length > 0) {
        this.form.Img = this.image.join();
      }
      if (this.form.TranningTime) {
        if (this.form.TranningTime.length > 0) {
          this.form.Place = this.form.Place.join();
        } else {
          this.form.Place = null;
        }

        if (this.form.TranningTime.length > 0) {
          this.form.TranningTime = this.form.TranningTime.join(" đến ");
        } else {
          this.form.TranningTime = null;
        }
      } else {
        this.$notify({
          title: "Lỗi",
          message: "Chưa có thời gian đào tạo",
          type: "warning",
          position: "top-left"
        });
        this.form.Address =
          this.form.Address +
          ", " +
          this.form.AddressCommune +
          ", " +
          this.form.AddressDistrict +
          ", " +
          this.form.AddressCity;
        this.form.AddressOften =
          this.form.AddressOften +
          ", " +
          this.form.AddressOftenCommune +
          ", " +
          this.form.AddressOftenDistrict +
          ", " +
          this.form.AddressOftenCity;
        this.form.AddressNow =
          this.form.AddressNow +
          ", " +
          this.form.AddressNowCommune +
          ", " +
          this.form.AddressNowDistrict +
          ", " +
          this.form.AddressNowCity;
        AcceptInforHC(this.form).then(res => {
          this.$notify({
            title: "Thành công",
            message: "Cập nhật thông tin thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("click-something", "ok");
        });
      }
    }
  },
  created() {
    this.initForm();
    this.getBranch();
    GetCity().then(res => {
      this.City = res.Data;
    });

    GetDH().then(res => {
      this.DH = res.Data;
    });

    GetSpecialized().then(res => {
      this.Specialized = res.Data;
    });

    GetSpecializedFather().then(res => {
      this.SpecializedFather = res.Data;
    });

    GetDegree().then(res => {
      this.Degree = res.Data;
    });
  },
  watch: {
    user() {
      this.initForm();
    }
  }
};
</script>
<style scoped>
.el-range-editor.el-input__inner {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 3px 10px;
  width: 100%;
}

.el-select {
  display: inline-block;
  position: relative;
  width: 100%;
}

.el-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .el-select {
    display: inline-block;
    position: relative;
    width: 100%;
  }

  .el-autocomplete {
    position: relative;
    display: inline-block;
    width: 100%;
  }
}
</style>
