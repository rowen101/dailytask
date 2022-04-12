<template>
    <div>
        <div v-if="loading">
            <div class="spinner-border" role="role">
                <span class="sr-only">loading...</span>
            </div>
        </div>
        <div v-else>You are logged in</div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "Dashboard",
    data() {
        return {
            loading: true,
        };
    },
    mounted() {
        if (this.$store.state.token != "") {
            axios
                .post("/api/checkToken", { token: this.$store.state.token })
                .then((res) => {
                    if (!res.data.success) {
                        this.$store.commit("setToken", res.data.token);
                    }
                    this.loading = false;
                })
                .catch((err) => {
                    this.$store.commit("clearToken");
                    this.$router.push("/login");
                });
        }
    },
};
</script>

<style scoped></style>
