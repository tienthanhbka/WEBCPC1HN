<template>
  <div shadow="always">
     <div slot="body">
      <el-form ref="form" label-position="top"  label-width="120px" size="mini"> 
                 <el-form-item label="Người nhận">
                  <el-input v-model="email" ></el-input>
                </el-form-item>

                 <el-form-item label="Nội dung">
                  <el-input type="textarea" rows="3" v-model="content" ></el-input>
                </el-form-item>
              </el-form>
    </div>
      <div slot="footer" style="float: right;">
      <!-- <el-button type="info" @click="closeModal" >Hủy</el-button> -->
      <el-button type="success" icon="el-icon-success" @click="sendMail" >Gửi mail</el-button>
    </div>
  </div>
</template>

<script>
import { SendMailReport } from '@/api/report'

export default {
  name: 'PhoneNumberLine',
  props:['id'],
  data () {
    return {
      typeQuestion: '',
      email:'',
      content:'',
      title: '',
      form:{
          Email: "",
          Content: "",
          ID: ""
      },
      require: true,
      blockRemoval: true,
    }
  },
  watch: {
    
  },
  methods: {
   sendMail(){

        //this.form.Title = this.$props.lines[0].Title
        this.form.Email = this.email
        this.form.Content = this.content
        //this.form.NameEmployee = this.$props.lines[0].nameEmployee
        this.form.ID = this.$props.id
        //console.log(this.form)

        SendMailReport(this.form).then(response => {
           if(response.ResCode == 0){
               this.$notify({
                   title: 'Thành công',
                   message: 'Gửi mail thành công',
                   type: 'success',
                   position: 'top-left'
               })
           }
       })
   }
   
  },
  mounted () {
     //console.log(this.$props.line)
   // this.addLine()
  }
}
</script>