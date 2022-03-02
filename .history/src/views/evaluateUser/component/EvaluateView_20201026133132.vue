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
                >PHIẾU Đ&Aacute;NH GI&Aacute; NH&Acirc;N SỰ</span
              ></strong
            >
          </p>
          <br />
          <!-- <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:13pt;"><em><span style="font-family:'Times New Roman';">(D&ugrave;ng cho c&ocirc;ng t&aacute;c b&agrave;n giao của NVKD khi nghỉ việc hoặc thay đổi vị tr&iacute; c&ocirc;ng t&aacute;c)</span></em></p> -->
          <ol style="margin:0pt; padding-left:0pt;" type="I">
            <li
              style="margin-left:54pt; text-indent:-54pt; text-align:justify; line-height:150%; font-family:'Times New Roman'; font-size:13pt; font-weight:bold; list-style-position:inside; -aw-list-padding-sml:4.69pt;"
            >
              <span style="font:7pt 'Times New Roman';">&nbsp;&nbsp;&nbsp;</span
              >NHÂN VIÊN ĐÁNH GIÁ
            </li>
          </ol>
          <p
            style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:180%; font-size:13pt;"
          >
            <el-row>
              <el-col :span="12"
                ><span style="font-family:'Times New Roman';"
                  >Họ v&agrave; t&ecirc;n:
                  {{ CriteriaLineLst.EmployeeName }}</span
                ></el-col
              >
              <el-col :span="12"
                ><span style="font-family:'Times New Roman';"
                  >M&atilde; nh&acirc;n vi&ecirc;n:
                  {{ CriteriaLineLst.EmployeeCode }}</span
                ></el-col
              >
            </el-row>
          </p>
          <!-- <p
            style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:180%; font-size:13pt;"
          >
            <el-row>
              <el-col :span="12"
                ><span style="font-family:'Times New Roman';"
                  >Vị tr&iacute;: {{ dataLst[0][0].Position }}</span
                ></el-col
              >
              <el-col :span="12"
                ><span style="font-family:'Times New Roman';"
                  >Bộ phận: {{ dataLst[0][0].Office }}</span
                ></el-col
              >
            </el-row>
          <p
            style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:180%; font-size:13pt;"
          >
            <el-row>
              <el-col :span="12"
                ><span style="font-family:'Times New Roman';"
                  >Ng&agrave;y v&agrave;o l&agrave;m:
                  {{ dataLst[0][0].DateStartWork }}</span
                ></el-col
              >
              <el-col :span="12"
                ><span style="font-family:'Times New Roman';"
                  >Ng&agrave;y th&ocirc;i việc:
                  {{ dataLst[0][0].DateEndWork }}</span
                ></el-col
              >
            </el-row> -->
          <ol start="2" style="margin:0pt; padding-left:0pt;" type="I">
            <li
              style="margin-left:54pt; text-indent:-54pt; text-align:justify; line-height:150%; font-family:'Times New Roman'; font-size:13pt; font-weight:bold; list-style-position:inside;"
            >
              KẾT QUẢ ĐÁNH GIÁ
            </li>
          </ol>
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
                    style="width: 7.9174%;border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                  >
                    <div style="text-align: center;"><strong>STT</strong></div>
                  </td>
                  <td
                    style="width: 20.654%;border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                  >
                    <div style="text-align: center;">
                      <strong>Ti&ecirc;u ch&iacute;</strong>
                    </div>
                  </td>
                  <td
                    style="width: 10.327%; text-align: center;border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                  >
                    <div style="text-align: center;">
                      <strong>Đị** mức</strong>
                    </div>
                  </td>
                  <td
                    style="width: 12.2203%; text-align: center;border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                  >
                    <div style="text-align: center;">
                      <strong>Kết quả đạt</strong>
                    </div>
                  </td>
                  <td
                    style="width: 14.8021%; text-align: center;border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                  >
                    <div style="text-align: center;">
                      <strong>Người đ&aacute;nh gi&aacute;</strong>
                    </div>
                  </td>
                  <td style="width: 11.3597%;">
                    <div
                      style="text-align: center;border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                    >
                      <strong>Đ&aacute;nh gi&aacute;</strong>
                    </div>
                  </td>
                  <td
                    style="width: 22.5474%; text-align: center;border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                  >
                    <div style="text-align: center;">
                      <strong>Nhận x&eacute;t</strong>
                    </div>
                  </td>
                </tr>
                <tr
                  v-for="(item, index) in CriteriaLineLst.CriteriaLineLst"
                  :key="index"
                >
                  <td
                    style="width:7.9174%; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
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
                    style="width:20.654%; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle;"
                  >
                    <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                    >
                      <span style="font-family:'Times New Roman';">{{
                        item.CriteriaName
                      }}</span>
                    </p>
                  </td>
                  <td
                    style="width:10.327%; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                  >
                    <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                    >
                      <span style="font-family:'Times New Roman';">{{
                        item.Quota
                      }}</span>
                    </p>
                  </td>
                  <td
                    style="width:12.2203%; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                  >
                    <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                    >
                      <span style="font-family:'Times New Roman';">{{
                        item.Quantity
                      }}</span>
                    </p>
                  </td>
                  <td
                    style="width:14.8021%; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                  >
                    <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                    >
                      <span style="font-family:'Times New Roman';">{{
                        item.EmployeeNameRate
                      }}</span>
                    </p>
                  </td>
                  <td
                    style="width:11.3597%; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                  >
                    <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                    >
                      <span style="font-family:'Times New Roman';">{{
                        item.Rate
                      }}</span>
                    </p>
                  </td>
                  <td
                    style="width:22.5474%; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;"
                  >
                    <p
                      style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"
                    >
                      <span style="font-family:'Times New Roman';">{{
                        item.Comment
                      }}</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-card>
    </div>
    <!-- <el-button style="position: fixed; right:50px; bottom: 100px;" type="success"  @click="downloadWithCSS">Tải về</el-button> -->

    <div style="position: fixed; right:50px; bottom: 100px;">
      <div>
        <el-button type="primary" @click="modalOK1">Phê duyệt </el-button>
        <el-button type="warning" @click="modalOK3">Không phê duyệt </el-button>
        <el-button type="success" @click="convert('div_content_view')"
          >In
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
      CriteriaLineLst: [],
      dataLst: [],
      token: Cookies.get("token"),
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
          console.log(this.CriteriaLineLst);
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
