<template>
  <div shadow="always">
    <div v-for="(select, index) in selects" v-bind:key="index" class="row">
      <div >
          <el-row style="margin-top: 2px;">
          <el-col :span="1">
            <div class="grid-content bg-purple-light" style="padding-top: 10px;">
              <el-radio></el-radio>
            </div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content bg-purple-light">
              <el-input placeholder="Nhập phương án" @change="change" v-model="select.select"></el-input>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="grid-content bg-purple-light"> 
              <el-button type="text" style="color: grey"  @click="removeLine(index)" ><i class="fas fa-backspace"></i></el-button>
            
            </div>
          </el-col>
          </el-row>
        
      </div>
       <div v-if="index + 1 === selects.length" >
          <el-row >
          <el-col :span="1">
            <div class="grid-content bg-purple-light" style="padding-top: 10px;">
              <el-radio></el-radio>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">
              <el-tooltip content="Thêm phương án" placement="top"><el-button  @click="addLine" type="text" ><i class="fas fa-plus"></i></el-button></el-tooltip>
            </div>
          </el-col>
          </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhoneNumberLine',
  props: ['data','SelectLst'],
  data () {
    return {
      selects: [],
      ques: '',
      radio: '',
      typeQuestion: '',
      title: '',
      blockRemoval: true,
     
       types: [
        {
          label: 'Multiple choice',
          value: '1'
        }, {
          label: 'Checkboxes',
          value: '2'
        }, {
          label: 'Paragraph',
          value: '3'
        }
      ]
    }
  },
  watch: {
    selects () {
      this.blockRemoval = this.selects.length <= 1
    }
  },
  methods: {
    addLine () {
      let checkEmptyLines = this.selects.filter(select => select.select === null)
      if (checkEmptyLines.length >= 1 && this.selects.length > 0) return
      this.selects.push({
        select: null,
        arr: this.$props.data
      })
    },
    removeLine (index) {
      if (!this.blockRemoval) this.selects.splice(index,1)
      
    },
    change(){
      this.$emit('change',this.selects)
    }
   
  },
  mounted () {
    if(this.$props.SelectLst){
    var _this = this
    // this.selects = this.SelectLst.split(';',100)
    // console.log(this.selects)
      this.$props.SelectLst.forEach(fun)
      function fun(item,index,arr){
          var a ={
               select: null,
            arr: _this.$props.data
          }
            a.select = item
            _this.selects.push(a)
      }
    }
    this.addLine()
  }
}
</script>