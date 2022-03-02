<template>
  <modal id="confirm-modal" style=" margin: auto;" ref="confirm-modal"  v-cloak>
    
    <template slot="title"> Chấm điểm hoàn thành công việc: </template>
    <div slot="body">
      <div style="margin: auto">
         <template >[{{ row.Title }}] {{row.Content}}</template>
      </div>
       <el-form ref="form" label-width="120px" size="mini"> 
      <div style="margin-top: 20px;">
         <div class="cl1"  >
          <template >KPIcs: {{ row.KPIBase }}</template>
        </div>
         <div class="cl1"  >
          <template >Khối lượng: {{ row.Rate }}</template>
        </div>
        <div class="cl1" >
        
                 <el-form-item label="KPI">
                   <el-input v-model="row.KPI"></el-input>
                </el-form-item>      
      </div>
      </div>
        <div style="margin-top: 20px;">
         <div style=" width: 200px; padding-left: 20px;" >
          <template >Phạt KPIcs: {{ row.PenatyScore }}</template>
        </div>
        
      </div>
        <div style="clear: both;">
          <div style="margin-top: 20px;">
        <el-form-item label-width="55px" label="Lỗi">
        
                   <el-input v-model="row.Error"></el-input>
        </el-form-item>
        </div>
        <!-- <div style="float: right;">
          <el-button type="danger" icon="el-icon-circle-plus-outline" @click="addLine" >Thêm lỗi</el-button>
        </div> -->
         
      <div  v-for="(line, index) in lines" :key="index">
        <div style=" float: left; width: 200px; padding-left: 20px; ">
        
                 <el-form-item label="Mức lỗi">
                   <el-input v-model="line.LevelError"></el-input>
                </el-form-item>
      </div>
      <div style="float: left; width: 200px; padding-left: 20px; ">
        
                 <el-form-item label="Số lượng">
                   <el-input v-model="line.Number"></el-input>
                </el-form-item>
      </div>
      <div style="clear: both;"></div>
      </div>
      </div>
       </el-form>
       <!-- <el-button type="info" @click="addLine" >Thêm lỗi</el-button> -->
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="danger" icon="el-icon-circle-plus-outline" @click="addLine" >Thêm lỗi</el-button>
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="confirm" >Xác nhận</el-button>
    </div>
  </modal>
</template>
<script>
import { confirm } from "@/api/getRequest";
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
         form: {
           RowID: 0,
           Rate: 0,
           //KPI: this.$props.row.KPI
           
         },
         lines:[]
    }  
  },
  
  methods: {
    
    closeModal() {
      VoerroModal.hide('confirm-modal');
    },
    confirm(){
       this.form.RowID = this.$props.row.RowID;
       var kpi = this.$props.row.KPI
       for(var i=0;i<this.lines.length; i++ ){
         kpi += (this.lines[0].LevelError)*(this.$props.row.PenatyScore);
       }
       //var kpi = this.$props.row.KPI + (this.$props.row.LevelError)*(this.$props.row.PenatyScore)
       var req = {
            RowID: this.$props.row.RowID,
            KPI: kpi,
            IDOrder: this.$props.row.ID,
            IDEmployee: Cookies.get('idEmployee'),
            token: Cookies.get('token'),
            lines: this.lines
        }
      //console.log(req);
       confirm(req).then(response => {
        if(response.ResCode == 0){
         
          this.$emit('click-something', kpi)
          this.$notify({
            title: 'Thành công',
            message: 'Chấm điểm thành công',
            type: 'success',
            position: 'top-left'
          })
        VoerroModal.hide('confirm-modal');
        //console.log(response.ResCode);
        this.listLoading = false; 
        }
      });
    },
    addLine () {
      let checkEmptyLines = this.lines.filter(line => line.Number === null)
      if (checkEmptyLines.length >= 1 && this.lines.length > 0) return
      this.lines.push({
        Number: null,
        LevelError: null,
      })
    },
  },
  created() {
      
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
<style>
.inline-block{
  display: inline;
  float: left;
}

element.style {
    width: 55px;
}

.cl1{
  float: left; width: 200px;
  padding-left: 20px;
}

  @media only screen and (max-width: 600px) {
    .cl1{
   width: 100%;
  
}
  }
</style>
