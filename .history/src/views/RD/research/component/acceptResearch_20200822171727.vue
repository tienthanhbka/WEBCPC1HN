<template>
  <el-form
    ref="form"
    :model="ResearchInfo"
    label-position="top"
    label-width="200px"
    size="mini"
  >
    <el-form-item label="Tên thành phẩm">
      <el-input v-model="ResearchInfo.ProductName"></el-input>
    </el-form-item>
    <el-form-item label="Link báo cáo tiêu chuẩn">
      <el-input v-model="ResearchInfo.LinkReport"></el-input>
    </el-form-item>
    <!-- <el-form-item label="Hoạt chất">
    <el-input v-model="IdeaInfor.ActiveElement"></el-input>
  </el-form-item> -->
    <el-form-item label="Hoạt chất chính">
      <!-- <el-input v-model="form.name" ></el-input> -->
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="ResearchInfo.ActiveElement"
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
          <div class="idGroup">{{ item.ActiveElement }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="Hàm lượng">
      <el-input v-model="ResearchInfo.Concentration"></el-input>
    </el-form-item>
    <el-form-item label="Quy cách đóng gói">
      <el-input v-model="ResearchInfo.Packing"></el-input>
    </el-form-item>

    <!-- <div  v-for="(line, index) in lines" :key="index" class="row">
      <div >
          <el-card >
          <div>
               <el-form-item label="Hàm lượng">
                    <el-input v-model="line.Concentration"></el-input>
                </el-form-item>

                <line :data="data"></line>
                 <el-form-item label="Ghi chú">
                    <el-input v-model="line.Concentration"></el-input>
                </el-form-item>
          </div>
           <el-tooltip content="Thêm câu hỏi" placement="top"><el-button v-if="index + 1 === lines.length" @click="addLine" type="text" ><i class="fas fa-plus"></i></el-button></el-tooltip>
         </el-card>
      </div>
    </div> -->

    <el-form-item size="large">
      <el-button type="primary" v-if="research != null" @click="onSubmit"
        >Phê duyệt nghiên cứu</el-button
      >
      <el-button @click="cancelacceptResearch">Hủy</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { CreateResearch, UpdateResearch, ApproveResearch } from "@/api/research"
import { GetMaterial } from "@/api/material"
import { GetActiveElement } from "@/api/defaultRD"
import Line from "@/views/RD/research/component/lineResearch"
import Cookies from "js-cookie"
export default {
  props: ['research'],
  components: { Line },
  created() {
    this.initForm()
    GetActiveElement({
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      Search: ""
    }).then(res => {
      this.ActiveElement = res.ActiveElementLst
    })
    //alert('ok')
    this.addLine()
  },
  watch: {
    research() {
      this.initForm()
    }
  },
  data() {
    return {
      ActiveElement: [],
      ResearchInfo: {
        ResearchId: "",
        ProductId: "",
        IdeaId: "",
        ProductName: "",
        LinkReport: "",
        ActiveElement: "",
        Concentration: "",
        Packing: ""
      },
      lines: [],
      MaterialLst: []
    }
  },
  methods: {
    addLine() {
      this.lines.push({
        Concentration: null,
        Note: null,
        TypeMaterial: null,
        MaterialId: null,
        MaterialName: null
      })
    },
    cancelacceptResearch() {
      this.$emit('cancelacceptReasearchOK')
    },
    querySearch2(queryString, cb) {
      var links = this.ActiveElement
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
      this.ResearchInfo.ActiveElement = item.ActiveElement
      //this.getMaterial()
    },
    createFilter2(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link))
        return (
          link.ActiveElement.toLowerCase().indexOf(
            queryString.toLowerCase()
          ) === 0
        )
      }
    },
    //   getMaterial(){
    //       GetMaterial({
    //            Token: Cookies.get('Token'),
    //                 UserName: Cookies.get('UserName'),
    //                 ActiveElement: this.ResearchInfo.ActiveElement
    //       }).then(res=>{
    //           this.MaterialLst= res.MaterialLst
    //       })
    //   },
    onSubmit() {
        var rep = {
          Token: Cookies.get("token"),
          UserName: Cookies.get("idEmployee"),
          ResearchId: this.ResearchInfo.ResearchId,
          Status: 3
        }
        ApproveResearch(rep).then(res => {
          this.$notify({
            title: "Thành công",
            message: "Phê duyệt thành công",
            type: "success",
            position: "top-left"
          })
          this.research.ProductId = this.ResearchInfo.ProductId
          this.research.IdeaId = this.$route.params.id
          this.research.ProductName = this.ResearchInfo.ProductName
          this.research.LinkReport = this.ResearchInfo.LinkReport
          this.research.ActiveElement = this.ResearchInfo.ActiveElement
          this.research.Concentration = this.ResearchInfo.Concentration
          this.research.Packing = this.ResearchInfo.Packing
          this.research.Status = 3
          this.$emit('acceptResearchOK', this.ResearchInfo)
        })
    },
    initForm() {
      if (this.research == null) {
        this.ResearchInfo.ProductId = null
        this.ResearchInfo.IdeaId = this.$route.params.id
        this.ResearchInfo.ProductName = null
        this.ResearchInfo.LinkReport = null
        this.ResearchInfo.ActiveElement = null
        this.ResearchInfo.Concentration = null
        this.ResearchInfo.Packing = null
      } else {
        this.ResearchInfo.ResearchId = this.research.ResearchId
        this.ResearchInfo.ProductId = this.research.ProductId
        this.ResearchInfo.IdeaId = this.$route.params.id
        this.ResearchInfo.ProductName = this.research.ProductName
        this.ResearchInfo.LinkReport = this.research.LinkReport
        this.ResearchInfo.ActiveElement = this.research.ActiveElement
        this.ResearchInfo.Concentration = this.research.Concentration
        this.ResearchInfo.Packing = this.research.Packing
      }
    }
  }
}
</script>
