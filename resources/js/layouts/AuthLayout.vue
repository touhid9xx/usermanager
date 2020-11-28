<template>
    <v-app>
        <v-app-bar>
            <v-toolbar-title>
                User Manager
            </v-toolbar-title>
        </v-app-bar>
        <v-main>
            <v-container>
                <h3>Auth container</h3>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {};
</script>

<style></style>
