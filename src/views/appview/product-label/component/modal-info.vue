<template>
  <div class="container-em">
    <el-input
      v-model="search"
      @keyup.enter.native="searchEm"
      placeholder="Tìm kiếm tên | mã nhân viên"
      size="small"
    ></el-input>
    <div v-loading="loadingData">
      <div class="box-em" v-for="(item, index) in data" :key="index">
        <el-row :gutter="10">
          <el-col
            :span="3"
            v-if="item.Rank == 1 || item.Rank == 2 || item.Rank == 3"
          >
            <img
              v-if="item.Rank == 1"
              src="data:image/png;base64,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"
              alt="em-hot"
            />
            <img
              v-if="item.Rank == 2"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABgCAMAAACjfDWBAAAC8VBMVEUAAADRzsjLpHzs7OttYFaQeWXgybPi4uH99Obe3dz+/v7///9gXl3///91YlR9Y1Lq5+L///+pqahjYV/+/v77+/v39/jk5ORhYF/+/v6+ilylcknLmmSHg33CmWvt7Oi3non///////+kckxfXVzGlFz9/f3BjVn+/v6CgoL39O5dXVz////+/v7///+WjoiVbEqIaE2wimVfX1+vkHb///9pZ2ZfXFvQ0NBpZ2Tp4ddgX1/8/PzJmWP9/f3////0yH52c3H6+vrr3cNjY2Osg2GueUyZcVJtX1Scg2+hnJiUhHd4ZFWqq6t2dnbDkl36+Peqqqncyre9ilj////i4uJmYFump6eDbV3z8/OZk47s4dKld1H///6lpaX///9zYlf///+kcUilpqZ+fHtdXVz////u4MuenZnt4MjQ0M+qckarqaTKnnagk4mrq6v///95d3X///+7tbKJiYmMemr///94bWRqZWHgy6i3j2O+v77n0quenp6Lak7Jysl8fHz6+vrFxMG1iF/Dw8O1tbX///+DgYCaiHmSbEyrravr387Mysfr4dCWgm/j4+Ps4siegWvi1LRtbW2ff2TR0dHMzMzg4ODi4uLe3t7X19fs7Ozy8vLOzs7q6uro6OjZ2dnm5uba2trk5OT39/fw8fDV1dXR0dHc3Nz////v7+/5+fn29vX7+/vu7u7T09P9/f3Q0NCgoKCampqUlJPU1NTExMSxsbGqqqqfn5+Ghoays7LJycnHx8elpaWIiIf09PSjpKOcnJy1trWur66WlpWEhIOBgYFxcHCSkpLBwsFvb27FxcW4ubh7e3u3t7a0tLSsrKyioqKNjY2Mi4u9vb2np6fimQCKioq/v79zc3NkZGSYmZh2dXW6urqPj494eHjioBqXl5d/f35sbGxfX1+8vbypqKdoaGhdXFzhmQDXtW5nYVzl2L7Zzrh9fX3GuqzRqlu7p5DWsme+sqKAZlHimQGurauoo5udjH/gwH1WNEGIAAAAlnRSTlMAEAMPCxAGzwrQx7ymIhwU9uu+eV9LHNDAtFg4/v39/PXk2tbJg3ttV1BGOC4pEf37+vj49fTx68/Ny7akmpeJcGhnZmBSRkQs/fz8+/r4+PTz8fHw39vVzsvJu66r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"
              alt="em-hot"
            />
            <img
              v-if="item.Rank == 3"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABgCAMAAACjfDWBAAAC91BMVEUAAADdrXL3yne/iVSudEvBi12pcUWrckj////+/Pr//v6pcUWrdEfAi1C+iVmqckapc0apcUXounOqc0fjtGvhsHOocUW2flLNqIzOm2Sqc0aqckbuv3W2f1G2fVH///3////ou4HdqnDDj1y+iVj1yHvjs2uzfU/EkGH///6+iFupcUXouHGpcUS/ilmsc0f/////+/PGnX3vwXW0flHnuG3////lt2zHkV7////tw4Cpckb////ImG7VpGXPnXGxek2/ilr////////////////////nt3PNponpu3DryaDyxnP////gpEPfrnLw2Lb/+On////frHDeqnDhr3HzxHbbp2+pcUXcqXDjsXHot3PZpW/vwHXgrnG4g1Xxw3Xru3TpuXPzxnbimQD/1HnmtXLwwnXtvnS0flG8hlvXom784LPsvXTks3L1yHa2gFOxe0740o+rdEiveEzls3PYpG+6hVb61I+/iFz73rDuwoHaqWb////85sP3w3HTnWvAilnjtoHWoWvPnWHEkFv979v73avUomOtdkr86cz+47f81o/+1oHMmV/k5OTX19f4zX/dqGzismvdrGjDjV/e3t7+7NH73KT/3Jj40Ir5zXjmq3TWpWXSnWTFj2D+8+H+7tb/57j3yXX00qL72Z7+2pL71Ijjp3P4yXLfsGnon17lmlz/6b795L3rv4H70YD7z3j5zHLmpWX348jOsJ3gsX3MlmbXoWXIkmTHkl3/68T42anzz5n/2YruxYr0yYXhrGrosWjrpWL/7cv02LX+4qv/36D51ZjpunnqsXTfo27zw23RmGjipij437/t1b7vzqTtyKHvx5Lku5HovYHhs3nxwHjptWnIlV7ZlFi8iFi/iFLqskr/9unl3MrPrZP0zJDerXi8k3X0vW3wtGq2iGXinmHLlmHJiFT06Nn+5LHz1KvowprWqHnuuHbktmvPi1bgpzzY0sbkyrbfvZ3uvXHMn2/rumzOmljiqU7YsIXEjVLw8PBfWhhmAAAAUnRSTlMAEP4GEP75GAn+xW1OCu/Eqjkb7ObPlET+/tu2eFwjEu3Pz4NsXiv17OHW0cGhmC4c/v3y6trS0b+vqIVpW+vTwq2ilH9LOfbwl0RCK/TZz5ZNm+FV/gAA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"
              alt="em-hot"
            />
          </el-col>
          <el-col
            :span="item.Rank == 1 || item.Rank == 2 || item.Rank == 3 ? 15 : 18"
          >
            <p class="employee">
              <span v-if="item.Rank != 1 && item.Rank != 2 && item.Rank != 3"
                >{{ item.Rank }}. </span
              >{{ item.EmployeeName }}
            </p>
            <p class="sale">{{ item.Branch }}</p>
          </el-col>
          <el-col :span="6">
            <p class="id">
              {{ item.EmployeeCode }}
            </p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { GetEmployeeProductSale } from "@/api/saleHeader";

