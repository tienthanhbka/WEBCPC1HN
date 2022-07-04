<template>
  <div style="postion: relative">
    <div id="div_print" style="border: none;" ref="content">
      <el-card
        shadow="never"
        style="width:635.44pt; padding-top:51.12pt; padding-bottom:351.12pt; border-bottom: 0px solid white;"
      >
        <div>
          <table
            cellpadding="0"
            cellspacing="0"
            style="width:523.65pt; margin-right:9pt; margin-left:19pt; border-collapse:collapse; float:left;"
          >
            <tbody>
              <tr style="height:56.9pt;">
                <td
                  style="width:50.25pt; padding-right:5.4pt; padding-left:5.4pt; vertical-align:top;"
                >
                  <p
                    style="margin-top:3pt; margin-bottom:3pt; text-align:justify; line-height:120%; font-size:13pt;"
                  >
                    <img
                      src="@/assets/logo2.png"
                      width="77"
                      height="71"
                      alt="Description: Description: Pict_x1"
                    />
                  </p>
                </td>
                <td
                  style="width:180.35pt; padding-right:5.4pt; padding-left:5.4pt; vertical-align:top;"
                >
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:105%; font-size:12.5pt;"
                  >
                    <strong
                      ><span style="font-family:'Times New Roman';"
                        >CÔNG TY CỔ PHẦN</span
                      ></strong
                    >
                  </p>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-indent:1.7pt; text-align:center; line-height:105%; font-size:12.5pt;"
                  >
                    <strong
                      ><span style="font-family:'Times New Roman';"
                        >DƯỢC PHẨM CPC1 HÀ NỘI</span
                      ></strong
                    >
                  </p>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:110%; font-size:3pt;"
                  >
                    <strong
                      ><span
                        style="font-family:'Times New Roman'; font-size:3pt;"
                        >________________________________________________________</span
                      ></strong
                    ><strong
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;&nbsp;&nbsp;</span
                      ></strong
                    >
                  </p>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:110%; font-size:13pt;"
                  >
                    <strong
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                      ></strong
                    >
                  </p>
                  <p
                    style="margin-top:3pt; margin-bottom:0pt; text-align:center; font-size:13pt;"
                  >
                    <span style="font-family:'Times New Roman';">Số: </span
                    ><span style="font-family:'Times New Roman';">{{
                      info.CodeWork
                    }}</span
                    ><span style="font-family:'Times New Roman';"
                      >/HĐLĐ-CPC1HN</span
                    >
                  </p>
                </td>
                <td
                  style="width:275.65pt; padding-right:5.4pt; padding-left:5.4pt; vertical-align:top;"
                >
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:105%; font-size:12.5pt;"
                  >
                    <strong
                      ><span style="font-family:'Times New Roman';"
                        >CỘNG HO&Agrave; X&Atilde; HỘI CHỦ NGHĨA VIỆT NAM</span
                      ></strong
                    >
                  </p>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:105%; font-size:13pt;"
                  >
                    <strong
                      ><span style="font-family:'Times New Roman';"
                        >Độc lập &ndash; Tự do &ndash; Hạnh ph&uacute;c</span
                      ></strong
                    >
                  </p>
                  <p
                    style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:110%; font-size:3pt;"
                  >
                    <strong
                      ><span style="font-family:'Times New Roman';"
                        >_____________________________________________________________________________________________________________</span
                      ></strong
                    >
                  </p>
                  <p
                    style="margin-top:3pt; margin-bottom:0pt; text-align:center; font-size:8pt;"
                  >
                    <em
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;</span
                      ></em
                    >
                  </p>
                  <p
                    style="margin-top:3pt; margin-bottom:0pt; text-indent:28.35pt; text-align:center; font-size:13pt;"
                  >
                    <em
                      ><span style="font-family:'Times New Roman';"
                        >H&agrave; Nội, ng&agrave;y&nbsp;</span
                      ></em
                    ><em
                      ><span
                        style="font-family:'Times New Roman'; "
                        v-if="info.DateSign"
                        >{{ Date.parse(info.DateSign).toString("dd") }}</span
                      >
                      <span style="font-family:'Times New Roman'; " v-else>{{
                        Date.parse(info.DateStart).toString("dd")
                      }}</span></em
                    ><em
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;th&aacute;ng&nbsp;</span
                      ></em
                    ><em
                      ><span
                        style="font-family:'Times New Roman';"
                        v-if="info.DateSign"
                        >{{ Date.parse(info.DateSign).toString("MM") }}</span
                      >
                      <span style="font-family:'Times New Roman'; " v-else>{{
                        Date.parse(info.DateStart).toString("MM")
                      }}</span></em
                    ><em
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;năm&nbsp;</span
                      ></em
                    ><em
                      ><span
                        style="font-family:'Times New Roman';"
                        v-if="info.DateSign"
                        >{{ Date.parse(info.DateSign).toString("yyyy") }}</span
                      >
                      <span style="font-family:'Times New Roman'; " v-else>{{
                        Date.parse(info.DateStart).toString("yyyy")
                      }}</span>
                    </em>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div style="padding-left:80.96pt; padding-right:52.88pt;">
            <p
              style="margin-top:6pt; margin-bottom:6pt; text-align:center; line-height:150%; font-size:3pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >&nbsp;</span
                ></strong
              >
            </p>
            <br />
            <p
              style="margin-top:6pt; margin-bottom:6pt; text-align:center; line-height:150%; font-size:16pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >HỢP ĐỒNG LAO ĐỘNG&nbsp;</span
                ></strong
              >
            </p>
            <br />
            <br />
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <em
                ><span style="font-family:'Times New Roman';"
                  >- Căn cứ Bộ luật Lao động
                  <span
                    v-if="Date.parse(info.DateStart).toString('yyyy') < 2021"
                    >2012</span
                  ><span v-else>2019</span> v&agrave; c&aacute;c văn bản hướng
                  dẫn thi h&agrave;nh;</span
                ></em
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <em
                ><span style="font-family:'Times New Roman';"
                  >- Căn cứ Điều lệ tổ chức hoạt động của C&ocirc;ng ty CP Dược
                  phẩm CPC1 H&agrave; Nội;</span
                ></em
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <em
                ><span style="font-family:'Times New Roman';"
                  >- Căn cứ nhu cầu v&agrave; thoả thuận tự nguyện của hai
                  b&ecirc;n,</span
                ></em
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Ch&uacute;ng t&ocirc;i, một b&ecirc;n l&agrave;&nbsp;</span
              ><strong
                ><span style="font-family:'Times New Roman'; font-size:12pt;"
                  >C&Ocirc;NG TY CỔ PHẦN DƯỢC PHẨM CPC1 H&Agrave; NỘI</span
                ></strong
              >
            </p>
            <table
              style="margin-left: -2px;margin-top: -3px;margin-bottom: -3px; padding: 0px; height: 27px; border: none;"
            >
              <tr
                style="margin:0px;margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:130%; font-size:13pt;"
              >
                <td style="width:400px;margin:0px; padding: 0px;">
                  <span style="font-family:'Times New Roman';"
                    >Đại diện:&nbsp;</span
                  ><strong
                    ><span style="font-family:'Times New Roman';"
                      >&Ocirc;ng Nguyễn Thanh B&igrave;nh&nbsp;</span
                    ></strong
                  >
                </td>
                <td>
                  <span style="font-family:'Times New Roman';"
                    >Quốc tịch: Việt Nam</span
                  >
                </td>
              </tr>
            </table>

            <!-- <p style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"><span style="font-family:'Times New Roman';">Đại diện:&nbsp;</span><strong><span style="font-family:'Times New Roman';">&Ocirc;ng Nguyễn Thanh B&igrave;nh&nbsp;</span></strong><span style="width:30.72pt; text-indent:0pt; display:inline-block;">&nbsp;</span><span style="width:36pt; text-indent:0pt; display:inline-block;">&nbsp;</span><span style="width:36pt; text-indent:0pt; display:inline-block;">&nbsp;</span><span style="font-family:'Times New Roman';">Quốc tịch: Việt Nam</span></p> -->
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Chức vụ: Tổng Gi&aacute;m đốc</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <em
                ><span style="font-family:'Times New Roman';"
                  >(Theo Văn bản ủy quyền số 1458/2019/UQ-CPC1HN ng&agrave;y
                  20/05/2019 của&nbsp;</span
                ></em
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <em
                ><span style="font-family:'Times New Roman';"
                  >Chủ tịch Hội đồng quản trị C&ocirc;ng ty)</span
                ></em
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Địa chỉ: Cụm CN H&agrave; B&igrave;nh Phương, x&atilde; Văn
                B&igrave;nh, huyện Thường T&iacute;n, TP. H&agrave; Nội</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Điện thoại: 0243.3376.5503</span
              >
            </p>
            <table
              style="margin-left: -2px;margin-top: -3px;margin-bottom: -3px; padding: 0px; height: 27px; border: none;"
            >
              <tr
                style="margin:0px;margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
              >
                <td style="width:400px;margin:0px; padding: 0px;">
                  <span style="font-family:'Times New Roman';"
                    >V&agrave; một b&ecirc;n l&agrave;:</span
                  ><strong
                    ><span style="font-family:'Times New Roman'; ">
                      {{ info.Sex | toSex }}&nbsp; {{ info.EmployeeName }}
                    </span></strong
                  >
                </td>
                <td>
                  <span style="font-family:'Times New Roman';"
                    >Quốc tịch:&nbsp;</span
                  ><span style="font-family:'Times New Roman';">{{
                    info.Nationality
                  }}</span>
                </td>
              </tr>
            </table>

            <!-- <p style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"><span style="font-family:'Times New Roman';">V&agrave; một b&ecirc;n l&agrave;:&nbsp;</span><strong><span style="font-family:'Times New Roman'; ">{{ info.Sex | toSex }}&nbsp;</span></strong><strong><span style="font-family:'Times New Roman';">&nbsp;</span></strong><strong><span style="font-family:'Times New Roman'; ">{{ info.EmployeeName }}</span></strong><span style="width:7.78pt; text-indent:0pt; display:inline-block;">&nbsp;</span><span style="width:36pt; text-indent:0pt; display:inline-block;">&nbsp;</span><span style="font-family:'Times New Roman';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:'Times New Roman';">Quốc tịch:&nbsp;</span><span style="font-family:'Times New Roman'; ">{{ info.Nationality }}</span></p> -->
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Sinh ng&agrave;y:&nbsp;</span
              ><span style="font-family:'Times New Roman';">{{
                Date.parse(info.BirthDay).toString("dd/MM/yyyy")
              }}</span
              ><span
                style="width:4.75pt; text-indent:0pt; display:inline-block;"
                >&nbsp;</span
              ><span style="width:36pt; text-indent:0pt; display:inline-block;"
                >&nbsp;</span
              ><span style="width:36pt; text-indent:0pt; display:inline-block;"
                >&nbsp;</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">Nơi sinh:&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">{{
                info.BirthAddress
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Nghề nghiệp hoặc tr&igrave;nh độ chuy&ecirc;n</span
              ><span style="font-family:'Times New Roman';">&nbsp;&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >m&ocirc;n:&nbsp;</span
              ><span style="font-family:'Times New Roman';">{{
                info.Degree
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Địa chỉ thường tr&uacute;:&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">{{
                info.AddressOften
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span
                style="font-family:'Times New Roman'; letter-spacing:-0.3pt;"
                >Số&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >CMTND: Số&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">{{
                info.CMND
              }}</span
              ><span style="font-family:'Times New Roman';"
                >&nbsp;cấp ng&agrave;y&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">{{
                Date.parse(info.DateCMND).toString("dd/MM/yyyy")
              }}</span
              ><span style="font-family:'Times New Roman';"
                >&nbsp;tại&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">{{
                info.PlaceCMND
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Số điện thoại li&ecirc;n hệ:&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">{{
                info.Phone
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Số sổ lao động (</span
              ><em
                ><span style="font-family:'Times New Roman';"
                  >nếu c&oacute;</span
                ></em
              ><span style="font-family:'Times New Roman';"
                >): &hellip;&hellip;&hellip;&hellip;&hellip;</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:130%; font-size:5pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <em
                ><span style="font-family:'Times New Roman';"
                  >Thoả thuận k&yacute; kết hợp đồng lao động v&agrave; cam kết
                  l&agrave;m đ&uacute;ng những điều khoản sau:</span
                ></em
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:5pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >Điều 1. Thời hạn v&agrave; c&ocirc;ng việc của hợp
                  đồng:</span
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Loại hợp đồng:&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">{{
                info.Type
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Thời gian: Từ ng&agrave;y&nbsp;</span
              ><span
                v-if="info.DateStart"
                style="font-family:'Times New Roman'; "
                >{{ Date.parse(info.DateStart).toString("dd/MM/yyyy") }}</span
              ><span style="font-family:'Times New Roman';">&nbsp;&nbsp;</span
              ><span style="font-family:'Times New Roman';" v-if="info.DateEnd"
                >đến ng&agrave;y&nbsp;</span
              ><span
                v-if="info.DateEnd"
                style="font-family:'Times New Roman'; "
                >{{ Date.parse(info.DateEnd).toString("dd/MM/yyyy") }}</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span
                style="font-family:'Times New Roman'; letter-spacing:-0.1pt;"
                >- Địa điểm l&agrave;m việc: C&ocirc;ng ty Cổ phần Dược phẩm
                CPC1 H&agrave; Nội&nbsp;- {{ info.Branch }}</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span
                style="font-family:'Times New Roman'; letter-spacing:-0.1pt;"
                >Địa chỉ:&nbsp;</span
              ><span
                style="font-family:'Times New Roman'; letter-spacing:-0.1pt;"
                >{{ info.Branch | toAddress(info, "b") }}</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Địa điểm l&agrave;m việc c&oacute; thể thay đổi theo thời điểm
                v&agrave; t&iacute;nh chất c&ocirc;ng việc theo sự ph&acirc;n
                c&ocirc;ng của C&ocirc;ng ty.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Vị tr&iacute; c&ocirc;ng việc:&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">{{
                info.Position
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Bộ phận:&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">{{
                info.Office
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- C&ocirc;ng việc được giao: Theo &ldquo;Bản m&ocirc; tả
                c&ocirc;ng việc&rdquo; đ&atilde; trao đổi v&agrave; l&agrave;m
                việc theo sự ph&acirc;n c&ocirc;ng của phụ tr&aacute;ch đơn vị,
                sự bố tr&iacute; điều động của c&ocirc;ng ty.</span
              >
            </p>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >Điều 2. Chế độ l&agrave;m việc</span
                ></strong
              >
            </p>

            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Thời giờ l&agrave;m việc: Theo quy định của C&ocirc;ng ty
                (Kh&ocirc;ng qu&aacute; 8 giờ/ng&agrave;y, kh&ocirc;ng
                qu&aacute; 48 giờ/tuần)</span
              >
            </p>

            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Thời giờ nghỉ ngơi: Theo quy định của Luật Lao động v&agrave;
                Quy chế của C&ocirc;ng ty</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Được cấp ph&aacute;t những dụng cụ l&agrave;m việc: được cấp
                ph&aacute;t t&ugrave;y theo nhu cầu của c&ocirc;ng việc
                tr&ecirc;n cơ sở tu&acirc;n thủ quy định của C&ocirc;ng
                ty.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Điều kiện an to&agrave;n v&agrave; vệ sinh lao động tại nơi
                l&agrave;m việc theo quy định của ph&aacute;p luật hiện
                h&agrave;nh.</span
              >
            </p>

            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >Điều 3. Quyền lợi v&agrave; nghĩa vụ của người lao
                  động:</span
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <strong
                ><em
                  ><span style="font-family:'Times New Roman';"
                    >3.1 Quyền lợi:</span
                  ></em
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >&nbsp;</span
                ></strong
              ><strong
                ><span style="font-family:'Times New Roman';"
                  >- Phương tiện đi lại:&nbsp;</span
                ></strong
              ><span style="font-family:'Times New Roman';"
                >C&aacute; nh&acirc;n tự t&uacute;c</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">-&nbsp;</span
              ><strong
                ><span style="font-family:'Times New Roman';"
                  >Mức lương ch&iacute;nh:&nbsp;</span
                ></strong
              ><strong
                ><span style="font-family:'Times New Roman'; ">{{
                  info.SalaryBHXH
                }}</span></strong
              ><strong
                ><span style="font-family:'Times New Roman';"
                  >&nbsp;đồng/th&aacute;ng</span
                ></strong
              ><span style="font-family:'Times New Roman';"
                >&nbsp;v&agrave; ph&ugrave; hợp với mức lương tối thiểu
                v&ugrave;ng I theo quy định ph&aacute;p luật hiện
                h&agrave;nh.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Tiền ăn giữa ca: theo quy định của C&ocirc;ng ty v&agrave;
                ph&ugrave; hợp với quy định hiện h&agrave;nh của Bộ lao
                đ&ocirc;ng thương binh &amp; x&atilde; hội.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- C&aacute;c khoản hỗ trợ</span
              ><span style="font-family:'Times New Roman';">&nbsp;&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >c&ocirc;ng t&aacute;c ph&iacute; gồm: Hỗ trợ điện thoại, hỗ trợ
                xăng xe, người lao động được nhận theo quy định về mức chi
                kho&aacute;n của C&ocirc;ng ty v&agrave; ph&ugrave; hợp với
                c&aacute;c quy định ph&aacute;p l&yacute; li&ecirc;n quan.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Hỗ trợ tiền nh&agrave; ở: ph&ugrave; hợp với quy định của
                Luật thuế Thu nhập c&aacute; nh&acirc;n v&agrave; c&aacute;c văn
                bản hướng dẫn hiện h&agrave;nh.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Tiền lương, thưởng kinh doanh kh&ocirc;ng thường xuy&ecirc;n:
                theo Quy chế lương v&agrave; ph&acirc;n phối tiền thưởng của
                C&ocirc;ng ty v&agrave; mức độ ho&agrave;n th&agrave;nh
                c&ocirc;ng việc của c&aacute; nh&acirc;n.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- C&aacute;c khoản chế độ v&agrave; ph&uacute;c lợi
                kh&aacute;c: được hưởng theo Quy định</span
              ><span style="font-family:'Times New Roman';">&nbsp;&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >ph&aacute;p luật hiện h&agrave;nh v&agrave; Quy định về chế độ
                ph&uacute;c lợi đối với người lao động của C&ocirc;ng ty</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- H&igrave;nh thức trả lương: Theo th&aacute;ng bằng chuyển
                khoản hoặc tiền mặt.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Được trả lương 01 lần v&agrave;o ng&agrave;y&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">{{
                info.Branch | toDay
              }}</span
              ><span style="font-family:'Times New Roman';"
                >&nbsp;của th&aacute;ng sau. Nếu ng&agrave;y thanh to&aacute;n
                lương rơi v&agrave;o ng&agrave;y nghỉ, ng&agrave;y lễ th&igrave;
                tiền lương sẽ được thanh to&aacute;n v&agrave;o ng&agrave;y
                l&agrave;m việc kế tiếp.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Chế độ n&acirc;ng lương: Theo quy định của C&ocirc;ng ty căn
                cứ v&agrave;o kết quả ho&agrave;n th&agrave;nh c&ocirc;ng việc
                của người lao động v&agrave; kết quả hoạt động sản xuất của
                C&ocirc;ng ty.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Bảo hiểm x&atilde; hội v&agrave; bảo hiểm y tế: Theo quy định
                của C&ocirc;ng ty v&agrave; quy định hiện h&agrave;nh.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Chế độ đ&agrave;o tạo: Theo chế độ chung quy định của
                C&ocirc;ng ty.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Những thỏa thuận kh&aacute;c: Theo chế độ chung của
                C&ocirc;ng ty.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <strong
                ><em
                  ><span style="font-family:'Times New Roman';"
                    >3.2 Nghĩa vụ:</span
                  ></em
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Ho&agrave;n th&agrave;nh những c&ocirc;ng việc v&agrave; thực
                hiện c&aacute;c nội dung trong Hợp đồng lao động, Thư mời nhận
                việc, c&aacute;c văn bản nội bộ của C&ocirc;ng ty, c&aacute;c
                thỏa thuận v&agrave; cam kết kh&aacute;c của người lao động
                (</span
              ><em
                ><span style="font-family:'Times New Roman';"
                  >nếu c&oacute;</span
                ></em
              ><span style="font-family:'Times New Roman';">).</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';">-&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Tu&acirc;n thủ c&aacute;c nội quy, quy định, bảo mật
                th&ocirc;ng tin, giữ g&igrave;n t&agrave;i sản của C&ocirc;ng
                ty.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >- Khi được C&ocirc;ng ty t&agrave;i trợ về kinh ph&iacute;
                đ&agrave;o tạo, người lao động phải tu&acirc;n thủ theo
                Ch&iacute;nh s&aacute;ch Đ&agrave;o tạo của C&ocirc;ng ty
                v&agrave; đảm bảo thời hạn l&agrave;m việc v&agrave; c&aacute;c
                nội dung kh&aacute;c</span
              ><span style="font-family:'Times New Roman';">&nbsp;&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >li&ecirc;n quan đến việc thực hiện c&ocirc;ng việc cho
                C&ocirc;ng ty đ&uacute;ng cam kết. Nếu người lao động vi phạm
                thời gian cam kết th&igrave; phải ho&agrave;n trả chi ph&iacute;
                đ&agrave;o tạo theo tỷ lệ tương ứng với thời gian kh&ocirc;ng
                l&agrave;m việc ở C&ocirc;ng ty t&iacute;nh từ ng&agrave;y kết
                th&uacute;c kh&oacute;a học.</span
              >
            </p>
              <p
              style="margin-top:0pt; margin-bottom:0pt; margin-top:20px; text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">-&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Người lao động c&oacute; nghĩa vụ nộp thuế thu nhập c&aacute;
                nh&acirc;n v&agrave; c&aacute;c khoản đ&oacute;ng g&oacute;p
                kh&aacute;c theo quy định của ph&aacute;p luật.</span
              >
            </p>
            <br /><br /><br /><br /><br /><br /><br />

          

            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">-&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Người lao động kh&ocirc;ng được ph&eacute;p tiết lộ bất kỳ
                th&ocirc;ng tin n&agrave;o li&ecirc;n quan đến c&aacute;c khoản
                lương/thưởng của bản th&acirc;n cho b&ecirc;n thứ 3 biết. Nếu vi
                phạm, người lao động sẽ phải chịu h&igrave;nh thức kỷ luật của
                C&ocirc;ng ty.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">-&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Giữ b&iacute; mật với bất kỳ b&ecirc;n thứ ba n&agrave;o đối
                với c&aacute;c t&agrave;i liệu sau: c&aacute;c b&iacute; mật
                kinh doanh, t&agrave;i liệu v&agrave; bất k&igrave; th&ocirc;ng
                tin n&agrave;o li&ecirc;n qua đến hoạt động kinh doanh
                v&agrave;/hoặc c&aacute;c yếu tố kỹ thuật về c&ocirc;ng ty;
                c&aacute;c chi nh&aacute;nh, văn ph&ograve;ng đại diện,
                kh&aacute;ch h&agrave;ng, nh&agrave; cung cấp&hellip; của
                c&ocirc;ng ty; được thể hiện dưới dạng lời n&oacute;i,
                h&igrave;nh ảnh hoặc được ghi ch&eacute;p lại dưới dạng văn bản
                hoặc điện tử hoặc bởi bất k&igrave; h&igrave;nh thức n&agrave;o;
                c&oacute; được do việc thực hiện c&ocirc;ng quy định tại Hợp
                đồng n&agrave;y. Nghĩa vụ bảo mật th&ocirc;ng tin n&agrave;y vẫn
                c&oacute; hiệu lực sau khi Hợp đồng n&agrave;y hết hiệu
                lực.</span
              >
            </p>

            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Chịu c&aacute;c h&igrave;nh thức xử l&yacute; kỷ luật theo
                quy định nếu c&oacute; h&agrave;nh vi vi phạm nội quy lao động,
                c&aacute;c quy định nội bộ của C&ocirc;ng ty v&agrave;
                c&aacute;c thỏa thuận, cam kết của c&aacute; nh&acirc;n với
                C&ocirc;ng ty (</span
              ><em
                ><span style="font-family:'Times New Roman';"
                  >nếu c&oacute;</span
                ></em
              ><span style="font-family:'Times New Roman';">).</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >- Người lao động sẽ bị C&ocirc;ng ty đơn phương chấm dứt hợp
                đồng trước thời hạn khi thường xuy&ecirc;n kh&ocirc;ng
                ho&agrave;n th&agrave;nh c&ocirc;ng việc (theo Điều 1 của hợp
                đồng lao động n&agrave;y). Mức độ ho&agrave;n th&agrave;nh hoặc
                kh&ocirc;ng ho&agrave;n th&agrave;nh c&ocirc;ng việc;
                C&aacute;ch thức đ&aacute;nh gi&aacute; mức độ ho&agrave;n
                th&agrave;nh c&ocirc;ng việc được &aacute;p dụng theo nội quy
                lao động v&agrave; c&aacute;c quy định nội bộ của C&ocirc;ng
                ty.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Bồi thường vi phạm v&agrave; vật chất: Nếu xảy ra vi phạm do
                lỗi người lao động th&igrave; người lao động phải chịu kỷ luật
                lao động v&agrave; tr&aacute;ch nhiệm vật chất theo Nội quy
                C&ocirc;ng ty v&agrave; quy định hiện h&agrave;nh.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >Điều 4. Nghĩa vụ v&agrave; quyền hạn của người sử dụng lao
                  động:</span
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <strong
                ><em
                  ><span style="font-family:'Times New Roman';"
                    >4.1 Nghĩa vụ:</span
                  ></em
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span
                style="font-family:'Times New Roman'; letter-spacing:-0.3pt;"
                >- Bảo đảm việc l&agrave;m v&agrave; thực hiện đầy đủ những điều
                đ&atilde; cam kết trong hợp đồng thử việc.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Thanh to&aacute;n đầy đủ, đ&uacute;ng thời hạn c&aacute;c chế
                độ v&agrave; quyền lợi cho người lao động theo hơp đồng lao
                đ&ocirc;ng, thỏa ước lao động tập thể.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <strong
                ><em
                  ><span style="font-family:'Times New Roman';"
                    >4.2 Quyền hạn:&nbsp;</span
                  ></em
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Điều h&agrave;nh người lao động ho&agrave;n th&agrave;nh
                c&ocirc;ng việc theo hợp đồng (bố tr&iacute;, điều chuyển, tạm
                ngừng việc).&nbsp;</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Tạm ho&atilde;n, chấm dứt hợp đồng lao động, kỷ luật người
                lao động theo Nội quy</span
              ><span style="font-family:'Times New Roman';">&nbsp;&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >lao động, quy chế của C&ocirc;ng ty, thỏa ước lao động tập thể
                (</span
              ><em
                ><span style="font-family:'Times New Roman';"
                  >nếu c&oacute;)</span
                ></em
              ><span style="font-family:'Times New Roman';"
                >&nbsp;v&agrave; quy định của ph&aacute;p luật hiện
                h&agrave;nh.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">-&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Được khấu trừ tại nguồn số thuế thu nhập c&aacute; nh&acirc;n
                người lao động phải nộp theo quy định của ph&aacute;p luật để
                nộp v&agrave;o ng&acirc;n s&aacute;ch của Nh&agrave; nước.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Trong qu&aacute; tr&igrave;nh l&agrave;m việc nếu người lao
                động đơn phương chấm dứt hợp đồng lao động trước thời hạn chưa
                ho&agrave;n th&agrave;nh c&ocirc;ng việc được giao v&agrave;
                kh&ocirc;ng thực hiện đ&uacute;ng quy định về thủ tục chấm dứt
                hợp đồng lao động theo quy định, kh&ocirc;ng thực hiện
                c&ocirc;ng t&aacute;c b&agrave;n giao c&ocirc;ng việc theo quy
                định th&igrave; người sử dụng lao động c&oacute; quyền
                kh&ocirc;ng thanh to&aacute;n&nbsp;</span
              ><span
                style="font-family:'Times New Roman'; letter-spacing:-0.2pt;"
                >lương, phụ cấp (nếu c&oacute;) v&agrave; c&aacute;c khoản thu
                nhập kh&aacute;c c&ograve;n lại của người lao động ở C&ocirc;ng
                ty.</span
              >
            </p>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >Điều 5. Điều khoản thi h&agrave;nh</span
                ></strong
              >
            </p>
            <!-- <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Hợp đồng n&agrave;y được l&agrave;m</span
              ><span style="font-family:'Times New Roman';">&nbsp;&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >th&agrave;nh 02 bản, c&oacute; gi&aacute; trị ph&aacute;p
                l&yacute; như nhau, mỗi b&ecirc;n giữ 01 bản v&agrave; c&oacute;
                hiệu lực từ ng&agrave;y k&yacute;.</span
              >
            </p> -->

            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Những vấn đề kh&aacute;c về quyền v&agrave; nghĩa vụ của
                người lao động v&agrave; người sử dụng lao động nếu kh&ocirc;ng
                được ghi trong hợp đồng lao động n&agrave;y th&igrave; đương
                nhi&ecirc;n được &aacute;p dụng theo c&aacute;c qui định tương
                ứng trong c&aacute;c văn bản nội bộ của C&ocirc;ng ty v&agrave;
                trong c&aacute;c văn bản ph&aacute;p luật lao động tại thời điểm
                thi h&agrave;nh c&aacute;c quyền v&agrave; nghĩa vụ
                đ&oacute;.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Khi hai b&ecirc;n k&yacute; kết phụ lục hợp đồng lao động
                th&igrave; nội dung của phụ lục hợp đồng lao động cũng c&oacute;
                gi&aacute; trị như c&aacute;c nội dung của bản hợp đồng lao động
                n&agrave;y. Trường hợp nội dung của phụ lục hợp đồng lao động
                kh&aacute;c với nội dung của bản hợp đồng lao động n&agrave;y
                th&igrave; văn bản n&agrave;o được k&yacute; tại thời điểm sau
                sẽ c&oacute; gi&aacute; trị ph&aacute;p l&yacute; v&agrave;
                đương nhi&ecirc;n thay thế cho điều khoản đ&atilde; k&yacute;
                trong văn bản trước đ&oacute;.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Trường hợp một trong hai b&ecirc;n đơn phương chấm dứt thỏa
                thuận phải b&aacute;o cho b&ecirc;n kia &iacute;t nhất 30
                ng&agrave;y l&agrave;m việc trước khi nghỉ v&agrave; phải thực
                hiện b&agrave;n giao hồ sơ, giấy tờ, c&aacute;c c&ocirc;ng việc
                đang đảm nhiệm.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt;  text-align:justify; line-height:130%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Hợp đồng này được làm thành 02 bản, có giá trị pháp lý như
                nhau, mỗi bên giữ 01 bản và có hiệu lực từ ngày ký.</span
              >
            </p>
            <br />
            <table
              cellpadding="0"
              cellspacing="0"
              style="margin-left:5.4pt; border-collapse:collapse;"
            >
              <tbody>
                <tr>
                  <td
                    style="width:190.45pt; padding-right:5.4pt; padding-left:5.4pt; vertical-align:top;"
                  >
                    <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:130%; font-size:13pt;"
                    >
                      <strong
                        ><span style="font-family:'Times New Roman';"
                          >NGƯỜI LAO ĐỘNG</span
                        ></strong
                      >
                    </p>
                  </td>
                  <td
                    style="width:225.7pt; padding-right:5.4pt; padding-left:5.4pt; vertical-align:top;"
                  >
                    <p
                      style="margin-top:0pt; margin-bottom:0pt; text-indent:26.95pt; text-align:center; line-height:130%; font-size:13pt;"
                    >
                      <strong
                        ><span style="font-family:'Times New Roman';"
                          >NGƯỜI SỬ DỤNG LAO ĐỘNG</span
                        ></strong
                      >
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p
            style="margin-top:3pt; margin-bottom:3pt; text-indent:28.35pt; text-align:justify; line-height:120%; font-size:13pt;"
          >
            <span style="font-family:'Times New Roman';">&nbsp;</span>
          </p>
        </div>
      </el-card>
    </div>

    <!-- <el-button
      style="position: fixed; right:50px; bottom: 100px;"
      type="success"
      @click="downloadWithCSS"
      >Tải về</el-button
    > -->
    <el-button
      style="position: fixed; right:50px; bottom: 100px;"
      type="success"
      @click="convert('div_print')"
      >In hợp đồng</el-button
    >
  </div>
