//require("./bootstrap");
import Vue from "vue";
import App from "./app/pages/App";
import router from "./app/router";
import store from "./store";

import BootstrapVue from "bootstrap-vue";
import VueRouterBackButton from "vue-router-back-button";
import "./polyfill";
import miniToastr from "mini-toastr";
import Vselect from "vue-select";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
miniToastr.init();
Vue.use(VueRouterBackButton, { router });
Vue.use(BootstrapVue);
Vue.use(Notifications);

Vue.component("v-select", Vselect);

new Vue({
    el: "#app",
    router,
    store,
    template: "<App/>",
    components: {
        App,
    },
});
