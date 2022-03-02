<template>
 <div>
    <!-- <template slot="title"> Chấm điểm hoàn thành công việc: </template> -->
    <div slot="body">
      <div style="margin: auto">
         <template ><b> [{{ row.Title }}] {{row.Content}}</b></template>
      </div>
       <el-form ref="form" label-position="top" label-width="120px" size="mini"> 
    <el-row style="margin-top: 20px;">
       <el-col :span="6">
           <el-form-item  label="Khối lượng đạt">
                   <el-input v-model="row.Rate"></el-input>
        </el-form-item>
        </el-col>
          <el-col :span="6">
           <el-form-item  label="Chất lượng">
                   <el-input v-model="row.Quality"></el-input>
        </el-form-item>
        </el-col>
        <el-col  :span="6">
           <el-form-item  label="x KPIcs">
                   <el-input disabled="true" v-model="row.KPIBase"></el-input>
        </el-form-item>
        
       </el-col>
        
         <el-col  :span="6">
           <el-form-item  label="= KPI">
                   <el-input disabled="true" v-model="row.KPI"></el-input>
        </el-form-item>
               
        </el-col>
       
      </el-row>
        <el-row >
              <el-col :span="18">
        <el-form-item  label="Lỗi">
                   <el-input  :rows="2" type="textarea" v-model="row.Error"></el-input>
        </el-form-item>
          </el-col>
       
      </el-row>

        <div >
          <div >
      
        </div>
        <!-- <div style="float: right;">
          <el-button type="danger" icon="el-icon-circle-plus-outline" @click="addLine" >Thêm lỗi</el-button>
        </div> -->
         
      <div  v-for="(line, index) in lines" :key="index">
          <el-row style="border-bottom: 1px solid grey;">
               <el-col :span="6">
                 <el-form-item label="Điểm phạt cơ sở">
                   <el-input disabled="true" v-model="line.PenatyScore"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                 <el-form-item label="Mức lỗi">
                   <el-input v-model="line.LevelError"></el-input>
                </el-form-item>
                </el-col>
      <el-col :span="6">
                 <el-form-item label="Số lượng">
                   <el-input v-model="line.Number"></el-input>
                </el-form-item>
      </el-col>
      
      </el-row>
      
      </div>
        <el-row >
              <el-col :span="18">
        <el-form-item v-if="this.SubKPI < 0"  label="Điểm trừ">
                   <el-input disabled="true" v-model="SubKPI"></el-input>
        </el-form-item>
          </el-col>
      </el-row>
      
      </div>
       </el-form>
       <!-- <el-button type="info" @click="addLine" >Thêm lỗi</el-button> -->
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="danger" icon="el-icon-circle-plus-outline" @click="addLine" >Thêm lỗi</el-button>
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="confirm" >Xác nhận</el-button>
    </div>
 </div>
</template>
<script>
import { confirm } from "@/api/getRequest";
import Cookies from 'js-cookie'
export default {
    props: ['row','error'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
        add: true,
         options: [{
        }],
         value: '',
         SubKPI:0,
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
       var kpi = this.$props.row.Rate * this.$props.row.KPIBase * this.$props.row.Quality
       for(var i=0;i<this.lines.length; i++ ){
         kpi += (this.lines[0].LevelError)*(this.$props.row.PenatyScore);
       }
       //var kpi = this.$props.row.KPI + (this.$props.row.LevelError)*(this.$props.row.PenatyScore)
       var req = {
            RowID: this.$props.row.RowID,
            KPI: kpi,
            Rate: this.$props.row.Rate,
            Quality: this.$props.row.Quality,
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
        PenatyScore: this.$props.row.PenatyScore 
      })
    },
  },
  created() {
     //alert("ok")
      
      
  },
  watch: {
    function(){
      this.$props.row.KPI= this.$props.row.Rate*this.$props.row.KPIBase*this.$props.row.Quality
    //alert('ok')
    console.log(this.lines);
    if(this.add == true){
    for(var i=0;i<this.$props.error.length; i++ ){
            
              this.lines.push({
            Number: this.$props.error[i].Number,
            LevelError: this.$props.error[i].LevelError,
            PenatyScore: this.$props.row.PenatyScore 
          })
          }
           this.add = false
    }
          var SubKPI = 0;
          for(var i=0;i<this.lines.length; i++ ){
              SubKPI += (this.lines[i].LevelError)*(this.$props.row.PenatyScore)*(this.lines[i].Number);
          }
          this.SubKPI = SubKPI
    
      
    },

  },
  computed: {
     function(){
       //console.log(this.$props.error);
       this.$props.row.KPI= this.$props.row.Rate*this.$props.row.KPIBase*this.$props.row.Quality
       //alert('ok')
       console.log(this.lines);
       if(this.add == true){
        for(var i=0;i<this.$props.error.length; i++ ){
        // alert('ok2')
          this.lines.push({
        Number: this.$props.error[i].Number,
        LevelError: this.$props.error[i].LevelError,
        PenatyScore: this.$props.row.PenatyScore 
      })
       }
       this.add = false
      }
      var SubKPI = 0;
       for(var i=0;i<this.lines.length; i++ ){
         SubKPI += (this.lines[i].LevelError)*(this.$props.row.PenatyScore)*(this.lines[i].Number);
       }
       this.SubKPI = SubKPI
       
    }
  }
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
   .el-table td div {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
}

.el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
    width: 50%;
}
  }
</style>
