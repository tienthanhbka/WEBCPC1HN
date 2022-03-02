<template>
  <div style="postion: relative">
    <div style="border: none;" ref="content">
      <el-card
        id="div_content_view"
        style="width:635.44pt; padding-left:45.12pt;padding-right:41.12pt; padding-bottom:381.12pt; border-bottom: 0px solid white;word-wrap: normal;"
      >
        <div>
          <div style="clear:both;">
            <p style="margin-top:0pt; margin-bottom:0pt; font-size:10pt;">
              <span style="font-family:'Times New Roman';"
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
              >
            </p>
            <div>
              <div>
                <table
                  cellpadding="0"
                  cellspacing="0"
                  style="border-collapse:collapse;"
                >
                  <tbody>
                    <tr>
                      <td
                        style="width:60.05pt; padding-left:5.4pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:18pt;"
                        >
                          <strong
                            ><span style="font-family:'Times New Roman';"
                              >&nbsp;&nbsp;</span
                            ></strong
                          ><img
                            src="https://myfiles.space/user_files/67573_54f7b57590284bac/1604997358_bm02-dgns-gsbh-etc-ps-ha-noi-da-nang-2/1604997358_bm02-dgns-gsbh-etc-ps-ha-noi-da-nang-2.001.jpg"
                            width="64"
                            height="55"
                            alt="Description: Description: Pict_x1"
                          />
                        </p>
                      </td>
                      <td
                        style="width:608.65pt; padding-right:5.4pt; padding-left:5.4pt;"
                      >
                        <p
                          style="margin-top:11.65pt; margin-bottom:0pt; widows:0; orphans:0; font-size:18pt;"
                        >
                          <strong></strong
                          ><strong
                            ><span
                              style="font-family:'Times New Roman';text-transform: uppercase;"
                              v-if="CriteriaLineLst.DocType"
                              >{{
                                CriteriaLineLst.DocType.replace(
                                  "0 tháng",
                                  "thử việc"
                                )
                              }}</span
                            ></strong
                          >
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p
                  style="margin:0pt 84.95pt 0pt 195.1pt; text-indent:-113.2pt; text-align:center; widows:0; orphans:0; font-size:6pt;"
                >
                  <strong
                    ><span style="font-family:'Times New Roman';"
                      >&nbsp;</span
                    ></strong
                  >
                </p>
                <p
                  style="margin-top:0.1pt; margin-bottom:0pt; widows:0; orphans:0; font-size:10pt;"
                >
                  <strong
                    ><span style="font-family:'Times New Roman';"
                      >&nbsp;</span
                    ></strong
                  >
                </p>
                <table
                  cellpadding="0"
                  cellspacing="0"
                  style=" border:0.75pt solid #000000; border-collapse:collapse;"
                >
                  <tbody>
                    <tr style="height:37.9pt;">
                      <td
                        style="width:184.6pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-left:5.4pt; margin-bottom:0pt; line-height:12.6pt; widows:0; orphans:0;"
                        >
                          <span
                            style="font-family:'Times New Roman'; font-size:11pt;"
                            >&nbsp;</span
                          >
                        </p>
                        <p
                          style="margin-top:0pt; margin-left:5.4pt; margin-bottom:0pt; line-height:12.6pt; widows:0; orphans:0;"
                        >
                          <span
                            style="font-family:'Times New Roman'; font-size:11pt;"
                            >H</span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt; letter-spacing:2.6pt;"
                            >ọ</span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt;"
                            >t&ecirc;n: {{ CriteriaLineLst.EmployeeName }}</span
                          >
                        </p>
                        <p
                          style="margin-top:6.3pt; margin-left:5.4pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span style="font-family:'Times New Roman';">MNV</span
                          ><span style="font-family:'Times New Roman';"
                            >: {{ CriteriaLineLst.EmployeeCode }}</span
                          ><span style="font-family:'Times New Roman';"></span>
                        </p>
                        <p
                          style="margin-top:6.3pt; margin-left:5.4pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >SĐT: {{ CriteriaLineLst.EmployeeID }}</span
                          >
                        </p>
                      </td>
                      <td
                        style="width:162.25pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-left:5.4pt; margin-bottom:0pt; line-height:12.6pt; widows:0; orphans:0;"
                        >
                          <span
                            style="font-family:'Times New Roman'; font-size:11pt;"
                            >&nbsp;</span
                          >
                        </p>
                        <p
                          style="margin-top:0pt; margin-left:5.4pt; margin-bottom:0pt; line-height:12.6pt; widows:0; orphans:0;"
                        >
                          <span
                            style="font-family:'Times New Roman'; font-size:11pt;"
                            >Chi&nbsp;</span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt;"
                            >nhánh:</span
                          >
                        </p>
                        <p
                          style="margin-top:6.3pt; margin-left:5.4pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >Phòng ban</span
                          ><span style="font-family:'Times New Roman';">:</span>
                        </p>
                        <p
                          style="margin-top:6.3pt; margin-left:5.4pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >Chức danh:</span
                          >
                        </p>
                      </td>
                      <td
                        style="width:177.35pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;"
                      >
                        <p
                          style="margin-top:0pt; margin-left:5.35pt; margin-bottom:0pt; line-height:12.6pt; widows:0; orphans:0;"
                        >
                          <span
                            style="font-family:'Times New Roman'; font-size:11pt; letter-spacing:-0.05pt;"
                            >&nbsp;</span
                          >
                        </p>
                        <p
                          style="margin-top:0pt; margin-left:5.35pt; margin-bottom:0pt; line-height:12.6pt; widows:0; orphans:0;"
                        >
                          <span
                            style="font-family:'Times New Roman'; font-size:11pt; letter-spacing:-0.05pt;"
                            >Ng&agrave;y v&agrave;o c&ocirc;ng ty</span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt;"
                            >:</span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt; letter-spacing:0.05pt;"
                            >&nbsp;</span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt; letter-spacing:-0.15pt;"
                            >&hellip;</span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt; letter-spacing:-0.05pt;"
                            >.....</span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt; letter-spacing:-0.15pt;"
                            >.</span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt; letter-spacing:-0.05pt;"
                            >.....</span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt; letter-spacing:-0.15pt;"
                            >.</span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt; letter-spacing:-0.05pt;"
                          ></span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt;"
                            >.</span
                          ><span
                            style="font-family:'Times New Roman'; font-size:11pt;"
                            >....</span
                          >
                        </p>
                        <p
                          style="margin-top:6.3pt; margin-left:5.35pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span
                            style="font-family:'Times New Roman'; letter-spacing:-0.05pt;"
                            >Ng&agrave;y bắt đầu đánh giá</span
                          ><span style="font-family:'Times New Roman';">:</span
                          ><span
                            style="font-family:'Times New Roman'; letter-spacing:-0.1pt;"
                            >&nbsp;</span
                          ><span
                            style="font-family:'Times New Roman'; letter-spacing:-0.05pt;"
                            >&hellip;</span
                          ><span
                            style="font-family:'Times New Roman'; letter-spacing:-0.15pt;"
                            >&hellip;</span
                          ><span
                            style="font-family:'Times New Roman'; letter-spacing:-0.05pt;"
                            >.....</span
                          ><span style="font-family:'Times New Roman';">.</span
                          ><span
                            style="font-family:'Times New Roman'; letter-spacing:-0.35pt;"
                            >.......</span
                          >
                        </p>
                        <p
                          style="margin-top:6.3pt; margin-left:5.35pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span
                            style="font-family:'Times New Roman'; letter-spacing:-0.35pt;"
                            >Ng&agrave;y kết th&uacute;c đ&aacute;nh gi&aacute;:
                            &hellip;&hellip;&hellip;&hellip;.</span
                          >
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p
                  style="margin-top:0.05pt; margin-bottom:0pt; widows:0; orphans:0; font-size:6pt;"
                >
                  <strong
                    ><span style="font-family:'Times New Roman';"
                      >&nbsp;</span
                    ></strong
                  >
                </p>
                <ol style="margin:0pt; padding-left:0pt;" type="A">
                  <li
                    style="margin-top:3.4pt; margin-left:40.27pt; padding-left:1.33pt; font-family:'Times New Roman'; font-size:12pt; font-weight:bold;"
                  >
                    KẾT QUẢ Đ&Aacute;NH GI&Aacute;
                  </li>
                </ol>
                <p
                  style="margin-top:3.4pt; margin-left:41.6pt; margin-bottom:0pt; widows:0; orphans:0; font-size:12pt;"
                >
                  <strong
                    ><span style="font-family:'Times New Roman';"
                      >&nbsp;</span
                    ></strong
                  >
                </p>
                <table
                  cellpadding="0"
                  cellspacing="0"
                  style="border:0.75pt solid #000000; border-collapse:collapse;"
                >
                  <tbody>
                    <tr>
                      <td
                        style="width: 7.0568%; border-right-style: solid; border-right-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 21.1704%; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 11.1876%; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 14.2857%; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 15.8348%; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 11.8761%; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                      <td
                        style="width: 18.7607%; border-left-style: solid; border-left-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                      </td>
                    </tr>
                    <tr
                      v-for="(item, index) in CriteriaLineLst.CriteriaLineLst"
                      :key="index"
                    >
                      <td
                        style="width: 7.0568%; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 21.1704%; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 11.1876%; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 14.2857%; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 15.8348%; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span style="font-family:'Times New Roman';">{{
                            item.EmployeeNameRate
                          }}</span>
                        </p>
                      </td>
                      <td
                        style="width: 11.8761%; border-top-style: solid; border-top-width: 0.75pt; border-right-style: solid; border-right-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 18.7607%; border-top-style: solid; border-top-width: 0.75pt; border-left-style: solid; border-left-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span style="font-family:'Times New Roman';">{{
                            item.Comment
                          }}</span>
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
                <table
                  cellpadding="0"
                  cellspacing="0"
                  style="margin-left: calc(13%); border-collapse: collapse; width: 87%;"
                >
                  <tbody>
                    <tr>
                      <td
                        style="width: 37.9177%; border-right-style: solid; border-right-width: 0.75pt; border-bottom-style: solid; border-bottom-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.4pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >&nbsp;</span
                          >
                        </p>
                      </td>
                      <td
                        style="width: 21.086%; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >SL kế hoạch</span
                          >
                        </p>
                      </td>
                      <td
                        style="width: 13.1714%; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >SL đạt</span
                          >
                        </p>
                      </td>
                      <td
                        style="width: 27.4288%; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >Tỷ lệ ho&agrave;n th&agrave;nh</span
                          >
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="width: 37.9177%; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >Ti&ecirc;u ch&iacute; bắt buộc</span
                          >
                        </p>
                      </td>
                      <td
                        style="width: 21.086%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 13.1714%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 27.4288%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span
                            style="font-family:'Times New Roman';text-align:center;"
                            >{{ RateReq }} %</span
                          >
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="width: 37.9177%;border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >Ti&ecirc;u ch&iacute; kh&ocirc;ng bắt buộc</span
                          >
                        </p>
                      </td>
                      <td
                        style="width: 21.086%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 13.1714%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 27.4288%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span
                            style="font-family:'Times New Roman';text-align:center;"
                            >{{ Rate }} %</span
                          >
                        </p>
                      </td>
                    </tr>
                    <tr style="height:15.7pt;">
                      <td
                        style="width: 37.9177%; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:13pt;"
                        >
                          <span style="font-family:'Times New Roman';"
                            >Tổng ti&ecirc;u ch&iacute;</span
                          >
                        </p>
                      </td>
                      <td
                        style="width: 21.086%;text-align:center; border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span style="font-family:'Times New Roman';">{{
                            Sum
                          }}</span>
                        </p>
                      </td>
                      <td
                        style="width: 13.1714%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
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
                        style="width: 27.4288%;text-align:center;  border-style: solid; border-width: 0.75pt; padding-right: 5.03pt; padding-left: 5.03pt; vertical-align: top;"
                      >
                        <p
                          style="margin-top:0pt; margin-bottom:0pt; widows:0; orphans:0; font-size:11pt;"
                        >
                          <span
                            style="font-family:'Times New Roman';text-align:center;"
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
          </div>
        </div>
      </el-card>
    </div>
    <!-- <el-button style="position: fixed; right:50px; bottom: 100px;" type="success"  @click="downloadWithCSS">Tải về</el-button> -->

    <div style="position: fixed; right:50px; bottom: 100px;">
      <div>
        <el-button
          icon="fas fa-print"
          type="primary"
          @click="convert('div_content_view')"
          >&nbsp;In Phiếu
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import jsPDF from "jspdf";
import { GetCriteriaHeaderByEmId } from "@/api/NSCriteriaEmployee";
import html2canvas from "html2canvas";
import Cookies from "js-cookie";
export default {
  props: ["card"],
  filters: {
    toRateText(val) {
      if (val > 2) {
        return "ĐẠT";
      } else {
        return "KHÔNG ĐẠT";
      }
    }
  },
  data() {
    return {
      info: "",
      NumReq: 0,
      Num: 0,
      Sum: 0,
      NumOKReq: 5,
      NumOK: 4,
      SumOK: 3,
      RateReq: 0,
      Rate: 0,
      RateSum: 0,
      CriteriaLineLst: [],
      dataLst: [],
      UserName: Cookies.get("idEmployee"),
      Token: Cookies.get("token")
    };
  },
  created() {
    //alert(screen.width);
    this.fetchData();
  },
  methods: {
    fetchData() {
      const req = {
        UserName: this.UserName,
        Token: this.Token,
        EmployeeID: this.card.EmployeeID,
        WorkOld: this.card.WorkOld,
        TypeEvaluate: this.card.TypeEvaluate
      };
      GetCriteriaHeaderByEmId(req).then(res => {
        if (res.RespCode == 0) {
          this.CriteriaLineLst = res.CriteriaHeaderInfo;
          if (res.CriteriaHeaderInfo) {
            this.Sum = res.CriteriaDefineLst.length;
            console.log(this.Sum);
            let _this = this;
            res.CriteriaDefineLst.forEach(item => {
              if (item.TypeCriteria === 0) {
                _this.Num++;
              } else {
                _this.NumReq++;
              }
            });
            _this.RateReq = _this.NumOKReq / _this.NumReq;
            _this.Rate = _this.NumOK / _this.Num;
            _this.RateSum = _this.SumOK / _this.Sum;
          }
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
          });
        }
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
  },
  watch: {
    card() {
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
