<template>
  <div
    shadow="always"
    style="margin: auto; position: relative; padding-bottom: 100px;"
  >
    <div>
      <el-card>
        <div style="font-weight: bold; font-size: 30px; color: #777777;">
          Quy định: {{ this.lines.Content }}
        </div>
        <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold;">Hiệu lực:</span>
          {{ this.lines.TimeEnd }}
        </div>

        <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold;">Đối tượng áp dụng:</span>
          {{ this.lines.Office.replace(/;;/g, ",") }}
        </div>
      </el-card>
    </div>
    <div :key="acc">
      <div v-for="(line, index) in files" :key="index" class="row">
        <div>
          <el-card>
            <div class="download-file">
              <el-button
                @click="DownloadFile(line)"
                type="primary"
                size="mini"
                icon="el-icon-download"
                >Tải về</el-button
              >
            </div>
            <div
              style="width: 100%; height: 100%;"
              class="grid-content bg-purple-light"
            >
              <object
                :data="
                  'https://icpc1hn.work/api/' +
                    'File/GetFileRegu/' +
                    line +
                    '?token=' +
                    token
                "
                type="application/pdf"
                width="100%"
                height="1000px"
              >
                <p>
                  Your web browser doesn't have a PDF plugin. Instead you can
                  <a
                    :href="
                      'https://icpc1hn.work/api/' +
                        'File/GetFileRegu/' +
                        line +
                        '?token=' +
                        token
                    "
                    >click here to download the PDF file.</a
                  >
                </p>
              </object>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { getReguById } from "@/api/regu";
export default {
  name: "",
  components: {},
  props: [""],
  data() {
    return {
      lines: [],
      id: 0,
      files: [],
      info: "",
      MaxKPI: 0,
      ReportValueID: 0,
      acc: 0,
      token: Cookies.get("token"),
      select1: [],
      fileList: [],
      dialogImageUrl: "",
      dialogFormMail: false,
      disabled: false
    };
  },
  watch: {
    $route: "fetchDataRe"
  },
  methods: {
    fetchDataRe() {
      var req = {
        RowID: this.$route.params.id
      };
      getReguById(req).then(response => {
        if (response.ResCode == 0) {
          this.lines = response.Data[0];

          if (this.lines.File != "") {
            this.files = this.lines.File.split(";;", 100);
          }
        }
      });
    },
    DownloadFile(line) {
      let linkUrl =
        "https://icpc1hn.work/Web_API/File/DownloadDocumentFile?" +
        "&FileName=" +
        line +
        "&Token=" +
        this.token +
        "&TypeFile=0";
      window.open(linkUrl);
    }
  },
  mounted() {
    //this.addLine()
  },
  created() {
    this.fetchDataRe();
  }
};
</script>
<style>
.el-dialog__title {
  line-height: 30px;
  font-size: 18px;
  color: #303133;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 100%;
  }
}
.download-file {
  float: right;
  padding: 5px;
}
</style>
