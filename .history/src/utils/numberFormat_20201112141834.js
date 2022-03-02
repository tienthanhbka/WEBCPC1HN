import Vue from "vue";
import { parseTime } from "./index.js";
const missionStatusMap = {
  0: {
    text: "Đã hủy",
    type: "danger"
  },
  "-1": {
    text: "Duyệt chậm",
    type: "warning"
  },
  1: {
    text: "Mới tạo",
    type: ""
  },
  2: {
    text: "Quản lý tạo",
    type: "success"
  },
  3: {
    text: "Đã duyệt",
    type: "success"
  },
  4: {
    text: "Đã nộp ảnh",
    type: "success"
  }
};
const placeStatusMap = {
  0: {
    text: "Đã hủy",
    type: "danger"
  },
  1: {
    text: "Mới tạo",
    type: "primary"
  },
  2: {
    text: "Đã duyệt",
    type: "success"
  }
};
const inforStatusMap = {
  100: {
    text: "Đã nghỉ việc",
    type: "warning"
  },
  null: {
    text: "Cập nhật lại",
    type: "warning"
  },
  0: {
    text: "Cập nhật lại",
    type: "warning"
  },
  1: {
    text: "Chờ duyệt",
    type: "danger"
  },
  2: {
    text: "Đã duyệt",
    type: "success"
  }
};
const invoiceStatusMap = {
  0: {
    text: "Bị hủy",
    type: ""
  },
  1: {
    text: "Chờ duyệt",
    type: ""
  },
  2: {
    text: "Bị treo",
    type: ""
  },
  3: {
    text: "Đã duyệt",
    type: ""
  },
  4: {
    text: "Duyệt 1 phần",
    type: ""
  },
  100: {
    text: "Đang được duyệt",
    type: ""
  }
};

const shipStatusMap = {
  1: {
    text: "Mới tạo",
    type: "red"
  },
  2: {
    text: "Đang chuyển",
    type: "danger"
  },
  6: {
    text: "Đã báo cáo",
    type: ""
  },
  10: {
    text: "Hoàn thành",
    type: ""
  }
};

const requestStatusMap = {
  1: {
    text: "Mới tạo",
    type: "red"
  },
  2: {
    text: "Đang chuyển",
    type: "danger"
  },
  6: {
    text: "Đã báo cáo",
    type: ""
  },
  10: {
    text: "Hoàn thành",
    type: ""
  }
};

const orderStatusMap = {
  0: {
    text: "Đã hủy",
    type: "danger"
  },
  1: {
    text: "Mới tạo",
    type: "info"
  },
  2: {
    text: "Đã dừng",
    type: "warning"
  },
  3: {
    text: "Đang xử lý",
    type: "warning"
  },
  6: {
    text: "Đã xong",
    type: "warning"
  },
  10: {
    text: "Đã hoàn thành",
    type: "succsess"
  }
};

const handOverStatusMap = {
  0: {
    text: "Đã hủy",
    type: "danger"
  },
  1: {
    text: "Mới tạo",
    type: "info"
  },
  2: {
    text: "Chờ duyệt",
    type: "warning"
  },
  3: {
    text: "Không được duyệt",
    type: "warning"
  },
  6: {
    text: "Đã xong",
    type: "warning"
  },
  10: {
    text: "Đã duyệt",
    type: "succsess"
  }
};
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
    type: "warning"
  }
};
const callStatusMap = {
  0: {
    text: "Đã hủy",
    color: "#B71C1C",
    type: "danger"
  },
  1: {
    text: "Mới tạo",
    color: "#607D8B",
    type: "info"
  },
  4: {
    text: "Đã Checkin",
    color: "#03A9F4",
    type: "info"
  },
  5: {
    text: "Đã Checkout",
    color: "#6200EA",
    type: "info"
  },
  6: {
    text: "Đã hoàn thành",
    color: "#009688",
    type: ""
  },
  7: {
    text: "Có trao đổi",
    color: "",
    type: "warning"
  },
  8: {
    text: "Có trao đổi",
    color: "",
    type: "warning"
  },
  9: {
    text: "Có trao đổi",
    color: "",
    type: "warning"
  },
  10: {
    text: "Đã đánh giá",
    color: "#4CAF50",
    type: "success"
  }
};
const KPIStatusMap = {
  0: {
    text: "Đã hủy",
    color: "danger",
    type: "danger"
  },
  1: {
    text: "Đang thực thi",
    color: "",
    type: "success"
  }
};
const ServiceStatusMap = {
  1: {
    text: "Mới tạo",
    color: "",
    type: "infor"
  },
  2: {
    text: "Chỉnh sửa",
    color: "",
    type: "warning"
  },
  10: {
    text: "Khóa chỉnh sửa",
    color: "",
    type: "success"
  }
};

