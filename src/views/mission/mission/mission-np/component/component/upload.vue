<template>
  <modal id="upload-mission-vacation" ref="upload-mission-vacation" v-cloak>
    <template slot="title"
      >Upload file ảnh Giấy ra viện</template
    >
    <div slot="body">
      <div style="margin-top: 15px;">
        Upload ảnh
        <el-upload
          class="upload-demo"
          action="https://icpc1hn.work/api/File/UploadFileEmployeeMissionNP"
          multiple
          :limit="4"
          accept="image/png, image/jpeg"
          :data="token"
          :on-success="uploadImageOk"
          :file-list="image"
        >
          <el-button size="small" type="primary"
            >Click to upload image</el-button
          >
          <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
        </el-upload>
      </div>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="editMission"
        >Xác nhận</el-button
      >
    </div>
  </modal>
</template>
<script>
import { UploadMissionVacation, GetEmailLst } from "@/api/mission";
import { GetGroupEmployee } from "@/api/groups";
import Cookies from "js-cookie";
export default {
  props: ["row", "typeList"],
  data() {
    return {
      token: {
        token: Cookies.get("token")
      },
      ReasonLst: [
        { value: "Bản thân kết hôn (03 ngày)" },
        {
          value: "Con kết hôn (01 ngày)"
        },
        // {
        //   value: "Bố mẹ 2 bên vợ chồng chết; vợ, chồng, con chết (03 ngày )"
        // },
        {
          value: "Vợ sinh con (02 ngày)"
        },
        {
          value: "Đi công tác trong và ngoài nước"
        },
        {
          value: "Đi khám thai"
        },
        {
          value: "Sinh con"
        },
        {
          value: "Dưỡng sức, phục hồi sức khỏe sau thai sản"
        }
      ],
      tableData: [],
      image: [],
      code: 0,
      autoKPI: false,
      selectedPlace: [],
      Units: [
        {
          unit: "min",
          label: "phút"
        },
        {
          unit: "hour",
          label: "giờ"
        },
        {
          unit: "day",
          label: "ngày"
        },
        {
          unit: "week",
          label: "tuần"
        },
        {
          unit: "month",
          label: "tháng"
        }
      ],
      options: [],
      emailLst: [],
      value: "",
      actionOK: "",
      form: {
        RowID: 0,
        LinkFile: ""
      }
    };
  },

  methods: {
    uploadImageOk(res, file, fileList) {
      this.image.push(res.Data.fileName);
      //console.log(this.image)
    },
    changeReason() {
      this.form.TimeStart = Date.parse(
        this.form.TimeStart.toString("yyyy-MM-dd")
      );
      if (this.form.Reason == "Bản thân kết hôn (03 ngày)") {
        var a = new Date(this.form.TimeStart);
        a.setDate(this.form.TimeStart.getDate() + 3);
        this.form.TimeEnd = a;
      }

      if (this.form.Reason == "Con kết hôn (01 ngày)") {
        var a = new Date(this.form.TimeStart);
        a.setDate(this.form.TimeStart.getDate() + 1);
        this.form.TimeEnd = a;
      }

      // if (
      //   this.form.Reason ==
      //   "Bố mẹ 2 bên vợ chồng chết; vợ, chồng, con chết (03 ngày )"
      // ) {
      //   var a = new Date(this.form.TimeStart);
      //   a.setDate(this.form.TimeStart.getDate() + 3);
      //   this.form.TimeEnd = a;
      // }
      if (this.form.Reason == "Vợ sinh con (02 ngày)") {
        var a = new Date(this.form.TimeStart);
        a.setDate(this.form.TimeStart.getDate() + 2);
        this.form.TimeEnd = a;
      }
    },

    closeModal() {
      VoerroModal.hide("upload-mission-vacation");
    },
    fetchOffice() {
      this.listLoading = true;
      GetGroupEmployee().then(response => {
        this.options = response.Data;
        //console.log(this.options);
        this.listLoading = false;
      });
    },
    editMission() {
      this.form.RowID = this.row.RowID;
      this.form.LinkFile = this.image.join(",");
      UploadMissionVacation(this.form).then(response => {
        if (response.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Nộp ảnh thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("click-something", "OK");
          VoerroModal.hide("upload-mission-vacation");
          this.listLoading = false;
        }
      });
    }
  },
  created() {
    this.fetchOffice();
    GetEmailLst().then(res => {
      this.emailLst = res.Data;
    });
    this.form.Email = this.row.Email ? this.row.Email.split(",") : "";
  },
  mounted() {
    //this.links = this.optionsService();
  }
  // watch: {
  //   employee:function(){

  //     GetPlaceByIdEmployee({idEmployee:this.employee.idEmployee}).then(res=>{
  //         console.log(res);
  //         this.tableData = res.Data;
  //     })
  //   }
  // },
};
</script>

<style>
.my-autocomplete {
  width: 500px;
}

.el-select {
  display: inline-block;
  position: relative;
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
    width: 100%;
  }
}
</style>
