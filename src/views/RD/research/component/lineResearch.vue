<template>
  <div shadow="always">
    <el-form-item label="Loại nguyên liệu">
      <!-- <el-input v-model="form.name" ></el-input> -->
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="TypeMaterial"
        :fetch-suggestions="querySearch2"
        placeholder="Gõ gợi ý và chọn"
        @select="handleSelect2"
      >
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix"
          @click="handleIconClick2"
        >
        </i>
        <template slot-scope="{ item }">
          <div class="idGroup">{{ item.ProductName }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>

    <el-form-item label="Nguyên liệu">
      <!-- <el-input v-model="form.name" ></el-input> -->
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="line.MaterialId"
        :fetch-suggestions="querySearch2"
        placeholder="Gõ gợi ý và chọn"
        @select="handleSelect2"
      >
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix"
          @click="handleIconClick2"
        >
        </i>
        <template slot-scope="{ item }">
          <div class="idGroup">{{ item.ProductName }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "PhoneNumberLine",
  props: ["data", "MaterialLst"],
  data() {
    return {
      ActiveElement: ""
    }
  },
  watch: {
    selects() {
      this.blockRemoval = this.selects.length <= 1
    }
  },
  methods: {
    querySearch2(queryString, cb) {
      var links = this.MaterialLst
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links
      // call callback function to return suggestion objects
      cb(results)
    },
    handleIconClick2(ev) {
      //console.log(ev);
    },
    handleSelect2(item) {
      this.TypeMaterial = item.ProductName
    },
    createFilter2(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link))
        return (
          link.ProductName.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    getMaterial() {
      GetMaterial({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        ActiveElement: this.ResearchInfo.ActiveElement
      }).then(res => {
        this.MaterialLst = res.MaterialLst
      })
    },
    change() {
      this.$emit('change', this.selects)
      //alert('ok');
    }
  },
  mounted() {
    this.addLine()
  }
}
</script>