</template>
<script>
import jsPDF from "jspdf";
import { GetHDLD } from "@/api/employeeInfor";
import html2canvas from "html2canvas";
export default {
  filters: {
    toSex: function(value) {
      if (value == "Nam") {
        return "Ông";
      } else {
        return "Bà";
      }
    },
    toDay: function(value) {
      if (value.includes("chính")) {
        return "10";
      } else {
        return "15";
      }
    },
    toAddress: function(value, value2) {
      if (value.includes("chính")) {
        return "Cụm CN Hà Bình Phương, xã Văn Bình, huyện Thường Tín, thành phố Hà Nội";
      } else if (value.includes("Nội")) {
        return "356A Giải Phóng, phường Phương Liệt, quận Thanh Xuân, thành phố Hà Nội";
      } else if (value.includes("Hồ")) {
        if (value2.Office.includes("Đắk")) {
          return "Số 04 đường Lý Tự Trọng, phường Tân An, Thành phố Buôn Ma Thuột, tỉnh Đắk Lắk";
        } else {
          return "26-28 Hàn Mặc Tử, phường Tân Thành, quận Tân Phú, thành phố Hồ Chí Minh";
        }
      } else {
        return "Lô 144-B2-2 đường Hoàng Thị Loan, phường Hòa Minh, quận Liên Chiểu, thành phố Đà Nẵng";
      }
    }
  },
  data() {
    return {
      info: ""
    };
  },
  created() {
    //alert(screen.width);
    this.fetchData();
  },
  methods: {
    fetchData() {
      GetHDLD({ RowID: this.$route.params.id }).then(res => {
        this.info = res.Data[0];
        console.log(this.info.AddressOften.split(",").splice(1,4).join(","));

        this.info.AddressOften = this.info.AddressOften.split(",").splice(1,4).join(",");
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
      //   const doc = new jsPDF();
      //   /** WITH CSS */
      //   var canvasElement = document.createElement('canvas');
      //   html2canvas(this.$refs.content, { canvas: canvasElement }).then(function (canvas) {
      //     const img = canvas.toDataURL("image/jpeg", 5.8);
      //     doc.addImage(img,'JPEG',20,20);
      //     doc.save("sample.pdf");
      //   });
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
