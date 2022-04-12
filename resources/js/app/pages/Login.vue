<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="8">
                    <b-card-group>
                        <b-card no-body class="p-4">
                            <b-card-body>
                                <b-form>
                                    <h1>Login</h1>
                                    <p class="text-muted">
                                        Sign In to your account
                                    </p>
                                    <b-input-group class="mb-3">
                                        <b-input-group-prepend
                                            ><b-input-group-text
                                                ><i
                                                    class="icon-user"
                                                ></i></b-input-group-text
                                        ></b-input-group-prepend>
                                        <b-form-input
                                            type="text"
                                            class="form-control"
                                            v-model="credentials.email"
                                            placeholder="Username"
                                            autocomplete="username email"
                                        />
                                    </b-input-group>
                                    <b-input-group class="mb-4">
                                        <b-input-group-prepend
                                            ><b-input-group-text
                                                ><i
                                                    class="icon-lock"
                                                ></i></b-input-group-text
                                        ></b-input-group-prepend>
                                        <b-form-input
                                            type="password"
                                            v-model="credentials.password"
                                            v-on:keyup.enter="login"
                                            class="form-control"
                                            placeholder="Password"
                                            autocomplete="current-password"
                                        />
                                    </b-input-group>
                                    <b-row>
                                        <b-col cols="6">
                                            <b-button
                                                variant="primary"
                                                class="px-4"
                                                @click="login"
                                                >Login</b-button
                                            >
                                        </b-col>
                                        <b-col cols="6" class="text-right">
                                            <b-button
                                                variant="link"
                                                class="px-0"
                                                >Forgot password?</b-button
                                            >
                                        </b-col>
                                    </b-row>
                                </b-form>
                            </b-card-body>
                        </b-card>
                        <b-card
                            no-body
                            class="text-white bg-primary py-5 d-md-down-none"
                            style="width: 44%"
                        >
                            <b-card-body class="text-center">
                                <div>
                                    <h2>Sign up</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua.
                                    </p>
                                    <b-button
                                        variant="primary"
                                        class="active mt-3"
                                        @click="register"
                                        >Register Now!</b-button
                                    >
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import miniToastr from "mini-toastr";
miniToastr.init();
export default {
    name: "Login",
    components: {},
    data() {
        return {
            errors: [],

            filter: null,
            credentials: {
                email: "",
                password: "",
            },
            loading: true,
        };
    },
    computed: {},
    mounted() {},
    methods: {
        // checkForm: function (e) {
        //     if (
        //         this.credentials.email &&
        //         this.credentials.password &&

        //     ) {
        //         return true;
        //     }

        //     this.errors = [];
        //     if (!this.credentials.email) {
        //         this.errors.push("email required.");
        //     }
        //     if (!this.credentials.password) {
        //         this.errors.push("password required.");
        //     }

        //     e.preventDefault();
        // },
        login: function () {
            //  evt.preventDefault();
            // if (!this.checkForm()) {
            //     return;
            // }

            this.$store
                .dispatch("login", this.credentials)
                .then((resp) => {
                    // miniToastr.success("Login " + resp.data.success);
                    this.$router.push("/dashboard");
                })
                .catch((err) => {
                    miniToastr.error(err.data);
                });
        },

        register() {
            this.$router.push("/register");
        },
    },
    created: function () {
        if (this.$store.state.token != "") {
            axios
                .post("/api/checkToken", { token: this.$store.state.token })
                .then((res) => {
                  
                    this.$router.push("/dashboard");
                })
                .catch((err) => {
                    this.$store.commit("clearToken");
                    miniToastr.error(err.data);
                });
        }
    },
};
</script>
