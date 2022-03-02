<template>
  <div style="padding-left:10px;padding-right:10px">
    <el-dialog
      title="Hoạt động"
      :close-on-click-modal="false"
      :visible.sync="blogEditorVisible"
      custom-class="medium-modal"
    >
      <blog-editor :gId="gId" @activityCreated="onActivityCreated" :activity="currentAc"></blog-editor>
    </el-dialog>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="8" :md="8" :lg="8">
        <div class="demo">
          <b-card class="first-card"></b-card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="16" :md="16" :lg="16">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class>
              <b-card></b-card>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div>
              <b-card></b-card>
            </div>
          </el-col>
        
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div>
              <b-card></b-card>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div>
              <b-card></b-card>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div>
              <b-card></b-card>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div>
              <b-card></b-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="6" :md="6" :lg="6">
        <div>
          <b-card></b-card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="6" :md="6" :lg="6">
        <div>
          <b-card></b-card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="6" :md="6" :lg="6">
        <div>
          <b-card></b-card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="6" :md="6" :lg="6">
        <div>
          <b-card></b-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import BCard from "./components/card";
import BlogEditor from './components/blog-editor'
export default {
  components: {
    BCard,
    BlogEditor
  },
  data() {
    return {
      blogEditorVisible:true
    }
  },

};
</script>
<style lang="css" scoped>
.demo {
  /* background: red; */
  width: 100%;
  height: 100%;
}
</style>
<style lang="css">
.el-row {
    display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display:         flex;
  flex-wrap: wrap;
  width: 100%;
}

.el-col{
    display: flex;
    

}
.el-col>div{
    width: 100%;
} 
.first-card>div{
    height: 100%;
}
.first-card .item-2{
    height: 100%;
    margin-bottom:10px
}
</style>