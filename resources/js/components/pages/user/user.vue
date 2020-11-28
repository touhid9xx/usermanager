<template>
    <v-col class="mobile-sidebar px-0 pr-0 pr-md-3" transition="slide-x-reverse-transitions" cols="12" md="2" lg="4">
        <v-card height="100%" outlined class="py-2 user-card">
            <v-row align="end" v-if="user.id">
                <v-col align-self="start" cols="12">
                    <v-row>
                        <v-col cols="11" class="px-8 text-left ph-0">
                            <v-avatar color="primary" size="50" class="float-left mr-3">
                                <span class="white--text headline">{{avatarText}}</span>
                            </v-avatar>
                            <h4 class="mb-0 text-md-body-1 text-md-body-2 mt-3 text-wrap">
                                {{user.first_name}} {{user.middle_name}}{{user.last_name}}
                            </h4>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="px-8 text-left pb-8">
                    <p class="mb-2 mt-2"><v-icon>mdi-email</v-icon>{{user.email}}</p>
                    <p class="mb-2 mt-2"><v-icon>mdi-phone</v-icon>{{user.phone}}</p>

                    <v-dialog persistent v-model="dialog" width="500">
                        <template v-slot:activator="{on, attrs}">
                            <v-btn v-bind="attrs" v-on="on" color="red" outlined small dark>Update</v-btn>
                        </template>

                        <v-card>
                            <v-card-title class="headline" primary-title>
                                Title
                            </v-card-title>
                            <v-card-text>
                                there will be some kind of desciption after I found out
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green" outlined dark small @click="onClickDeleteUser"></v-btn>
                                <v-btn color="red" outlined dark small @click="dialog=false">Cancel</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
            <transition name="fade" mode="out-in">
                <v-divider></v-divider>
            </transition>

            <div class="user-contect">
                <transition name="fade" mode="out-in">
                     <router-view/>
                </transition>
            </div>

            <v-bottom-navigation absolute color="primary" bottom="0" grow>
                <v-btn :to="user-info" class="text-decoration-none">
                    <span>User Info</span>
                    <v-icon>mdi-account-multiple</v-icon>
                </v-btn>

                <v-btn :to="user-orders" class="text-decoration-none">
                    <span>User Order</span>
                    <v-icon>mdi-cart</v-icon>
                </v-btn>

                <v-btn :to="user-edit" class="text-decoration-none">
                    <span>User Edit</span>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-bottom-navigation>
            <v-btn color="white" icon absolute top right @click="onClickCloseButton"><v-icon>mdi-close</v-icon></v-btn>
        </v-card>
    </v-col>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "user",
        props: ['id'],
        data() {
          return {
              dialog: false,

          }
        },
        computed: {
            ...mapGetters('users', [
                'user'
            ]),

            avatarText: {
                get() {
                    const arr = this.user.first_name.split(' ')
                    let counter = 0;
                    return arr.reduce(function(result, current){
                        return counter++ < 2 ? result + current.charAt(0).toUpperCase(): result
                    }, "")
                }
            }
        },
        methods: {
            ...mapActions('users', [
                'getUser','deleteUser'
            ]),

            onClickDeleteUser() {
                this.deleteUser(this.$props.id)
                .then((response) => {
                    this.dialog= false
                    this.onClickCloseButton()
                    this.$root.$emit('onClickDeleteUserSuccess', response.data.message)
                })
                .error((error) => {
                    this.$root.$emit('onClickDeleteUserError', error.response.data.message)
                })
            },

            onClickCloseButton() {
                this.$router.push("users");
            }
        },
        mounted() {
           this.getUser(this.$props.id)
        },
        watch: {
            $route(to, from) {
                this.id = to.params.id;
            }
        }
    }
</script>

<style>
    .user-contect {
        height: calc(100vh - 400px);
        overflow-y: auto;
    }
    .user-card {
        overflow: hidden;
    }

    @media screen and (max-width: 960px)  {
        .user-contect {
            height: calc(100vh - 300px);
            overflow-y: auto;
        }
        .v-application .text-md-body-1 {
            line-height: 3em !important;
        }
        .fade-enter, fade-leave-to {
            opacity: 0;
            transform: translateX(2em);
        }

        .fade-enter-active, .fade-leave-active {
            transition: all.3s ease;
        }
        .user-card {
            overflow: hidden;
        }
    }
</style>
