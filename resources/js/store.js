import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import miniToastr from "mini-toastr";
miniToastr.init();
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: "",
        token: localStorage.getItem("auth") || "",
        user: {},
        apiName: "",
        nav: [],
        perPage: 2,
        firstname: "",
        isLoading: false,
    },
    computed: {},
    plugins: [
        createPersistedState({
            key: "Monitoring",
        }),
    ],
    mutations: {
        auth_request(state, status) {
            state.status = status;
        },
        setToken(state, token) {
            localStorage.setItem("auth", token);
            state.token = token;
        },
        clearToken(state) {
            localStorage.removeItem("auth");
            state.token = "";
        },
        firstname(state, firstname) {
            state.firstname = firstname;
        },
        auth_error(state) {
            state.status = "error";
        },
        logout(state) {
            localStorage.removeItem("auth");
            state.status = "";
            state.token = "";
            state.user = "";
            state.isWarehouse = false;
            state.branches = "";
            state.site = "";
            state.firstname = "";
            state.selectedWarehouse = "";
            state.warehousecode = "";
            state.warehousedesc = "";
            state.isLoading = false;
            state.apiName = "";
        },

        filter(state, isFilter) {
            state.isFilter = isFilter;
        },

        firstname(state, firstname) {
            state.firstname = firstname;
        },
        user(state, user) {
            state.user = user;
        },
        setLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
        setNav(state, newStateNav) {
            state.nav = newStateNav;
        },
    },
    actions: {
        login({ commit }, userparam) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios
                    .post("api/login", userparam)
                    .then((resp) => {
                        if (resp.data.success) {
                            commit("setToken", resp.data.token);
                            commit("firstname", resp.data.user.name);
                            commit("user", resp.data.user);
                            commit("auth_request", resp.data.success);
                            resolve(resp);
                        } else {
                            commit("setToken", resp.data.token);
                            resolve(resp);
                        }
                    })
                    .catch((err) => {
                        miniToastr.error(err);
                    });
            });
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.token,
        authStatus: (state) => state.status,
        apiName: (state) => state.apiName,
        isFilter: (state) => state.isFilter,
        site: (state) => state.site,
        firstname: (state) => state.firstname,
        token: (state) => state.token,
        isLoading: (state) => state.isLoading,
        user: (state) => state.user,
        nav: (state) => state.nav,
        perPage: (state) => state.perPage,
    },
});
