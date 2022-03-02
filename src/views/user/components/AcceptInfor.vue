<template>
  <div>
    <el-form
      ref="form"
      label-position="left"
      size="small"
      :model="form"
      label-width="120px"
    >
      <el-row
        ><h3 class="title-header">
          <i class="fas fa-info-circle"></i> Thông tin cơ bản
        </h3></el-row
      >
      <el-row class="info--basic" :gutter="20">
        <el-col :xs="24" :sm="24" :lg="4">
          <div class="avatar">
            <label>
              <img
                v-if="user[0].Img"
                :src="
                  'https://icpc1hn.work/api/' +
                    'File/GetImageEmployee/' +
                    user[0].Img +
                    '?token=' +
                    token +
                    '&EmployeeID=' +
                    user[0].EmployeeID
                "
                onerror="this.onerror = null; this.src = 'https://lamdong.gov.vn/Shared%20Documents/images/noPhoto.jpg';"
                alt=""
                width="120"
                height="120"
                class="t-hover profile-field image-avatar"
              />
              <img
                v-else
                id="my-image"
                :src="
                  LinkAvatar
                    ? LinkAvatar
                    : 'https://www.topcv.vn/upload/images/avatars/no_avatar_3_4.jpg'
                "
                class="t-hover profile-field image-avatar"
                width="116"
                height="116"
                alt=""
              />
              <!-- <input type="file" @change="onFileChange" style="display:none" /> -->
            </label>
            <!-- <el-upload
              action="https://icpc1hn.work/api/File/UploadImageEmployee"
              multiple
              :limit="1"
              accept="image/png, image/jpeg"
              :data="token"
              :on-success="uploadImageOk"
              :file-list="image"
            >
              <el-button size="small" type="primary"
                >Click để tải ảnh lên</el-button
              >
            </el-upload> -->
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="20" class="info">
          <el-row :gutter="10">
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Họ và tên:"
                label-width="90px"
                class="item-form-custom"
              >
                <el-input
                  :class="form.EmployeeName ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  placeholder="Họ và tên.."
                  v-model="form.EmployeeName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Giới tính:"
                prop="Sex"
                label-width="100px"
                class="item-form-custom"
              >
                <el-select
                  :class="form.Sex ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
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
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Quốc tịch"
                prop="Nationality"
                label-width="100px"
                class="item-form-custom"
              >
                <el-autocomplete
                  :class="form.Nationality ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  popper-class="my-autocomplete"
                  v-model="form.Nationality"
                  :fetch-suggestions="querySearch6"
                  placeholder="Chọn quốc tịch.."
                  @select="handleSelect6"
                >
                  <template slot-scope="{ item }">
                    <div class="value">{{ item.value }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :lg="6">
              <el-form-item
                label="Ngày sinh:"
                prop="date"
                label-width="90px"
                class="item-form-custom"
              >
                <el-date-picker
                  :class="form.BirthDay ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
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
            <el-col :xs="24" :lg="6">
              <el-form-item
                label="Nơi sinh:"
                prop="Matrimony"
                label-width="80px"
                class="item-form-custom"
              >
                <el-select
                  :class="form.BirthDay ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  filterable
                  v-model="form.BirthAddress"
                  placeholder="Tỉnh thành phố.."
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
              <el-form-item
                label="Dân tộc:"
                prop="Folk"
                label-width="70px"
                class="item-form-custom"
              >
                <el-autocomplete
                  :class="form.Folk ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  popper-class="my-autocomplete"
                  v-model="form.Folk"
                  :fetch-suggestions="querySearchFolk"
                  placeholder="Chọn dân tộc.."
                  @select="handleSelectFolk"
                >
                  <template slot-scope="{ item }">
                    <div class="value">{{ item.value }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="6">
              <el-form-item
                label="Tôn giáo:"
                prop="Religion"
                label-width="80px"
                class="item-form-custom"
              >
                <el-select
                  :class="form.Religion ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  v-model="form.Religion"
                  placeholder="Chọn tôn giáo.."
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
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Số CMND/ Thẻ CCCD:"
                label-width="160px"
                class="item-form-custom"
              >
                <el-input
                  :class="form.CMND ? '' : 'infoInvalidate'"
                  placeholder="Số CMND/ Thẻ CCCD"
                  class="selectIDGroup"
                  v-model="form.CMND"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Ngày cấp:"
                prop="DateCMND"
                label-width="100px"
                class="item-form-custom"
              >
                <el-date-picker
                  :class="form.DateCMND ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
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
              <el-form-item
                label="Nơi cấp:"
                label-width="100px"
                class="item-form-custom"
              >
                <el-select
                  :class="form.PlaceCMND ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  filterable
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
            <el-form-item
              label="Nguyên quán:"
              label-width="160px"
              class="item-form-custom"
            >
              <el-row :gutter="10">
                <el-col :xs="24" :lg="8">
                  <el-select
                    :class="form.AddressCity ? '' : 'infoInvalidate'"
                    class="selectIDGroup"
                    v-model="form.AddressCity"
                    filterable
                    @change="getDistrict"
                    placeholder="Tỉnh thành phố"
                  >
                    <el-option
                      v-for="item in City"
                      :key="item.city"
                      :label="item.city"
                      :value="item.city"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :xs="24" :lg="8">
                  <el-select
                    :class="form.AddressDistrict ? '' : 'infoInvalidate'"
                    class="selectIDGroup"
                    filterable
                    v-model="form.AddressDistrict"
                    @change="getCommune"
                    placeholder="Quận huyện.."
                  >
                    <el-option
                      v-for="item in District"
                      :key="item.District"
                      :label="item.District"
                      :value="item.District"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :xs="24" :lg="7">
                  <el-select
                    :class="form.AddressCommune ? '' : 'infoInvalidate'"
                    class="selectIDGroup"
                    filterable
                    v-model="form.AddressCommune"
                    placeholder="Xã phường.."
                  >
                    <el-option
                      v-for="item in Commune"
                      :key="item.Commune"
                      :label="item.Commune"
                      :value="item.Commune"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="Hộ khẩu thường trú:"
              label-width="160px"
              class="item-form-custom"
            >
              <el-row :gutter="10">
                <el-col :xs="24" :lg="5">
                  <el-select
                    :class="form.AddressOftenCity ? '' : 'infoInvalidate'"
                    class="selectIDGroup"
                    filterable
                    v-model="form.AddressOftenCity"
                    @change="getDistrictOften"
                    placeholder="Tỉnh thành phố.."
                  >
                    <el-option
                      v-for="item in City"
                      :key="item.city"
                      :label="item.city"
                      :value="item.city"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :xs="24" :lg="5">
                  <el-select
                    :class="form.AddressOftenDistrict ? '' : 'infoInvalidate'"
                    class="selectIDGroup"
                    filterable
                    v-model="form.AddressOftenDistrict"
                    @change="getCommuneOften"
                    placeholder="Quận huyện.."
                  >
                    <el-option
                      v-for="item in DistrictOften"
                      :key="item.District"
                      :label="item.District"
                      :value="item.District"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :xs="24" :lg="5">
                  <el-select
                    :class="form.AddressOftenCommune ? '' : 'infoInvalidate'"
                    class="selectIDGroup"
                    filterable
                    v-model="form.AddressOftenCommune"
                    placeholder="Xã phường.."
                  >
                    <el-option
                      v-for="item in CommuneOften"
                      :key="item.Commune"
                      :label="item.Commune"
                      :value="item.Commune"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :xs="24" :lg="8">
                  <el-input
                    :class="form.AddressOften ? '' : 'infoInvalidate'"
                    placeholder="Địa chỉ, số nhà..."
                    class="selectIDGroup"
                    v-model="form.AddressOften"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="Nơi ở hiện tại:"
              label-width="160px"
              class="item-form-custom"
            >
              <el-row :gutter="10">
                <el-col :xs="24" :lg="5">
                  <el-select
                    :class="form.AddressNowCity ? '' : 'infoInvalidate'"
                    class="selectIDGroup"
                    filterable
                    v-model="form.AddressNowCity"
                    @change="getDistrictNow"
                    placeholder="Tỉnh thành phố"
                  >
                    <el-option
                      v-for="item in City"
                      :key="item.city"
                      :label="item.city"
                      :value="item.city"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :xs="24" :lg="5">
                  <el-select
                    :class="form.AddressNowDistrict ? '' : 'infoInvalidate'"
                    class="selectIDGroup"
                    filterable
                    v-model="form.AddressNowDistrict"
                    @change="getCommuneNow"
                    placeholder="Quận huyện"
                  >
                    <el-option
                      v-for="item in DistrictNow"
                      :key="item.District"
                      :label="item.District"
                      :value="item.District"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :xs="24" :lg="5">
                  <el-select
                    :class="form.AddressNowCommune ? '' : 'infoInvalidate'"
                    class="selectIDGroup"
                    filterable
                    v-model="form.AddressNowCommune"
                    placeholder="Xã phường"
                  >
                    <el-option
                      v-for="item in CommuneNow"
                      :key="item.Commune"
                      :label="item.Commune"
                      :value="item.Commune"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :xs="24" :lg="8">
                  <el-input
                    :class="form.AddressNow ? '' : 'infoInvalidate'"
                    placeholder="Địa chỉ, số nhà..."
                    class="selectIDGroup"
                    v-model="form.AddressNow"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>
        </el-col>
      </el-row>
      <el-row
        ><h3 class="title-header">
          <i class="fas fa-briefcase"></i> Thông tin công ty
        </h3></el-row
      >
      <el-row>
        <el-col :xs="24" :lg="8">
          <el-form-item
            label="Đơn vị (Chi nhánh):"
            prop="Branch"
            label-width="160px"
            class="item-form-custom"
          >
            <el-select
              :class="form.Branch ? '' : 'infoInvalidate'"
              class="selectIDGroup"
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
          <el-form-item
            label="Phòng ban:"
            prop="Office"
            label-width="120px"
            class="item-form-custom"
          >
            <el-select
              :class="form.Office ? '' : 'infoInvalidate'"
              class="selectIDGroup"
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
          <el-form-item
            label="Chức danh:"
            prop="Position"
            label-width="110px"
            class="item-form-custom"
          >
            <el-select
              :class="form.Position ? '' : 'infoInvalidate'"
              class="selectIDGroup"
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
      <el-row>
        <el-form-item
          label="Địa bàn:"
          prop="Place"
          label-width="160px"
          class="item-form-custom"
        >
          <el-select
            :class="form.Place.length > 0 ? '' : 'infoInvalidate'"
            class="selectIDGroup"
            v-model="form.Place"
            multiple
            filterable
            default-first-option
            placeholder="Chọn địa bàn"
          >
            <el-option
              v-for="item in City"
              :key="item.city"
              :label="item.city"
              :value="item.city"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row
        ><h3 class="title-header">
          <i class="fas fa-graduation-cap"></i> Học vấn
        </h3></el-row
      >
      <el-row class="info--education">
        <el-col :xs="24" :sm="24" :lg="24" class="info">
          <el-row :gutter="10">
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Trình độ chuyên môn:"
                label-width="170px"
                class="item-form-custom"
              >
                <el-select
                  :class="form.Qualification ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  v-model="form.Qualification"
                  placeholder="Chọn trình độ.."
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
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Khối ngành:"
                label-width="100px"
                class="item-form-custom"
              >
                <el-autocomplete
                  :class="form.SpecializedFather ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  popper-class="my-autocomplete"
                  v-model="form.SpecializedFather"
                  :fetch-suggestions="querySearch8"
                  placeholder="Chọn khối ngành"
                  @select="handleSelect8"
                >
                  <template slot-scope="{ item }">
                    <div class="value">{{ item.value }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Chuyên ngành:"
                label-width="120px"
                class="item-form-custom"
              >
                <el-autocomplete
                  :class="form.Specialized ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  popper-class="my-autocomplete"
                  v-model="form.Specialized"
                  :fetch-suggestions="querySearch2"
                  placeholder="Chọn chuyên ngành"
                  @select="handleSelect2"
                >
                  <template slot-scope="{ item }">
                    <div class="value">{{ item.value }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :lg="12">
              <el-form-item
                label="Bằng cấp:"
                label-width="170px"
                class="item-form-custom"
              >
                <el-autocomplete
                  :class="form.Degree ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  popper-class="my-autocomplete"
                  v-model="form.Degree"
                  :fetch-suggestions="querySearch"
                  placeholder="Chọn bằng cấp"
                  @select="handleSelect"
                >
                  <template slot-scope="{ item }">
                    <div class="value">{{ item.value }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="12">
              <el-form-item
                label="Xếp loại bằng cấp:"
                prop="Degree"
                label-width="160px"
                class="item-form-custom"
              >
                <el-select
                  :class="form.DegreeLevel ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
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
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :lg="12">
              <el-form-item
                label="Nơi đào tạo:"
                label-width="170px"
                class="item-form-custom"
              >
                <el-autocomplete
                  :class="form.TrainingPlaces ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  popper-class="my-autocomplete"
                  v-model="form.TrainingPlaces"
                  :fetch-suggestions="querySearch3"
                  placeholder="Chọn nơi đào tạo"
                  @select="handleSelect3"
                >
                  <template slot-scope="{ item }">
                    <div class="value">{{ item.value }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="12">
              <el-form-item
                label="Thời gian đào tạo:"
                label-width="170px"
                class="item-form-custom"
              >
                <el-date-picker
                  :class="form.TranningTime ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
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
              </el-form-item>
            </el-col>
          </el-row>

          <el-row
            ><h3 class="title-header">
              <i class="fas fa-plus-circle"></i> Thông tin khác
            </h3></el-row
          >
          <el-row :gutter="10">
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Số điện thoại:"
                label-width="110px"
                class="item-form-custom"
              >
                <el-input
                  :class="form.Phone ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  v-model="form.Phone"
                  placeholder="Số điện thoại.."
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Email cá nhân:"
                label-width="120px"
                class="item-form-custom"
              >
                <el-input
                  :class="form.Email ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  type="email"
                  v-model="form.Email"
                  placeholder="Email"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Link facebook:"
                label-width="120px"
                class="item-form-custom"
              >
                <el-input
                  :class="form.LinkFace ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  v-model="form.LinkFace"
                  placeholder="Facebook"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Số tài khoản cá nhân:"
                label-width="160px"
                class="item-form-custom"
              >
                <el-input
                  :class="form.TK_Employee ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  v-model="form.TK_Employee"
                  placeholder="stk..."
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="16">
              <el-form-item
                label="Ghi chú ngân hàng, chi nhánh của TK cá nhân:"
                label-width="320px"
                class="item-form-custom"
              >
                <el-input
                  :class="form.TK_Employee_Note ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  v-model="form.TK_Employee_Note"
                  placeholder="ghi chú..."
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :lg="8">
          <el-form-item
            label="Tình trạng hôn nhân:"
            prop="Matrimony"
            label-width="160px"
            class="item-form-custom"
          >
            <el-select
              :class="form.Matrimony ? '' : 'infoInvalidate'"
              class="selectIDGroup"
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
        <el-col :xs="24" :lg="8">
          <el-form-item
            label="Tình trạng sức khỏe:"
            prop="Health"
            label-width="180px"
            class="item-form-custom"
          >
            <el-autocomplete
              :class="form.Health ? '' : 'infoInvalidate'"
              class="selectIDGroup"
              popper-class="my-autocomplete"
              v-model="form.Health"
              :fetch-suggestions="querySearch5"
              placeholder="Chọn..."
              @select="handleSelect5"
            >
              <template slot-scope="{ item }">
                <div class="value">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="8"> </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"
          ><el-form-item
            label="Năng khiếu nổi bật (nếu có):"
            label-width="200px"
            class="item-form-custom"
          >
            <el-input
              :class="form.Gifted ? '' : 'infoInvalidate'"
              class="selectIDGroup"
              v-model="form.Gifted"
              placeholder="mô tả thêm..."
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row
        ><h3 class="title-header">
          <i class="fas fa-address-card"></i> Thông tin bổ sung
        </h3></el-row
      >
      <el-row class="info--education">
        <el-col :xs="24" :sm="24" :lg="24" class="info">
          <el-row :gutter="10">
            <el-form-item
              label="Mã số thuế"
              label-width="170px"
              class="item-form-custom"
            >
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
            </el-form-item>
          </el-row>
          <el-row :gutter="10">
            <el-form-item
              label="BHXH"
              label-width="170px"
              class="item-form-custom"
            >
              <el-row>
                <el-col :xs="24" :lg="6">
                  <el-radio v-model="bhxh" label="1">Đã tham gia BHXH</el-radio>
                </el-col>
                <el-col :xs="24" :lg="6">
                  <el-radio v-model="bhxh" label="0"
                    >Chưa tham gia BHXH</el-radio
                  >
                </el-col>
                <el-col v-if="bhxh == 1" :xs="24" :lg="12">
                  <span style="width: 30%;">Nhập mã BHXH: </span
                  ><el-input
                    style="width: 70%;"
                    size="mini"
                    placeholder="Nhập mã BHXH"
                    v-model="form.BHXH"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>
          <el-row :gutter="10">
            <el-form-item
              v-if="displayOption"
              label="Loại nhân viên"
              label-width="170px"
              class="item-form-custom"
            >
              <el-row>
                <el-col :xs="24" :lg="6">
                  <el-radio v-model="form.typeOption" label="1"
                    >Chính thức</el-radio
                  >
                </el-col>
                <el-col :xs="24" :lg="6">
                  <el-radio v-model="form.typeOption" label="0"
                    >Thời vụ</el-radio
                  >
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :lg="8">
              <el-form-item label="Email công ty">
                <el-input
                  :class="form.EmailCompany ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  placeholder="Nhập email công ty"
                  type="email"
                  v-model="form.EmailCompany"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="8">
              <el-form-item label="Mã nhân viên">
                <el-input
                  :class="form.EmployeeCode ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  v-model="form.EmployeeCode"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="8">
              <el-form-item
                label="Ngày bắt đầu làm việc"
                prop="DateCMND"
                label-width="200px"
              >
                <el-date-picker
                  :class="form.DateStartWork ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  style="width:100%"
                  type="date"
                  placeholder="Chọn ngày"
                  v-model="form.DateStartWork"
                  format="dd/MM/yyyy"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :lg="10">
              <el-form-item label="Số tài khoản công ty" label-width="190px">
                <!-- <el-input
                  :class="form.TK_Company ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  v-model="form.TK_Company"
                ></el-input> -->
                <div style="display:flex">
                  <el-select
                    class="selectIDGroup"
                    clearable
                    filterable
                    @change="changeAccout(val)"
                    v-model="form.TK_Company"
                    placeholder="Chọn hoặc nhập stk công ty"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item, index) in accountLst"
                      :key="index"
                      :label="item.AccountNumber"
                      :value="item.AccountNumber"
                    >
                      <span style="float: left">{{ item.AccountNumber }}</span>
                      <span
                        style="float: right; color: #8492a6; font-size: 10px"
                        >{{ item.Bank }}</span
                      >
                    </el-option> </el-select
                  ><el-button size="small" type="primary" @click="addSTK"
                    >Thêm</el-button
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :lg="14">
              <el-form-item label="Ghi chú STK công ty" label-width="200px">
                <el-input
                  :class="form.TK_Company_Note ? '' : 'infoInvalidate'"
                  class="selectIDGroup"
                  v-model="form.TK_Company_Note"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <div style="text-align:center">
      <el-button type="warning" @click="cancel">Không đạt</el-button>
      <el-button type="primary" @click="updateOK">Cập nhật</el-button>
      <el-button type="success" @click="modalOK">Xác nhận</el-button>
    </div>
    <el-dialog
      :visible.sync="dialogFormCreateAccount"
      custom-class="default-modal"
      append-to-body
    >
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-credit-card"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <create-account
        @addOK="addOK"
        :employee="user[0].EmployeeID"
      ></create-account>
    </el-dialog>
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
import { GetAccountNumberLst } from "@/api/employeeAdmin";
import CreateAccount from "@/views/user/accountNumber/component/create";
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
  components: { CreateAccount },
  data() {
    return {
      token: {
        token: Cookies.get("token")
      },
      mst: null,
      bhxh: null,
      dialogFormCreateAccount: false,
      titleDialog: "",
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
      accountLst: [],
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
          this.form.Position.includes("PS") ||
          this.form.Position.includes("GP")
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
      //this.displayPlace = false;
      GetOffice({ Branch: this.form.Branch }).then(res => {
        this.Office = res.Data;
      });
    },
    getPosition() {
      this.form.Position = null;
      //this.displayPlace = false;
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
    fetchSTK() {
      GetAccountNumberLst({ EmployeeID: this.user[0].EmployeeID }).then(res => {
        this.accountLst = res.AccountLst;
      });
    },
    addOK() {
      this.dialogFormCreateAccount = false;
      this.fetchSTK();
    },
    addSTK() {
      this.dialogFormCreateAccount = true;
      this.titleDialog = "Thêm tài khoản ngân hàng";
    },
    changeAccout(val) {
      console.log(val);
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
          if (res.ResCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thông tin thành công",
              type: "success",
              position: "top-left"
            });
            this.$emit("click-something", "ok");
          } else {
            this.$notify({
              title: "Lỗi",
              message: res.ResMes,
              type: "warning",
              position: "top-left"
            });
          }
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
          if (res.ResCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật thông tin thành công",
              type: "success",
              position: "top-left"
            });
            this.$emit("click-something", "ok");
          } else {
            this.$notify({
              title: "Lỗi",
              message: res.ResMes,
              type: "warning",
              position: "top-left"
            });
          }
        });
      } else {
        this.$notify({
          title: "Lỗi",
          message: "Chưa có thời gian đào tạo",
          type: "warning",
          position: "top-left"
        });
      }
    }
  },
  created() {
    this.initForm();
    this.fetchSTK();
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
      this.fetchSTK();
    }
  }
};
</script>
<style scoped lang="scss">
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
.title-header {
  text-transform: uppercase;
  padding-bottom: 5px;
  border-bottom: 2px solid #ccc;
  display: inline-block;
}
.info--basic {
  width: 100%;

  .avatar {
    width: 4cm;
    height: auto;
    text-align: center;
    .image-avatar {
      object-fit: cover;
      border: 1px solid #ccc;
      padding: 3px;
    }
  }
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
