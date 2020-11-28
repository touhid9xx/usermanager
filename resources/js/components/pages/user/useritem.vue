<template>
    <v-list-item color="primary" class="text-decoration-none" :to=" 'users/' + id" >
        <v-list-item-avatar color="primary">
            <span class="white--text headline">{{avatarText}}</span>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title> {{firstName}} {{middleName}} {{lastName}}</v-list-item-title>
            <v-list-item-subtitle> {{phone}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            {{email}}
        </v-list-item-action>
    </v-list-item>
</template>

<script>
    export default {
        name: "useritem",
        props: [
            'id',
            'firstName',
            'lastName',
            'middleName',
            'email',
            'phone',
            'address',
        ],

        computed: {
            avatarText() {
                const arr = this.firstName.split(' ')
                let counter = 0;
                return arr.reduce(function(result, current){
                    return counter++ < 2 ? result + current.charAt(0).toUpperCase(): result
                }, "")
            }
        },
        methods: {
            onClickItem() {
                this.$emit(show);
            }
        }
    }
</script>

<style scoped>

</style>
