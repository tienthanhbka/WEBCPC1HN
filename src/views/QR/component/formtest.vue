<template>
    <div>
        <el-form label-position="top">
            <el-form-item label="Tiêu đề">
                <el-input v-model="form.subject"></el-input>
            </el-form-item>
             <el-form-item label="Nội dung">
                <el-input   type="textarea" :rows="3" v-model="form.message"></el-input>

                 <el-checkbox-group v-model="form.message" >
                    <el-checkbox v-for="value in lstInfor" :label="value" :key="value">{{value}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" @click="onSubmit">Xác nhận</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { CancelInfor } from '@/api/employeeInfor'
export default {
    props:['row'],
    data(){
        return {
            lstInfor:['Ảnh đại diện','Thông tin gia đình','Email cá nhân', 'Số điện thoại', 'Số CMND/ Thẻ CCCD','Khác'],
            form: {
                subject:'',
                message:[],
                RowID: 0
            }
        }
    },
    methods:{
        onSubmit(){
            this.form.RowID = this.row[0].RowID
            if(Array.isArray(this.form.message)){
                this.form.message=this.form.message.join()
               
            }
            CancelInfor(this.form).then(res=>{
                 this.$notify({
                    title:'Thành công',
                    message: 'Gửi yêu cầu xác nhận lại thông tin thành công',
                    type:'success',
                    position:'top-left'
                })
                this.row[0].Status=0
                this.form.subject=''
                this.form.message=[]
                this.form.RowID=0
                this.$emit('noacceptOK','ok')
            })
        }
    },
    created(){
        this.form.subject= this.$route.params.id
    }
}
</script>