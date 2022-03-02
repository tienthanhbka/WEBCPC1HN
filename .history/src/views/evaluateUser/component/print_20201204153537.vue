<template>
  <div style="postion: relative">
    <div style="border: none;" ref="content">
      <div
        id="div_content_view"
        style="width:415.75px;padding:7.56px;box-sizing:border-box;display:flex;"
        class="t-card"
      >
        <div style="width:132.28px;height:83.15px;text-align:center;">
          <span
            style="padding:10px;font-weight:700;font-size:6.25px;word-break:break-word;"
            >Quạt đứng Vinawind QĐ-400MS</span
          >
          <qrcode-vue
            id="report2"
            value="1ab3ec36ed2c4f95b4ddc073fa018b8f"
            :size="50"
            level="H"
            style="padding:2px;"
          ></qrcode-vue>
          <span style="padding:8px 0;font-weight:700;font-size:8.25px;"
            >KT1-BANPHIM-00123</span
          >
        </div>
        <div style="width:188.98px;height:113.39px;text-align:center;">
          <span
            style="padding:10px;font-weight:700;font-size:6.75px;word-break:break-word;"
            >Thùng máy tính CPU</span
          >
          <qrcode-vue
            id="report3"
            value="1ab3ec36ed2c4f95b4ddc073fa018b8f"
            :size="50"
            level="H"
            style="padding:2px;"
          ></qrcode-vue>

          <span style="padding:8px 0;font-weight:700;font-size:8.25px;"
            >KT1-CPU-00111</span
          >
        </div>
        <div style="width:188.98px;height:113.39px;text-align:center;">
          <span
            style="padding:10px;font-weight:700;font-size:6.75px;word-break:break-word;"
            >Thùng máy tính CPU</span
          >
          <qrcode-vue
            id="report3"
            value="1ab3ec36ed2c4f95b4ddc073fa018b8f"
            :size="50"
            level="H"
            style="padding:2px;"
          ></qrcode-vue>

          <span style="padding:8px 0;font-weight:700;font-size:8.25px;"
            >KT1-CPU-00111</span
          >
        </div>
      </div>
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
import QrcodeVue from "qrcode.vue";

import { GetCriteriaHeaderByEmId } from "@/api/NSCriteriaEmployee";
import html2canvas from "html2canvas";
import Cookies from "js-cookie";
export default {
  props: ["card"],
  components: {
    QrcodeVue
  },
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
    }
  },
  data() {
    return {
      info: "",
      NumReq: 0,
      Num: 0,
      Sum: 0,
      NumOKReq: 0,
      NumOK: 0,
      SumOK: 0,
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
            this.Sum = res.CriteriaHeaderInfo.CriteriaLineLst.length;
            let _this = this;
            res.CriteriaHeaderInfo.CriteriaLineLst.forEach(item => {
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
.t-card .el-card__body {
  padding: 0;
  display: flex;
}
</style>