const ServicePublicMap = {
  1: {
    text: "Dịch vụ",
    color: "",
    type: "infor"
  },
  0: {
    text: "Nội bộ",
    color: "",
    type: "warning"
  }
};
const CouponStatusMap = {
  0: {
    text: "Đã hủy",
    color: "danger",
    type: "danger"
  },
  1: {
    text: "Mới tạo",
    color: "",
    type: "primary"
  },

  2: {
    text: "Xác nhận tiền về",
    color: "",
    type: "success"
  },
  3: {
    text: "Duyệt bản kê",
    color: "",
    type: "success"
  },
  4: {
    text: "Treo",
    color: "",
    type: "warning"
  },
  5: {
    text: "Chờ xác nhận",
    color: "",
    type: "success"
  },
  8: {
    text: "Xác nhận tiền về, duyệt bảng kê",
    color: "",
    type: "success"
  },
  9: {
    text: "Xác nhận thu tiền",
    color: "",
    type: "success"
  },
  10: {
    text: "Áp thanh toán",
    color: "",
    type: "success"
  },
  11: {
    text: "Đã thu chi phí",
    color: "",
    type: "success"
  }
};

const PhanBoStatusMap = {
  0: {
    text: "Đã hủy",
    color: "danger",
    type: "danger"
  },
  1: {
    text: "Mới tạo",
    color: "",
    type: "info"
  },
  4: {
    text: "Treo",
    color: "",
    type: "warning"
  },
  6: {
    text: "ASMD",
    color: "",
    type: "primary"
  },
  8: {
    text: "GĐD",
    color: "",
    type: "success"
  },
  10: {
    text: "KTD",
    color: "",
    type: "success"
  }
};

const TargetStatusMap = {
  0: {
    text: "Đã hủy",
    color: "danger",
    type: "danger"
  },
  1: {
    text: "Chờ duyệt",
    color: "",
    type: "warning"
  },
  2: {
    text: "Đã duyệt",
    color: "",
    type: "success"
  }
};

const TypeQuestionStatusMap = {
  1: {
    text: "Tự luận",
    color: "success",
    type: "success"
  },
  2: {
    text: "Chọn 1 phương án",
    color: "",
    type: "success"
  },
  3: {
    text: "Chọn nhiều phương án",
    color: "",
    type: "success"
  }
};
const ReportStatusMap = {
  0: {
    text: "Đã hủy",
    color: "danger",
    type: "danger"
  },
  1: {
    text: "Chờ duyệt",
    color: "",
    type: "warning"
  },
  2: {
    text: "Đã duyệt",
    color: "",
    type: "success"
  }
};
const Box = {
  0: {
    text: "Kiện nguyên"
  },
  1: {
    text: "Kiện lẻ"
  }
};
const MeetingHeaderStatusMap = {
  0: {
    text: "Đã hủy",
    color: "danger",
    type: "danger"
  },
  1: {
    text: "Mới tạo",
    color: "",
    type: "info"
  },
  100: {
    text: "Đạt",
    color: "",
    type: "success"
  }
};

