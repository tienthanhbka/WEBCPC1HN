<template>
  <div style="back-ground: blue;">
    
      <iframe width="100%" height="700px" :src="row.Link"></iframe>
       <iframe width="100%" height="700px" :src="row.Link2"></iframe>
  
  </div>
</template>
<script>
import { GetGroupEmployee,GetAllEmployeesByIdGroup } from "@/api/groups";
import Cookies from 'js-cookie'
import { GetProductLst,createRole,GetTeacherLst,AddTeacher,UploadVideo } from '@/api/roleplay';
export default {
  props:['row'],
  components:{

  },
  created() {
   
  },

  methods:{
  
    

    
  },
  watch: {
     
  },
  data() {
    return {
     form:{
         link:""
     },
      placeModalVisible:false,
      teacherLst: [],
      proLst:[],
     
     
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