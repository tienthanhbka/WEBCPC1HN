<template>
  <div>
    <el-form ref="form" :model="MaterialInfo" label-position="top" label-width="200px" size="mini">
       <div style="margin-bottom:20px;">Nguyên liệu: {{ material.MaterialName }} </div>
    <el-form-item size="large">
        <el-button type="danger" v-if="material!=null" @click="onSubmit" icon="el-icon-delete">Xóa nguyên liệu</el-button>
        <el-button @click="cancelde">Hủy</el-button>
    </el-form-item>
    </el-form>
</div>
</template>
<script>
import { RemoveMaterial  } from '@/api/material'
import Cookies from 'js-cookie'
export default {
    props:['material'],
    created(){
    },
    data(){
        return{
            ActiveElement:[],
            MaterialInfo:{
                MaterialId: "",
                MaterialName: "",
                CommerceName: "",
                ActiveElement: "",
                DesIdentify: "",
                SupplierId: "",
                Note: "",
                TypeMaterial: ""
        }
        }
    },
    methods:{
        onSubmit(){
            var rep ={
                Token: Cookies.get('token'),
                UserName: Cookies.get('idEmployee'),
                MaterialId:  this.material.MaterialId
            }
        RemoveMaterial(rep).then(res=>{
            this.$notify({
                title:'Thành công',
                message:'Xóa nguyên liệu thành công',
                type: 'success',
                position:'top-left'
            })
            this.$emit('delMaterialOK',this.MaterialInfo)
        })
        },
       cancelde(){
           this.$emit('deletecancelOK')
       }
    }
}
</script>