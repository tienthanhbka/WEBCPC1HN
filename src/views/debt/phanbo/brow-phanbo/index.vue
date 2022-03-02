<template>
    <div>
        <div class="inline-block">
        <el-select v-model="currentGroup" placeholder="Chọn nhóm">
          <el-option
            v-for="item in groupsLst"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          ></el-option>
        </el-select>
        
      </div>
    </div>
</template>
<script>
export default {
    
}
</script>