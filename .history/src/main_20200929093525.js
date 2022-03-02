import Vue from "vue";
// import Vuetify from 'vuetify'
import "./registerServiceWorker";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import * as VueGoogleMaps from "vue2-google-maps";
require("datejs");

//  require('googleapis')

import VueCoreVideoPlayer from "vue-core-video-player";

Vue.use(VueCoreVideoPlayer);

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/vi"; // lang i18n

import "@/styles/index.scss"; // global css
import splitPane from "vue-splitpane";
Vue.component("split-pane", splitPane);
import App from "./App";
import store from "./store";
import router from "./router";
// import VModal from 'vue-js-modal'

// import VueAnalytics from 'vue-analytics'

// Vue.use(VueAnalytics, {
//   id: 'UA-179079486-1',
//   autoTracking: {
//     screenview: true
//   }
// })

//Vue.use(VModal)
import { Modal, VoerroModal } from "@voerro/vue-modal";

Vue.component("modal", Modal);
window.VoerroModal = VoerroModal;
import "@/icons"; // icon
import "@/permission"; // permission control
import "./utils/numberFormat";

// import 'vuetify/dist/vuetify.min.css'
// Vue.use(Vuetify)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from "../mock";
if (process.env.NODE_ENV === "production") {
  mockXHR();
}
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDwn1LVzfBeHNGrXB8g5DbG6AvIb_3Xap8",
    libraries: "places" // This is required if you use the Autocomplete plugin
  }
});
import Cleave from "vue-cleave-component";
Vue.use(Cleave);
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
