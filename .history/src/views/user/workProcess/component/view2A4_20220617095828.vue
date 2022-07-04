<template>
  <div style="postion: relative">
    <div id="div_print" style="border: none;" ref="content">
      <el-card
        style="width:635.44pt; padding-top:51.12pt; padding-bottom:421.12pt; border-bottom: 0px solid white;"
      >
        <div>
          <table
            cellpadding="0"
            cellspacing="0"
            style="width:543.65pt; margin-right:9pt; margin-left:19pt; border-collapse:collapse; float:left;"
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
                      >/HĐTV-CPC1HN</span
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
                      ><span style="font-family:'Times New Roman'; ">{{
                        Date.parse(info.DateStart).toString("dd")
                      }}</span></em
                    ><em
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;th&aacute;ng&nbsp;</span
                      ></em
                    ><em
                      ><span style="font-family:'Times New Roman';">{{
                        Date.parse(info.DateStart).toString("MM")
                      }}</span></em
                    ><em
                      ><span style="font-family:'Times New Roman';"
                        >&nbsp;năm&nbsp;</span
                      ></em
                    ><em
                      ><span style="font-family:'Times New Roman';">{{
                        Date.parse(info.DateStart).toString("yyyy")
                      }}</span></em
                    >
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div style="padding-left:84.96pt; padding-right:56.88pt;">
            <p
              style="margin-top:6pt; margin-bottom:6pt; text-align:center; line-height:150%; font-size:3pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >&nbsp;</span
                ></strong
              >
            </p>
            <br/>
            <p
              style="margin-top:6pt; margin-bottom:6pt; text-align:center; line-height:150%; font-size:16pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >HỢP ĐỒNG THỬ VIỆC</span
                ></strong
              >
            </p>
            <br/>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-indent:26.95pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <em><span style="font-family:'Times New Roman';">- C</span></em
              ><em><span style="font-family:'Times New Roman';">ă</span></em
              ><em
                ><span style="font-family:'Times New Roman';"
                  >n cứ Bộ luật Lao&nbsp;</span
                ></em
              ><em><span style="font-family:'Times New Roman';">đ</span></em
              ><em
                ><span style="font-family:'Times New Roman';"
                  >ộng
                  <span
                    v-if="Date.parse(info.DateStart).toString('yyyy') < 2021"
                    >2012</span
                  ><span v-else>2019</span> v&agrave; c&aacute;c v</span
                ></em
              ><em><span style="font-family:'Times New Roman';">ă</span></em
              ><em
                ><span style="font-family:'Times New Roman';">n bản h</span></em
              ><em><span style="font-family:'Times New Roman';">ư</span></em
              ><em
                ><span style="font-family:'Times New Roman';"
                  >ớng dẫn thi h&agrave;nh;</span
                ></em
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-indent:26.95pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <em><span style="font-family:'Times New Roman';">- C</span></em
              ><em><span style="font-family:'Times New Roman';">ă</span></em
              ><em
                ><span style="font-family:'Times New Roman';"
                  >n cứ Điều lệ tổ chức hoạt động của C&ocirc;ng ty CP Dược phẩm
                  CPC1 H&agrave; Nội;</span
                ></em
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-indent:26.95pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <em><span style="font-family:'Times New Roman';">- C</span></em
              ><em><span style="font-family:'Times New Roman';">ă</span></em
              ><em
                ><span style="font-family:'Times New Roman';"
                  >n cứ nhu cầu v&agrave; thoả thuận tự nguyện của hai
                  b&ecirc;n,</span
                ></em
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-indent:26.95pt; text-align:justify; line-height:150%; font-size:6pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Ch&uacute;ng t&ocirc;i, một b&ecirc;n l&agrave;&nbsp;</span
              ><strong
                ><span style="font-family:'Times New Roman';"
                  >C&Ocirc;NG TY CỔ PHẦN DƯỢC PHẨM CPC1 H&Agrave; NỘI</span
                ></strong
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

            <!-- <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"><span style="font-family:'Times New Roman';">Đại diện:&nbsp;</span><strong><span style="font-family:'Times New Roman';">&Ocirc;ng Nguyễn Thanh B&igrave;nh&nbsp;</span></strong><span style="width:21.67pt; display:inline-block;">&nbsp;</span><span style="width:36pt; display:inline-block;">&nbsp;</span><span style="width:36pt; display:inline-block;">&nbsp;</span><strong><span style="font-family:'Times New Roman';">&nbsp;</span></strong><span style="font-family:'Times New Roman';">Quốc tịch: Việt Nam</span></p> -->
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Chức vụ: Tổng Gi&aacute;m đốc</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <em
                ><span style="font-family:'Times New Roman';"
                  >(Theo Văn bản ủy quyền số 1458/2019/UQ-CPC1HN ng&agrave;y
                  20/05/2019 của Chủ tịch Hội đồng quản trị C&ocirc;ng ty)</span
                ></em
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Địa chỉ: Cụm CN H&agrave; B&igrave;nh Phương, x&atilde; Văn
                B&igrave;nh, huyện Thường T&iacute;n, TP. H&agrave; Nội</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Điện thoại: 0243.376.5503</span
              >
            </p>
            <table
              style="margin-left: -2px;margin-top: -3px;margin-bottom: -3px; padding: 0px; height: 27px; border: none;"
            >
              <tr
                style="margin:0px;margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
              >
                <td style="width:350px;margin:0px; padding: 0px;">
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

            <table
              style="margin-left: -2px;margin-top: -3px;margin-bottom: -3px; padding: 0px; height: 27px; border: none;"
            >
              <tr
                style="margin:0px;margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
              >
                <td style="width:350px;margin:0px; padding: 0px;">
                  <span style="font-family:'Times New Roman';"
                    >Sinh ng&agrave;y:&nbsp;</span
                  ><span style="font-family:'Times New Roman';">{{
                    Date.parse(info.BirthDay).toString("dd/MM/yyyy")
                  }}</span>
                </td>
                <td>
                  <span style="font-family:'Times New Roman';"
                    >Nơi sinh:&nbsp;</span
                  ><span style="font-family:'Times New Roman'; ">{{
                    info.BirthAddress
                  }}</span>
                </td>
              </tr>
            </table>

            <!-- <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"><span style="font-family:'Times New Roman';">V&agrave; một b&ecirc;n l&agrave;:</span><strong><span style="font-family:'Times New Roman'; "> {{ info.Sex | toSex }}&nbsp; {{ info.EmployeeName }} </span></strong><span style="width:0.54pt; display:inline-block;">&nbsp;</span><span style="font-family:'Times New Roman';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:'Times New Roman';">Quốc tịch:&nbsp;</span><span style="font-family:'Times New Roman';">{{ info.Nationality }}</span></p>