const RoleStatusMap = {
  0: {
    text: "Hủy",
    color: "danger",
    type: "danger"
  },
  1: {
    text: "Mới tạo",
    color: "",
    type: "info"
  },
  2: {
    text: "Đã xếp lịch",
    color: "",
    type: "success"
  },
  3: {
    text: "Đã thực hiện role",
    color: "",
    type: "success"
  },
  4: {
    text: "Đã nộp video",
    color: "",
    type: "success"
  },
  5: {
    text: "Không đạt",
    color: "",
    type: "warning"
  },
  6: {
    text: "Đã chấm điểm",
    color: "",
    type: "success"
  },
  7: {
    text: "Nộp lại video",
    color: "",
    type: "warning"
  },
  10: {
    text: "Đạt",
    color: "",
    type: "success"
  }
};
const FeeRequestHeaderStatusMap = {
  0: {
    text: "Đã hủy",
    color: "danger",
    type: "danger"
  },
  1: {
    text: "Mới tạo",
    color: "",
    type: "info"
  },
  4: {
    text: "treo",
    color: "",
    type: "warning"
  },
  6: {
    text: "Đã duyệt",
    color: "",
    type: "primary"
  },

  8: {
    text: "Đề nghị CP",
    color: "",
    type: "primary"
  },
  9: {
    text: "Chưa chi trả",
    color: "",
    type: "primary"
  },
  10: {
    text: "Đã chi trả",
    color: "",
    type: "success"
  }
};
const CommissonLineStatusMap = {
  0: {
    text: "Hủy",
    color: "danger",
    type: "danger"
  },
  null: {
    text: "Chưa nhập",
    color: "info",
    type: "info"
  },
  1: {
    text: "Chờ duyệt",
    color: "",
    type: "warning"
  },
  4: {
    text: "Treo",
    color: "",
    type: "danger"
  },
  6: {
    text: "ASMD",
    color: "",
    type: "primary"
  },
  8: {
    text: "GĐD",
    color: "",
    type: "success"
  },
  10: {
    text: "KTD",
    color: "",
    type: "success"
  }
};
const WorkOldStatusMap = {
  0: {
    text: "Thử việc"
  },
  3: {
    text: "3 tháng"
  },
  6: {
    text: "6 tháng"
  },
  10: {
    text: "1 năm"
  },
  20: {
    text: "2 năm"
  },
  30: {
    text: "3 năm"
  },
  40: {
    text: "4 năm"
  }
};
const PositionStatusMap = {
  1: {
    text: "Nhân viên"
  },
  2: {
    text: "Trưởng nhóm SS-ASM"
  },
  3: {
    text: "Trưởng phòng"
  },
  4: {
    text: "Giám đốc chi nhánh"
  },
  5: {
    text: "Tổng giám đốc"
  }
};
Vue.filter("toDate", function(str) {
  if (str != null) {
    return str.substring(0, 10);
  } else return "";
});
Vue.filter("toVND", function(num) {
  if (num) {
    var n = 0;
    var x = 3;
    var c = "-";
    var s = null;
    var strNum = Number(num);
    return strNum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + " đ";
    // var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    //     num = Number.prototype.toFixed(Math.max(0, ~~n));

    // return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','))+ ' đ';
  }
  return num;
});
Vue.filter("toPercent", function(num) {
  if (num) {
    var n = 0;
    var x = 3;
    var c = "-";
    var s = null;
    var strNum = Number(num);
    return strNum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    // var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    //     num = Number.prototype.toFixed(Math.max(0, ~~n));

    // return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','))+ ' đ';
  }
  return num;
});
Vue.filter("toDMY", function(str) {
  if (str == null) {
    return "";
  }
  return Date.parse(str).toString("dd/MM/yyyy");
});
Vue.filter("toDMYHM", function(str) {
  if (str == null) {
    return "";
  }
  return Date.parse(str).toString("dd/MM/yyyy HH:mm");
});
Vue.filter("numbered", function(num) {
  if (num == null) return "--";
  var strNum = Number(num);
  return strNum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
});
Vue.filter("BoxType", function(status) {
  return Box[status].text;
});
Vue.filter("missionStatusText", function(status) {
  return missionStatusMap[status].text;
});
Vue.filter("missionStatusColor", function(status) {
  return missionStatusMap[status].type;
});
Vue.filter("placeStatusColor", function(status) {
  return placeStatusMap[status].type;
});
Vue.filter("placeStatusText", function(status) {
  return placeStatusMap[status].text;
});
Vue.filter("inforStatusText", function(status) {
  return inforStatusMap[status].text;
});
Vue.filter("inforStatusColor", function(status) {
  return inforStatusMap[status].type;
});
Vue.filter("meetingHeaderStatusText", function(status) {
  status = Number(status);
  if (status > 1 && status < 100) {
    return "Check lần " + (status - 1);
  }
  return MeetingHeaderStatusMap[status].text;
});
Vue.filter("meetingHeaderStatusColor", function(status) {
  status = Number(status);
  if (status > 1 && status < 100) {
    return "primary";
  }
  return MeetingHeaderStatusMap[status].type;
});
Vue.filter("commissionLineStatusText", function(status) {
  return CommissonLineStatusMap[status]
    ? CommissonLineStatusMap[status].text
    : "Chưa nhập";
});
Vue.filter("commissionLineStatusColor", function(status) {
  return CommissonLineStatusMap[status]
    ? CommissonLineStatusMap[status].type
    : "info";
});
Vue.filter("callStatusText", function(status) {
  return callStatusMap[status] ? callStatusMap[status].text : "";
});
Vue.filter("callStatusColor", function(status) {
  return callStatusMap[status] ? callStatusMap[status].type : "";
});
Vue.filter("invoiceStatusText", function(status) {
  return invoiceStatusMap[status].text;
});
Vue.filter("invoiceStatusColor", function(status) {
  return invoiceStatusMap[status].type;
});
Vue.filter("shipStatusText", function(status) {
  return shipStatusMap[status].text;
});
Vue.filter("shipStatusColor", function(status) {
  return shipStatusMap[status].type;
});

