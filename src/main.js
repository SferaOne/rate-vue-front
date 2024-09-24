import Vue from 'vue'
import App from './App.vue'
import vuetify from './shared/lib/vuetify'
import axios from "axios";
import router from "./shared/router";
import { config } from "@/shared/config/app";
import { getterlist, setterlist} from "./shared/config/endpoints";
import { referencelist } from "./shared/config/reference";
import { storage } from "./shared/lib/storage";
import { api } from "@/shared/lib/api";
import Notifications from 'vue-notification'

const VUETIFY_RU_I18N = require('vuetify/es5/locale/ru')

Vue.use(Notifications)

Vue.$http = axios;
Vue.prototype.$appName = config.appName;
Vue.prototype.$address = config.address;
Vue.config.productionTip = config.productionTip
Vue.prototype.$key = config.key
Vue.prototype.$getters = getterlist;
Vue.prototype.$setters = setterlist;
Vue.prototype.$references = referencelist;
Vue.prototype.$_config = {}
Vue.prototype.$getapi = api.methods.get;
Vue.prototype.$postapi = api.methods.post;
Vue.prototype.$_setsetting = storage.methods.set;
Vue.prototype.$_getsetting = storage.methods.get;
Vue.prototype.$_clear = storage.methods.clear;
Vue.prototype.$_removesetting = storage.methods.remove;

new Vue({
  vuetify,
  render: h => h(App),
  lang: {
    locales: {
      ru: VUETIFY_RU_I18N.default
    },
    current: 'ru'
  },
  router
}).$mount('#app')
