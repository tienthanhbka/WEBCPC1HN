<template> </template>

<script>
export default {
  props: {
    values: Object
  },
  name: "HeaderReport",
  data() {
    return {
      mode: "viewByMonth",
      time: "",
      search: false,
      months: [],
      cusSearch: ""
    };
  },
  computed: {},
  methods: {
    selectAll() {
      this.mode = "viewAll";
      this.disableSelect = true;
    },
    selectMonth() {
      console.log("a");
      this.mode = "viewByMonth";
    }
  },
  created() {
    var d = new Date();
    for (let i = 0; i <= 12; i++) {
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      var lbl = (month < 10 ? "0" + month : month) + " - " + year;
      var val = year + "-" + (month < 10 ? "0" + month : month);
      this.months.push({ value: val, label: lbl });
      d.setMonth(d.getMonth() - 1);
    }
    this.time = this.months[0].value;
  }
};
</script>
<style lang="scss" scoped>
.card-header {
  padding: 5px;

  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  .item-header {
    border-radius: 40px;
    background-color: #eee;
    padding: 8px;
    font-size: 10pt;
    margin: 0 3px;
    cursor: pointer;
  }
  .select-months {
    text-align: center;
    flex-grow: 1;
  }
  .box-search {
    text-align: center;
    flex-grow: 1;
  }
  .item-header.active {
    background-color: rgba(253, 1, 1, 0.226);
    color: rgb(218, 18, 18);
  }
}
</style>