Vue.filter("requestStatusText", function(status) {
  return requestStatusMap[status].text;
});
Vue.filter("requestStatusColor", function(status) {
  return requestsStatusMap[status].type;
});

Vue.filter("roleStatusText", function(status) {
  return RoleStatusMap[status].text;
});
Vue.filter("roleStatusColor", function(status) {
  return RoleStatusMap[status].type;
});
Vue.filter("requestHeaderStatusText", function(status) {
  return FeeRequestHeaderStatusMap[status].text;
});
Vue.filter("requestHeaderStatusColor", function(status) {
  return FeeRequestHeaderStatusMap[status].type;
});
Vue.filter("phanBoStatusText", function(status) {
  return PhanBoStatusMap[status].text;
});
Vue.filter("phanBoStatusColor", function(status) {
  return PhanBoStatusMap[status].type;
});
Vue.filter("orderStatusText", function(status) {
  return orderStatusMap[status].text;
});
Vue.filter("orderStatusColor", function(status) {
  return orderStatusMap[status].type;
});

Vue.filter("handOverStatusText", function(status) {
  return handOverStatusMap[status].text;
});
Vue.filter("handOverStatusColor", function(status) {
  return handOverStatusMap[status].type;
});

Vue.filter("KPIStatusText", function(status) {
  return KPIStatusMap[status].text;
});
Vue.filter("KPIStatusColor", function(status) {
  return KPIStatusMap[status].type;
});
Vue.filter("couponStatusText", function(status) {
  return CouponStatusMap[status].text;
});
Vue.filter("couponStatusColor", function(status) {
  return CouponStatusMap[status].type;
});

Vue.filter("TargetStatusText", function(status) {
  return TargetStatusMap[status].text;
});
Vue.filter("TargetStatusColor", function(status) {
  return TargetStatusMap[status].type;
});

Vue.filter("ReportStatusText", function(status) {
  return ReportStatusMap[status].text;
});
Vue.filter("ReportStatusColor", function(status) {
  return ReportStatusMap[status].type;
});

Vue.filter("TypeQuestionStatusText", function(status) {
  return TypeQuestionStatusMap[status].text;
});
Vue.filter("TypeQuestionStatusColor", function(status) {
  return TypeQuestionStatusMap[status].type;
});

Vue.filter("ServiceStatusText", function(status) {
  return ServiceStatusMap[status].text;
});
Vue.filter("ServiceStatusColor", function(status) {
  return ServiceStatusMap[status].type;
});
Vue.filter("ideaStatusText", function(status) {
  return ideaStatusMap[status].text;
});
Vue.filter("ideaStatusColor", function(status) {
  return ideaStatusMap[status].type;
});
Vue.filter("WorkOldStatusText", function(status) {
  return WorkOldStatusMap[status].text;
});
Vue.filter("PositionStatusText", function(status) {
  return PositionStatusMap[status].text;
});
