<template>
  <div
    shadow="always"
    style="margin: auto; position: relative; padding-bottom: 100px;"
  >
    <div>
      <div
        style="font-weight: bold; font-size: 10pt; color: #777777;word-break:break-word;"
      >
        Quy định: {{ this.lines.Content }}
      </div>
      <div style=" font-size: 10pt; margin-top: 10px; color: #777777;">
        <span style="font-weight: bold;">Hiệu lực:</span>
        {{ this.lines.TimeEnd }}
      </div>

      <div style=" font-size: 10pt; margin-top: 10px; color: #777777;">
        <span style="font-weight: bold;">Đối tượng áp dụng:</span>
        {{ this.lines.Office.replace(/;;/g, ",") }}
      </div>
    </div>
    <div
      :key="acc"
      style="margin-top:10px;border:1px dashed #eee;border-radius:5px"
    >
      <div v-for="(line, index) in lines.File" :key="index" class="row">
        <div>
          <!-- <div class="download-file">
            <el-button
              @click="DownloadFile(line)"
              type="primary"
              size="mini"
              icon="el-icon-download"
              >Tải về</el-button
            >
          </div> -->
          <div
            style="width: 100%; height: 100%;"
            class="grid-content bg-purple-light"
          >
            <!-- <embed style="width: 100%; height: 1000px;" :src="'https://icpc1hn.work/api/'+'File/GetFileRegu/'+line+'?token='+token" /> -->

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
                  style="color:#02bc77;font-weight:700;padding:5px;"
                  :href="
                    'https://icpc1hn.work/api/' +
                      'File/GetFileRegu/' +
                      line +
                      '?token=' +
                      token
                  "
                  target="_blank"
                  >click here to download the PDF file.</a
                >
              </p>
            </object>
            <!-- <div>  {{ line }}</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { getReguById } from "@/api/regu";

export default {
  props: {
    lines: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      id: 0,
      files: [],
      info: "",
      MaxKPI: 0,
      ReportValueID: 0,
      acc: 0,
      token: this.$route.params.token
    };
  },
  watch: {},
  methods: {
    DownloadFile(line) {
      let linkUrl =
        "https://icpc1hn.work/api/File/GetFileRegu/" +
        line +
        "?token=" +
        this.token;
      window.open(linkUrl);
    }
  },
  mounted() {
    //this.addLine()
  },
  created() {
    console.log(this.lines);
    //this.token = this.$route.params.token;
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
</style>
