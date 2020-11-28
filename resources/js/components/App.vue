<template>
    <v-app>
        <v-snackbar
            :color="snackbarData.color"
            rounded="pill" v-model="snackbarData.snackbar"
            timeout="2000" :top="true"
            :multi-line="snackbarData.multiline"
            >
                {{ snackbarData.text }}
        </v-snackbar>

        <template v-slot:action="{attr}">
            <v-btn color="white" v-bind="attr" @click="snackbarData.snackbar=false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
        <component :is="layout">
            <router-view></router-view>
        </component>
    </v-app>
</template>

<script>
const default_layout = "default";
export default {
    data() {
        return {
            snackbarData : {
                multiline:true,
                snackbar: false,
                text:'',
                color: ''
            },
            successMessagesArray: [
                'onClickNewUserSuccess',
                'onClickDeleteUserSuccess'
            ],
            errorMessagesArray: [
                'onClickNewUserError',
                'onClickDeleteUserError'
            ]
        }
    },
    computed: {
        layout() {
            return (this.$route.meta.layout || default_layout) + "-layout";
        }
    },
    methods: {
      clearSnackbarData()  {
          this.snackbarData = {
              snackbar: false,
              text: '',
              color: ''
          }
      }
    },
    mounted() {
        let vm = this
        this.successMessagesArray.forEach((el) => {
            vm.$root.$on(el, (response) => {
                vm.snackbarData = {
                    snackbar:true,
                    color:'success',
                    text: response
                }
                setTimeout(()=> {
                    this.clearSnackbarData()
                },2000)
            })
        })

        this.errorMessagesArray.forEach((el)=> {
            vm.$root.$on(el, (error) => {
                vm.snackbarData = {
                    snackbar:true,
                    color:'red',
                    text: error
                }
                setTimeout(()=> {
                    this.clearSnackbarData()
                },2000)
            })
        })
    }
};
</script>

<style></style>
