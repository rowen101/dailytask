import axios from "axios";
import miniToastr from "mini-toastr";
miniToastr.init();
const baseURL = "/api";

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: "application/json",
    },
});

// instance.interceptors.request.use(
//   async config => {
//     const userToken = await localStorage.getItem("token");
//     const serverwarehouseId = await localStorage.getItem("selectedWarehouse");

//     if (userToken != null) {
//       config.headers.token = userToken;
//       config.headers.serverwarehouseId = serverwarehouseId;
//     }

//     return config;
//   },
//   error => Promise.reject(error)
// );

function httpMsg(obj, statuscode, msg) {
    if (statuscode === 401) {
        obj.$store.dispatch("logout").then(() => {
            obj.$router.push("/login");
        });
    } else if (statuscode === 200) {
        miniToastr.success(msg);
    } else if (statuscode === undefined) {
        miniToastr.error("Please contact administrator!!!");
    } else {
        miniToastr.error(msg);
    }
}

export default {
    instance,
    baseURL,
    httpMsg,
};
