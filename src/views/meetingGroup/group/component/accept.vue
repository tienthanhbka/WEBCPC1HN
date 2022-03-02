<template>
  <div >
      <div >
    <el-row><el-col :span="12"><span style="font-weight: bold;">Tiêu đề:</span> {{ row.Title }} </el-col> <el-col :span="12"> <span style="font-weight: bold;">Sản phẩm:</span> {{ row.Product }}</el-col></el-row>
    <el-row><el-col :span="12"><span style="font-weight: bold;">Nhóm:</span> {{ row.IDGroup }} </el-col> <el-col :span="12"> <span style="font-weight: bold;">Người đào tạo:</span> {{ row.NameEmployee }}</el-col></el-row>
    <el-row><el-col :span="12"><span style="font-weight: bold;">Thời gian:</span> {{ row.TimeStart }} - {{ row.TimeEnd }} </el-col> <el-col :span="12"><span style="font-weight: bold;"> Ngày: </span> {{ row.Date }} </el-col></el-row>
    <div>
        <span style="font-weight: bold;">Nội dung:</span> {{ row.Content }}

    </div>
    <div> <span style="font-weight: bold;">Link 1:</span> <a :href="row.Link" target="_blank" >{{ row.Link }}</a> </div>
     <div> <span style="font-weight: bold;">Link 2:</span> <a :href="row.Link2" target="_blank" >{{ row.Link2 }}</a></div>

    </div>
      <iframe width="100%" height="700px" :src="row.Link"></iframe>
       <iframe width="100%" height="700px" :src="row.Link2"></iframe>
       <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      label-width="120px"
    >
     <el-form-item label="Nhận xét">
        <el-input v-model="form.CommentAccept"></el-input>
      </el-form-item>

      <el-form-item label="Nhân viên tham gia">
        <el-checkbox-group v-model="form.checkIn"  size="mini">
        <el-checkbox v-for="(em,index) in listEm" :key="index" :label="em.idEmployee+'('+em.nameEmployee+')'" border>{{ em.nameEmployee }}</el-checkbox>
        </el-checkbox-group>
        </el-form-item>

         <el-form-item label="Đánh giá cuộc họp">
        <el-checkbox-group v-model="form.check"  size="mini">
          <el-checkbox v-for="item in lstCheck" :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
        </el-form-item>

         <el-form-item label="Ghi chú">
        <el-input v-model="form.Note"></el-input>
      </el-form-item>

    </el-form>
    <el-button type="info" @click="modalNoAccept">Không đạt</el-button>
    <el-button type="success" @click="modalAccept">Xác nhận đạt</el-button>
  
  </div>
</template>
<script>
import { GetGroupEmployee,GetAllEmployeesByIdGroup } from "@/api/groups";
import Cookies from 'js-cookie'
import { AcceptMeetingGroup,NoAcceptMeetingGroup } from '@/api/meetingGroup';
export default {
  props:['row'],
  components:{

  },
  created() {
   this.getEmployee()
  },
  methods:{
     getEmployee(){
       GetAllEmployeesByIdGroup({idGroup: this.row.IDGroup}).then(response => {
        if(response.ResCode == 0){
            this.listEm = response.Data
        }
      });
    },
    modalAccept(){
        this.form.RowID = this.$props.row.RowID
        this.form.checkIn = this.form.checkIn.join()
        this.form.check = this.form.check.join()
        AcceptMeetingGroup(this.form).then(res=>{
            if(res.ResCode == 0){
                  this.$notify({
                    title: "Thành công",
                    message: "Đánh giá thành công",
                    position: 'top-left',
                     type: 'success',

                })
                this.$emit('click','ok')
            }
        })
    },

    modalNoAccept(){
        this.form.RowID = this.$props.row.RowID
         NoAcceptMeetingGroup(this.form).then(res=>{
            if(res.ResCode == 0){
                 this.$notify({
                    title: "Thành công",
                    message: "Đánh giá thành công",
                    position: 'top-left',
                     type: 'success',

                })
                this.$emit('click','ok') 
            }
        })
    }
  },
  watch: {
     row(){
       this.getEmployee()
     }
  },
  data() {
    return {
     form:{
         CommentAccept:"",
         checkIn:[],
         RowID:0,
         check:[],
         Note:''
     },
      placeModalVisible:false,
      teacherLst: [],
      proLst:[],
      listEm:[],
      lstCheck:['Báo cáo công việc','Kế hoạch triển khai CV','Đào tạo','Đánh giá']

    };
  }
};
</script>

<style>
@media only screen and ( max-width: 600px) {
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