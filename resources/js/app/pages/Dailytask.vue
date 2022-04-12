<template>
    <div class="animated fadeIn">
        <b-col md="12">
            <b-card header>
                <div slot="header">
                    <span>Daily Task Monitoring</span>
                    <a
                        href="#"
                        class="btn btn-sm btn-info float-right ml-1"
                        id="printpagebutton"
                        @click="onPrint"
                    >
                        <i class="fa fa-print"></i> Print
                    </a>
                    <button
                        id="printexport"
                        class="btn btn-sm btn-info float-right"
                        @click="onexport"
                    >
                        Export
                    </button>
                </div>
                <div class="row justify-content-between text-left">
                    <div class="form-group col-sm-6 flex-column d-flex">
                        <div class="newButton">
                            <b-button
                                variant="success"
                                class="btnsm"
                                @click="OnClinkNEwIndicator()"
                            >
                                <i class="fa fa-plus-circle"></i>&nbsp;New
                                Ticket
                            </b-button>
                        </div>
                    </div>
                    <div class="form-group col-sm-6 flex-column d-flex">
                        <b-form-group label-cols-sm="1" class="mb-0">
                            <b-input-group>
                                <b-form-input
                                    v-model="filter"
                                    placeholder="Type to Search"
                                />
                                <b-input-group-append>
                                    <b-button
                                        :disabled="!filter"
                                        @click="filter = ''"
                                        >Clear</b-button
                                    >
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </div>
                </div>
                &nbsp;
                <b-table
                    show-empty
                    stacked="md"
                    responsive="sm"
                    hover
                    small
                    striped
                    fixed
                    head-variant="light"
                    :busy.sync="isBusy"
                    :items="items"
                    :fields="fields"
                    :per-page="perPage"
                    :filter="filter"
                >
                    <template #cell(week)="data">
                        {{ data.item.week }}
                    </template>

                    <template #cell(status)="data">
                        <i
                            :class="
                                data.item.status == 1
                                    ? 'activeStatus icon-check active_icon'
                                    : 'inactiveStatus icon-close inactive_icon'
                            "
                        ></i>
                    </template>
                    <template #cell(action_button)="data">


                        <router-link
                            tag="button"
                            :to="
                                '/dailytask/modify/' +
                                data.item.id
                            "
                            class="btn btn-primary btn-sm btn-square"
                        >
                            <i class="fa fa-pencil-square-o"></i>
                        </router-link>
                        <b-button
                            size="sm"
                            variant="danger"
                            class="btn btn-danger btn-sm btn-square"
                            @click="onSelecteItemToDelete(data.item)"
                        >
                            <i class="fa fa-trash-o"></i>
                        </b-button>
                    </template>
                    <template #cell(show_details)="row">
                        <b-button
                            size="sm"
                            @click="row.toggleDetails"
                            class="mr-2"
                        >
                            {{ row.detailsShowing ? "Hide" : "Show" }} Details
                        </b-button>
                    </template>
                    <template #row-details="row">
                        <b-card>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"
                                    ><b>User:</b></b-col
                                >


                                <b-col>{{ row.item.raisedby }}</b-col>
                            </b-row>



                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"
                                    ><b>Subject:</b></b-col
                                >
                                <b-col>{{ row.item.subject }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"
                                    ><b>Branch:</b></b-col
                                >
                                <b-col>{{ row.item.site }}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"
                                    ><b>District:</b></b-col
                                >
                                <b-col>{{ row.item.district }}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"
                                    ><b>Agent:</b></b-col
                                >
                                <b-col>{{ row.item.agent }}</b-col>
                            </b-row>

                        </b-card>
                    </template>
                </b-table>
            </b-card>
            <div style="margin-top: 5px">
                <b-pagination
                    size="sm"
                    :total-rows="totalItem"
                    v-model="currentPage"
                    :per-page="perPage"
                    @input="onPageSelect"
                ></b-pagination>
            </div>

              <b-modal title="System Message" v-model="deleteModal" @ok="onDeleteItem">
          Are you sure you want to remove
          <strong>{{selectedItemLabel}} ?</strong>
        </b-modal>
        </b-col>
    </div>
</template>
<script>
import api from "../services/api";
export default {
    name: "Dailytask",
    data: function () {
        return {
             deleteModal: false,
              selectedItemLabel: "",
            //perPage: this.$store.getters.perPage,
            perPage: 2,

            totalItem: 0,
            currentPage: 1,
            isBusy: false,
            sortOptions: [],
            filter: null,
            items: [],
            fields: [
                {
                    week: { key: "week", label: "Week", sortable: true },
                },
                {
                    ticket: { key: "ticket", label: "Ticket" },
                },
                 {
                    ticket: { key: "subject", label: "Subject" },
                },
                 {
                    ticket: { key: "raisedby", label: "Raisedby" },
                },
                 {
                    ticket: { key: "department", label: "Department" },
                },
                 {
                    ticket: { key: "ticket", label: "Ticket" },
                },
                {
                    status: { key: "status", label: "Status" },
                },
                {
                    show_details: {
                        label: "Show Details",
                    },
                },
                 {
                    action_button: {
                        label: "Action",
                    },
                },
            ],
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
                    // this.loading = false;
                })
                .catch((err) => {
                    this.$store.commit("clearToken");
                    this.$router.push("/login");
                });
        }
    },
    methods: {
        back: function () {
            this.$router.push("/dailytask-setup");
        },
        onPrint: function (evt) {
            evt.preventDefault();
            // this.isHidden = true;
            var printButton = document.getElementById("printpagebutton");
            var printExport = document.getElementById("printexport");
            var breadView = document.getElementById("breadview");
            //Set the print button visibility to 'hidden'
            printButton.style.visibility = "hidden";
            printExport.style.visibility = "hidden";
            breadView.style.visibility = "hidden";
            //Print the page content
            window.print();
            printButton.style.visibility = "visible";
            printExport.style.visibility = "visible";
            breadView.style.visibility = "visible";
        },
        onexport: function () {
            JSONToCSVConvertor(this.items, "Indicator List", true);
        },
        OnClinkNEwIndicator: function () {
            this.$router.push("/dailytask/add");
        },
        onPageSelect(page) {
            this.isBusy = true;
            let self = this;
            self.$store.commit("setLoading", true);
            let promise = api.instance.get("/task-list?page=" + page);

            return promise
                .then((resp) => {
                    self.items = resp.data.item;
                    self.totalItem = resp.data.totalItem;
                    // Here we could override the busy state, setting isBusy to false
                    self.isBusy = false;
                    self.$store.commit("setLoading", false);
                })
                .catch((err) => {
                    // Here we could override the busy state, setting isBusy to false
                    self.isBusy = false;
                    // Returning an empty array, allows table to correctly handle busy state in case of error
                    self.$store.commit("setLoading", false);
                    api.httpMsg(self, err.status, err.data);

                    return [];
                });
        },
        initTable() {
            // Here we don't set isBusy prop, so busy state will be handled by table itself
            this.isBusy = true;
            let self = this;
            //   self.$store.commit("setLoading", true);
            let promise = api.instance.get("/task-list?page=" + self.perPage);

            return promise
                .then((resp) => {
                    self.items = resp.data.item;
                    self.totalItem = resp.data.totalItem;
                    //self.$store.commit("setLoading", false);

                    // Here we could override the busy state, setting isBusy to false
                    //self.isBusy = false;
                    //   return items;
                })
                .catch((err) => {
                    // Here we could override the busy state, setting isBusy to false
                    //   self.isBusy = false;
                    //   self.$store.commit("setLoading", false);
                    api.httpMsg(self, err.status, err.data);
                    // Returning an empty array, allows table to correctly handle busy state in case of error
                    return [];
                });
        },
        onSelecteItemToDelete: function(param) {
      this.selectedItem = param;
      this.selectedItemLabel = this.selectedItem.checklistId;
      this.deleteModal = true;
    },
      onDeleteItem: function() {
      this.$store.commit("setLoading", true);
      api.instance
        .delete(
          "itsek/remove-checklist?checklistId=" + this.selectedItem.checklistId
        )
        .then(resp => {
          this.initTable();
          this.deleteModal = false;
          miniToastr.success(resp.data);
          this.$store.commit("setLoading", false);
        })
        .catch(err => {
          if (err.response.data === "") {
            api.httpMsg(this, err.status, err.data);
          } else {
            miniToastr.error(err.response.data);
          }
          this.$store.commit("setLoading", false);
        });
    },

    },
    created: function () {
        this.initTable();
    },
};
</script>

<style scoped></style>
