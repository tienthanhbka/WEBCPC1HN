<template>
<div>
<div shadow="always" style="margin: auto; width: 700px; position: relative;">
   <el-tabs type="border-card" @tab-click="handleClick">
    <el-tab-pane label="Gửi lỗi">
      <div>
        <el-upload
        ref="upload"
        :multiple="true"
        :data="upLoadData"
  action="https://icpc1hn.work/api/Help/Report"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :auto-upload="false"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>

<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<div class="mgt20">
  1. Phần mềm lỗi
</div>
<div class="mgt20">
   <el-radio v-model="upLoadData.app" label="an"> App Android</el-radio>
  <el-radio v-model="upLoadData.app" label="io">App Iphone</el-radio>
</div>
<div class="mgt20">
  2. Loại
</div>
<div class="mgt20">
   <el-radio v-model="upLoadData.type" label="1">Call</el-radio>
  <el-radio v-model="upLoadData.type" label="2">Bài kiểm tra</el-radio>
</div>
<div class="mgt20">
   3. Tiêu đề
</div>
<div class="mgt20">
  <el-input placeholder="Nhập tiêu đề" v-model="upLoadData.title"></el-input>
</div>
<div class="mgt20">
  4.Chi tiết
</div>
<div class="mgt20">
   <el-input placeholder="Chi tiết lỗi" v-model="upLoadData.description"></el-input>
</div>
<!-- <el-button @click="submitUpload">
    Upload
</el-button> -->
    </div>
    </el-tab-pane>
    <el-tab-pane label="Danh sách lỗi">
      <listError></listError>
    </el-tab-pane>
  </el-tabs>
</div>
 <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000"><el-button type="primary" icon="fas fa-plus"  @click="submitUpload" >Báo cáo lỗi</el-button> </div>
 </div>
</template>

<script>
import {generateUUID} from '@/utils';
import ListError from './component/listError';
import  Cookies  from 'js-cookie'
  export default {
    components: { ListError },
    data() {
      return {
          upLoadData:{
              token: Cookies.get('token'),
              title: '',
              description:'',
              uuid:'',
              type: '',
              app: '',
          },
        dialogImageUrl: '',
        dialogVisible: false,
        radio: ''
      };
    },
    methods: {
        submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    created(){
        this.upLoadData.uuid = generateUUID();
    }
  }
</script>
<style>
.mgt20{
  margin-top: 20px;
}
</style>
