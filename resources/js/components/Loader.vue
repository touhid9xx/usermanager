<template>
    <v-overlay :value="loader" :opacity="0.8" absolute>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
</template>

<script>
    export default {
        name: "Loader",
        props:['loader']
    }
</script>

<style scoped>

</style>