<p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"><span style="font-family:'Times New Roman';">Sinh ng&agrave;y:&nbsp;</span><span style="font-family:'Times New Roman';">{{ Date.parse(info.BirthDay).toString('dd/MM/yyyy') }}</span><span style="width:34.59pt; display:inline-block;">&nbsp;</span><span style="font-family:'Times New Roman';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:'Times New Roman';">Nơi sinh:&nbsp;</span><span style="font-family:'Times New Roman'; ">{{info.BirthAddress }}</span></p> -->
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Nghề nghiệp hoặc tr&igrave;nh độ chuy&ecirc;n
                m&ocirc;n:&nbsp;</span
              ><span style="font-family:'Times New Roman';">{{
                info.Degree
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Địa chỉ thường tr&uacute;:&nbsp;</span
              ><span style="font-family:'Times New Roman';">{{
                info.AddressOften
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span
                style="font-family:'Times New Roman'; letter-spacing:-0.3pt;"
                >Số&nbsp;</span
              ><span style="font-family:'Times New Roman';">CMTND:&nbsp;</span
              ><span style="font-family:'Times New Roman';">{{
                info.CMND
              }}</span
              ><span style="font-family:'Times New Roman';"
                >&nbsp;cấp ng&agrave;y&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">{{
                Date.parse(info.DateCMND).toString("dd/MM/yyyy")
              }}</span
              ><span style="font-family:'Times New Roman';"
                >&nbsp;tại&nbsp;</span
              ><span style="font-family:'Times New Roman';">{{
                info.PlaceCMND
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Số điện thoại li&ecirc;n hệ:&nbsp;</span
              ><span style="font-family:'Times New Roman';">{{
                info.Phone
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Số sổ lao động (</span
              ><em
                ><span style="font-family:'Times New Roman';"
                  >nếu c&oacute;</span
                ></em
              ><span style="font-family:'Times New Roman';">):&nbsp;</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <em
                ><span style="font-family:'Times New Roman';"
                  >Thoả thuận k&yacute; kết hợp đồng lao động v&agrave;
                  l&agrave;m đ&uacute;ng những điều khoản sau:</span
                ></em
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >Điều 1. Thời hạn v&agrave; c&ocirc;ng việc của hợp
                  đồng:</span
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Loại hợp đồng: Thử việc&nbsp;</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Thời gian: Từ ng&agrave;y&nbsp;</span
              ><span
                style="font-family:'Times New Roman'; font-weight: bold;"
                >{{ Date.parse(info.DateStart).toString("dd/MM/yyyy") }}</span
              ><span style="font-family:'Times New Roman';"
                >&nbsp;đến hết ng&agrave;y&nbsp;</span
              ><span
                style="font-family:'Times New Roman'; font-weight: bold;"
                >{{ Date.parse(info.DateEnd).toString("dd/MM/yyyy") }}</span
              ><span style="font-family:'Times New Roman';">.</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span
                style="font-family:'Times New Roman'; letter-spacing:-0.1pt;"
                >- Địa điểm l&agrave;m việc: C&ocirc;ng ty Cổ phần Dược phẩm
                CPC1 H&agrave; Nội&nbsp;</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span
                style="font-family:'Times New Roman'; letter-spacing:-0.1pt;"
                >Địa chỉ:&nbsp;</span
              ><span
                style="font-family:'Times New Roman'; letter-spacing:-0.1pt; "
                >{{ info.Branch | toAddress(info, "b") }}</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Địa điểm l&agrave;m việc c&oacute; thể thay đổi theo thời điểm
                v&agrave; t&iacute;nh chất c&ocirc;ng việc.&nbsp;</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Vị tr&iacute; c&ocirc;ng việc:&nbsp;</span
              ><span style="font-family:'Times New Roman';">{{
                info.Position
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Bộ phận:&nbsp;</span
              ><span style="font-family:'Times New Roman';">{{
                info.Office
              }}</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- C&ocirc;ng việc phải l&agrave;m:</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >+ Thực hiện c&ocirc;ng việc theo đ&uacute;ng chức danh
                chuy&ecirc;n m&ocirc;n dưới sự quản l&yacute;, điều h&agrave;nh
                của</span
              >
            </p>
            <br /><br /><br /><br /><br /><br /><br />

            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">
                Ban L&atilde;nh đạo C&ocirc;ng ty v&agrave; c&aacute;n bộ quản
                l&yacute;;</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >+ Phối hợp với c&aacute;c bộ phận kh&aacute;c trong C&ocirc;ng
                ty để ph&aacute;t huy hiệu quả c&ocirc;ng việc;</span
              >
            </p>

            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >+ Những c&ocirc;ng việc kh&aacute;c theo nhu cầu kinh doanh của
                C&ocirc;ng ty v&agrave; theo lệnh của Ban L&atilde;nh đạo.</span
              >
            </p>

            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >Điều 2.</span
                ></strong
              ><strong
                ><span style="font-family:'Times New Roman';"
                  >&nbsp;</span
                ></strong
              ><strong
                ><span style="font-family:'Times New Roman';"
                  >Chế độ l&agrave;m việc:</span
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">-&nbsp;</span
              ><span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Thời giờ l&agrave;m việc:</span
              ><span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Theo quy định của C&ocirc;ng ty (Kh&ocirc;ng qu&aacute; 8
                giờ/ng&agrave;y, kh&ocirc;ng qu&aacute; 48 giờ/tuần)</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Thời giờ nghỉ ngơi: Theo quy định của Luật Lao động v&agrave;
                Nội quy của C&ocirc;ng ty</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">-</span
              ><span style="font-family:'Times New Roman';">&nbsp;&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Được cấp ph&aacute;t những dụng cụ:</span
              ><span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Cần thiết theo y&ecirc;u cầu c&ocirc;ng việc tu&acirc;n thủ quy
                định của C&ocirc;ng ty.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">-&nbsp;</span
              ><span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Điều kiện an to&agrave;n v&agrave; vệ sinh lao động tại nơi
                l&agrave;m việc theo quy định hiện h&agrave;nh của Nh&agrave;
                nước.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >Điều 3. Nghĩa vụ v&agrave; c&aacute;c quyền lợi của người lao
                  động:</span
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <strong
                ><em
                  ><span style="font-family:'Times New Roman';"
                    >3.1. Quyền lợi:</span
                  ></em
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">-&nbsp;</span
              ><span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Phương tiện đi lại l&agrave;m việc:</span
              ><span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >C&aacute; nh&acirc;n tự t&uacute;c;</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">-&nbsp;</span
              ><strong
                ><span style="font-family:'Times New Roman';"
                  >Mức lương thử việc</span
                ></strong
              ><span style="font-family:'Times New Roman';"
                >: 85% Mức lương ch&iacute;nh thức</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >+ Mức lương ch&iacute;nh:&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">{{
                info.SalaryBHXH
              }}</span
              ><span style="font-family:'Times New Roman';"
                >&nbsp;đồng/th&aacute;ng v&agrave; ph&ugrave; hợp với mức lương
                tối thiểu v&ugrave;ng I theo quy định ph&aacute;p luật hiện
                h&agrave;nh.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >+ C&aacute;c khoản hỗ trợ c&ocirc;ng t&aacute;c ph&iacute; gồm:
                Hỗ trợ điện thoại, hỗ trợ xăng xe, người lao động được nhận theo
                quy định về mức chi kho&aacute;n của C&ocirc;ng ty v&agrave;
                ph&ugrave; hợp với c&aacute;c quy định ph&aacute;p l&yacute;
                li&ecirc;n quan.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-indent:7.1pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Mức lương tr&ecirc;n bao gồm Thuế thu nhập c&aacute; nh&acirc;n
                do c&aacute; nh&acirc;n phải nộp (</span
              ><em
                ><span style="font-family:'Times New Roman';"
                  >nếu c&oacute;)</span
                ></em
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- H&igrave;nh thức trả lương: Theo th&aacute;ng bằng chuyển
                khoản hoặc tiền mặt.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
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
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Chế độ đ&agrave;o tạo: Theo quy định của C&ocirc;ng ty
                v&agrave; y&ecirc;u cầu c&ocirc;ng việc. Trong trường hợp NV
                được cử đi đ&agrave;o tạo th&igrave; NV phải ho&agrave;n
                th&agrave;nh kho&aacute; học đ&uacute;ng thời hạn, phải cam kết
                sẽ phục vụ l&acirc;u d&agrave;i cho C&ocirc;ng ty sau khi kết
                th&uacute;c kho&aacute; học v&agrave; được hưởng nguy&ecirc;n
                lương; c&aacute;c quyền lợi kh&aacute;c như người đi l&agrave;m.
                Nếu sau khi kết th&uacute;c kh&oacute;a đ&agrave;o tạo m&agrave;
                nh&acirc;n vi&ecirc;n kh&ocirc;ng tiếp tục hợp t&aacute;c với
                C&ocirc;ng ty th&igrave; nh&acirc;n vi&ecirc;n phải ho&agrave;n
                trả lại 100% ph&iacute; đ&agrave;o tạo v&agrave; c&aacute;c
                khoản chế độ đ&atilde; được nhận trong thời gian đ&agrave;o
                tạo.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Những thoả thuận kh&aacute;c:&nbsp;</span
              >
            </p>

            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Trường hợp sau khi kết th&uacute;c qu&aacute; tr&igrave;nh thử
                việc, người lao động được tiếp nhận l&agrave;m việc ch&iacute;nh
                thức tại Doanh nghiệp, th&igrave; Hợp đồng thử việc n&agrave;y
                l&agrave; một phần kh&ocirc;ng t&aacute;ch rời của</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">
                Hợp đồng lao động ch&iacute;nh thức v&agrave; người động được
                hưởng c&aacute;c quyền lợi theo quy định ph&aacute;p luật hiện
                h&agrave;nh v&agrave; c&aacute;c quy định của Doanh
                nghiệp.</span
              >
            </p>
            <br /><br /><br /><br /><br />

            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Trường hợp sau khi kết th&uacute;c qu&aacute; tr&igrave;nh thử
                việc, người lao động kh&ocirc;ng được tiếp nhận l&agrave;m việc
                tại Doanh nghiệp, th&igrave; người lao động phải nộp thuế Thu
                nhập c&aacute; nh&acirc;n, bị khấu</span
              >
            </p>

            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">
                trừ 10% v&agrave;o tiền lương tại thời điểm người sử dụng lao
                động chi trả theo quy định ph&aacute;p luật hiện
                h&agrave;nh.</span
              >
            </p>

            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Trong v&ograve;ng 15 ng&agrave;y (l&agrave;m việc) kể từ
                ng&agrave;y k&yacute; kết hợp đồng thử việc n&agrave;y,
                v&igrave; bất cứ l&yacute; do g&igrave; m&agrave; người lao động
                kh&ocirc;ng tiếp tục cộng t&aacute;c với c&ocirc;ng ty (kể cả
                trong trường hợp c&ocirc;ng ty th&ocirc;ng b&aacute;o chấm dứt
                hợp đồng thử việc trước thời hạn) th&igrave; người lao động cam
                kết sẽ kh&ocirc;ng y&ecirc;u cầu c&ocirc;ng ty phải thanh
                to&aacute;n bất cứ chế độ v&agrave; quyền lợi n&agrave;o của
                người lao động trong thời gian n&ecirc;u tr&ecirc;n.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
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
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Ho&agrave;n th&agrave;nh những c&ocirc;ng việc v&agrave;
                những cam kết trong nội dung Hợp đồng, c&aacute;c văn bản nội bộ
                của C&ocirc;ng ty, c&aacute;c thỏa thuận v&agrave; cam kết
                kh&aacute;c của người lao động (</span
              ><em
                ><span style="font-family:'Times New Roman';"
                  >nếu c&oacute;</span
                ></em
              ><span style="font-family:'Times New Roman';">).</span>
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Tu&acirc;n thủ c&aacute;c nội quy, quy định, bảo mật
                th&ocirc;ng tin, giữ g&igrave;n t&agrave;i sản của C&ocirc;ng
                ty</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Chấp h&agrave;nh v&agrave; thực hiện nghi&ecirc;m t&uacute;c
                chương tr&igrave;nh đ&agrave;o tạo, c&aacute;c hoạt động do
                C&ocirc;ng ty tổ chức quy tr&igrave;nh, quy định chung.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">-&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Chịu c&aacute;c h&igrave;nh thức xử l&yacute; kỷ luật theo quy
                định nếu c&oacute; h&agrave;nh vi vi phạm nội quy lao động,
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
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
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
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
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
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Người lao động sẽ bị C&ocirc;ng ty đơn phương chấm dứt hợp
                đồng trước thời hạn khi thường xuy&ecirc;n kh&ocirc;ng
                ho&agrave;n th&agrave;nh c&ocirc;ng việc (theo Điều 1 của hợp
                đồng lao động n&agrave;y). Mức độ ho&agrave;n th&agrave;nh hoặc
                kh&ocirc;ng ho&agrave;n th&agrave;nh c&ocirc;ng việc;
                C&aacute;ch thức đ&aacute;nh gi&aacute; mức độ
                ho&agrave;n&nbsp;</span
              ><span
                style="font-family:'Times New Roman'; letter-spacing:-0.1pt;"
                >th&agrave;nh c&ocirc;ng việc được &aacute;p dụng theo nội quy
                lao động v&agrave; c&aacute;c quy định nội bộ của C&ocirc;ng
                ty.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >Bồi thường vi phạm v&agrave; vật chất: Nếu xảy ra vi phạm do
                lỗi người lao động th&igrave; người lao động phải chịu kỷ luật
                lao động v&agrave; tr&aacute;ch nhiệm vật chất theo Nội quy
                C&ocirc;ng ty v&agrave; quy định hiện h&agrave;nh.</span
              >
            </p>
            <br /><br /><br /><br /><br /><br />

            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >Điều 4. Nghĩa vụ v&agrave; quyền hạn của người sử dụng lao
                  động:</span
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
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
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span
                style="font-family:'Times New Roman'; letter-spacing:-0.2pt;"
                >- Bảo đảm việc l&agrave;m v&agrave; thực hiện đầy đủ những điều
                khoản trong Hợp đồng.</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span
                style="font-family:'Times New Roman'; letter-spacing:-0.1pt;"
                >- Thanh to&aacute;n đầy đủ, đ&uacute;ng thời hạn c&aacute;c chế
                độ, quyền lợi ho người lao động theo Hợp đồng.</span
              >
            </p>

            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
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
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Điều h&agrave;nh người lao động ho&agrave;n th&agrave;nh
                c&ocirc;ng việc theo hợp đồng (bố tr&iacute;, điều chuyển, tạm
                ngừng việc).&nbsp;</span
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';"
                >- Tạm ho&atilde;n, chấm dứt hợp đồng lao động, kỷ luật người
                lao động theo Nội quy lao động, quy chế của C&ocirc;ng ty, thỏa
                ước lao động tập thể (</span
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
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <strong
                ><span style="font-family:'Times New Roman';"
                  >Điều 5. Điều khoản thi h&agrave;nh</span
                ></strong
              >
            </p>
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >- Những vấn đề về lao động kh&ocirc;ng ghi trong hợp đồng</span
              ><span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';">thử việc</span
              ><span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >n&agrave;y th&igrave; &aacute;p dụng theo quy định của nội quy
                lao động v&agrave; ph&aacute;p luật lao động;</span
              >
            </p>
            <!-- <p
              style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:150%; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">-&nbsp;</span
              ><span style="font-family:'Times New Roman';">&nbsp;</span
              ><span style="font-family:'Times New Roman';"
                >Hợp đồng thử việc n&agrave;y được lập th&agrave;nh 02 bản
                c&oacute; gi&aacute; trị như nhau, mỗi b&ecirc;n giữ 01 bản
                v&agrave; c&oacute; hiệu lực kể từ ng&agrave;y&nbsp;</span
              ><span style="font-family:'Times New Roman'; ">ký.</span>
            </p> -->
            <p
              style="margin-top:0pt; margin-bottom:0pt; text-indent:27pt; text-align:justify; font-size:13pt;"
            >
              <span style="font-family:'Times New Roman';">&nbsp;</span>
            </p>
            <table
              cellpadding="0"
              cellspacing="0"
              style="width:453.1pt; border-collapse:collapse;"
            >
              <tbody>
                <tr style="height:6.15pt;">
                  <td
                    style="width:215.75pt; padding-right:5.4pt; padding-left:5.4pt; vertical-align:top;"
                  >
                    <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:13pt;"
                    >
                      <strong
                        ><span style="font-family:'Times New Roman';"
                          >NGƯỜI LAO ĐỘNG</span
                        ></strong
                      >
                    </p>
                  </td>
                  <td
                    style="width:215.75pt; padding-right:5.4pt; padding-left:5.4pt; vertical-align:top;"
                  >
                    <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:13pt;"
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
            style="margin-top:0pt; margin-bottom:0pt; text-indent:27pt; text-align:justify; font-size:13pt;"
          >
            <span style="font-family:'Times New Roman';">&nbsp;</span>
          </p>
        </div>
      </el-card>
    </div>

    <!-- <el-button type="success"  @click="downloadWithCSS">Tải về</el-button> -->
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
      //console.log(value,value2)
      if (value.includes("chính")) {
        return "Cụm CN Hà Bình Phương, xã Văn Bình, huyện Thường Tín, thành phố Hà Nội";
      } else if (value.includes("Nội")) {
        return "356A Giải Phóng, phường Phương Liệt, quận Thanh Xuân, thành phố Hà Nội";
      } else if (value.includes("Hồ")) {
        console.log(value);
        if (value2.Office.includes("Đắk")) {
          return "Số 04 đường Lý Tự Trọng, phường Tân An, Thành phố Buôn Ma Thuột, tỉnh Đắk Lắk";
        } else {
          return "26-28 Hàn Mặc Tử, phường Tân Thành, quận Tân Phú, thành phố Hồ Chí Minh";
        }
      } else if (value.includes("Đà")) {
        return "Lô 144-B2-2 đường Hoàng Thị Loan, phường Hòa Minh, quận Liên Chiểu, thành phố Đà Nẵng";
      }
    },
    toDakLak: function(value) {
      console.log(value);
      if (value.includes("chính")) {
        return "Cụm CN Hà Bình Phương, xã Văn Bình, huyện Thường Tín, thành phố Hà Nội";
      } else if (value.includes("Nội")) {
        return "356A Giải Phóng, phường Phương Liệt, quận Thanh Xuân, thành phố Hà Nội";
      } else if (value.includes("Hồ")) {
        console.log(info);
        if (info.Office.includes("Đắk")) {
          return "Số 04 đường Lý Tự Trọng, phường Tân An, Thành phố Buôn Ma Thuột, tỉnh Đắk Lắk";
        } else {
          return "26-28 Hàn Mặc Tử, phường Tân Thành, quận Tân Phú, thành phố Hồ Chí Minh";
        }
      } else if (value.includes("Đà")) {
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
        var doc = new jsPDF("p", "mm");
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
