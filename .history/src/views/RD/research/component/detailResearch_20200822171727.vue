<template>
  <div class="info-window-content">
          <div class="loading-drawer" v-if="research==null">
            <i class="el-icon-loading loading-text"></i>
          </div>
          <div>
            <el-divider content-position="center">Chi tiết đề xuất</el-divider>
          </div>
          <div>
            •Mã ý tưởng:
            <b>{{research.IdeaId}}</b>
          </div>
          <div>
            •Mã sản phẩm:
            <b>{{research.ProductId}}</b>
          </div>
          <div>
            •Tên sản phẩm:
            <b>{{research.ProductName}}</b>
          </div>
          <div>
            •Hoạt chất chính:
            <b>{{research.ActiveElement}}</b>
          </div>
          <div>
            •Hàm lượng:
            <b>{{research.Concentration}}</b>
          </div>
          <div>
            •Dạng đóng gói:
            <b>{{research.Packing}}</b>
          </div>
          <div>
            •Nguyên liệu:
            <b>{{research.ResearchLineLst}}</b>
          </div>
          <div>
            •Người tạo:
            <b>{{research.CreaterId}}</b>
          </div>
          <div>
            •Thời gian tạo:
            <b>{{research.TimeCreate}}</b>
          </div>
          
           <div v-if="research.ApproveId">
            •Người duyệt:
            <b>{{research.ApproveId}}</b>
          </div>
          <div v-if="research.ApproveId">
            •Thời gian duyệt:
            <b>{{research.TimeApprove}}</b>
          </div>
          <div>
            •Trạng thái:
            <el-tag :type="research.Status | ideaStatusColor">
                {{ research.Status | ideaStatusText }}
              </el-tag>
          </div>
        </div>
</template>
<script>
export default {
    props:['research'],
    watch:{
    },
    data(){
      return{
        
      }
    },
    methods:{
     
    }
}
</script>
<style lang="css" scoped>
.info-window-content div {
  margin-top: 3px;
}
</style>
