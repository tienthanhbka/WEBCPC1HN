<template>
  <div class="components-container">
    <split-pane split="vertical" :default-percent="20" @resize="resize">
      <template slot="paneL" >
        <div class="left-container">
          <el-tree
            ref="tree"
            :props="props"
            :load="loadNode"
            lazy
            highlight-current
            :expand-on-click-node="false"
            @check-change="handleCheckChange"
          >
            <span
              class="custom-tree-node"
              @click="nodeClicked(node,data)"
              @mouseleave="node.data.hovered=false"
              @mouseenter="node.data.hovered=true"
              slot-scope="{ node, data }"
            >
              <template v-if="node.level===1">
                <span>
                  <span @mouseover="node.clicked=true">
                    <i class="fas fa-building"/>
                    {{node.label}}
                  </span>
                  <span class="group-btn" v-if="node.data.hovered">
                    <el-button size="mini" type="text" @click="addBranch(data,node)">Thêm Chi nhánh</el-button>
                  </span>
                </span>
              </template>
              <template v-else-if="node.level===2">
                <span>
                  <i class="fas fa-hotel"/>
                  {{node.label}}
                </span>
                <span class="group-btn" v-if="node.data.hovered">
                  <el-button size="mini" type="text" @click="addGroup(data, node)">Thêm Nhóm</el-button>
                  <el-button
                    size="mini"
                    type="text"
                    style="color:#ff7675"
                    @click="removeBranch(node, data)"
                  >Xóa chi nhánh</el-button>
                </span>
              </template>
              <template v-else-if="node.level===3">
                <span>
                  <i class="fas fa-users"/>
                  {{node.label}}
                </span>
                <span class="group-btn" v-if="node.data.hovered">
                  <el-button size="mini" type="text" @click="addEmployee(data, node)">Thêm Nhân viên</el-button>
                  <el-button
                    size="mini"
                    type="text"
                    style="color:#ff7675"
                    @click="remove(node, data)"
                  >Xóa nhóm</el-button>
                </span>
              </template>
              <template v-else>
                <span>
                  <i class="fas fa-user"/>
                  {{node.label}}
                </span>
                <span class="group-btn" v-if="node.data.hovered">
                  <el-button
                    size="mini"
                    type="text"
                    style="color:#ff7675"
                    @click="remove(node, data)"
                  >Xóa nhân viên</el-button>
                </span>
              </template>
            </span>
          </el-tree>
        </div>
      </template>
      <template slot="paneR" >
        <div class="right-container">
          <company v-if="thisLevel==1"></company>
          <branch v-else-if="thisLevel===2"></branch>
          <group v-else-if="thisLevel===3"></group>
          <employee v-else-if="thisLevel===4"></employee>
          <div v-else>NO</div>
        </div>
      </template>
    </split-pane>
  </div>
</template>
<script>
import splitPane from "vue-splitpane";
import {
  getBranch,
  getGroupByBranch,
  getEmployeesByIdGroup,
  AddBranch
} from "@/api/groups";
import Company from './components/company'
import Branch from './components/branch'
import Group from './components/group'
import Employee from './components/employee'
export default {
  name: "SplitGroup",
  components: { splitPane ,Company,Branch,Employee},
  data() {
    return {
      thisLevel:0,
      props: {
        label: "name",
        children: "zones",
        isLeaft: 'leaft',
        
      },
      count: 1
    };
  },
  methods: {
    resize() {
      console.log("resize");
    },
    nodeClicked(node,data){

        this.thisLevel =node.level;

    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "Công ty CPC1HN" ,hovered:false,leaft:true }]);
      } else if (node.level === 1) {
        getBranch().then(res => {
          var dt = [];
          for (let x in res.Data) {
            dt.push({ name: res.Data[x].nameBrach,hovered:false});
          }

          resolve(dt);
        });
      } else if (node.level === 2) {
        getGroupByBranch({ branch: node.label }).then(res => {
          var dt = [];
          for (let x in res.Data) {
            dt.push({ name: res.Data[x].idGroup,hovered:false });
          }

          resolve(dt);
        });
      } else if (node.level === 3) {
        getEmployeesByIdGroup({ idGroup: node.label }).then(res => {
          var dt = [];
          for (let x in res.Data) {
            dt.push({ name: res.Data[x].nameEmployee, hovered:false,leaft:true  });
          }

          resolve(dt);
        });
      } else return resolve([]);
    },
    addBranch(data,node) {
      
      if(node.expanded==false){
        node.expanded = true;
      }
      
      this.$prompt("", "Thêm chi nhánh", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          inputPattern: "",
          inputErrorMessage: "Invalid Email"
        }).then( value => {
          if(node.expanded){
            AddBranch({branchName:value.value}).then(res=>{
              this.$refs.tree.append({
              hovered:false,
              name:value.value
            },node);
            this.$message({
            type: "success",
            message: "Đã thêm chi nhánh:" + value.value
            });
            });
            
          }

          
        }).catch(() => {});
      
      
    },
    addGroup(data, node) {
      this.$prompt("", "Thêm nhóm trong " + node.label, {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputPattern: "",

        inputErrorMessage: "Invalid Email"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "Your email is:" + value
          });
        })
        .catch(() => {});
    },
    addEmployee(data, node) {
      this.$prompt("", "Thêm nhân viên trong " + node.label, {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputPattern: "",

        inputErrorMessage: "Invalid Email"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "Your email is:" + value
          });
        })
        .catch(() => {});
    }
  },
  
  created() {}
};
</script>
<style  scoped>
.treenode .group-btn {
  margin-left: 10px;
}
.components-container {
  position: relative;
  height: 100vh;
}
.left-container {
  /* background-color: #f38181; */
  height: 100%;
  overflow-y: scroll;
  overflow-x: scroll;
}
.right-container {
  /* background-color: #fce38a; */
  height: 100%;
  overflow-y: scroll;
  overflow-x: scroll;
}
</style>