<template>
  <div  shadow="always" style="margin: auto; position: relative;">
    <div>
        <el-card >
          Phiếu đánh giá
      <el-input placeholder="Nhập tiêu đề"  v-model="title"></el-input>
       <!-- <el-input placeholder="Nhập điểm KPI"  v-model="KPI"></el-input> -->
         <div style="margin-top: 20px;" >
     <el-radio v-model="otc" label="0">ETC</el-radio>
    <el-radio v-model="otc" label="1">OTC</el-radio>
     <el-radio v-model="otc" label="15">PS</el-radio>
      <el-radio v-model="otc" label="16">PG</el-radio>
       <el-radio v-model="otc" label="18">Công nợ</el-radio>
    <el-radio v-model="otc" label="3">Người giám sát</el-radio>
 
  </div> 
      <div>
      </div>
        </el-card>
    </div>
    <div :key="acc">
    <div  v-for="(line, index) in lines" :key="index" class="row">
      <div >
          <el-card >
        <el-row style="margin-bottom: 20px;">
          <el-col :span="1">
            <el-tooltip v-if="index > 0 " content="Up" > <el-button type="text" @click="up(index)"><i  class="fas fa-arrow-up"></i></el-button> </el-tooltip>
             <el-tooltip v-if="index == 0 && lines.length > 1" content="Down" > <el-button type="text" @click="dow(index)" ><i class="fas fa-arrow-down"></i></el-button> </el-tooltip>
            <div class="grid-content bg-purple-light" style="padding-top: 0px; margin-left: 3px;">
              <!-- <i class="far fa-question-circle"></i> -->
            </div>
          </el-col>
           <el-col :span="1">
            <div class="grid-content bg-purple-light" style="padding-top: 10px; margin-left: 3px;">
              <!-- <i class="far fa-question-circle"></i> -->
              <span> {{ index }}. </span>
            </div>
          </el-col>
          
          <el-col :span="21">
            <div class="grid-content bg-purple-light">
              <el-input placeholder="Kỹ năng thực hiện" v-model="line.skill"></el-input>
            </div>
             <div class="grid-content bg-purple-light">
              <el-input placeholder="Mục tiêu cụ thể" v-model="line.target"></el-input>
            </div>
          </el-col>
        
        </el-row>
        <el-row>
          <el-col :span="15">
              <div class="grid-content bg-purple">
            <el-select v-model="line.part" placeholder="Chọn phần" >
              <el-option
                  v-for="item in types"
                  :key="item.Description"
                  :label="item.Description"
                  :value="item.Description">
                </el-option>
              </el-select>
              </div>
          </el-col>
          <el-col :span="8">
               <div class="grid-content bg-purple">
          <el-input placeholder="Nhập điểm tối đa" type="number" v-model="line.point"></el-input>
              </div>
          </el-col>
        </el-row>
        
             
          <question :data="index"  @change="addOK"></question>
          <el-tooltip></el-tooltip>
        
           <el-tooltip content="Thêm câu hỏi" placement="top"><el-button v-if="index + 1 === lines.length" @click="addLine" type="text" ><i class="fas fa-plus"></i></el-button></el-tooltip>
          <!-- <el-button type="primary" icon="fas fa-plus" v-if="index + 1 === lines.length" @click="addLine" ></el-button> -->
         </el-card>
      </div>
    </div>
  </div>
    <!-- <div ><el-button type="primary" icon="fas fa-plus"  @click="addLine" > Tạo phiếu khảo sát</el-button> </div> -->
   <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000"><el-button type="primary" icon="fas fa-plus"  @click="addDefine" > Xác nhận tạo định nghĩa</el-button> </div>
  </div>
 
</template>

<script>

import Question from "@/views/roleplay/define/component/Question/index"

import { GetPartValue,createReportDefine } from '@/api/reportRole'
export default {
  name: 'PhoneNumberLine',
   components: {
    Question
  },

  data () {
    return {
      lines: [],
      types:[],
      acc: 0,
      otc:1,
      typeQuestion: '',
      TimeStart: '',
      TimeEnd: '',
      KPI: 0,
      Public: true,
      //currentComponent: 'question1',
      title: '',
      blockRemoval: true,

    }
  },
  watch: {
    lines () {
      this.blockRemoval = this.lines.length <= 1
    }
  },
  methods: {
    addLine () {
      let checkEmptyLines = this.lines.filter(line => line.skill === null)
      if (checkEmptyLines.length >= 1 && this.lines.length > 0) return
      this.lines.push({
        skill: null,
         target: null,
        part: null,
         point: null,
     
      })
    },
    addDefine(){
        var req = {
        question: this.lines,
        title: this.title,
        otc: this.otc,
       
      };
         createReportDefine(req).then(respon => {
        if(respon.ResCode == 0 ){
          this.$notify({
            title: 'Thành công',
            message: 'Tạo định nghĩa thành công',
            type: 'success',
            position: 'top-left'
          })
          this.$emit('click',"a");
        }
      })

    },
    removeLine (lineId) {
      if (!this.blockRemoval) this.lines.splice(lineId, 1)
    },
   
    addOK(selects){
      //console.log(this.lines)
      console.log(selects);
      var parsedobj = JSON.parse(JSON.stringify(selects))
      this.lines[parsedobj[0].arr].select = parsedobj
      //console.log(parsedobj[0].arr)
      //alert('6454')
    },
    up(index){
      //alert(index)
      var b = this.lines[index];
      this.lines[index] = this.lines[index - 1];
      this.lines[index -1 ] = b;
      this.acc++;
      //console.log(this.lines)
    },
    dow(index){
       var b = this.lines[index];
      this.lines[index] = this.lines[index + 1];
      this.lines[index +1 ] = b;
      this.acc++;
    },
    getPartVaule(){
      GetPartValue().then(res =>{
        this.types = res.Data
      })
    }

  },
  mounted () {
    this.addLine()
  },
  created(){
     GetPartValue().then(res =>{
        this.types = res.Data
      })
  }
}
</script>

<style>
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