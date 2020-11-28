<template>
    <v-container fluid class="fill-height fill-height-main py-0">
        <v-row class="fill-height">
            <v-col max-height="100%" class="px-0 py-0 px-md-3 py-md-3">
                <v-card outlined class="card-content">
                    <v-card-title>
                        <v-col
                            class="py-0 d-none d-md-block"
                            cols="3"
                            lg="3"
                            md="3"
                        >
                          <v-badge color="primary" :content="pagination.total + ' '+ 'DUDE'">User Area</v-badge>
                        </v-col>
                        <v-col class="pa-0" cols="8" lg="8" md="8" sm="10">
                            <v-text-field
                                full-width
                                solo
                                outlined
                                flat
                                v-model="searchField"
                                hide-details
                                label="Search"
                                clearable
                            />
                        </v-col>
                        <v-col cols="2" lg="1" sm="2" class="ml-auto ml-md-0">
                            <v-dialog
                                v-model="dialog"
                                persistent
                                max-width="600"
                            >
                                <template v-slot:activator="{ on, attr }">
                                    <v-btn
                                        icon
                                        color="green"
                                        text
                                        class="text-decoration-none"
                                        dark
                                        v-bind="attr"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-form ref="form">
                                        <v-col>
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                v-model="userData.first_name"
                                                label="First Name"
                                                type="text"
                                                counter
                                                clearable
                                                dark
                                                :rules="nameRules"
                                                :error-messages="addUserErrors.first_name"
                                            />
                                        </v-col>
                                        <v-col>
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                v-model="userData.middle_name"
                                                label="Middle Name"
                                                type="text"
                                                counter
                                                clearable
                                                dark
                                                :rules="nameRules"
                                                :error-messages="addUserErrors.middle_name"
                                            />
                                        </v-col>
                                        <v-col>
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                v-model="userData.last_name"
                                                label="Last Name"
                                                type="text"
                                                counter
                                                clearable
                                                dark
                                                :rules="nameRules"
                                                :error-messages="addUserErrors.last_name"
                                            />
                                        </v-col>
                                        <v-col>
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                v-model="userData.email"
                                                label="Email"
                                                type="email"
                                                counter
                                                clearable
                                                dark
                                                :rules="emailRules"
                                                :error-messages="addUserErrors.email"
                                            />
                                        </v-col>
                                        <v-col>
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                v-model="userData.phone"
                                                label="Phone number"
                                                v-mask="'+44##########'"
                                                type="tel"
                                                counter
                                                clearable
                                                dark
                                                :rules="nameRules"
                                                :error-messages="addUserErrors.phone"
                                            />
                                        </v-col>
                                        <v-col>
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                v-model="userData.address"
                                                label="Address"
                                                type="text"
                                                counter
                                                clearable
                                                dark
                                                :rules="nameRules"
                                                :error-messages="addUserErrors.address"
                                            />
                                        </v-col>
                                        <v-col>
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                v-model="userData.password"
                                                label="Password"
                                                type="password"
                                                counter
                                                clearable
                                                dark
                                                :rules="passRules"
                                                :error-messages="addUserErrors.password"
                                            />
                                        </v-col>
                                        <v-col>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                class="d-md-inline-block d-sm-block"
                                                text
                                                color="green"
                                                @click="onClickAddUser"
                                            >
                                                Create
                                            </v-btn>
                                            <v-btn
                                                class="d-md-inline-block d-sm-block"
                                                text
                                                color="red"
                                                @click="dialog = false"
                                            >
                                                Close
                                            </v-btn>
                                        </v-col>
                                    </v-form>
                                </v-card>
                            </v-dialog>
                        </v-col>
                    </v-card-title>

                    <div class="scroll-overflow" ref="usersList">
                        <v-card flat height="100%">
                            <v-list two-line subheader>
                            <UserItem
                                v-for="user in users"
                                :key="user.id"
                                :id="user.id"
                                :firstName="user.first_name"
                                :lastName="user.last_name"
                                :middleName="user.middle_name"
                                :email = "user.email"
                                :phone ="user.phone"
                                :address="user.address"
                            />
                            <div class="text-center pagination-wrapper">
                                <v-pagination v-model="pagination.current_page" :length="pagination.last_page" :total-visible="9" circle></v-pagination>

                            </div>

<!--                                <Loader :value="usersLoader" />-->

                            </v-list>
                        </v-card>
                    </div>
                </v-card>
            </v-col>
            <transition name="fade" mode="out-in">
                <router-view/>
            </transition>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
import UserItem from "./useritem";
import Loader from '../../Loader';

export default {
    name: "users",
    components: {
        UserItem,
        Loader
    },
    data() {
        return {
            searchField: "",
            dialog: false,
            userData: {
                first_name: "",
                last_name: "",
                middle_name: "",
                email: "",
                phone: "",
                address: "",
                password: ""
            },
            nameRules: [
                v => !!v || "Required",
                // v =>
                //     (v && v.length <= 10) ||
                //     "Name must be less than 10 characters"
            ],
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
            passRules: [
                v => !!v || "Password is required",
                v =>
                    (v && v.length >= 6) ||
                    "Password must be atleast 6 character"
            ]
        };
    },
    methods: {
        ...mapActions("users", ["getAllUsers", "addNewUser"]),
        onClickAddUser() {

           this.addNewUser(this.userData)
            .then((response) =>{
               this.$refs.form.reset();
               this.dialog= false
               this.$root.$emit('onClickNewUserSuccess', response.data.message)
            })
            .catch((error) => {
                this.$root.$emit('onClickNewUserError', error.response.data.message)
            })
        }
    },
    watch: {
      'pagination.current_page' : function () {
            this.getAllUsers({
                page: this.pagination.current_page,
                searchField: this.searchField
            })
      },

        searchField() {
          this.searchField = this.searchField = null ? "" : this.searchField;
          this.getAllUsers({
              page: this.pagination.current_page,
              searchField: this.searchField
          })
        }
    },

    mounted() {
        this.getAllUsers({
            page: 1,
            searchField: ''
        })

        this.$root.$on('onClickDeleteUserSuccess', () => {
            this.getAllUsers({
                page: this.pagination.current_page,
                searchField: this.searchField
            })
        })
    },
    computed: {
        ...mapGetters('users', [
            'users', 'pagination','usersLoader',"addUserErrors"
        ])
    }
};
</script>

<style>
    .pagination-wrapper {
        width: 100%;
    }
    .card-content {
        height: calc(100vh - 90px);
    }
    scroll-overflow {
        height: calc(100vh - 180px);
        overflow-y: auto;
        overflow-x: hidden;
    }
    .content-row {
        position: absolute !important;
        top: 0;
        left: 0;
        height: 100%;
    }

    @media screen and (max-width: 960px) {
        .mobile-sidebar {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
        }
        .card-content {
            height: calc(100vh - 56px);
        }
        scroll-overflow {
            height: calc(100vh - 136px);

        }

        .fade-enter, fade-leave-to {
            opacity: 0;
            transform: translateX(2em);
        }

        .fade-enter-active, .fade-leave-active {
            transition: all.3s ease;
        }
    }

</style>