export default {
  props: ["item"],
  data() {
    return {
      data: [],
      search: "",
      loadingData: false,
      dataLst: []
    };
  },
  methods: {
    fetchData() {
      this.data = [];
      this.dataLst = [];
      this.loadingData = true;
      const req = {
        UserName: this.$route.params.username,
        Token: this.$route.params.token,
        ProductID: this.item.ProductID
      };
      GetEmployeeProductSale(req).then(res => {
        if (res.RespCode == 0) {
          this.dataLst = res.EmployeeLst;
          this.dataLst.forEach((item, index) => {
            item.Rank = index + 1;
          });
          this.data = this.dataLst;
          this.loadingData = false;
        }
      });
    },
    searchEm() {
      this.data = this.dataLst.filter(
        data =>
          !this.search ||
          data.EmployeeName.toLowerCase().includes(this.search.toLowerCase()) ||
          data.EmployeeCode.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    search() {
      this.searchEm();
    },
    item() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss">
.container-em {
  padding-bottom: 10px;

  .box-em {
    padding: 30px 10px 30px 30px;
    //box-shadow: rgba(0 0 0 / 5%) 0px 1px 2px 0px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    border-radius: 10px;
    margin-bottom: 5px;
    font-size: 10pt;
    font-weight: 600;
    img {
      width: 30px;
      object-fit: cover;
    }
    &:nth-of-type(2) {
      background-image: linear-gradient(#de6262, #ffb88c);
      padding: 20px 10px 20px 20px;
      margin: 0 10px 5px 10px;
      color: #fff;
    }
    &:nth-of-type(3) {
      background-image: linear-gradient(#eacda3, #d6ae7b);
      padding: 20px 10px 20px 20px;

      margin: 0 10px 5px 10px;
      color: #fff;
    }
    &:nth-of-type(4) {
      background-image: linear-gradient(#4ca1af, #c4e0e5);
      padding: 20px 10px 20px 20px;

      margin: 0 10px 5px 10px;

      color: #fff;
    }
    p {
      margin: 0;
    }
    .employee {
      margin-bottom: 10px;
    }
    .sale {
      font-size: 9pt;
    }
    .id {
      float: right;
      margin-right: 10px;
    }
  }
}
</style>
