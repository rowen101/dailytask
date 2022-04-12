<template>
    <AppHeaderDropdown right no-caret>
        <template slot="header">
            <label>Hi! &nbsp; {{ firstname }} &nbsp;</label>
        </template>
        <template slot="dropdown">
            <b-dropdown-item @click="logout">
                <i class="fa fa-lock" /> Logout
            </b-dropdown-item>
            <b-dropdown-header tag="div" class="text-center">
                <strong>Settings</strong>
            </b-dropdown-header>

            <b-dropdown-item
                ><i class="fa fa-wrench" /> Settings</b-dropdown-item
            >
        </template>
    </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
import axios from "axios";
export default {
    name: "DefaultHeaderDropdownAccnt",
    components: {
        AppHeaderDropdown,
    },
    data: () => {
        return { itemsCount: 42 };
    },
    computed: {
        firstname: {
            get: function () {
                console.log(this.$store.getters.firstname);
                return this.$store.getters.firstname;
            },
            set: function (value) {},
        },
    },
    methods: {
        logout() {
            axios
                .post("/api/logout", { token: this.$store.state.token })
                .then((resp) => {
                    this.$router.push("/login");
                    this.$store.commit("clearToken");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>
