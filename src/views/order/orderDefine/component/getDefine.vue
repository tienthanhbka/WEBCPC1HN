<template>
  <modal id="get-define-modal" ref="get-define-modal" v-cloak>
    <template slot="title"
      >Thêm nhóm việc (dịch vụ)</template
    >
    <div></div>
    <div slot="body">
      <el-form ref="form" label-width="120px" size="mini">
        <el-form-item label="Bộ phận">
          <el-select
            v-model="value"
            placeholder="Chọn nhóm"
            filterable
            clearable
            @change="changeGroup"
          >
            <el-option
              v-for="item in options"
              :key="item.idGroup"
              :label="item.idGroup"
              :value="item.idGroup"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Loại">
          <!-- <el-input v-model="form.name" ></el-input> -->
          <el-autocomplete
            popper-class="my-autocomplete"
            style="width:100%"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="Chọn"
            @select="handleSelect"
          >
            <i
              class="el-icon-edit el-input__icon"
              slot="suffix"
              @click="handleIconClick"
            >
            </i>
            <template slot-scope="{ item }">
              <div class="Service">{{ item.Service }}</div>
              <span class="Note">{{ item.Note }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="Ghi chú">
          <el-input v-model="form.Note"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="createService"
        >Thêm</el-button
      >
    </div>
  </modal>
</template>
<script>
import {
  setOrder,
  getOffice,
  createOrderSend,
  getService,
  CloneServiceDefine
} from "@/api/order";
import Cookies from "js-cookie";
import { link } from "fs";
export default {
  props: ["service", "options", "groups"],
  data() {
    return {
      links: [],
      state: "",
      timeout: null,
      tableData: [],
      selectedPlace: [],
      //  options: [{
      // }],
      optionsService: this.$props.service,
      //option: this.$props.service,
      value: Cookies.get("idGroup"),
      form: {
        IDService: "",
        Note: "",
        IDGroup: ""
      },
      radio: "1"
    };
  },

  methods: {
    // fetchOffice(){
    //   this.listLoading = true;
    //   getOffice().then(response => {
    //     this.options = response.Data;
    //     console.log(this.options);
    //     this.listLoading = false;
    //   });
    // },
    querySearch(queryString, cb) {
      var links = this.optionsService;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      // call callback function to return suggestion objects
      cb(results);
    },
    createFilter(queryString) {
      return Service => {
        return (
          Service.Service.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return [this.optionsService];
    },
    handleSelect(item) {
      this.state = item.Service;
      this.form.IDService = item.IDService;
      //console.log(item);
    },
    handleIconClick(ev) {
      //console.log(ev);
      this.state = ev.Service;
      this.IDService = ev.IDService;
    },
    closeModal() {
      VoerroModal.hide("get-define-modal");
    },
    createService() {
      this.form.IDGroup = this.$props.groups;

      CloneServiceDefine(this.form).then(response => {
        if (response.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Tạo dịch vụ thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("click-something", this.form);
          VoerroModal.hide("get-define-modal");
          this.listLoading = false;
        }
      });
    },
    changeGroup() {
      var rep = {
        idGroup: this.value
      };
      //console.log(rep);
      this.listLoading = true;
      getService(rep).then(response => {
        this.optionsService = response.Data;
        //console.log(this.optionsService);
        this.listLoading = false;
      });
      this.state = "";
      //loadAll();
    }
  },
  created() {},
  mounted() {
    this.links = this.optionsService;
  }
  // watch: {
  //   radio:function(){
  //     alert(this.radio)
  //   }
  // },
};
</script>

<style>
.my-autocomplete {
  width: 500px;
}
</style>
