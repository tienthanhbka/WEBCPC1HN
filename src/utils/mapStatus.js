import Vue from "vue";
const ideaStatusMap = {
  0: {
    text: "Đã hủy",
    type: "danger"
  },
  1: {
    text: "Mới tạo",
    type: ""
  },
  2: {
    text: "Chờ duyệt",
    type: "warning"
  },
  3: {
    text: "Đã duyệt",
    type: "success"
  },
  5: {
    text: "Đã đánh giá",
    type: ""
  }
};

Vue.filter("ideaStatusText", function(status) {
  return ideaStatusMap[status].text;
});
Vue.filter("ideaStatusColor", function(status) {
  return ideaStatusMap[status].type;
});
