<template>
  <div shadow="always">
    <div
      v-for="(select, index) in ContentSelectLst"
      v-bind:key="index"
      class="row"
    >
      <div>
        <el-row style="margin-top: 2px;">
          <el-col :span="1">
            <div
              class="grid-content bg-purple-light"
              style="padding-top: 10px;"
            >
              <el-checkbox></el-checkbox>
            </div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content bg-purple-light">
              <el-input
                placeholder="Nhập phương án"
                @change="change"
                v-model="select.Select"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="grid-content bg-purple-light">
              <!-- <el-tooltip ><el-button @click="removeLine(index)" type="text" ><i class="fas fa-backspace"></i></el-button></el-tooltip> -->
              <el-button
                type="text"
                style="color: grey"
                @click="removeLine(index)"
                ><i class="fas fa-backspace"></i
              ></el-button>
              <!-- <el-button type="primary" icon="el-icon-edit" v-if="index + 1 === lines.length" @click="addLine" circle></el-button> -->
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-if="index + 1 === ContentSelectLst.length">
        <el-row>
          <el-col :span="1">
            <div
              class="grid-content bg-purple-light"
              style="padding-top: 10px;"
            >
              <el-checkbox></el-checkbox>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">
              <el-tooltip content="Thêm phương án" placement="top"
                ><el-button @click="addLine" type="text"
                  ><i class="fas fa-plus"></i></el-button
              ></el-tooltip>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhoneNumberLine",
  props: ["data", "SelectLst"],
  data() {
    return {
      ContentSelectLst: [],
      ques: "",
      radio: "",
      typeQuestion: "",
      title: "",
      blockRemoval: true,

      types: [
        {
          label: "Multiple choice",
          value: "1"
        },
        {
          label: "Checkboxes",
          value: "2"
        },
        {
          label: "Paragraph",
          value: "3"
        }
      ]
    };
  },
  watch: {
    ContentSelectLst() {
      this.blockRemoval = this.ContentSelectLst.length <= 1;
    }
  },
  methods: {
    addLine() {
      let checkEmptyLines = this.ContentSelectLst.filter(
        select => select.Select === null
      );
      if (checkEmptyLines.length >= 1 && this.ContentSelectLst.length > 0)
        return;
      this.ContentSelectLst.push({
        Select: null,
        arr: this.$props.data
      });
    },
    removeLine(lineId) {
      if (!this.blockRemoval) {
        this.ContentSelectLst.splice(lineId, 1);
        this.change();
      }
    },
    ChangeQuestion() {
      //alert('djdj')
    },
    change() {
      this.$emit("change", this.ContentSelectLst);
      //alert('ok');
    }
  },
  mounted() {
    var _this = this;
    //console.log(this.$props.SelectLst)
    this.$props.SelectLst.forEach(fun);

    function fun(item, index, arr) {
      var a = {
        Select: null,
        arr: _this.$props.data
      };
      a.Select = item.Select;
      _this.ContentSelectLst.push(a);
    }
    //this.addLine()
  }
};
</script>
