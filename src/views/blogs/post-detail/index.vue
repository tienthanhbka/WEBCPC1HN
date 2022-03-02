<template>
    <div v-html="content" class="tiny-mce-content">
        
    </div>
</template>
<script>
import {GetPost} from '@/api/blog'
export default {
    data() {
        return {
            pId:null,
            content:'',
        }
    },
    created() {
        this.pId = this.$route.params.id;
        this.fetchData();
    },
    methods: {
        fetchData(){
            GetPost({
                id:this.pId
            }).then(res=>{
                this.content = res.Data.Content
            })
        }
    },
}
</script>