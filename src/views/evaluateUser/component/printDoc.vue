<template>
  <div style="padding:50px" id="div_content_view" ref="content">
    <div style="font-family: arial,sans-serif,tahoma;">
      <div class="box-header">
        <h3 class="title-box text-center">PHIẾU ĐÁNH GIÁ NHÂN SỰ</h3>
        <p class="row-box text-center">
          Loại đánh giá: {{ employee.TypeEvaluate | typeEval }}
          <span v-if="employee.TypeEvaluate != 'TV'"
            >- {{ employee.WorkOld }} tháng</span
          >
        </p>
        <p class="row-box text-center">
          Thời điểm đánh giá:
          {{ Date.parse(employee.TimeCreate).toString("dd/MM/yyyy") }}
        </p>
        <div class="info-box">
          <el-row>
            <el-col :xs="6" :lg="6" style="text-align: -webkit-center;">
              <div class="avatar">
                <img :src="linkImg" alt="avatar" />
              </div>
            </el-col>
            <el-col :xs="18" :lg="18" class="info-content">
              <el-row>
                <el-col :xs="12" :lg="12">
                  <p class="row-box">Họ tên: {{ employee.EmployeeName }}</p>
                  <p class="row-box">
                    Điện thoại:
                    {{ employee.EmployeeID }}
                  </p>
                  <p class="row-box">Vị trí: {{ employee.Position }}</p>
                </el-col>
                <el-col :xs="12" :lg="12">
                  <p class="row-box">Mã số: {{ employee.EmployeeCode }}</p>
                  <p class="row-box">
                    Ngày vào làm:
                    <span v-if="employee.DateStartWork">{{
                      Date.parse(employee.DateStartWork).toString("dd/MM/yyyy")
                    }}</span>
                  </p>
                  <p class="row-box">Phòng ban: {{ employee.Department }}</p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="logo">
          <img
            src="https://icpc1hn.work/static/img/cpc1hn-logo.3c3ec0d0.png"
            width="33"
            height="28"
            alt="logo"
          />
        </div>
        <div class="barcode">
          <qrcode-vue :value="barCode" :size="60" level="H"></qrcode-vue>
        </div>
      </div>
      <ol
        start="1"
        style="margin:0pt; padding-left:0pt;border-top: 1px dashed #ccc;"
        type="A"
      >
        <li
          style="margin-top:5pt; margin-left:12.27pt; padding-left:1.33pt; font-family:'Times New Roman'; font-size:11pt; font-weight:bold;"
        >
          CHI TIẾT Đ&Aacute;NH GI&Aacute;
        </li>
      </ol>
      <div
        class="box-content"
        v-for="(criteria, index) in evaluatedLst"
        :key="'lines1' + index"
      >
        <p class="row-box title-content">
          Tiêu chí:
          {{ criteria.ReferenceDes }}
        </p>
        <div
          :class="criteria.value.length > 1 ? 'content' : ''"
          v-for="(item, index2) in criteria.value"
          :key="index2"
        >
          <p class="row-box text-italic" style="color:#0277bc">
            {{ item.CriteriaName }}
            <span style="color:red;" v-if="item.CriteriaType == 1">*</span>
          </p>
          <p class="row-box text-italic" v-if="item.Description">
            Mô tả: {{ item.Description }}
          </p>
          <el-row :gutter="20">
            <el-col :xs="24" :lg="8">
              <div
                style="height:200px"
                class="card-chart"
                v-if="item.ResultWorkLst.length > 0"
              >
                <result-chart :chartData="item.ResultWorkLst"></result-chart>
              </div>
            </el-col>
            <el-col
              :xs="24"
              :lg="16"
              :style="item.ResultWorkLst.length > 0 ? '' : 'width: 100%'"
            >
              <p class="row-box">
                Kết quả/ định mức:
                <contenteditable
                  tag="span"
                  @change="checkInput"
                  :contenteditable="!isEditable"
                  v-model="item.Quantity"
                  class="t-hover result"
                />/
                <contenteditable
                  tag="span"
                  :contenteditable="!isEditable"
                  v-model="item.Quota"
                  class="t-hover result"
                />
                <span style="margin-left:5px" class="row-box" v-if="item.Unit"
                  >( {{ item.Unit }} )</span
                >
              </p>
              <div style="display:flex">
                <p class="row-box">
                  Đánh giá:
                </p>
                <el-rate
                  disabled
                  style="margin-top:5px;"
                  v-model="item.Rate"
                  :texts="['Không đạt', 'Không đạt', 'Đạt', 'Đạt', 'Đạt']"
                  show-text
                >
                </el-rate>
              </div>

              <p class="row-box">
                Lý do (chấm đạt hay trượt)
              </p>
              <p class="row-box border-row text-italic">
                <contenteditable
                  tag="span"
                  spellcheck="false"
                  :contenteditable="!isEditable"
                  v-model="item.Comment"
                  class="comment"
                />
              </p>
            </el-col>
          </el-row>
          <p class="row-box text-right">
            <span style="font-weight:600">Người đánh giá: </span>
            <span class="text-italic">
              {{ item.EmployeeNameRate }}
              <span v-if="item.TimeRate">
                - ngày
                {{ Date.parse(item.TimeRate).toString("dd/MM/yyyy") }}</span
              >
            </span>
          </p>
        </div>
      </div>
      <div>
        <ol start="2" style="margin:0pt; padding-left:0pt;" type="A">
          <li
            style="margin-top:5pt; margin-left:12.27pt; padding-left:1.33pt; font-family:'Times New Roman'; font-size:11pt; font-weight:bold;"
          >
            KẾT QUẢ Đ&Aacute;NH GI&Aacute;
          </li>
        </ol>
        <p
          style="margin-top:3.4pt; margin-left:41.6pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
        >
          <strong
            ><span style="font-family:'Times New Roman';">&nbsp;</span></strong
          >
        </p>
        <table
          cellpadding="0"
          cellspacing="0"
          style=" border:0.75pt solid #000000;width:100%; margin-right:auto; margin-left:auto; border-collapse:collapse;"
        >
          <tbody>
            <tr style="height:12.75pt;">
              <td
                rowspan="2"
                style="width: 6.7126%; border-right-style: solid; border-right-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:11pt;"
                >
                  <strong
                    ><span style="font-family:'Times New Roman';"
                      >STT</span
                    ></strong
                  >
                </p>
              </td>
              <td
                rowspan="2"
                style="width: 22.2031%; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:11pt;"
                >
                  <strong
                    ><span style="font-family:'Times New Roman';"
                      >TI&Ecirc;U CH&Iacute;</span
                    ></strong
                  >
                </p>
              </td>
              <td
                rowspan="2"
                style="width: 9.9828%; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:11pt;"
                >
                  <strong
                    ><span style="font-family:'Times New Roman';"
                      >ĐỊNH MỨC</span
                    ></strong
                  >
                </p>
              </td>
              <td
                rowspan="2"
                style="width: 10.8434%; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:11pt;"
                >
                  <strong
                    ><span style="font-family:'Times New Roman';"
                      >KẾT QUẢ ĐẠT</span
                    ></strong
                  >
                </p>
              </td>
              <td
                rowspan="2"
                style="width: 17.5559%; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:11pt;"
                >
                  <strong
                    ><span style="font-family:'Times New Roman';"
                      >NGƯỜI Đ&Aacute;NH GI&Aacute;</span
                    ></strong
                  >
                </p>
              </td>
              <td
                colspan="2"
                style="width: 16.3512%; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:11pt;"
                >
                  <strong
                    ><span style="font-family:'Times New Roman';"
                      >Đ&Aacute;NH GI&Aacute;</span
                    ></strong
                  >
                </p>
              </td>
              <!-- <td
                        rowspan="2"
                        style="max-width: 16.3511%; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:11pt;"
                        >
                          <strong
                            ><span style="font-family:'Times New Roman';"
                              >NHẬN X&Eacute;T</span
                            ></strong
                          >
                        </p>
                      </td> -->
            </tr>
            <tr style="height:12pt;">
              <td
                style="width: 8.2617%;text-align:center; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:11pt;"
                >
                  <strong
                    ><span style="font-family:'Times New Roman';"
                      >Người</span
                    ></strong
                  >
                </p>
              </td>
              <td
                style="width: 8.2616%;text-align:center; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <strong
                    ><span style="font-family:'Times New Roman';"
                      >M&aacute;y</span
                    ></strong
                  >
                </p>
              </td>
            </tr>
            <tr v-for="(item, index) in lines" :key="index">
              <td
                style="width: 6.7126%;text-align:center; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';">{{
                    index + 1
                  }}</span>
                </p>
              </td>
              <td
                style="width: 22.2031%; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';">{{
                    item.CriteriaName
                  }}</span>
                </p>
              </td>
              <td
                style="width: 9.9828%;text-align:center; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';">{{
                    item.Quota
                  }}</span>
                </p>
              </td>
              <td
                style="width: 10.8434%;text-align:center; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';">{{
                    item.Quantity
                  }}</span>
                </p>
              </td>
              <td
                style="width: 17.5559%; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';">{{
                    item.EmployeeNameRate
                  }}</span>
                  <!-- <p style="font-family:'Times New Roman';" v-if="item.TimeRate">{{
                            Date.parse(item.TimeRate).toString(
                              "HH:mm dd/MM/yyyy"
                            )
                          }}</p> -->
                </p>
              </td>
              <td
                style="width: 8.2617%;text-align:center; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';">{{
                    item.Rate | toRateText
                  }}</span>
                </p>
              </td>
              <td
                style="width: 8.2616%;text-align:center; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';">{{
                    item.RateAuto | toRateAutoText
                  }}</span>
                </p>
              </td>
              <!-- <td
                        style="max-width: 16.3511%; border-top-style: solid; border-top-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span style="font-family:'Times New Roman';">{{
                            item.Comment
                          }}</span>
                        </p>
                      </td> -->
            </tr>
          </tbody>
        </table>
        <p
          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
        >
          <span style="font-family:'Times New Roman';">&nbsp;</span>
        </p>
        <table
          cellpadding="0"
          cellspacing="0"
          style="margin-left: calc(13%); border-collapse: collapse;width:87%;"
        >
          <tbody>
            <tr>
              <td
                style="width: 37.9177%; border-right-style: solid; border-right-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.4pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';">&nbsp;</span>
                </p>
              </td>
              <td
                style="width: 21.086%; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';"
                    >SL kế hoạch</span
                  >
                </p>
              </td>
              <td
                style="width: 13.1714%; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';">SL đạt</span>
                </p>
              </td>
              <td
                style="width: 27.4288%; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';"
                    >Tỷ lệ ho&agrave;n th&agrave;nh</span
                  >
                </p>
              </td>
            </tr>
            <tr>
              <td
                style="width: 37.9177%; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';"
                    >Ti&ecirc;u ch&iacute; bắt buộc</span
                  >
                </p>
              </td>
              <td
                style="width: 21.086%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span
                    style="font-family:'Times New Roman';text-align:center;"
                    >{{ NumReq }}</span
                  >
                </p>
              </td>
              <td
                style="width: 13.1714%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span
                    style="font-family:'Times New Roman';text-align:center;"
                    >{{ NumOKReq }}</span
                  >
                </p>
              </td>
              <td
                style="width: 27.4288%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';text-align:center;"
                    >{{ RateReq }} %</span
                  >
                </p>
              </td>
            </tr>
            <tr>
              <td
                style="width: 37.9177%;border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';"
                    >Ti&ecirc;u ch&iacute; kh&ocirc;ng bắt buộc</span
                  >
                </p>
              </td>
              <td
                style="width: 21.086%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span
                    style="font-family:'Times New Roman';text-align:center;"
                    >{{ Num }}</span
                  >
                </p>
              </td>
              <td
                style="width: 13.1714%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span
                    style="font-family:'Times New Roman';text-align:center;"
                    >{{ NumOK }}</span
                  >
                </p>
              </td>
              <td
                style="width: 27.4288%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';text-align:center;"
                    >{{ Rate }} %</span
                  >
                </p>
              </td>
            </tr>
            <tr style="height:15.7pt;">
              <td
                style="width: 37.9177%; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';"
                    >Tổng ti&ecirc;u ch&iacute;</span
                  >
                </p>
              </td>
              <td
                style="width: 21.086%;text-align:center; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';">{{ Sum }}</span>
                </p>
              </td>
              <td
                style="width: 13.1714%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span
                    style="font-family:'Times New Roman';text-align:center;"
                    >{{ SumOK }}</span
                  >
                </p>
              </td>
              <td
                style="width: 27.4288%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: center;"
              >
                <p
                  style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                >
                  <span style="font-family:'Times New Roman';text-align:center;"
                    >{{ RateSum }} %</span
                  >
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p
          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
        >
          <span style="font-family:'Times New Roman';">&nbsp;</span>
        </p>
      </div>
    </div>
    <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000">
      <el-button
        icon="fas fa-print"
        size="small"
        type="primary"
        @click="convert('div_content_view')"
      >
        In</el-button
      >
      <el-button
        icon="fas fa-download"
        size="small"
        type="warning"
        @click="downloadWithCSS"
      >
        Tải về</el-button
      >
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import ResultChart from "@/views/evaluateUser/component/result-chart";
import { GetCriteriaByEm } from "@/api/NSCriteriaDefine";
import QrcodeVue from "qrcode.vue";
import {
  GetCriteriaHeaderByEmId,
  UpdateCriteriaEmployee,
  GetCriteriaLineByHeader
} from "@/api/NSCriteriaEmployee";
import { GetEmployeeInforByID } from "@/api/employeeInfor";
import html2PDF from "html-pdf-adaptive";
export default {
  components: { ResultChart, QrcodeVue },
  props: ["employee"],
  filters: {
    toRateText(val) {
      if (val > 2) {
        return "ĐẠT";
      } else {
        return "KHÔNG ĐẠT";
      }
    },
    toRateAutoText(val) {
      if (val == 1) {
        return "ĐẠT";
      } else {
        return "KHÔNG ĐẠT";
      }
    },
    typeEval(type) {
      // console.log(type);
      if (type == "TV") {
        return "Thử việc";
      } else if (type == "CT") {
        return "Định kỳ";
      } else if (type == "BN") {
        return "Bổ nhiệm";
      }
    }
  },
  data() {
    return {
      UserName: Cookies.get("idEmployee"),
      EmployeeRate: "",
      barCode: "",
      Img: "",
      linkImg: "",
      isEditable: true,
      lines: [],
      lines1: [],
      evaluatedLst: [],
      NumReq: 0,
      Num: 0,
      Sum: 0,
      NumOKReq: 0,
      NumOK: 0,
      SumOK: 0,
      RateReq: 0,
      Rate: 0,
      RateSum: 0,
      token: Cookies.get("token"),
      CriteriaHeaderInfo: {
        EmployeeName: "",
        EmployeeCode: "",
        Comment: "",
        DocType: "",
        WorkOld: "",
        CriteriaLineLst: [],
        TypeEvaluate: ""
      },
      resultLst: [
        {
          value: "1",
          label: "ĐẠT"
        },
        {
          value: "0",
          label: "KHÔNG ĐẠT"
        }
      ]
    };
  },
  watch: {
    employee() {
      this.initData();
      this.fetchData();
    }
  },
  methods: {
    checkInput(val) {
      {
        if (isNaN(val)) {
          this.$message({
            message: "Kết quả đạt phải là dạng số",
            type: "error"
          });
          return false;
        }
      }
    },
    errorHandler() {
      return true;
    },
    fetchData() {
      if (this.employee) {
        this.linkImg =
          "https://icpc1hn.work/CPC1HN-SYS/api/File/GetImageEmployee/" +
          this.employee.ImageEm +
          "?token=" +
          this.token +
          "&EmployeeID=" +
          this.employee.EmployeeID;
        this.barCode =
          "http://icpc1hn.work/#/danh-gia-nhan-su/" + this.employee.DocumentID;
        var req = {
          DocumentID: this.employee.DocumentID
        };
        GetCriteriaLineByHeader(req).then(res => {
          if (res.RespCode == 0) {
            if (res.CriteriaLineLst) {
              this.lines = res.CriteriaLineLst;
              this.Sum = res.CriteriaLineLst.length;
              let _this = this;
              this.lines.forEach(function(item, index, arr) {
                item.Quantity = item.Quantity.toString().replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1,"
                );
                item.Quota = item.Quota.toString().replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1,"
                );
                if (item.CriteriaType === 0 && item.Rate > 2) {
                  _this.NumOK++;
                }
                if (item.CriteriaType === 1 && item.Rate > 2) {
                  _this.NumOKReq++;
                }
                if (item.CriteriaType === 0) {
                  _this.Num++;
                }
                if (item.CriteriaType === 1) {
                  _this.NumReq++;
                }
              });
              _this.evaluatedLst = _this.mergeObj(_this.lines).map(item => {
                if (item.value) {
                  item.value = item.value.sort((a, b) =>
                    a.EvalueLevel > b.EvalueLevel
                      ? 1
                      : b.EvalueLevel > a.EvalueLevel
                      ? -1
                      : 0
                  );
                }
                return item;
              });
              //console.log(_this.evaluatedLst);
              _this.SumOK = _this.NumOK + _this.NumOKReq;
              _this.RateReq =
                (_this.NumOKReq / _this.NumReq).toFixed(2) * 100
                  ? (_this.NumOKReq / _this.NumReq).toFixed(2) * 100
                  : 0;
              _this.Rate =
                (_this.NumOK / _this.Num).toFixed(2) * 100
                  ? (_this.NumOK / _this.Num).toFixed(2) * 100
                  : 0;
              _this.RateSum =
                (_this.SumOK / _this.Sum).toFixed(2) * 100
                  ? (_this.SumOK / _this.Sum).toFixed(2) * 100
                  : 0;
            }
          } else {
            this.$message({
              message: res.RespText,
              type: "warning"
            });
          }
        });
      } else {
      }
    },
    initData() {
      this.lines = [];
      this.lines1 = [];
      this.NumReq = 0;
      this.Num = 0;
      this.Sum = 0;
      this.NumOKReq = 0;
      this.NumOK = 0;
      this.SumOK = 0;
      this.RateReq = 0;
      this.Rate = 0;
      this.RateSum = 0;
    },
    mergeObj(orgArray) {
      var newArray = orgArray.reduce(function(acc, curr) {
        //finding Index in the array where the NamaCategory matched
        //console.log(acc);
        var findIfNameExist = acc.findIndex(function(item) {
          //console.log(item);
          //console.log(item.ReferenceCode, curr.ReferenceCode);
          return item.ReferenceCode === curr.ReferenceCode;
        });
        // if in the new array no such object exist where
        // namecategory matches then create a new object
        if (findIfNameExist === -1) {
          let obj = {
            ReferenceCode: curr.ReferenceCode,
            ReferenceDes: curr.ReferenceDes ? curr.ReferenceDes : "Chung",
            value: [curr]
          };
          acc.push(obj);
        } else {
          // if name category matches , then push the value
          acc[findIfNameExist].value.push(curr);
        }
        return acc;
      }, []);
      return newArray;
    },
    convert(printpage) {
      var headstr = "<html><head><title></title></head><body>";
      var footstr = "</body>";
      var newstr = document.all.item(printpage).innerHTML;
      var oldstr = document.body.innerHTML;
      document.body.innerHTML = headstr + newstr + footstr;
      window.print();
      document.body.innerHTML = oldstr;
      return false;
    },
    downloadWithCSS() {
      const el = document.getElementById("div_content_view");
      //html2PDF(el);
      html2PDF(el, {
        // split PDF into several pages
        pagesplit: true,
        // p = portrait
        // l = for landscape
        orientation: "p",
        // unit
        unit: "mm",
        // PDF size: A1, A3, B1, Letter, Legal, ...
        format: "a4",
        // x/y offsets
        offset: {},
        // save, bloburl, file
        outputType: "save",
        // custom header/footer
        // header: createHeaderAndFooterElement,
        // footer: createHeaderAndFooterElement,
        useDefaultFoot: false,
        // or 'fixed'
        mode: "adaptive",
        // file name
        filename: "MyCV",
        // toggle CSS styles
        isToggleStyle: true,
        // attempt to load images from a server using CORS
        useCORS: true
      });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
<style lang="scss" scoped>
#div_content_view {
}
.box-header {
  position: relative;
  padding: 5px 5px 10px 5px;
  //border: 1px solid rgb(102, 98, 98);
  margin-bottom: 10px;
  .title-box {
    font-size: 16pt;
    margin: 10px;
    color: rgb(58, 54, 54);
  }
  .info-box {
    .avatar {
      width: 2.5cm;
      height: 3cm;
      border: 1px solid #ccc;
      img {
        width: 100%;
        height: 100%;
        padding: 1px;
        object-fit: cover;
      }
    }
  }
  .logo {
    position: absolute;
    top: 0;
    left: 42px;

    padding: 13px 20px;
  }
  .barcode {
    position: absolute;
    top: 0;
    right: 30px;
    padding: 13px 10px;
  }
}
.box-content {
  position: relative;
  padding: 5px 5px 10px 5px;
  //border: 1px solid rgb(102, 98, 98);
  border-bottom: 1px dashed #ccc; /*  */
  margin-top: 5px;
  .title-content {
    font-size: 11pt;
    font-weight: 600;
    color: rgb(82, 75, 75);
  }
  .content {
    border-bottom: 1px dashed #ccc;
  }
}
.row-box {
  margin: 8px;
  font-size: 10pt;
  word-break: break-word;
  text-align: justify;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.text-italic {
  font-style: italic;
}
.border-row {
  padding: 5px;
  border: 1px dashed #ccc;
  color: rgb(60, 140, 231);
}
@media only screen and (max-width: 600px) {
  .title-box {
    margin-top: 80px !important;
  }
  .info-content {
    margin: 5px;
  }
  .logo {
    right: 14px !important;
  }
}
.t-hover:hover {
  outline: 1pt dashed #77a5cc;
}
.t-hover:empty:before {
  //content: attr(t-placeholder);
  color: #9197a3;
  font-weight: 100;
  padding: 3px;
}
.t-hover:focus {
  cursor: text;
  outline: 1pt dashed #77a5cc;
}
.result {
  display: inline-block;
  min-width: 0.5cm;
  padding: 3px;
}
.comment {
  display: inline-block;
  min-height: 1.5cm;
  width: 100%;
  &:focus {
    cursor: text;
    outline: none;
  }
}
</style>
