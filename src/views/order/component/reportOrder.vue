<template>
  <modal id="report-order-modal" ref="report-order-modal"  v-cloak>
    <template slot="title">Báo cáo công việc: {{row.Name}} </template>
    <template>{{ row.Content }} </template>
   
    <div slot="body">
     {{ row.Content }}

     <el-input placeholder="Bình luận" v-model="Note"></el-input>
    </div>
    

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
       <el-button style="margin-right:150px;"  type="danger" icon="el-icon-success" @click="cancel" >Từ chối</el-button>

      <el-button type="warning" icon="el-icon-success" @click="processing" >Đang xử lý</el-button>
     
      <el-button type="success" icon="el-icon-success" @click="report" >Đã xong</el-button>
    </div>
  </modal>
</template>
<script>
import { report } from "@/api/getRequest";
import Cookies from 'js-cookie'
export default {
    props: ['row'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
         options: [{
        }],
         value: '',
         Note: '',
         form: {
           name: '',
           content: '',
           sendToOffice: '',
           note: '',
           deadline: '',
           product: '',
           idEmployee: '',
           idGroup: '',
           clone: '',
         }
    }  
  },
  
  methods: {
    // fetchOffice() {
    //   this.listLoading = true;
    //   getOffice().then(response => {
    //     this.options = response.Data;
    //     //console.log(this.options);
    //     this.listLoading = false; 
    //   });
    // },
    closeModal() {
      VoerroModal.hide('report-order-modal');
    },
    report(){
        var rep = {
            IDOrder: this.$props.row.IDOrder,
             IDGroup: this.$props.row.IDGroup,
             Note: this.Note,
            Status: 6,
            token: Cookies.get('token'),
        }
       report(rep).then(response => {
        if(response.ResCode == 0){
          //this.options = response.Data;
          //this.$emit
          this.$notify({
            title: 'Thành công',
            message: 'Báo cáo thành công',
            type: 'success',
            position: 'top-left',
          })
          this.$emit('click-something', 'ok');
        VoerroModal.hide('report-order-modal');
        //console.log(response.ResCode);
        this.listLoading = false; 
        }
      });
    },
    processing(){
        var rep = {
             IDOrder: this.$props.row.IDOrder,
             IDGroup: this.$props.row.IDGroup,
              Note: this.Note,
            Status: 3,
            token: Cookies.get('token'),
        }
       report(rep).then(response => {
        if(response.ResCode == 0){
          //this.options = response.Data;
          //this.$emit
          this.$notify({
            title: 'Thành công',
            message: 'Nhận việc thành công',
            type: 'success',
            position: 'top-left',
          })
          this.$emit('click-something', 'ok');
        VoerroModal.hide('report-order-modal');
        //console.log(response.ResCode);
        this.listLoading = false; 
        }
      });
    },
    cancel(){
        var rep = {
             IDOrder: this.$props.row.IDOrder,
             IDGroup: this.$props.row.IDGroup,
              Note: this.Note,
            Status: 0,
            token: Cookies.get('token'),
        }
       report(rep).then(response => {
        if(response.ResCode == 0){
          //this.options = response.Data;
          //this.$emit
          this.$notify({
            title: 'Thành công',
            message: 'Từ chối thành công',
            type: 'success',
            position: 'top-left',
          })
          this.$emit('click-something', 'ok');
        VoerroModal.hide('report-order-modal');
        //console.log(response.ResCode);
        this.listLoading = false; 
        }
      });
    }
  },
  created() {
    //  this.fetchOffice();
      
      //console.log(this.$props.row);
  },
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