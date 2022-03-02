import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout/index";
import store from "@/store";

var displaySX = false;

//ALL tất cả, KD Kinh doanh, RDHC RD SX HC,

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    meta: { role: "ALL" },
    hidden: true
  },
  {
    path: "/dashboard",
    component: () => import("@/views/dashboard/index"),
    hidden: true
  },
  {
    path: "/posterIT",
    component: () => import("@/views/manufacturing/tracking/posterIT"),
    hidden: true
  },
  {
    path: "/Pharmacy",
    component: () => import("@/views/manufacturing/tracking/reqPharma"),
    hidden: true
  },
  {
    component: Layout,
    path: "/post/:id",
    children: [
      {
        path: "",
        name: "Trang chủ",
        component: () => import("@/views/blogs/post-detail/index"),
        meta: { title: "Trang chủ", icon: "fas fa-home", role: "ALL" }
      }
    ],

    hidden: true
  },
  {
    path: "/thong-bao",
    component: Layout,
    children: [
      {
        path: "",
        name: "Thông báo",
        component: () => import("@/views/notification/index"),
        meta: { title: "Thông báo", icon: "fas fa-home", role: "ALL" }
      }
    ],

    hidden: true
  },
  {
    path: "/news",
    component: Layout,
    children: [
      {
        path: "",
        name: "Trang chủ",
        component: () => import("@/views/blogs/main-blog"),
        meta: { title: "Trang chủ", icon: "fas fa-home", role: "ALL" }
      }
    ],

    hidden: true
  },
  {
    path: "/me",
    component: Layout,
    meta: { role: "ALL" },
    children: [
      {
        path: "/me",
        name: "Thông tin cá nhân",
        component: () => import("@/views/user/me"),
        meta: { title: "Thông tin cá nhân", icon: "fas fa-home" }
      },
      {
        path: "/thong-tin-nhan-vien/:id",
        name: "Thông tin nhân viên",
        component: () => import("@/views/user/viewUser"),
        meta: { title: "Thông tin nhân viên", icon: "fas fa-home" }
      },
      {
        path: "/thong-tin-gia-dinh/:id",
        name: "Thông tin gia đình",
        component: () => import("@/views/user/relative/index"),
        meta: { title: "Thông tin gia đình", icon: "fas fa-home" }
      },
      {
        path: "/trang-thai-lam-viec/:id",
        name: "Trạng thái làm việc",
        component: () => import("@/views/user/workStatus/index"),
        meta: { title: "Trạng thái làm việc", icon: "fas fa-home" }
      },
      {
        path: "/trang-thai-lam-viec",
        name: "Trạng thái làm việc",
        component: () => import("@/views/user/workStatus/index"),
        meta: { title: "Trạng thái làm việc", icon: "fas fa-home" }
      },
      {
        path: "/lo-trinh-cong-danh/:id",
        name: "Lộ trình công danh",
        component: () => import("@/views/user/components/TimeLine"),
        meta: { title: "Lộ trình công danh", icon: "fas fa-home" }
      },
      {
        path: "/lo-trinh-cong-danh",
        name: "Lộ trình công danh",
        component: () => import("@/views/user/components/TimeLine"),
        meta: { title: "Lộ trình công danh", icon: "fas fa-home" }
      },
      {
        path: "/BHXH/:id",
        name: "BHXH",
        component: () => import("@/views/user/bhxh/index"),
        meta: { title: "BHXH", icon: "fas fa-home" }
      },
      {
        path: "/BHXH",
        name: "BHXH",
        component: () => import("@/views/user/bhxh/index"),
        meta: { title: "BHXH", icon: "fas fa-home" }
      },
      {
        path: "/hop-dong-lao-dong/:id",
        name: "Hợp đồng lao động",
        component: () => import("@/views/user/workProcess/index"),
        meta: { title: "Hợp đồng lao động", icon: "fas fa-home" }
      },
      {
        path: "/hop-dong-lao-dong",
        name: "Hợp đồng lao động",
        component: () => import("@/views/user/workProcess/index"),
        meta: { title: "Hợp đồng lao động", icon: "fas fa-home" }
      },
      {
        path: "/chi-tiet-hop-dong/:id",
        name: "Chi tiết hợp đồng chính thức",
        component: () => import("@/views/user/workProcess/component/view"),
        meta: { title: "Chi tiết hợp đồng", icon: "fas fa-home" }
      },
      {
        path: "/chi-tiet-hop-dong-thu-viec/:id",
        name: "Chi tiết hợp đồng thử việc",
        component: () => import("@/views/user/workProcess/component/view2"),
        meta: { title: "Chi tiết hợp đồng", icon: "fas fa-home" }
      },
      {
        path: "/quyet-dinh-nhan-su",
        name: "Quyết định nhân sự",
        component: () => import("@/views/user/decision/index"),
        meta: { title: "Quyết định nhân sự", icon: "fas fa-home" }
      },
      {
        path: "/quyet-dinh-nhan-su/:id",
        name: "Quyết định nhân sự",
        component: () => import("@/views/user/decision/index"),
        meta: { title: "Quyết định nhân sự", icon: "fas fa-home" }
      },
      {
        path: "/chi-tiet-quyet-dinh-nhan-su",
        name: "Chi tiết quyết định nhân sự",
        component: () => import("@/views/user/decision/component/view"),
        meta: { title: "Chi tiết quyết định nhân sự", icon: "fas fa-home" }
      },
      {
        path: "/chi-tiet-quyet-dinh-nhan-su/:id",
        name: "Chi tiết quyết định nhân sự",
        component: () => import("@/views/user/decision/component/view"),
        meta: { title: "Chi tiết quyết định nhân sự", icon: "fas fa-home" }
      }
    ],
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
    role: "ALL"
  },

  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "Trang chủ",
        component: () => import("@/views/map/index"),
        meta: { title: "Trang chủ", icon: "fas fa-home" }
      }
    ],
    role: "ALL",
    hidden: displaySX
  },
  {
    path: "/khach-hang",
    redirect: "/khach-hang/ton-kho",
    name: "Khách hàng",
    component: Layout,

    meta: { title: "Khách hàng", icon: "fas fa-hospital-alt", role: "KD" },
    children: [
      {
        path: "/khach-hang/to-chuc",
        name: "Khách hàng tổ chức",
        component: () => import("@/views/customerV2/index"),
        meta: { title: "KH tổ chức", icon: "fas fa-handshake" },
        children: [
          {
            path: "/khach-hang/to-chuc/ca-nhan",
            name: "Cá nhân",
            component: () => import("@/views/customerV2/KDPlace/index"),
            meta: { title: "Cá nhân", icon: "far fa-user" }
          },
          {
            path: "/khach-hang/to-chuc/nhom",
            name: "Nhóm",
            component: () => import("@/views/customerV2/KDPlace/group"),
            meta: { title: "Quản lý", icon: "fas fa-users" }
          }
        ]
      },
      {
        path: "/khach-hang/ca-nhan/:id",
        name: "Khách hàng cá nhân",
        component: () => import("@/views/customerV2/KDCustomer/index"),
        meta: { title: "KH cá nhân", icon: "fas fa-users" },
        hidden: true
      },
      {
        path: "/khach-hang/ton-kho",
        name: "Tồn kho",
        component: () => import("@/views/customer/inventory/index"),
        meta: { title: "Tồn kho", icon: "fas fa-pallet" },
        children: [
          {
            path: "/khach-hang/ton-kho/ca-nhan",
            name: "Cá nhân",
            component: () => import("@/views/customer/inventory/index"),
            meta: { title: "Cá nhân", icon: "far fa-user" }
          },
          {
            path: "/khach-hang/ton-kho/nhom",
            name: "Nhóm",
            component: () => import("@/views/customer/inventory/index"),
            meta: { title: "Nhóm", icon: "fas fa-users" }
          }
        ]
      }

      // {
      //     path: '/khach-hang/tai-lieu',
      //     name: 'Tài liệu',
      //     component: () =>
      //         import ('@/views/customer/file/index'),
      //     meta: { title: 'Tài liệu', icon: 'far fa-file-image' },
      //     children:[
      //         {
      //             path: '/khach-hang/tai-lieu/ca-nhan',
      //     name: 'Cá nhân',
      //     component: () =>
      //         import ('@/views/customer/file/index'),
      //     meta: { title: 'Cá nhân', icon: 'far fa-user' },
      //         },
      //         {
      //             path: '/khach-hang/tai-lieu/nhom',
      //     name: 'Nhóm',
      //     component: () =>
      //         import ('@/views/customer/file/index'),
      //     meta: { title: 'Nhóm', icon: 'fas fa-users' },
      //         }
      //     ]
      // }
    ],
    hidden: displaySX
  },
  {
    path: "/business",
    component: Layout,
    //redirect: '/business/mission',
    name: "Kinh doanh",
    meta: {
      title: "Kinh doanh",
      icon: "fas fa-comments-dollar",
      role: "KD"
    },
    children: [
      {
        path: "/business/myInvoice",
        component: () => import("@/views/business/index"),
        meta: { title: "Đơn hàng", icon: "fas fa-file-invoice-dollar" },
        children: [
          {
            path: "/business/myInvoice/employee",
            name: "myInvoice",
            component: () => import("@/views/invoice/employee/index"),
            meta: { title: "Cá nhân", icon: "far fa-user" }
          },
          {
            path: "/business/myInvoice/groupInvoice",
            name: "groupInvoice",
            component: () => import("@/views/invoice/group/index"),
            meta: { title: "Nhóm", icon: "fas fa-users" }
          },
          {
            path: "/business/shipBox",
            name: "shipBox",
            component: () => import("@/views/invoice/shipBox/index"),
            meta: { title: "Giao hàng", icon: "fas fa-shipping-fast" }
          }
        ]
      },
      {
        path: "/debt",
        component: () => import("@/views/business/index"),
        meta: {
          title: "Công nợ",
          icon: "fab fa-leanpub",
          role: "KD"
        },

        children: [
          {
            path: "/debt/index",
            name: "Cá nhân",
            component: () => import("@/views/debt/index"),
            meta: {
              title: "Cá nhân",
              icon: "fas fa-user"
            }
          },
          {
            path: "all",
            name: "Nhóm",
            component: () => import("@/views/debt/index"),
            meta: {
              title: "Nhóm",
              icon: "fas fa-file-contract"
            }
          },
          {
            path: "/debt/phieu-gui-tien",

            name: "Phiếu gửi tiền",
            component: () => import("@/views/debt/money_recipt/index"),
            meta: { title: "Phiếu gửi tiền", icon: "fas fa-laptop" }
          }
        ]
      },

      {
        path: "/debt/phan-bo",
        component: () => import("@/views/debt/phanbo/index"),
        redirect: "/debt/phan-bo/de-xuat/thau",
        name: "PB",
        meta: {
          title: "PB",
          icon: "fas fa-divide",
          role: "KD"
        },
        children: [
          {
            path: "/debt/phanbo/de-xuat",
            component: () => import("@/views/debt/phanbo/index"), // Parent router-view
            redirect: "/debt/phan-bo/de-xuat/thau",
            name: "Đề xuất",
            meta: { title: "Đề xuất", icon: "fas fa-file-import" },
            children: [
              {
                path: "ke-don",
                component: () => import("@/views/debt/phanbo/TH-offer/index"),
                name: "Đề xuất KD",
                meta: { title: "KD", icon: "fas fa-dot-circle" }
              },
              {
                path: "thau",
                component: () => import("@/views/debt/phanbo/TH-offer/index"),
                name: "Đề xuất TH",
                meta: { title: "TH", icon: "fas fa-dot-circle" }
              },
              {
                path: "tich-don",
                component: () => import("@/views/debt/phanbo/TD-offer/index"),
                name: "Đề xuất TD",
                meta: { title: "TD", icon: "fas fa-dot-circle" }
              }
            ]
          },
          {
            path: "/debt/phanbo/duyet",
            component: () => import("@/views/debt/phanbo/index"), // Parent router-view
            name: "Duyệt",
            meta: { title: "Duyệt", icon: "fas fa-tasks" },
            children: [
              {
                path: "ke-don",
                component: () => import("@/views/debt/phanbo/TH-offer/index"),
                name: "Duyệt KD",
                meta: { title: "KD", icon: "fas fa-dot-circle" }
              },
              {
                path: "thau",
                component: () => import("@/views/debt/phanbo/TH-offer/index"),
                name: "Duyệt TH",
                meta: { title: "TH", icon: "fas fa-dot-circle" }
              },
              {
                path: "tich-don",
                component: () => import("@/views/debt/phanbo/TD-offer/index"),
                name: "Duyệt TD",
                meta: { title: "TD", icon: "fas fa-dot-circle" }
              }
            ]
          },
          {
            path: "/debt/phanbo/de-nghi-chi-phi",
            component: () => import("@/views/debt/phanbo/fee-request"), // Parent router-view
            name: "Đề nghị chi phí",
            meta: { title: "Đề nghị chi phí", icon: "fas fa-money-check-alt" },
            children: [
              {
                path: "/debt/phanbo/de-nghi-chi-phi",
                component: () => import("@/views/debt/phanbo/TH-offer/index"),
                name: "Cá nhân",
                meta: { title: "Cá nhân", icon: "fas fa-dot-circle" }
              },
              {
                path: "/debt/phanbo/de-nghi-chi-phi/nhom",
                component: () => import("@/views/debt/phanbo/TH-offer/index"),
                name: "Nhóm",
                meta: { title: "Nhóm", icon: "fas fa-dot-circle" }
              }
            ]
          }
        ]
      },
      {
        path: "/debt/phan-bo2",
        component: () => import("@/views/debt/phanbo/index"),
        redirect: "/debt/phan-bo/de-xuat/thau",
        name: "PB2",
        meta: {
          title: "PB2",
          icon: "fas fa-divide",
          role: "KD"
        },
        children: [
          {
            path: "/debt/phanbo/chinh-sach",
            component: () => import("@/views/debt/phanbo/index"), // Parent router-view
            redirect: "/debt/phan-bo/de-xuat/thau",
            name: "Chính sách",
            meta: { title: "Chính sách", icon: "far fa-newspaper" },
            children: [
              {
                path: "de-xuat",
                component: () => import("@/views/debt/phanbo/TH-offer/index"),
                name: "Đề xuất",
                meta: { title: "Đề xuất", icon: "fas fa-file-import" },
                children: [
                  {
                    path: "ke-don",
                    component: () => import("@/views/debt/phanbo/TH-offer/index"),
                    name: "Đề xuất KD",
                    meta: { title: "KD", icon: "fas fa-dot-circle" }
                  },
                  {
                    path: "thau",
                    component: () => import("@/views/debt/phanbo/TH-offer/index"),
                    name: "Đề xuất TH",
                    meta: { title: "TH", icon: "fas fa-dot-circle" }
                  },
                  {
                    path: "tich-don",
                    component: () => import("@/views/debt/phanbo/TD-offer/index"),
                    name: "Đề xuất TD",
                    meta: { title: "TD", icon: "fas fa-dot-circle" }
                  }
                ]
              },
              {
                path: "duyet",
                component: () => import("@/views/debt/phanbo/TH-offer/index"),
                name: "Duyệt",
                meta: { title: "Duyệt", icon: "fas fa-tasks" },
                children: [
                  {
                    path: "ke-don",
                    component: () => import("@/views/debt/phanbo/TH-offer/index"),
                    name: "Đề xuất KD",
                    meta: { title: "KD", icon: "fas fa-dot-circle" }
                  },
                  {
                    path: "thau",
                    component: () => import("@/views/debt/phanbo/TH-offer/index"),
                    name: "Đề xuất TH",
                    meta: { title: "TH", icon: "fas fa-dot-circle" }
                  },
                  {
                    path: "tich-don",
                    component: () => import("@/views/debt/phanbo/TD-offer/index"),
                    name: "Đề xuất TD",
                    meta: { title: "TD", icon: "fas fa-dot-circle" }
                  }
                ]
              }
            ]
          },
          {
            path: "/debt/phanbo/de-nghi-chi-phi",
            component: () => import("@/views/debt/phanbo/fee-request"), // Parent router-view
            name: "PB Kê đơn",
            meta: { title: "PB Kê đơn", icon: "fas fa-money-check-alt" },
            children: [
              {
                path: "/debt/phanbo/de-nghi-chi-phi",
                component: () => import("@/views/debt/phanbo/TH-offer/index"),
                name: "Cá nhân",
                meta: { title: "Cá nhân", icon: "fas fa-dot-circle" }
              },
              {
                path: "/debt/phanbo/de-nghi-chi-phi/nhom",
                component: () => import("@/views/debt/phanbo/TH-offer/index"),
                name: "Nhóm",
                meta: { title: "Nhóm", icon: "fas fa-dot-circle" }
              }
            ]
          }
        ]
      }
    ],
    hidden: displaySX
  },
  {
    path: "/mission-call",
    component: Layout,
    redirect: "/mission-call/mission",
    name: "Chấm công",
    meta: {
      title: "Chấm công",
      icon: "fas fa-calendar-check",
      role: "ALL"
    },
    children: [
      {
        path: "/mission/mission",
        component: () => import("@/views/mission/mission/index"), // Parent router-view
        name: "Danh sách nhiệm vụ",
        meta: { title: "Nhiệm vụ", icon: "fas fa-bars" },
        children: [
          {
            path: "/mission/mymission",
            component: () => import("@/views/mission/mission/my-mission/index"),
            name: "mymission",
            meta: { title: "Cá nhân" }
          },
          {
            path: "/mission/employee-mission",
            component: () =>
              import("@/views/mission/mission/employee-mission/index"),
            name: "employee-mission",
            meta: { title: "Nhóm" }
          }
        ]
      },

      {
        path: "/mission-call/call",
        component: () => import("@/views/mission/call/index"), // Parent router-view
        name: "Call",
        meta: { title: "Call", icon: "fas fa-street-view" },
        children: [
          {
            path: "/mission-call/call/mine",
            component: () => import("@/views/mission/call/my-call/index"),
            name: "Tôi",
            meta: { title: "Cá nhân" }
          },
          {
            path: "/mission-call/call/my-em",
            component: () => import("@/views/mission/call/employee-call/index"),
            name: "Nhân viên",
            meta: { title: "Nhóm" }
          },
          {
            path: "/mission-call/call/map",
            component: () => import("@/views/mission/call/map-call/index"),
            name: "Bản đồ",
            meta: { title: "Bản đồ" }
          }
        ]
      },
      {
        path: "/ke-hoach/nghi-phep-lam-bu",

        component: () => import("@/views/mission/mission/mission-np/index"),
        name: "Nghỉ - Làm bù",
        meta: { title: "Nghỉ - Làm bù", icon: "fas fa-notes-medical" },
        children: [
          {
            path: "/ke-hoach/nghi-phep/employee",
            component: () =>
              import("@/views/mission/mission/mission-np/component/employee"),
            name: "Cá nhân",
            meta: { title: "Cá nhân", icon: "fas fa-user" }
          },
          {
            path: "/ke-hoach/nghi-phep/groups",
            component: () =>
              import("@/views/mission/mission/mission-np/component/groups"),
            name: "Nhóm",
            meta: { title: "Nhóm", icon: "fas fa-users" }
          },
          {
            path: "/ke-hoach/nghi-phep/ke-toan",
            component: () =>
              import("@/views/mission/mission/mission-np/component/export"),
            name: "Chi nhánh",
            meta: { title: "Chi nhánh", icon: "fas fa-file-excel" }
          }
        ]
      },

      {
        path: "/mission-call/call/my-em/uniform",
        component: () => import("@/views/mission/call/index"),
        name: "Tác phong",
        meta: { title: "Tác phong" },
        children: [
          {
            path: "/mission-call/call/my-em/uniform",
            component: () =>
              import("@/views/mission/call/employee-call/checkImg"),
            name: "Đồng phục",
            meta: { title: "Đồng phục", icon: "fas fa-tshirt" }
          }
        ]
      },
      {
        path: "/mission-call/call/my-em/report",
        component: () => import("@/views/mission/call/employee-call/report"),
        name: "Thống kê",
        meta: { title: "Thống kê", icon: "fas fa-chart-bar" }
      }
    ],
    hidden: displaySX
  },

  {
    path: "/ke-hoach/lam-viec",
    component: Layout, // Parent router-view
    name: "Phương tiện",
    meta: { title: "Phương tiện", icon: "fas fa-plane-departure", role: "ALL" },
    children: [
      {
        path: "/ke-hoach/employee-place",
        component: () => import("@/views/mission/mission/mission-ct/index"),
        name: "Công tác",
        meta: { title: "Công tác", icon: "fas fa-car-side" },
        children: [
          {
            path: "/ke-hoach/xe",
            component: () =>
              import("@/views/mission/mission/mission-car/component/carPlan"),
            name: "Xếp xe",
            meta: { title: "Xếp xe", icon: "fas fa-car-side" }
          },
          {
            path: "/ke-hoach/employee-place",
            component: () =>
              import("@/views/mission/mission/mission-ct/employee"),
            name: "employee-place",
            meta: { title: "Cá nhân", icon: "fas fa-user" }
          },
          {
            path: "/ke-hoach/group-place",
            component: () =>
              import("@/views/mission/mission/mission-ct/component/group"),
            name: "group-place",
            meta: { title: "Nhóm", icon: "fas fa-users" }
          }
        ]
      },
      {
        path: "/mission-call/call/my-em/uniform",
        component: () => import("@/views/mission/call/index"),
        name: "Poster",
        meta: { title: "Poster" },
        children: [
          {
            path: "/mission-call/call/my-em/uniform",
            component: () =>
              import("@/views/mission/call/employee-call/checkImg"),
            name: "Poster",
            meta: { title: "Poster", icon: "fas fa-qrcode" }
          }
        ]
      }
    ],
    hidden: displaySX
  },

  {
    path: "/hanh-chinh",
    component: Layout, // Parent router-view
    name: "Hành chính",
    meta: { title: "Hành chính", icon: "fas fa-paste", role: "ALL" },
    children: [
      {
        path: "/hanh-chinh/giay-to",
        component: () => import("@/views/paper/index"),
        name: "Giấy tờ",
        meta: { title: "Giấy tờ", icon: "far fa-copy" },
        children: [
          {
            path: "/hanh-chinh/giay-to/admin",
            //component: () => import("@/views/paper/admin/index"),
            component: () => import("@/views/paper/index"),
            name: "Quản lý",
            meta: { title: "Quản lý", icon: "fas fa-users-cog" },
            children: [
              {
                path: "/hanh-chinh/giay-to/admin/dinh-nghia",
                component: () => import("@/views/paper/admin/component/createPaper"),
                name: "Định nghĩa",
                meta: { title: "Định nghĩa", icon: "fas fa-feather-alt" }
              },
              {
                path: "/hanh-chinh/giay-to/admin/danh-sach",
                component: () => import("@/views/paper/admin/index"),
                name: "Danh sách",
                meta: { title: "Danh sách", icon: "fas fa-list" }
              }
            ]
          },
          {
            path: "/hanh-chinh/giay-to/employee",
            //component: () => import("@/views/paper/employee/index"),
            component: () => import("@/views/paper/index"),
            name: "Cá nhân",
            meta: { title: "Cá nhân", icon: "far fa-user" },
            children: [
              {
                path: "/hanh-chinh/giay-to/employee/dang-ki",
                component: () => import("@/views/paper/employee/component/registration"),
                name: "Đăng kí",
                meta: { title: "Đăng kí", icon: "fas fa-file-medical" }
              },
              {
                path: "/hanh-chinh/giay-to/employee/danh-sach",
                component: () => import("@/views/paper/employee/index"),
                name: "Danh sách",
                meta: { title: "Danh sách", icon: "fas fa-list" }
              }
            ]
          }
        ]
      },
      {
        path: "/hanh-chinh/bao-cao",
        component: () => import("@/views/report/index"),
        name: "Báo cáo",
        meta: { title: "Báo cáo", icon: "far fa-file-word" },
        children: [
          {
            path: "/hanh-chinh/bao-cao/dinh-nghia",
            component: () => import("@/views/report/define/index"),
            name: "Tạo báo cáo",
            meta: { title: "Tạo báo cáo", icon: "fas fa-file-signature" }
          },
          {
            path: "/hanh-chinh/bao-cao/soan-bao-cao/:id",
            component: () =>
              import("@/views/report/define/component/startReport"),
            name: "Soạn báo cáo",
            hidden: true,
            meta: { title: "Soạn báo cáo", icon: "fas fa-car-side" }
          },

          {
            path: "/hanh-chinh/bao-cao/xem-bao-cao/:id",
            component: () =>
              import("@/views/report/value/component/viewReport"),
            name: "Xem báo cáo",
            hidden: true,
            meta: { title: "Xem báo cáo", icon: "fas fa-car-side" }
          },
          {
            path: "/hanh-chinh/bao-cao/DS-bao-cao",
            component: () => import("@/views/report/index"),
            name: "Đọc báo cáo",
            meta: { title: "Đọc báo cáo", icon: "fas fa-list-ol" },
            children: [
              {
                path: "/hanh-chinh/bao-cao/DS-bao-cao/ca-nhan",
                component: () => import("@/views/report/value/index"),
                name: "Cá nhân",
                meta: { title: "Cá nhân", icon: "fas fa-user" }
              },
              {
                path: "/hanh-chinh/bao-cao/DS-bao-cao/quan-ly",
                component: () => import("@/views/report/value/group"),
                name: "Quản lý",
                meta: { title: "Quản lý", icon: "fas fa-users" }
              }
            ]
          }
        ]
      },
      {
        path: "/quy-dinh/",
        component: () => import("@/views/regulations/index"),
        name: "Quy định",
        meta: { title: "Quy định", icon: "fas fa-qrcode", role: "ALL" }
      },
      {
        path: "/quy-dinh/xem-quy-dinh/:id",
        component: () => import("@/views/regulations/component/viewRegu"),
        name: "Xem quy định",
        hidden: true,
        meta: { title: "Xem quy định", icon: "fas fa-car-side" }
      },
      {
        path: "/hanh-chinh/sang-kien",
        component: () => import("@/views/initiative/index"),
        name: "Sáng kiến",
        meta: { title: "Sáng kiến", icon: "far fa-lightbulb" },
        children: [
          {
            path: "/hanh-chinh/sang-kien/ca-nhan",
            component: () => import("@/views/initiative/employee/index"),
            name: "Cá nhân",
            meta: { title: "Cá nhân", icon: "far fa-user" }
          },
          {
            path: "/hanh-chinh/sang-kien/nhom",
            component: () => import("@/views/initiative/admin/index"),
            name: "Nhóm",
            meta: { title: "Nhóm", icon: "fas fa-users" }
          }
        ]
      }
    ],
    hidden: displaySX
  },

  {
    path: "/dao-tao",
    component: Layout, // Parent router-view
    name: "Đào tạo",
    meta: { title: "Đào tạo", icon: "fab fa-leanpub", role: "ALL" },
    children: [
      {
        path: "/exam",
        component: () => import("@/views/roleplay/index"),
        meta: { title: "Kiểm tra", icon: "fas fa-poll-h" },
        redirect: "",
        children: [
          {
            path: "/exam/employee",
            name: "employee",
            component: () => import("@/views/exam/employee/index"),
            meta: { title: "Cá nhân", icon: "fas fa-user" }
          },
          {
            path: "/exam/group",
            name: "group",
            component: () => import("@/views/exam/group/index"),
            meta: { title: "Nhóm", icon: "fas fa-users" }
          }
        ]
      },
      {
        path: "/coaching/lich-gap-nhan-vien",
        component: () => import("@/views/mission/employee-meeting/index"),
        name: "Coaching",
        meta: { title: "Coaching", icon: "fas fa-handshake" },
        children: [
          {
            path: "/ke-hoach/lich-gap-nhan-vien/ca-nhan",
            component: () =>
              import("@/views/mission/employee-meeting/components/employee"),
            name: "Cá nhân",
            meta: { title: "Cá nhân", icon: "fas fa-chalkboard-teacher" }
          },
          {
            path: "/ke-hoach/lich-gap-nhan-vien/nhom",
            component: () =>
              import("@/views/mission/employee-meeting/components/employee"),
            name: "Nhóm",
            meta: { title: "Nhóm", icon: "fas fa-chalkboard-teacher" }
          }
        ]
      },
      {
        path: "/Roleplay",
        component: () => import("@/views/roleplay/index"),

        name: "Roleplay",
        meta: { title: "Roleplay", icon: "fas fa-file-video" },
        children: [
          {
            path: "/Roleplay/lich-role",
            component: () => import("@/views/roleplay/employee/index"),

            name: "Lịch role",
            meta: { title: "Lịch role", icon: "fas fa-calendar-day" }
          },
          // {
          //     path: '/uploadfile',
          // component: () =>
          // import('@/views/roleplay/employee/index'),
          // hidden: true,
          // name: 'Upload-Video-Role',
          // meta: { title: 'Upload-Video-Role', icon: 'fas fa-calendar-day' }
          // },
          {
            path: "/Roleplay/nhom",
            component: () => import("@/views/roleplay/group/index"),
            name: "Nhóm",
            meta: { title: "Nhóm", icon: "fas fa-users" }
          },
          {
            path: "/Roleplay/danh-gia",
            component: () => import("@/views/roleplay/admin/index"),
            name: "Đánh giá",
            meta: { title: "Đánh giá", icon: "fas fa-check-double" }
          },
          {
            path: "/Roleplay/dinh-nghia",
            component: () => import("@/views/roleplay/define/index"),
            name: "Định nghĩa báo cáo",
            meta: { title: "Định nghĩa báo cáo", icon: "fas fa-check-double" }
          }
          //     ,
          //     {
          //         path: '/Roleplay/nguoi-kiem-tra',
          // component: () =>
          //     import('@/views/roleplay/group/index'),
          // name: 'Người kiểm tra',
          // meta: { title: 'Người kiểm tra', icon: 'fas fa-chalkboard-teacher' }
          //     }
        ]
      },
      {
        path: "/hop-nhom",
        component: () => import("@/views/mission/employee-meeting/index"),
        name: "Họp nhóm",
        meta: {
          title: "Họp nhóm",
          icon: "fas fa-chalkboard-teacher",
          role: "ALL"
        },
        children: [
          {
            path: "/hop-nhom/lich-hop",
            component: () => import("@/views/meetingGroup/employee/index"),
            name: "Lịch họp",
            meta: { title: "Lịch họp", icon: "fas fa-calendar-day" }
          },
          {
            path: "/hop-nhom/danh-gia",
            component: () => import("@/views/meetingGroup/group/index"),
            name: "Đánh giá",
            meta: { title: "Đánh giá", icon: "fas fa-check-double" }
          }
        ]
      },
      {
        path: "/dao-tao-phong-ban",
        name: "Phòng ban",
        component: () => import("@/views/departmentTraining/index"),
        meta: {
          title: "Phòng ban",
          icon: "fas fa-chalkboard-teacher",
          role: "ALL"
        },
        children: [
          {
            path: "/dao-tao-phong-ban/dt-tap-trung",
            name: "Trainning",
            component: () =>
              import("@/views/departmentTraining/focusTraining/index"),
            meta: { title: "Trainning", icon: "fas fa-chalkboard-teacher" },
            children: [
              {
                path: "/dao-tao-phong-ban/dt-tap-trung/bao-cao",
                component: () =>
                  import("@/views/departmentTraining/focusTraining/report/index"),
                name: "Kế hoạch",
                meta: { title: "Kế hoạch", icon: "fas fa-file-upload" }
              },
              {
                path: "/phong-ban/dao-tao/khao-sat",
                component: () =>
                  import("@/views/departmentTraining/focusTraining/report/index"),
                name: "Đánh giá",
                meta: { title: "Đánh giá", icon: "fas fa-poll-h" }
              }
            ]
          },
          {
            path: "/dao-tao-phong-ban/kiem-tra-thuong-xuyen",
            name: "Đánh giá chéo",
            component: () =>
              import("@/views/departmentTraining/checkRegulary/index"),
            meta: { title: "Đánh giá chéo", icon: "fas fa-poll-h" },
            children: [
              {
                path: "/dao-tao-phong-ban/kiem-tra-thuong-xuyen/bao-cao",
                component: () =>
                  import("@/views/departmentTraining/checkRegulary/report/index"),
                name: "Báo cáo",
                meta: { title: "Báo cáo", icon: "fas fa-file-upload" }
              },
              {
                path: "/dao-tao-phong-ban/kiem-tra-thuong-xuyen/danh-gia",
                component: () =>
                  import("@/views/departmentTraining/checkRegulary/evaluate/index"),
                name: "Đánh giá",
                meta: { title: "Đánh giá", icon: "fas fa-check-double" }
              }
            ]
          }
        ]
      },
      {
        path: "/ho-so",
        component: () => import("@/views/CV/index"),
        name: "Hồ sơ",
        meta: { title: "Hồ sơ", icon: "fas fa-chalkboard-teacher", role: "ALL" }
      },
      {
        path: "/huong-dan-su-dung",
        component: () => import("@/views/regulations/indexDT"),
        name: "Học tập",
        meta: { title: "Học tập", icon: "fab fa-leanpub", role: "ALL" }
      },
      {
        path: "/xem-to-toa/:id",
        component: () => import("@/views/regulations/component/view"),
        name: "Xem tờ toa",
        hidden: true,
        meta: { title: "Xem tờ toa", icon: "fas fa-car-side", role: "ALL" }
      },
      {
        path: "/xem-to-roi/:id",
        component: () => import("@/views/regulations/component/view2"),
        name: "Xem tờ rơi",
        hidden: true,
        meta: { title: "Xem tờ rơi", icon: "fas fa-car-side", role: "ALL" }
      },
      {
        path: "/xem-slide/:id",
        component: () => import("@/views/regulations/component/view3"),
        name: "Xem slide",
        hidden: true,
        meta: { title: "Xem slide", icon: "fas fa-car-side", role: "ALL" }
      },
      {
        path: "/xem-video/:id",
        component: () => import("@/views/regulations/component/view4"),
        name: "Xem video",
        hidden: true,
        meta: { title: "Xem video", icon: "fas fa-car-side", role: "ALL" }
      },
      {
        path: "/san-pham",
        component: () => import("@/views/product/infomation/index"),
        name: "Sản phẩm",
        meta: {title: "Sản phẩm", icon: "fas fa-pills", role: "ALL"}
      },
      {
        path: "/dao-tao/Q&A",
        component: () => import("@/views/departmentTraining/QA/index"),
        name: "Q&A",
        meta: { title: "Q&A", icon: "far fa-question-circle", role: "ALL" }
      }
    ],
    hidden: displaySX
  },
  {
    path: "/analytic",
    component: Layout,
    hidden: true,
    meta: { role: "ALL" },
    children: [
      {
        path: "analytic",
        name: "Yêu cầu1",
        component: () => import("@/views/analytic/index"),
        meta: {
          title: "Thống kê",
          icon: "fas fa-chart-line"
        }
      }
    ],
    hidden: true
  },
  {
    path: "/debt1",
    component: Layout,
    redirect: "",
    hidden: true,
    children: [
      {
        path: "",
        name: "debt1",
        component: () => import("@/views/orderHCM/index"),
        meta: { title: "Công nợ", icon: "fas fa-file-invoice-dollar" }
      }
    ],
    hidden: true
  },
  // {
  //     path: '/order',
  //     component: Layout,
  //     meta: { title: 'Yêu cầu - Công việc', icon: 'fas fa-paper-plane' },
  //     children: [
  //         {
  //             path: '/yeu-cau',
  //             name: 'Yêu cầu',
  //             component: () =>
  //             import ('@/views/order/orderSend/index'),
  //             meta: { title: 'Yêu cầu', icon: 'fas fa-paper-plane' },
  //             children: [
  //                 {
  //                     path: '/ca-nhan',

  //                     component: () =>
  //                     import ('@/views/order/orderSend/component/employeeOrderSend'),
  //                     meta: { title: 'Cá nhân', icon: 'fas fa-user' }
  //                 },
  //                 {
  //                     path: '/nhom',

  //                     component: () =>
  //                     import ('@/views/order/orderSend/component/groupOrderSend'),
  //                     meta: { title: 'Của nhóm', icon: 'fas fa-users' }
  //                 },
  //                 {
  //                     path: '/yeu-cau-den-nhom-khac',

  //                     component: () =>
  //                     import ('@/views/order/orderSend/component/sendOtherGroup'),
  //                     meta: { title: 'Nhóm khác', icon: 'fas fa-users' }
  //                 }
  //             ]
  //         },
  //         // {
  //         // path: 'yeu-cau',
  //         // name: 'Giao-Nhận việc',
  //         // component: () =>
  //         //     import('@/views/order/index'),
  //         // meta: { title: 'Giao-Nhận việc', icon: 'fas fa-users-cog' }
  //         // },
  //         {
  //             path: '/yeu-cau/cong-viec',
  //             name: 'Công việc ',
  //             component: () =>
  //                 import ('@/views/request/index'),
  //             meta: { title: 'Công việc', icon: 'fas fa-tasks' },
  //             children:
  //                 [
  //                     {
  //                         path: 'yeu-cau',
  //                         name: 'Giao-Nhận',
  //                         component: () =>
  //                             import('@/views/order/index'),
  //                         meta: { title: 'Giao-Nhận', icon: 'fas fa-users-cog' }
  //                         },
  //                     {
  //                     path: '/yeu-cau/cong-viec-cua-toi',
  //                     name: 'Báo cáo',
  //                     component: () =>
  //                         import ('@/views/request/myRequest/index'),
  //                     meta: { title: 'Báo cáo', icon: 'fas fa-user' },
  //                 },{
  //                     path: '/yeu-cau/cong-viec-nhan-vien-cua-toi',
  //                     name: 'Đánh giá',
  //                     component: () =>
  //                         import ('@/views/request/GroupRequest/index'),
  //                     meta: { title: 'Đánh giá', icon: 'fas fa-users' }
  //                 }]

  //         },

  //         {
  //             path: 'yeu-cau/dinh-nghia',
  //             name: 'Định nghĩa',
  //             component: () =>
  //                 import ('@/views/order/orderDefine/index'),
  //             meta: { title: 'Định nghĩa', icon: 'fas fa-receipt' }
  //         },

  //     ]
  // },
  {
    path: "/KPI",
    component: Layout,
    meta: { title: "OKR-KPI", icon: "fas fa-medal", role: "ALL" },
    children: [
      {
        path: "/yeu-cau",
        name: "Yêu cầu",
        component: () => import("@/views/order/orderSend/index"),
        meta: { title: "Yêu cầu", icon: "fas fa-paper-plane" },
        children: [
          {
            path: "/ca-nhan",

            component: () =>
              import("@/views/order/orderSend/component/employeeOrderSend"),
            meta: { title: "Cá nhân", icon: "fas fa-user" }
          },
          {
            path: "/nhom",

            component: () =>
              import("@/views/order/orderSend/component/groupOrderSend"),
            meta: { title: "Của nhóm", icon: "fas fa-users" }
          },
          {
            path: "/yeu-cau-den-nhom-khac",

            component: () =>
              import("@/views/order/orderSend/component/sendOtherGroup"),
            meta: { title: "Nhóm khác", icon: "fas fa-users" }
          }
        ]
      },
      // {
      // path: 'yeu-cau',
      // name: 'Giao-Nhận việc',
      // component: () =>
      //     import('@/views/order/index'),
      // meta: { title: 'Giao-Nhận việc', icon: 'fas fa-users-cog' }
      // },
      {
        path: "/yeu-cau/cong-viec",
        name: "Công việc ",
        component: () => import("@/views/request/index"),
        meta: { title: "Công việc", icon: "fas fa-tasks" },
        children: [
          {
            path: "yeu-cau",
            name: "Giao-Nhận",
            component: () => import("@/views/order/index"),
            meta: { title: "Giao-Nhận", icon: "fas fa-users-cog" }
          },
          {
            path: "/yeu-cau/cong-viec-cua-toi",
            name: "Báo cáo",
            component: () => import("@/views/request/myRequest/index"),
            meta: { title: "Báo cáo", icon: "fas fa-user" }
          },
          {
            path: "/yeu-cau/cong-viec-nhan-vien-cua-toi",
            name: "Đánh giá",
            component: () => import("@/views/request/GroupRequest/index"),
            meta: { title: "Đánh giá", icon: "fas fa-users" }
          }
        ]
      },
      {
        path: "/work",
        component: () => import("@/views/work/index"),
        meta: { title: "Tự động", icon: "fab fa-wpforms" },
        children: [
          {
            path: "/work/employee",
            name: "employee",
            component: () => import("@/views/work/employee/index"),
            meta: { title: "Cá nhân", icon: "fas fa-user" }
          },
          {
            path: "/work/group",
            name: "group",
            component: () => import("@/views/work/group/index"),
            meta: { title: "Nhóm", icon: "fas fa-users" }
          }
        ]
      },
      {
        path: "/KPI/result",
        name: "Kết quả",
        component: () => import("@/views/KPI/result/index"),
        meta: { title: "Kết quả (KPI)", icon: "fas fa-poll" },
        children: [
          {
            path: "/KPI/result/employee",
            name: "KPI Cá nhân",
            component: () => import("@/views/KPI/result/employee/index"),
            meta: { title: "Cá nhân", icon: "far fa-user" }
          },
          {
            path: "/KPI/result/group",
            name: "KPI Nhóm",
            component: () => import("@/views/KPI/result/group/index"),
            meta: { title: "Nhóm", icon: "fas fa-users" }
          }
        ]
      },
      {
        path: "/KPI/target",
        component: () => import("@/views/KPI/target/index"),
        name: "Chỉ tiêu",
        meta: { title: "Chỉ tiêu (OKR)", icon: "fas fa-bullseye" },
        children: [
          {
            path: "/KPI/target/employee",
            name: "Cá nhân",
            component: () => import("@/views/KPI/target/employee/index"),
            meta: { title: "Cá nhân", icon: "far fa-user" }
          },
          {
            path: "/KPI/target/group",
            name: "Nhóm",
            component: () => import("@/views/KPI/target/group/index"),
            meta: { title: "Nhóm", icon: "fas fa-users" }
          }
        ]
      },
      {
        path: "yeu-cau/dinh-nghia",
        name: "Định nghĩa",
        component: () => import("@/views/order/orderDefine/index"),
        meta: { title: "Định nghĩa", icon: "fas fa-receipt" }
      },

      {
        path: "/KPI/list",
        name: "Danh mục",
        hidden: true,
        component: () => import("@/views/KPI/list/index"),
        meta: { title: "Danh mục", icon: "fas fa-clipboard-list" }
      }
    ],
    hidden: displaySX
  },
  {
    path: "/san-xuat",
    component: Layout,
    redirect: "",
    name: "Sản xuất",
    meta: { title: "Sản xuất", icon: "fas fa-warehouse", role: "ALL" },
    children: [
      {
        path: "/san-xuat/dinh-nghia",
        name: "Mẫu báo cáo",
        hidden: true,
        component: () => import("@/views/manufacturing/defineReport/index"),
        meta: { title: "Mẫu báo cáo", icon: "fas fa-receipt" }
      },
      {
        path: "/san-xuat/lich-bao-cao",
        name: "Lịch báo cáo",
        component: () => import("@/views/manufacturing/create/index"),
        meta: { title: "Lịch báo cáo", icon: "el-icon-date" }
      },
      {
        path: "/san-xuat/lenh-san-xuat",
        name: "Lệnh sản xuất",
        hidden: true,
        component: () => import("@/views/manufacturing/index"),
        meta: { title: "Lệnh sản xuất", icon: "fas fa-file-signature" },
        children: [
          {
            path: "/san-xuat/lenh-san-xuat/tao-lich",
            name: "Lịch báo cáo",
            component: () => import("@/views/manufacturing/create/index"),
            meta: { title: "Lịch báo cáo", icon: "el-icon-date" }
          },
          {
            path: "/san-xuat/lenh-san-xuat/dinh-muc",
            name: "Tạo định mức",
            component: () => import("@/views/manufacturing/quota/index"),
            meta: { title: "Tạo định mức", icon: "fas fa-medal" }
          }
        ]
      },
      {
        path: "/san-xuat/nhap-lo-nhay",
        name: "QL Lô nhảy",
        component: () => import("@/views/manufacturing/index"),
        meta: { title: "QL Lô nhảy", icon: "fas fa-edit" },
        children: [
          {
            path: "/san-xuat/nhap-lo-nhay/bao-cao",
            name: "DS báo cáo",
            component: () =>
              import("@/views/manufacturing/reportJumpLot/Report/index"),
            meta: { title: "DS báo cáo", icon: "el-icon-s-order" }
          },
          {
            path: "/san-xuat/nhap-lo-nhay/dinh-muc",
            name: "Định mức",
            component: () =>
              import("@/views/manufacturing/reportJumpLot/Quota/index"),
            meta: { title: "Định mức", icon: "fas fa-medal" }
          }
        ]
      },
      {
        path: "/san-xuat/tao-bao-cao",
        name: "Tạo báo cáo",
        hidden: true,
        component: () => import("@/views/manufacturing/reportProduct/index"),
        meta: { title: "Tạo báo cáo", icon: "fas fa-file-signature" }
      },
      {
        path: "/san-xuat/duyet-bao-cao",
        name: "Duyệt báo cáo",
        hidden: true,
        component: () => import("@/views/manufacturing/index"),
        meta: { title: "Duyệt báo cáo", icon: "fas fa-tasks" },
        children: [
          {
            path: "/san-xuat/duyet-bao-cao/lenh-SX",
            name: "Theo lệnh SX",
            component: () =>
              import("@/views/manufacturing/reportProduct/group"),
            meta: { title: "Theo lệnh SX", icon: "el-icon-coin" }
          },
          {
            path: "/san-xuat/duyet-bao-cao/loai-BC",
            name: "Theo loại BC",
            component: () =>
              import("@/views/manufacturing/reportProduct/group1"),
            meta: { title: "Theo loại BC", icon: "el-icon-s-order" }
          }
        ]
      },
      {
        path: "/san-xuat/theo-doi-mau",
        name: "Theo dõi độ ổn định",
        component: () => import("@/views/manufacturing/index"),
        meta: { title: "Theo dõi độ ổn định", icon: "fas fa-file-contract" },
        children: [
           {
            path: "/san-xuat/theo-doi-mau/san-pham",
            name: "Sản phẩm",
            component: () =>
              import("@/views/manufacturing/tracking/product/index"),
            meta: { title: "Sản phẩm", icon: "fas fa-pills" }
          },
          {
            path: "/san-xuat/theo-doi-mau/lay-mau",
            name: "Lấy mẫu",
            component: () =>
              import("@/views/manufacturing/tracking/sample/index"),
            meta: { title: "Lấy mẫu", icon: "fas fa-clipboard-list" }
          },
          {
            path: "/san-xuat/theo-doi-mau/tieu-chi",
            name: "Chỉ tiêu",
            component: () =>
              import("@/views/manufacturing/tracking/targetSample/index"),
            meta: { title: "Chỉ tiêu", icon: "fas fa-user-check" }
          },
          {
            path: "/san-xuat/theo-doi-mau/bao-cao",
            name: "Báo cáo",
            component: () =>
              import("@/views/manufacturing/tracking/report/index"),
            meta: { title: "Báo cáo", icon: "far fa-file-word" }
          },
          {
            path: "/san-xuat/theo-doi-mau/danh-gia",
            name: "Đánh giá",
            component: () =>
              import("@/views/manufacturing/tracking/evaluate/index"),
            meta: { title: "Đánh giá", icon: "el-icon-s-claim" }
          },
          {
            path: "/san-xuat/theo-doi-mau/danh-sach-bao-cao",
            name: "Danh sách báo cáo",
            hidden: true,
            component: () =>
              import("@/views/manufacturing/tracking/component/reportLst"),
            meta: { title: "Danh sách báo cáo", icon: "far fa-file-word" }
          }
        ]
      },
      {
        path: "/san-xuat/xem-bao-cao/:string",
        name: "Xem báo cáo",
        hidden: true,
        component: () => import("@/views/manufacturing/components/ReportByQR"),
        meta: { title: "Xem báo cáo", icon: "tree" }
      },
      {
        path: "/san-xuat/bao-cao/ma-qr/:id/",
        name: "Thông tin",
        hidden: true,
        component: () => import("@/views/manufacturing/create/component/QR"),
        meta: { title: "Thông tin", icon: "tree" }
      },
      {
        path: "/san-xuat/soan-bao-cao/ma-qr/:idreport/:idorder",
        name: "soạn báo cáo",
        hidden: true,
        component: () =>
          import("@/views/manufacturing/reportProduct/component/workReportbyQR"),
        meta: { title: "Soạn báo cáo", icon: "tree" }
      }
    ]
  },
  {
    path: "/R&D",
    component: Layout,
    redirect: "",
    name: "R&D",
    meta: { title: "R&D", icon: "el-icon-s-promotion", role: "RDHC" },
    children: [
      {
        path: "/y-tuong",
        name: "Ý tưởng",
        component: () => import("@/views/RD/idea/index"),
        meta: { title: "Ý tưởng", icon: "far fa-lightbulb" },
        children: [
          {
            path: "/y-tuong/de-xuat-y-tuong",
            name: "Đề xuất",
            component: () => import("@/views/RD/idea/employee/index"),
            meta: { title: "Đề xuất", icon: "fas fa-user-nurse" }
          },
          {
            path: "/y-tuong/quan-ly-y-tuong",
            name: "Quản lý",
            component: () => import("@/views/RD/idea/admin/index"),
            meta: { title: "Quản lý", icon: "fas fa-tasks" }
          },
          {
            path: "/y-tuong/bao-cao-thi-truong/:id",
            name: "Báo cáo thị trường",
            hidden: true,
            component: () => import("@/views/RD/idea/component/reportMarket"),
            meta: { title: "Báo cáo thị trường", icon: "far fa-newspaper" }
          },
          {
            path: "/y-tuong/phe-duyet-bao-cao-thi-truong/:id",
            name: "Phê duyệt báo cáo",
            hidden: true,
            component: () => import("@/views/RD/idea/component/acceptReport"),
            meta: { title: "Phê duyệt báo cáo", icon: "far fa-newspaper" }
          }
        ]
      },

      {
        path: "/nghien-cuu",
        redirect: "/nghien-cuu/de-xuat",
        name: "Nghiên cứu",
        component: () => import("@/views/RD/research/index"),
        meta: { title: "Nghiên cứu", icon: "fas fa-temperature-low" },
        children: [
          {
            path: "de-xuat",
            name: "Đề xuất",
            component: () => import("@/views/RD/research/employee/index"),
            meta: { title: "Đề xuất", icon: "fas fa-user-nurse" }
          },
          {
            path: "quan-ly",
            name: "Quản lý",
            component: () => import("@/views/RD/research/admin/index"),
            meta: { title: "Quản lý", icon: "fas fa-tasks" }
          },
          {
            path: "/nghien-cuu/de-xuat-sp/:id",
            name: "Đề xuất sản phẩm",
            hidden: true,
            component: () => import("@/views/RD/research/component/index"),
            meta: { title: "Đề xuất sản phẩm", icon: "tree" }
          },
          {
            path: "/nghien-cuu/danh-sach-de-xuat",
            name: "Danh sách đề xuất",
            hidden: true,
            component: () =>
              import("@/views/RD/research/component/lstResearchUser"),
            meta: { title: "Danh sách đề xuất", icon: "tree" }
          },
          {
            path: "/y-tuong/bao-cao-sua-doi/:id",
            name: "Báo cáo sửa đổi",
            hidden: true,
            component: () =>
              import("@/views/RD/research/component/reportStandard"),
            meta: { title: "Báo cáo sửa đổi", icon: "far fa-newspaper" }
          },
          {
            path: "/y-tuong/phe-duyet-bao-cao-sua-doi/:id",
            name: "Phê duyệt báo cáo",
            hidden: true,
            component: () =>
              import("@/views/RD/research/component/acceptReport"),
            meta: { title: "Phê duyệt báo cáo", icon: "far fa-newspaper" }
          }
        ]
      },
      {
        path: "/nguyen-lieu",
        component: () => import("@/views/RD/material/index"),
        redirect: "/nguyen-lieu/ca-nhan",
        name: "Nguyên liệu",
        meta: { title: "Nguyên liệu", icon: "fas fa-flask" },
        children: [
          {
            path: "ca-nhan",
            name: "Cá nhân",
            component: () => import("@/views/RD/material/employee/index"),
            meta: { title: "Cá nhân", icon: "fas fa-user-nurse" }
          },
          {
            path: "quan-ly",
            name: "Quản lý",
            component: () => import("@/views/RD/material/admin/index"),
            meta: { title: "Quản lý", icon: "fas fa-tasks" }
          }
        ]
      },
      {
        path: "/ho-so",
        component: () => import("@/views/RD/reportRD/index"),
        redirect: "/ho-so/ca-nhan",
        name: "Hồ sơ",
        meta: { title: "Hồ sơ", icon: "fas fa-paste" },
        children: [
          {
            path: "ca-nhan",
            name: "Cá nhân",
            component: () => import("@/views/RD/reportRD/employee/index"),
            meta: { title: "Cá nhân", icon: "fas fa-user-nurse" }
          },
          {
            path: "quan-ly",
            name: "Quản lý",
            component: () => import("@/views/RD/reportRD/admin/index"),
            meta: { title: "Quản lý", icon: "fas fa-tasks" }
          },
          {
            path: "/ho-so/y-tuong/:id",
            name: "Hồ sơ theo ý tưởng",
            hidden: true,
            component: () => import("@/views/RD/reportRD/component/index"),
            meta: { title: "Hồ sơ theo ý tưởng", icon: "tree" }
          }
        ]
      }
    ]
  },
  {
    path: "/quan-ly-nhan-su",
    component: Layout,
    meta: {
      title: "Nhân sự",
      icon: "fas fa-users"
    },
    redirect: "",
    children: [
      {
        path: "/quan-ly-nhan-su/dashboard",
        name: "Dashboard",
        component: () => import("@/views/user/dashboard"),
        meta: {
          title: "Dashboard",
          icon: "fas fa-tachometer-alt"
        }
      },
      {
        path: "/quan-ly-nhan-su/ho-so",
        name: "Hồ sơ",
        component: () => import("@/views/user/admin"),
        //component: () => import('@/views/user/components/TimeLine'),
        meta: {
          title: "Hồ sơ",
          icon: "far fa-address-card"
        }
      },
      {
        path: "/ban-giao-nghi-viec",
        name: "Bàn giao",
        component: () => import("@/views/handOver/index2"),
        //component: () => import('@/views/user/components/TimeLine'),
        meta: {
          title: "Bàn giao",
          icon: "fas fa-user-times"
        },
        children: [
          {
            path: "/ban-giao-nghi-viec/ca-nhan",
            name: "Cá nhân",
            component: () => import("@/views/handOver/index"),
            meta: { title: "Cá nhân", icon: "fas fa-user-check" }
          },
          {
            path: "/ban-giao-nghi-viec/nhan-su",
            name: "Nhân sự",
            component: () => import("@/views/handOver/nhansu"),
            meta: { title: "Nhân sự", icon: "fas fa-clipboard-list" }
          }
        ]
      },
      {
        path: "/danh-gia",
        name: "danh-gia",
        component: () => import("@/views/evaluateUser/index"),
        meta: {
          title: "Đánh giá",
          icon: "far fa-star"
        },
        children: [
          {
            path: "/danh-gia/tieu-chi",
            name: "Tiêu chí",
            component: () => import("@/views/evaluateUser/criteria/index"),
            meta: { title: "Tiêu chí", icon: "fas fa-user-check" }
          },
          {
            path: "/danh-gia/danh-sach",
            name: "Danh sách",
            component: () => import("@/views/evaluateUser/evaluate/index"),
            meta: { title: "Danh sách", icon: "fas fa-clipboard-list" }
          },
          {
            path: "/danh-gia/ket-qua",
            name: "Kết quả",
            component: () => import("@/views/evaluateUser/result/index"),
            meta: { title: "Kết quả", icon: "fas fa-poll" }
          },
          {
            path: "/danh-gia/in-phieu/:id",
            name: "In",
            hidden: true,
            component: () =>
              import("@/views/evaluateUser/component/printEvaluate"),
            meta: { title: "In", icon: "fas fa-clipboard-list" }
          }
        ]
      },
      {
        path: "/Survey",
        component: () => import("@/views/help/mail/index"),
        name: "Khảo sát",
        meta: {
          title: "Khảo sát",
          icon: "fas fa-file-invoice"
        },
        children: [
          {
            path: "Survey",
            name: "Tạo Khảo sát",
            component: () => import("@/views/survey/index"),
            meta: {
              title: "Khảo sát",
              icon: "fas fa-file-signature"
            }
          },
          {
            path: "/work/survey/:id",
            name: "Làm bài khảo sát",
            hidden: true,
            component: () =>
              import("@/views/survey/component/startSurvey/index"),
            meta: {
              title: "Làm bài khảo sát",
              icon: "fas fa-chart-line"
            }
          },
          {
            path: "/create/survey",
            name: "Tạo phiếu khảo sát",
            hidden: true,
            component: () =>
              import("@/views/survey/component/createSurvey/index"),
            meta: {
              title: "Tạo phiếu khảo sát",
              icon: "fas fa-chart-line"
            }
          },
          {
            path: "/result/survey",
            name: "Thống kê khảo sát",

            component: () => import("@/views/survey/component/result/index"),
            meta: {
              title: "Thống kê khảo sát",
              icon: "fas fa-file-contract"
            }
          },
          {
            path: "/result/detail/survey/:id",
            name: "Chi tiết Thống kê khảo sát",
            hidden: true,
            component: () =>
              import("@/views/survey/component/result/detail/index"),
            meta: {
              title: "Thống kê khảo sát",
              icon: "fas fa-chart-line"
            }
          }
        ]
      }
    ],
    hidden: displaySX
  },

  {
    path: "/groupEmployee",
    component: Layout,
    redirect: "",
    meta: { role: "ALL" },
    children: [
      {
        path: "/groupEmployee",
        name: "Quản lý nhóm",
        component: () => import("@/views/groupsEmployee/index"),
        meta: {
          title: "Quản lý nhóm",
          icon: "fas fa-user"
        }
      }
    ],
    hidden: displaySX
  },

  // {
  //     path: '/create/survey',
  //     component: Layout,
  //     children: [{
  //         path: '/create/survey',
  //         name: 'Tạo phiếu khảo sát',
  //         component: () =>
  //             import('@/views/survey/component/createSurvey/index'),
  //         meta: {
  //             title: 'Tạo phiếu khảo sát',
  //             icon: 'fas fa-chart-line'
  //         }
  //     }]
  // },
  {
    path: "/Help",

    component: Layout,
    meta: { title: "Trợ giúp", icon: "far fa-question-circle", role: "ALL" },
    children: [
      {
        path: "/Help/App",
        name: "App sổ tay",
        component: () => import("@/views/help/app/index"),
        meta: { title: "App sổ tay", icon: "fas fa-poll" }
      },
      {
        path: "/Help/Mail",
        component: () => import("@/views/help/mail/index"),
        name: "Mail",
        meta: { title: "Mail công ty", icon: "fas fa-mail-bulk" },
        children: [
          {
            path: "/Mail/iphone",
            name: "Mail Iphone",
            component: () => import("@/views/help/mail/iphone"),
            meta: { title: "Iphone", icon: "fab fa-apple" }
          },
          {
            path: "/Mail/Android",
            name: "Mail Android",
            component: () => import("@/views/help/mail/android"),
            meta: { title: "Android", icon: "fab fa-android" }
          }
        ]
      },
      {
        path: "/huong-dan-yeu-cau",
        name: "Hướng dẫn yêu cầu",
        component: () => import("@/views/help/web/yeucau"),
        meta: { title: "Hướng dẫn yêu cầu", icon: "fas fa-paper-plane" }
      },
      {
        path: "/help/phieu-nop-tien",
        name: "Phiếu nộp tiền",
        component: () => import("@/views/help/web/money-recipt"),
        meta: { title: "Nộp tiền-Phân bổ", icon: "fas fa-newspaper" }
      },
      {
        path: "/bao-loi-gop-y",
        name: "Báo lỗi - góp ý",
        component: () => import("@/views/help/report"),
        meta: { title: "Báo lỗi - góp ý", icon: "fas fa-bug" }
      },
      {
        path: "/view-report",
        name: "Xem Báo lỗi - góp ý",
        component: () => import("@/views/help/report/view"),
        meta: { title: "Báo lỗi - góp ý", icon: "fas fa-bug" },
        hidden: true
      },
      {
        path: "/call",
        name: "OPEN CALL",
        component: () => import("@/views/admin/openCall"),
        meta: {
          title: "Open Call",
          icon: "fas fa-users"
        }
      }
      // {
      //     path: '/KPI/list',
      //     name: 'Danh mục',
      //     component: () =>
      //         import ('@/views/KPI/list/index'),
      //     meta: { title: 'Danh mục', icon: 'fas fa-clipboard-list' }
      // }
    ],
    hidden: displaySX
  },

  // {
  //     path: '/admin',
  //     component: Layout,
  //     meta: {
  //         title: 'Quản lý',
  //         icon: 'fas fa-users'
  //       },
  //     redirect:'/admin/nhan-vien',
  //     children: [{
  //       path: '/nhan-vien',
  //       name: 'Người dùng',
  //       component: () => {
  //           if(store.getters.it){
  //             return import('@/views/admin/index')
  //           }
  //           else{
  //             return import('@/views/map/index')
  //           }
  //       } ,
  //       meta: {
  //         title: 'Người dùng',
  //         icon: 'fas fa-users'
  //       }
  //     },
  //     {
  //         path: '/call',
  //         name: 'OPEN CALL',
  //         component: () => import('@/views/admin/openCall') ,
  //         meta: {
  //           title: 'Open Call',
  //           icon: 'fas fa-users'
  //         }
  //       }],
  //       hidden:displaySX
  //     },
  {
    path: "/qr",
    component: Layout,
    //hidden: true,
    redirect: "",
    children: [
      {
        path: "/QRCode",
        name: "QRTest",
        component: () => import("@/views/QR/index"),
        meta: {
          title: "QRTest",
          icon: "fas fa-users"
        }
      },
      {
        path: "/QRTest/:id",
        name: "Quản lý",
        hidden: true,
        component: () => import("@/views/QR/component/formtest"),
        meta: {
          title: "Quản lý",
          icon: "fas fa-users"
        }
      }
    ],
    hidden: true
  },
  {
    hidden: true,
    path: "/group",
    component: Layout,
    redirect: "",
    children: [
      {
        path: "/group",
        name: "Quản lý công ty",
        component: () => import("@/views/groups/index"),
        meta: {
          title: "Quản lý công ty",
          icon: "fas fa-user"
        }
      }
    ]
  },
  {
    path: "/it-product",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "",
        name: "Phần mềm",
        component: () => import("@/views/itProduct/index"),
        meta: { title: "Phần mềm", icon: "fas fa-laptop" }
      }
    ]
  },
  {
    path: "/map",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "",
        name: "Bản đồ",
        component: () => import("@/views/map/index"),
        meta: { title: "Phần mềm", icon: "fas fa-laptop" }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
