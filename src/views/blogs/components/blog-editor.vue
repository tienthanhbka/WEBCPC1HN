<template>
    <div>
        <el-form :model="form" class="demo-form-inline">
      <el-form-item label="Tên hoạt động">
        <el-input v-model="form.title" placeholder="Tên hoạt động"></el-input>
      </el-form-item>
      <label>Nội dung</label>
      <br />
      <el-form-item>
        <tiny-mce v-model="form.content"></tiny-mce>
      </el-form-item>
        </el-form>
        <el-button @click="btnOKClick()">Thêm bài viết</el-button>
    </div>
</template>
<script>
import TinyMce from "@/components/Tinymce";
import {AddNewPost} from '@/api/blog'
export default {
    components:{
        TinyMce
    },
    data() {
        return {
            form:{
                title:'',
                content:'',
            }
        }
    },
    methods: {
        btnOKClick(){
            AddNewPost(this.form)
        }
    },
}
</script>