<template>
    <div>MY Home</div>
</template>
<script>
export default {
    name: "Home",
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
                    //this.loading = false;
                })
                .catch((err) => {
                    this.$store.commit("clearToken");
                    this.$router.push("/login");
                });
        }
    },
    computed:function(){
this.$router.push("/dashboard");
    }
};
</script>

<style scoped></style>
