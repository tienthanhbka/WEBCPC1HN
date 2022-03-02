<template>
  <div class="container-handover">
    <el-row :gutter="10">
      <el-col :xs="24" :lg="10">
        <div class="approve">
          <h3>Xác nhận phiếu bàn giao</h3>
          <acceptHandOver2 :row="rowID" @acceptOK="acceptOK"></acceptHandOver2>
          <accept-lst :row="rowID" style="margin-top:20px"></accept-lst>
        </div>
      </el-col>
      <el-col :xs="24" :lg="14">
        <el-aside width="600pt" style="height:210mm;padding:0">
          <div style="postion: relative">
            <div style="border: none;" ref="content">
              <el-card
                id="div_content_view"
                style="width:635.44pt; padding-left:45.12pt;padding-right:41.12pt; padding-bottom:381.12pt; border-bottom: 0px solid white;word-wrap: normal;"
              >
                <div>
                  <div style="clear:both;">
                    <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:10pt;"
                    >
                      <span style="font-family:'Times New Roman';"
                        >M&atilde; t&agrave;i liệu: HR-QT-02-BM04</span
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;&nbsp;&nbsp;&nbsp;</span
                      >
                    </p>
                    <p
                      style="margin-top:0pt; margin-bottom:0pt; font-size:10pt;"
                    >
                      <span style="font-family:'Times New Roman';"
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                      >
                    </p>
                  </div>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:110%; font-size:14pt;"
                  >
                    <strong
                      ><span style="font-family:'Times New Roman';"
                        >CỘNG H&Ograve;A X&Atilde; HỘI CHỦ NGHĨA VIỆT NAM</span
                      ></strong
                    >
                  </p>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:110%; font-size:13pt;"
                  >
                    <strong
                      ><span style="font-family:'Times New Roman';"
                        >Độc lập &ndash; Tự do</span
                      ></strong
                    ><strong
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;&nbsp;</span
                      ></strong
                    ><strong
                      ><span style="font-family:'Times New Roman';"
                        >- Hạnh ph&uacute;c</span
                      ></strong
                    >
                  </p>
                  <br />
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:110%; font-size:16pt;"
                  >
                    <strong
                      ><span style="font-family:'Times New Roman';"
                        >BI&Ecirc;N BẢN B&Agrave;N GIAO</span
                      ></strong
                    >
                  </p>
                  <br />
                  <!-- <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"><em><span style="font-family:'Times New Roman';">(D&ugrave;ng cho c&ocirc;ng t&aacute;c b&agrave;n giao của NVKD khi nghỉ việc hoặc thay đổi vị tr&iacute; c&ocirc;ng t&aacute;c)</span></em></p> -->
                  <ol style="margin:0pt; padding-left:0pt;" type="I">
                    <li
                      style="margin-left:54pt; text-indent:-54pt; text-align:justify; line-height:150%; font-family:'Times New Roman'; font-size:13pt; font-weight:bold; list-style-position:inside; -aw-list-padding-sml:4.69pt;"
                    >
                      <span style="font:7pt 'Times New Roman';"
                        >&nbsp;&nbsp;&nbsp;</span
                      >NGƯỜI THỰC HIỆN B&Agrave;N GIAO
                    </li>
                  </ol>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:180%; font-size:13pt;"
                  >
                    <el-row>
                      <el-col :span="12"
                        ><span
                          style="font-family:'Times New Roman';"
                          v-if="dataLst[0][0]"
                          >Họ v&agrave; t&ecirc;n:
                          {{ dataLst[0][0].EmployeeName }}</span
                        ></el-col
                      >
                      <el-col :span="12"
                        ><span
                          v-if="dataLst[0][0]"
                          style="font-family:'Times New Roman';"
                          >M&atilde; nh&acirc;n vi&ecirc;n:
                          {{ dataLst[0][0].EmployeeCode }}</span
                        ></el-col
                      >
                    </el-row>

                    <!-- <span style="font-family:'Times New Roman';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span style="font-family:'Times New Roman';">M&atilde; nh&acirc;n vi&ecirc;n: {{dataLst[0].EmployeeCode}}</span> -->
                  </p>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:180%; font-size:13pt;"
                  >
                    <el-row>
                      <el-col :span="12"
                        ><span
                          v-if="dataLst[0][0]"
                          style="font-family:'Times New Roman';"
                          >Vị tr&iacute;: {{ dataLst[0][0].Position }}</span
                        ></el-col
                      >
                      <el-col :span="12"
                        ><span
                          v-if="dataLst[0][0]"
                          style="font-family:'Times New Roman';"
                          >Bộ phận: {{ dataLst[0][0].Office }}</span
                        ></el-col
                      >
                    </el-row>
                    <!-- <span style="font-family:'Times New Roman';">Vị tr&iacute;: {{dataLst[0].Position}}</span>
                    <span style="font-family:'Times New Roman';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span style="font-family:'Times New Roman';">Bộ phận: {{dataLst[0].Office}}</span> -->
                  </p>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:180%; font-size:13pt;"
                  >
                    <el-row>
                      <el-col :span="12"
                        ><span
                          v-if="dataLst[0][0]"
                          style="font-family:'Times New Roman';"
                          >Ng&agrave;y v&agrave;o l&agrave;m:
                          {{ dataLst[0][0].DateStartWork }}</span
                        ></el-col
                      >
                      <el-col :span="12"
                        ><span
                          v-if="dataLst[0][0]"
                          style="font-family:'Times New Roman';"
                          >Ng&agrave;y th&ocirc;i việc:
                          {{ dataLst[0][0].DateEndWork }}</span
                        ></el-col
                      >
                    </el-row>
                    <!-- <span style="font-family:'Times New Roman';">Ng&agrave;y v&agrave;o l&agrave;m:</span>
                    <span style="font-family:'Times New Roman';">&nbsp;&nbsp;</span>
                    <span style="font-family:'Times New Roman';">{{dataLst[0].DateStartWork}}</span>
                    <span style="font-family:'Times New Roman';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:'Times New Roman';">Ng&agrave;y th&ocirc;i việc: {{dataLst[0].DateEndWork}}</span></p> -->
                  </p>

                  <ol start="2" style="margin:0pt; padding-left:0pt;" type="I">
                    <li
                      style="margin-left:54pt; text-indent:-54pt; text-align:justify; line-height:150%; font-family:'Times New Roman'; font-size:13pt; font-weight:bold; list-style-position:inside;"
                    >
                      NỘI DUNG B&Agrave;N GIAO
                    </li>
                  </ol>
                  <ol style="margin:0pt; padding-left:0pt;" type="1">
                    <li
                      style="margin-left:32.75pt; text-align:justify; line-height:150%; padding-left:3.25pt; font-family:'Times New Roman'; font-size:13pt; font-weight:bold;"
                    >
                      <u>Về c&ocirc;ng việc</u>
                    </li>
                  </ol>
                  <p
                    style="margin-top:0pt; margin-left:18pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
                  >
                    <strong
                      ><span style="font-family:'Times New Roman';"
                        >C&aacute;c nội dung c&ocirc;ng việc đ&atilde; thực hiện
                        v&agrave; đang nắm giữ:</span
                      ></strong
                    >
                  </p>
                  <div style="text-align:center;">
                    <!-- data[3] -->
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      style="width:100%; margin-right:auto; margin-left:auto; border:0.75pt solid #000000; border-collapse:collapse;"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="width:7.96%; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >STT</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:23.16%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >Nội dung</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:47.32%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >T&igrave;nh trạng/Hướng xử l&yacute;</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:21.54%; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >Người nhận</span
                                ></strong
                              >
                            </p>
                            <!-- <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:11pt;"
                    >
                      <em
                        ><span style="font-family:'Times New Roman';"
                          >(K&yacute; ghi r&otilde; họ t&ecirc;n)</span
                        ></em
                      >
                    </p> -->
                          </td>
                        </tr>
                        <tr v-for="(item, index) in dataLst[3]" :key="index">
                          <td
                            style="width:7.96%; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                index + 1
                              }}</span>
                            </p>
                          </td>
                          <td
                            style="width:23.16%; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:12pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.HandOver
                              }}</span>
                            </p>
                          </td>
                          <td
                            style="width:47.32%; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:12pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.CurrentStatus
                              }}</span>
                              <span
                                v-if="item.StepNext"
                                style="font-family:'Times New Roman';"
                              >
                                / {{ item.StepNext }}</span
                              >
                            </p>
                          </td>
                          <td
                            style="width:21.54%; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.EmployeeNameNext
                              }}</span>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <ol start="2" style="margin:0pt; padding-left:0pt;" type="1">
                    <li
                      style="margin-top:6pt; margin-left:32.75pt; margin-bottom:6pt; text-align:justify; line-height:150%; padding-left:3.25pt; font-family:'Times New Roman'; font-size:13pt; font-weight:bold;"
                    >
                      <u
                        >Về phương tiện l&agrave;m việc: t&agrave;i sản,
                        m&aacute;y m&oacute;c, c&ocirc;ng cụ dụng cụ, BHLĐ</u
                      >
                    </li>
                  </ol>
                  <div style="text-align:center;">
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      style="width:100%; margin-right:auto; margin-left:auto; border:0.75pt solid #000000; border-collapse:collapse;"
                    >
                      <tbody>
                        <!-- data[1] -->
                        <tr>
                          <td
                            style="width:24.6pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >STT</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:110.15pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >Danh mục</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:31.7pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >ĐVT</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:38.85pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >SL</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:109.65pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >T&igrave;nh trạng t&agrave;i sản</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:103.45pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >Người nhận</span
                                ></strong
                              >
                            </p>
                            <!-- <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:11pt;"
                    >
                      <em
                        ><span style="font-family:'Times New Roman';"
                          >(K&yacute; ghi r&otilde; họ t&ecirc;n)</span
                        ></em
                      >
                    </p> -->
                          </td>
                        </tr>
                        <tr v-for="(item, index) in dataLst[1]" :key="index">
                          <td
                            style="width:24.6pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                index + 1
                              }}</span>
                            </p>
                          </td>
                          <td
                            style="width:110.15pt; border-style:solid;text-align:justify; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.HandOver
                              }}</span>
                            </p>
                          </td>
                          <td
                            style="width:31.7pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; line-height:150%; font-size:12pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.Unit
                              }}</span>
                            </p>
                          </td>
                          <td
                            style="width:38.85pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; line-height:150%; font-size:13pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.Number
                              }}</span>
                            </p>
                          </td>
                          <td
                            style="width:109.65pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; line-height:150%; font-size:13pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.CurrentStatus
                              }}</span>
                            </p>
                          </td>
                          <td
                            style="width:103.45pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; line-height:150%; font-size:13pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.EmployeeNameNext
                              }}</span>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
                  >
                    <strong
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;</span
                      ></strong
                    >
                  </p>
                  <ol start="3" style="margin:0pt; padding-left:0pt;" type="1">
                    <li
                      style="margin-left:32.75pt; text-align:justify; line-height:150%; padding-left:3.25pt; font-family:'Times New Roman'; font-size:13pt; font-weight:bold;"
                    >
                      <u
                        >Hệ thống ph&acirc;n phối, danh s&aacute;ch kh&aacute;ch
                        h&agrave;ng:</u
                      >
                    </li>
                  </ol>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:13pt;"
                  >
                    <em
                      ><u
                        ><span
                          style="font-family:'Times New Roman'; color:#ff0000;"
                          >(Gửi k&egrave;m file excel c&oacute; x&aacute;c nhận
                          của nh&acirc;n vi&ecirc;n phụ tr&aacute;ch, quản
                          l&yacute; v&agrave; kế to&aacute;n phụ tr&aacute;ch
                          địa b&agrave;n)</span
                        ></u
                      ></em
                    >
                  </p>
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    style="width:100%; border:0.75pt solid #000000; border-collapse:collapse;"
                  >
                    <tbody>
                      <tr style="height:21.55pt;">
                        <td
                          style="width:6.54%; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >STT</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:32.76%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Danh mục</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:13.52%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Địa chỉ</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:20.62%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Điện thoại</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:26.56%; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Ghi chú</span
                              ></strong
                            >
                          </p>
                        </td>
                      </tr>
                      <tr style="height:21.55pt;">
                        <td
                          style="width:6.54%; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >I</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:32.76%; border-style:solid;padding:0 5.03pt; border-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Hệ thống ph&acirc;n phối</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:13.52%; border-style:solid; border-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >&nbsp;</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:20.62%; border-style:solid; border-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >&nbsp;</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:26.56%; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >&nbsp;</span
                              ></strong
                            >
                          </p>
                        </td>
                      </tr>
                      <tr
                        v-for="(item, index) in dataLst[6]"
                        :key="index"
                        style="height:21.55pt;"
                      >
                        <td
                          style="width:6.54%; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              index + 1
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:32.76%;padding:0 5.03pt; border-style:solid;text-align:justify; border-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:13pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.HandOver
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:13.52%; border-style:solid;padding:0 5.03pt; border-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:13pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.Address
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:20.62%; border-style:solid;padding:0 5.03pt; border-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.Phone
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:26.56%; border-top-style:solid;padding:0 5.03pt; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:13pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.Note
                            }}</span>
                          </p>
                        </td>
                      </tr>

                      <tr style="height:21.55pt;">
                        <td
                          style="width:6.54%; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >II</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:32.76%; border-style:solid;padding:0 5.03pt; border-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Danh s&aacute;ch kh&aacute;ch h&agrave;ng</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:13.52%; border-style:solid; border-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >&nbsp;</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:20.62%; border-style:solid; border-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >&nbsp;</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:26.56%; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >&nbsp;</span
                              ></strong
                            >
                          </p>
                        </td>
                      </tr>
                      <tr
                        v-for="(item, index) in dataLst[7]"
                        style="height:21.55pt;"
                        :key="index"
                      >
                        <td
                          style="width:6.54%; border-top-style:solid;padding:0 5.03pt; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:13pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              index + 1
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:32.76%; border-style:solid;padding:0 5.03pt;text-align:justify; border-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:13pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.HandOver
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:13.52%; border-style:solid;padding:0 5.03pt; border-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt;  font-size:13pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.Address
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:20.62%; border-style:solid;padding:0 5.03pt; border-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:13pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.Phone
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:26.56%; border-top-style:solid;padding:0 5.03pt; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt;  font-size:13pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.Note
                            }}</span>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <ol start="4" style="margin:0pt; padding-left:0pt;" type="1">
                    <li
                      style="margin-left:32.75pt; text-align:justify; line-height:150%; padding-left:3.25pt; font-family:'Times New Roman'; font-size:13pt; font-weight:bold;"
                    >
                      <u>Về t&agrave;i ch&iacute;nh</u>
                      <ol
                        style="margin-right:0pt; margin-left:0pt; padding-left:0pt;"
                        type="a"
                      >
                        <li
                          style="margin-left:-36pt; line-height:normal; list-style-position:inside; -aw-list-padding-sml:21.25pt;"
                        >
                          <span style="font:7pt 'Times New Roman';"
                            >&nbsp;&nbsp;</span
                          >C&ocirc;ng nợ kh&aacute;ch h&agrave;ng
                          <em><span style="font-weight:normal;">(</span></em
                          ><em
                            ><span style="font-weight:normal; color:#ff0000;"
                              >k&egrave;m</span
                            ></em
                          ><em
                            ><span style="font-weight:normal;">&nbsp;</span></em
                          ><em
                            ><span style="font-weight:normal; color:#ff0000;"
                              >file excel chi tiết c&ocirc;ng nợ c&ograve;n phải
                              thu Kh&aacute;ch h&agrave;ng chốt đến thời điểm
                              b&agrave;n giao, c&oacute; k&yacute; x&aacute;c
                              nhận của nh&acirc;n vi&ecirc;n, quản l&yacute;
                              v&agrave; kế to&aacute;n phụ tr&aacute;ch địa
                              b&agrave;n)</span
                            ></em
                          >
                        </li>
                      </ol>
                    </li>
                  </ol>
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    style="width:100%; border-collapse:collapse;"
                  >
                    <tbody>
                      <tr style="height:21.2pt;">
                        <td
                          style="width:6.94%; border-style:solid; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >STT</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:21.88%; border-style:solid; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Tên KH</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:22.72%; border-style:solid; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Địa chỉ</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:19.36%; border-style:solid; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Điện thoại</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:12.8%; border-style:solid; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Số tiền</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:16.28%; border-style:solid; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Ghi chú</span
                              ></strong
                            >
                          </p>
                        </td>
                      </tr>
                      <tr
                        v-for="(item, index) in dataLst[5]"
                        :key="index"
                        style="height:21.2pt;"
                      >
                        <td
                          style="width:6.94%; border-style:solid; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              index + 1
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:21.88%; border-style:solid;padding:0 5.03pt; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:justify; font-size:12pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.HandOver
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:22.72%; border-style:solid;padding:0 5.03pt; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:justify; font-size:12pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.Address
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:19.36%; border-style:solid;padding:0 5.03pt; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.Phone
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:12.8%; border-style:solid;padding:0 5.03pt; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.Number
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:16.28%; border-style:solid;padding:0 5.03pt; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:justify; font-size:12pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.Note
                            }}</span>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <ol start="2" style="margin:0pt; padding-left:0pt;" type="a">
                    <li
                      style="text-align:justify; font-family:'Times New Roman'; font-size:13pt; font-weight:bold; list-style-position:inside; -aw-list-padding-sml:20.52pt;"
                    >
                      <span style="font:7pt 'Times New Roman';"
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                      >C&ocirc;ng nợ với C&ocirc;ng ty
                    </li>
                  </ol>
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    style="width:100%; border:0.75pt solid #000000; border-collapse:collapse;"
                  >
                    <tbody>
                      <tr style="height:38.45pt;">
                        <td
                          style="width:7.42%; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >STT</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:26.42%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >C&aacute;c khoản nợ</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:21.98%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Số tiền</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:22%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Hướng xử l&yacute;</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:22.18%; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Người nhận</span
                              ></strong
                            >
                          </p>
                          <!-- <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:11pt;"
                  >
                    <em
                      ><span style="font-family:'Times New Roman';"
                        >(K&yacute; ghi r&otilde; họ t&ecirc;n)</span
                      ></em
                    >
                  </p> -->
                        </td>
                      </tr>
                      <tr
                        v-for="(item, index) in dataLst[4]"
                        :key="index"
                        style="height:31.15pt;"
                      >
                        <td
                          style="width:7.42%; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              index + 1
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:26.42%; border-style:solid;padding:0 5.03pt;text-align:justify; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:12pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.HandOver
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:21.98%; border-style:solid; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt;text-align:center; font-size:12pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.Number
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:22%; border-style:solid;padding:0 5.03pt; border-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:12pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.StepNext
                            }}</span>
                          </p>
                        </td>
                        <td
                          style="width:22.18%; border-top-style:solid;padding:0 5.03pt; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:12pt;"
                          >
                            <span style="font-family:'Times New Roman';">{{
                              item.EmployeeNameNext
                            }}</span>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <ol start="5" style="margin:0pt; padding-left:0pt;" type="1">
                    <li
                      style="margin-left:32.75pt; text-align:justify; line-height:150%; padding-left:3.25pt; font-family:'Times New Roman'; font-size:13pt; font-weight:bold;"
                    >
                      <u>Về nh&acirc;n sự (Đối với quản l&yacute;)</u>
                    </li>
                  </ol>
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    style="width:100%; border:0.75pt solid #000000; border-collapse:collapse;"
                  >
                    <tbody>
                      <tr style="height:36.55pt;">
                        <td
                          style="width:7.2%; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >STT</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:24.38%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Họ và tên</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:13.26%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Công việc</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:14.68%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Mức lương</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:20.96%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:middle;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Khách hàng đang quản lý</span
                              ></strong
                            >
                          </p>
                        </td>
                        <td
                          style="width:19.52%; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; text-align:center; font-size:12pt;"
                          >
                            <strong
                              ><span style="font-family:'Times New Roman';"
                                >Thông tin khác</span
                              ></strong
                            >
                          </p>
                        </td>
                      </tr>
                      <tr style="height:43.35pt;">
                        <td
                          style="width:7.2%; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:10pt;"
                          >
                            <span style="font-family:'Times New Roman';"
                              >&nbsp;</span
                            >
                          </p>
                        </td>
                        <td
                          style="width:24.38%; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:10pt;"
                          >
                            <span style="font-family:'Times New Roman';"
                              >&nbsp;</span
                            >
                          </p>
                        </td>
                        <td
                          style="width:13.26%; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:10pt;"
                          >
                            <span style="font-family:'Times New Roman';"
                              >&nbsp;</span
                            >
                          </p>
                        </td>
                        <td
                          style="width:14.68%; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:10pt;"
                          >
                            <span style="font-family:'Times New Roman';"
                              >&nbsp;</span
                            >
                          </p>
                        </td>
                        <td
                          style="width:20.96%; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:10pt;"
                          >
                            <span style="font-family:'Times New Roman';"
                              >&nbsp;</span
                            >
                          </p>
                        </td>
                        <td
                          style="width:19.52%; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;"
                        >
                          <p
                            style="margin-top:0pt; margin-bottom:7.5pt; font-size:10pt;"
                          >
                            <span style="font-family:'Times New Roman';"
                              >&nbsp;</span
                            >
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <ol start="6" style="margin:0pt; padding-left:0pt;" type="1">
                    <li
                      style="margin-left:32.75pt; text-align:justify; line-height:150%; padding-left:3.25pt; font-family:'Times New Roman'; font-size:13pt; font-weight:bold;"
                    >
                      <u>&nbsp;</u><u>Về t&agrave;i liệu</u
                      ><u>&nbsp;&nbsp;&nbsp;</u>
                    </li>
                  </ol>
                  <ol style="margin:0pt; padding-left:0pt;" type="a">
                    <li
                      style="margin-left:68.75pt; text-align:justify; line-height:150%; padding-left:3.25pt; font-family:'Times New Roman'; font-size:13pt; font-weight:bold;"
                    >
                      Bản cứng
                    </li>
                  </ol>
                  <div style="text-align:center;">
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      style="width:100%; margin-right:auto; margin-left:auto; border:0.75pt solid #000000; border-collapse:collapse;"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="width:7.22%; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >STT</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:22.94%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >Danh mục t&agrave;i liệu</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:9.16%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >SL</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:15.26%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >Loại</span
                                ></strong
                              >
                            </p>
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >(gốc/photo)</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:25.94%; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >Lưu trữ</span
                                ></strong
                              >
                            </p>
                          </td>
                          <td
                            style="width:19.5%; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"
                            >
                              <strong
                                ><span style="font-family:'Times New Roman';"
                                  >Người nhận</span
                                ></strong
                              >
                            </p>
                            <!-- <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:11pt;"
                    >
                      <em
                        ><span style="font-family:'Times New Roman';"
                          >(K&yacute; ghi r&otilde; họ t&ecirc;n)</span
                        ></em
                      >
                    </p> -->
                          </td>
                        </tr>
                        <tr v-for="(item, index) in dataLst[2]" :key="index">
                          <td
                            style="width:7.22%; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                index + 1
                              }}</span>
                            </p>
                          </td>
                          <td
                            style="width:22.94%; border-style:solid;text-align:justify; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; line-height:150%; font-size:13pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.HandOver
                              }}</span>
                            </p>
                          </td>
                          <td
                            style="width:9.16%; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; line-height:150%; font-size:13pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.Number
                              }}</span>
                            </p>
                          </td>
                          <td
                            style="width:15.26%; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; line-height:150%; font-size:13pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.Unit
                              }}</span>
                            </p>
                          </td>
                          <td
                            style="width:25.94%; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; line-height:150%; font-size:13pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.Address
                              }}</span>
                            </p>
                          </td>
                          <td
                            style="width:19.5%; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                          >
                            <p
                              style="margin-top:0pt; margin-bottom:0pt; line-height:150%; font-size:13pt;"
                            >
                              <span style="font-family:'Times New Roman';">{{
                                item.EmployeeNameNext
                              }}</span>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- <ol start="2" style="margin:0pt; padding-left:0pt;" type="a">
                <li
                  style="margin-top:3pt; margin-left:69.48pt; margin-bottom:3pt; text-align:justify; line-height:150%; padding-left:2.52pt; font-family:'Times New Roman'; font-size:13pt; font-weight:bold;"
                >
                  Bản mềm
                </li>
              </ol>
              <div style="text-align:center;">
                <table
                  cellpadding="0"
                  cellspacing="0"
                  style="width:100%; margin-right:auto; margin-left:auto; border:0.75pt solid #000000; border-collapse:collapse;"
                >
                  <tbody>
                    <tr>
                      <td
                        style="width:24.65pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                        >
                          <strong
                            ><span style="font-family:'Times New Roman';"
                              >STT</span
                            ></strong
                          >
                        </p>
                      </td>
                      <td
                        style="width:148pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                        >
                          <strong
                            ><span style="font-family:'Times New Roman';"
                              >Danh mục t&agrave;i liệu</span
                            ></strong
                          >
                        </p>
                      </td>
                      <td
                        style="width:171.9pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                        >
                          <strong
                            ><span style="font-family:'Times New Roman';"
                              >Đường dẫn lưu TL</span
                            ></strong
                          >
                        </p>
                      </td>
                      <td
                        style="width:71.6pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                        >
                          <strong
                            ><span style="font-family:'Times New Roman';"
                              >Ghi ch&uacute;</span
                            ></strong
                          >
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="width:24.65pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                      <td
                        style="width:148pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                      <td
                        style="width:171.9pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                      <td
                        style="width:71.6pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="width:24.65pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                      <td
                        style="width:148pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                      <td
                        style="width:171.9pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                      <td
                        style="width:71.6pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="width:24.65pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                      <td
                        style="width:148pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                      <td
                        style="width:171.9pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                      <td
                        style="width:71.6pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> -->
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:130%; font-size:13pt;"
                  >
                    <strong
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;</span
                      ></strong
                    >
                  </p>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:130%; font-size:13pt;"
                  >
                    <em
                      ><span style="font-family:'Times New Roman';"
                        >B&ecirc;n b&agrave;n giao đ&atilde; b&agrave;n giao
                        to&agrave;n bộ những t&agrave;i liệu, th&ocirc;ng tin
                        li&ecirc;n quan đến c&ocirc;ng việc của m&igrave;nh
                        v&agrave; của c&ocirc;ng ty do m&igrave;nh quản
                        l&yacute;. B&ecirc;n nhận b&agrave;n giao đ&atilde; nhận
                        được đầy đủ những t&agrave;i liệu v&agrave; những
                        th&ocirc;ng tin được b&agrave;n giao.</span
                      ></em
                    >
                  </p>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
                  >
                    <em
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;</span
                      ></em
                    >
                  </p>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"
                  >
                    <em
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                      ></em
                    ><em
                      ><span style="font-family:'Times New Roman';"
                        >H&agrave; Nội, ng&agrave;y</span
                      ></em
                    ><em
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                      ></em
                    ><em
                      ><span style="font-family:'Times New Roman';"
                        >th&aacute;ng</span
                      ></em
                    ><em
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;&nbsp;&nbsp;&nbsp;</span
                      ></em
                    ><em
                      ><span style="font-family:'Times New Roman';"
                        >năm &nbsp;</span
                      ></em
                    >
                  </p>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:13pt;"
                  >
                    <em
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;</span
                      ></em
                    >
                  </p>
                  <div>
                    <div style="text-align:center;">
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        style="width:100%; margin-right:auto; margin-left:145px; border-collapse:collapse;"
                      >
                        <tbody>
                          <tr style="height:27.9pt;">
                            <td
                              style="width:200pt; padding-right:5.4pt; padding-left:5.4pt; vertical-align:middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:13pt;"
                              >
                                <strong
                                  ><span style="font-family:'Times New Roman';"
                                    >Người b&agrave;n giao</span
                                  ></strong
                                >
                              </p>
                            </td>
                          </tr>
                          <tr style="height:41.75pt;">
                            <td
                              style="width:118.9pt; padding-right:5.4pt; padding-left:5.4pt; vertical-align:middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; font-size:13pt;"
                              >
                                <span
                                  v-if="dataLst[8][0]"
                                  style="font-family:'Times New Roman';word-break:break-word"
                                  >&nbsp;{{ dataLst[8][0].EmployeeName }}</span
                                >
                              </p>
                            </td>
                          </tr>
                          <tr style="height:28.65pt;">
                            <td
                              style="width:118.9pt; padding-right:5.4pt; padding-left:5.4pt; vertical-align:middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:13pt;"
                              >
                                <strong
                                  ><span style="font-family:'Times New Roman';"
                                    >Họ v&agrave; t&ecirc;n (chữ
                                    k&yacute;)</span
                                  ></strong
                                >
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <ol
                        start="3"
                        style="margin-bottom:5pt; padding-left:0pt;"
                        type="I"
                      >
                        <li
                          style="margin-left:54pt; text-indent:-54pt; text-align:justify; line-height:150%; font-family:'Times New Roman'; font-size:13pt; font-weight:bold; list-style-position:inside;"
                        >
                          XÁC NHẬN B&Agrave;N GIAO
                        </li>
                      </ol>
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        style="border: 0.75pt solid rgb(0, 0, 0); border-collapse: collapse; margin-right: calc(26%); width: 100%;"
                      >
                        <tbody>
                          <tr>
                            <td
                              style="width: 7.1656%; border-right-style: solid;padding:5.03pt; border-right-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:13pt;"
                              >
                                <span style="font-family:'Times New Roman';"
                                  ><strong>STT</strong></span
                                >
                              </p>
                            </td>
                            <td
                              style="width: 19.0813%; border-right-style: solid;padding:5.03pt; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:13pt;"
                              >
                                <span style="font-family:'Times New Roman';"
                                  ><strong>Người duyệt</strong></span
                                >
                              </p>
                            </td>
                            <td
                              style="width: 28.2685%; border-right-style: solid;padding:5.03pt; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:13pt;"
                              >
                                <strong
                                  ><span style="font-family:'Times New Roman';"
                                    ><strong>Ph&ograve;ng ban</strong></span
                                  ></strong
                                >
                              </p>
                            </td>
                            <td
                              style="width: 27.3885%; border-right-style: solid;padding:5.03pt; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:13pt;"
                              >
                                <strong
                                  ><span style="font-family:'Times New Roman';"
                                    ><strong>Chức danh</strong></span
                                  ></strong
                                >
                              </p>
                            </td>
                            <td
                              style="width: 18.3121%; border-left-style: solid;padding:5.03pt; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:13pt;"
                              >
                                <strong
                                  ><span style="font-family:'Times New Roman';"
                                    ><strong>X&aacute;c nhận</strong></span
                                  ></strong
                                >
                              </p>
                            </td>
                          </tr>
                          <tr v-for="(item, index) in approveLst" :key="index">
                            <td
                              style="width: 7.1656%; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:13pt;"
                              >
                                <span style="font-family:'Times New Roman';">{{
                                  index + 1
                                }}</span>
                              </p>
                            </td>
                            <td
                              style="width: 19.0813%; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:13pt;"
                              >
                                <span style="font-family:'Times New Roman';">{{
                                  item.ApproveName
                                }}</span>
                              </p>
                            </td>
                            <td
                              style="width: 28.2685%; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; font-size:13pt;"
                              >
                                <span style="font-family:'Times New Roman';">{{
                                  item.Office
                                }}</span>
                              </p>
                            </td>
                            <td
                              style="width: 27.3885%; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; font-size:13pt;"
                              >
                                <span style="font-family:'Times New Roman';">{{
                                  item.Position
                                }}</span>
                              </p>
                            </td>
                            <td
                              style="width: 18.3121%; border-top-style: solid; border-top-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: middle;"
                            >
                              <p
                                style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:13pt;"
                              >
                                <span style="font-family:'Times New Roman';">{{
                                  item.Status | handOverStatusText
                                }}</span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p
                      style="margin-top:0pt; margin-bottom:8pt; line-height:108%; font-size:13pt;"
                    >
                      <span style="font-family:'Times New Roman';">&nbsp;</span>
                    </p>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
          <div style="position: relative">
            <div class="list-file">
              <h3 style="margin-left:10px">Danh sách File đính kèm</h3>
              <div v-for="(item, index) in lstFile" :key="index">
                <span
                  v-if="item"
                  style="display: inline-block;font-size:10pt;font-weight:600;margin-left:20px"
                  >{{ index }}.
                  <span>[{{ item.NameType }}]</span>
                  <span>{{ item.Title }}</span>
                </span>
                <a
                  v-if="item"
                  style="margin-left: 50px"
                  :href="item.LinkFile"
                  target="_blank"
                  >FILE</a
                >
              </div>
            </div>
            <div
              style="text-align:center;padding:10px;position:absolute;top:0;right:0"
            >
              <el-button
                type="primary"
                icon="el-icon-s-check"
                @click="acceptDoc"
              >
                Hoàn thành
              </el-button>
              <el-button
                type="success"
                icon="el-icon-printer"
                @click="convert('div_content_view')"
              >
                In
              </el-button>
            </div>
          </div>
        </el-aside>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import jsPDF from "jspdf";
