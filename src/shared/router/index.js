import Vue from "vue";
import Router from "vue-router";

import RateList from "../../pages/rate-list/RateList";
import RateCardByID  from "../../pages/rate-page/RateCardByID";
import RateLogin from "../../pages/login/RateLogin";
import RateLoader from "@/pages/rate-loader/RateLoader";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "RateLogin",
        component: RateLogin
      },
      {
        path: "/RateList",
        name: "RateList",
        component: RateList
      },
      {
        path: "/RateCardByID",
        name: "RateCardByID",
        component: RateCardByID
      },
      {
        path: "/RateLoader",
        name: "RateLoader",
        component: RateLoader
      },
    ],
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
      }
    });