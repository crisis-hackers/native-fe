<template>
    
</template>

<script lang="ts">
    export default {
        name: "PageLoaded",
        data() {
            return {
                dLoaded: false
            }
        },
        props: {
            loaded: {
                type: Boolean,
                required: false
            }
        },
        computed: {
            pageLoaded() {
                return this.loaded || this.dLoaded;
            }
        },
        watch: {
            loaded: function (val) {
                this.dLoaded = val;
                if (val) {
                    this.onPageLoaded();
                }
            }
        },
        methods: {
            onPageLoaded() {

            },

            pageHasLoaded() {
                this.dLoaded = true;
            }
        }
    }
</script>

<style scoped>

</style>