<template>
  <div>
    <modal id="new-report-modal" ref="new-report-modal" v-cloak>
      <template slot="title" 
        ><span style="font-weight:700;color: #02bc77;font-size: 20pt;"><i class="fas fa-file-upload"></i>
        &#32;&#32;Lịch đào tạo tập trung</span>
        </template>
      <div slot="body">
        
          <el-form
            ref="form"
            label-position="top"
            size="small"
            :model="form"
            :rules="rules"
            label-width="120px"
          >
          <el-row>
             <el-form-item label="Chủ đề" prop="Content">
                <el-input 
                class="selectIDGroup"
                v-model="form.Content" 
                style="width:100%"
                placeholder="Chủ đề..."
                type="textarea"
                autosize
                >
                </el-input>
              </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Hình thức" prop="TypeTraining">
                <el-select
                class="selectIDGroup"
                  style="width:100%"
                  v-model="form.TypeTraining"
                  placeholder="Chọn hình thức đào tạo..."
                >
                  <el-option
                    v-for="item in typeMissonLst"
                    :key="item.attribute"
                    :label="item.value"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="Địa điểm" prop="EmployeeTraining">
                <el-select
                class="selectIDGroup"
                  style="width:100%"
                  v-model="form.EmployeeTraining"
                  placeholder="Chọn Địa điểm..."
                >
                  <el-option
                    v-for="item in emLst"
                    :key="item.nameEmployee"
                    :label="item.nameEmployee"
                    :value="item.nameEmployee"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
               <!-- <el-form-item label="Nhóm" prop="IDGroup" >
                <el-select
                  class="selectIDGroup"
                  v-model="form.IDGroup"
                  placeholder="Chọn nhóm"
                  style="width:100%"
                  @change="fetchEmployee"
                >
                  <el-option
                     
                    v-for="item in lstGroup"
                    :key="item.idGroup"
                    :label="item.idGroup"
                    :value="item.idGroup"
                  >
                  </el-option>
                </el-select>
              </el-form-item> -->
              
             
             
             
              
            </el-col>

            <el-col :span="12">
               <el-form-item label="Ngày đào tạo" prop="Date">
                    <el-date-picker
                    class="selectIDGroup"
                    style="width:100%"
                    v-model="form.Date"
                    type="date"
                    format="dd/MM/yyyy"
                    placeholder="Ngày đào tạo...">
                    </el-date-picker>
              </el-form-item>
              <el-form-item label="Tài liệu">
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList">
                    <el-button size="small" type="info">chọn tệp</el-button>
                </el-upload>
              </el-form-item>
              
              
              
            </el-col>
            <el-col :span="24">
            <!-- <el-form-item label="Ảnh chụp thành viên">
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList">
                    <el-button size="small" type="info">chọn tệp</el-button>
                </el-upload>
                 <el-input 
                class="selectIDGroup"
                v-model="form.Content" 
                style="width:100%"
                placeholder="Chọn file nếu có..."
                type="textarea"
                autosize
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Slide/Xác nhận/Checklist">
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList">
                    <el-button size="small" type="info">chọn tệp</el-button>
                </el-upload>
                 <el-input 
                class="selectIDGroup"
                v-model="form.Content" 
                style="width:100%"
                placeholder="Chọn file nếu có..."
                type="textarea"
                autosize
                >
                </el-input>
              </el-form-item> -->
              
              <el-form-item label="Ghi chú" >
              <el-input 
              class="selectIDGroup"
                v-model="form.Note" 
                style="width:100%"
                placeholder="Ghi chú..."
                type="textarea"
                autosize
               ></el-input>
            </el-form-item>
            </el-col>
            </el-row>
          </el-form>
        
      </div>
      <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px;text-align:center">
      <el-button type="danger" @click="closeModal" icon="el-icon-circle-close">Hủy</el-button>
      <el-button style="background-color:#02bc77;color:white;" @click="addReport('form')">Xác nhận</el-button>
    </div>
    </modal>
  </div>
</template>
<script>
import {GetLstGroup } from '@/api/employeeAdmin'
import { getEmployeesByIdGroup } from "@/api/groups";
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      nameMissionLst: null,
      typeMissonLst: null,
      groupLst: null,
      placesLst: [],
      lstGroup:[],
      emLst:[],
      rules: {
        IDGroup: [
          {
            required: true,
            message: "Hãy chọn nhóm",
            trigger: "change"
          }
        ],
        Date: [
          {
            required: true,
            message: "Hãy chọn ngày đào tạo",
            trigger: "change"
          }
        ],
        EmployeeTranning: [
          {
            required: true,
            message: "Hãy chọn người đào tạo",
            trigger: "change"
          }
        ],
        TypeTranning: [
          {
            required: true,
            message: "Hãy chọn hình thức đào tạo",
            trigger: "change"
          }
        ],
        Content: [
          {
            required: true,
            message: "Hãy nhập nội dung",
            trigger: "change"
          }
        ]
      },
      form: {
        IDGroup: '',
        Date: "",
        TypeTraining: "",
        EmployeeTraining: "",
        Content: "",
        Note: "",
      }
    };
  },
  methods: {
    openModalPlace() {
      VoerroModal.show("my-place-modal");
    },
    createFilter(queryString) {
      return el => {
        return el.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    querySearchName(queryString, cb) {
      var lst = this.nameMissionLst;
      var results = queryString
        ? lst.filter(this.createFilter(queryString))
        : lst;
      cb(results);
    },
    querySearchType(queryString, cb) {
      var lst = this.typeMissonLst;
      var results = queryString
        ? lst.filter(this.createFilter(queryString))
        : lst;
      cb(results);
    },
    addReport(re) {
      this.$message({
        message: 'tính năng này đang được phát triển',
        type: 'info'
      })
      // this.$refs[re].validate(valid => {
      //   this.form.places = this.placesLst;
      //   this.form.time = Date.today().toString("yyyy-MM-dd");
      //   this.form.status = 1;
      //   console.log(this.form);

      //   if (valid) {
      //     AddLstMission({
      //       mission: [this.form]
      //     }).then(res => {
      //       this.$emit("missionAdded", this.form);
      //       this.closeModal();
      //     });
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    closeModal() {
      VoerroModal.hide("new-report-modal");
    },
    fetchGroup(){
           GetLstGroup({token: Cookies.get('token')}).then(res=>{
           // alert('ok')
            this.lstGroup = res.Data
        })
      },
      fetchEmployee(group){
        getEmployeesByIdGroup({
          idGroup: group,
          token: Cookies.get('token')
        }).then(res => {
          this.emLst = res.Data;
        });
      }
  },
  created(){
    this.fetchGroup()
  }
}
</script>
<style>
.selectIDGroup .el-input__inner{
  border: 0 !important;
  border-radius: 0 !important;
  border-bottom: 1px solid #dcdfe6 !important;
}
.selectIDGroup .el-textarea__inner{
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #dcdfe6;
}
.modal-box{
    width: 50%;
}
</style>

