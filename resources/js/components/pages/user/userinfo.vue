<template>
<div>
    <h3>User Info</h3>
    <v-list two-line>
        <v-list-item>
            <v-list-item-title class="mb-3">First Name: </v-list-item-title>
            <v-list-item-action-text>{{user.first_name}}</v-list-item-action-text>
        </v-list-item>
        <v-list-item>
            <v-list-item-title class="mb-3">Middle Name: </v-list-item-title>
            <v-list-item-action-text>{{user.middle_name}}</v-list-item-action-text>
        </v-list-item>

        <v-list-item>
            <v-list-item-title class="mb-3">Last Name: </v-list-item-title>
            <v-list-item-action-text>{{user.last_name}}</v-list-item-action-text>
        </v-list-item>

        <v-list-item>
            <v-list-item-title class="mb-3">Email: </v-list-item-title>
            <v-list-item-action-text>{{user.email}}</v-list-item-action-text>
        </v-list-item>

        <v-list-item>
            <v-list-item-title class="mb-3">Phone: </v-list-item-title>
            <v-list-item-action-text>{{user.phone}}</v-list-item-action-text>
        </v-list-item>

        <v-list-item>
            <v-list-item-title class="mb-3">Address: </v-list-item-title>
            <v-list-item-action-text>{{user.address}}</v-list-item-action-text>
        </v-list-item>

        <v-list-item>
            <v-list-item-title class="mb-3">Created: </v-list-item-title>
            <v-list-item-action-text>{{user.created_at | moment('HH:mm')}}  {{user.created_at | moment('DD MMMM YYYY')}}</v-list-item-action-text>
        </v-list-item>

        <v-list-item>
            <v-list-item-title class="mb-3">Updated: </v-list-item-title>
            <v-list-item-action-text>{{user.updated_at | moment('HH:mm')}}  {{user.updated_at | moment('DD MMMM YYYY')}}</v-list-item-action-text>
        </v-list-item>
    </v-list>
</div>
</template>


<script>
    import { mapGetters, mapActions} from 'vuex';
    import moment from 'moment';
    export default {
        name: "userinfo",
        props: ['id'],
        data() {
          return {
              // id: undefined
          }
        },
        computed: {
              ...mapGetters('users', [
                'user'
            ]),
        },

        methods: {
            ...mapActions('users', [
                'getUser'
            ]),
        },

        watch: {
            $route(to, from) {
                this.id = to.params.id;
            }
        }
    }
</script>

<style scoped>

</style>