import AcceptHandOver2 from "@/views/handOver/component/AcceptHandOver";
import {
  GetHandOverLineType,
  GetApproveHandOver,
  AcceptHandOver
} from "@/api/handOver";
import html2canvas from "html2canvas";
import BASEURL from "@/utils/tUrl";
import Cookies from "js-cookie";
import AcceptLst from "./acceptLst.vue";
export default {
  props: ["row"],
  components: { AcceptHandOver2, AcceptLst },
  data() {
    return {
      dataLst: [],
      lstFile: [],
      approveLst: [],
      rowData: "",
      rowID: ""
    };
  },
  created() {
    this.rowID = this.$route.params.id;
    this.fetchData();
    this.fetchApprove();
  },
  methods: {
    acceptOK() {
      location.reload();
    },
    fetchData() {
      GetHandOverLineType({ RowID: this.rowID }).then(res => {
        this.dataLst = res.Data;
        this.lstFile = this.dataLst[0].map(item => {
          if (item.LinkFile !== "") {
            return {
              Title: item.HandOver,
              NameType: item.NameType ? item.NameType : "",
              LinkFile:
                BASEURL +
                "/File/DownloadFileHandOver?LinkFile=" +
                item.LinkFile +
                "&Token=" +
                Cookies.get("token") +
                "&EmployeeID=" +
                item.EmployeeID
            };
          }
        });
        //console.log(this.lstFile);
      });
    },
    fetchApprove() {
      GetApproveHandOver({ DocumentID: this.rowID }).then(res => {
        this.approveLst = res.ApproveLst;
      });
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
      html2canvas(this.$refs.content).then(canvas => {
        var imgData = canvas.toDataURL("image/png");
        var margin = 0;
        //var scale = 1.5
        if (screen.width == 1366) {
          var imgWidth = 300;
        } else if (screen.width == 1920) {
          var imgWidth = 425;
        }
        //210
        var pageHeight = 295; //295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;
        var doc = new jsPDF("p", "mm", "letter");
        var position = 0;
        doc.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save("file.pdf");
      });
    },
    //Xác nhận hoàn thành-đóng phiếu bàn giao
    acceptDoc() {
      const req = {
        DocumentID: this.rowID,
        Status: 11
      };
      AcceptHandOver(req).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Xác nhận hoàn thành phiếu bàn giao thành công",
            type: "success",
            position: "top-left"
          });
          this.$router.push("/ban-giao-nghi-viec/nhan-su");
        }
      });
    }
  },
  watch: {
    row() {
      this.fetchData();
    }
  }
};
</script>
<style>
@media print {
  @page {
    margin: 0;
  }
}
</style>
<style lang="scss" scoped>
.container-handover {
  .approve {
    overflow: hidden;
    width: 100%;
    padding: 15px;
    background-color: rgb(238, 241, 246);
    h3 {
      display: inline-block;
      border-bottom: 1px solid #ccc;
      color: #02bc77;
      margin-top: 0;
    }
  }
}
</style>
