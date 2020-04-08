<template>
    
</template>

<script lang="ts">
    export default {
        name: "Strings",
        data() {
            return {
                str: {
                    appName: this.$options.filters.L('app.name')
                },
                num: {
                    helpline: '0800 221 234'
                }
            }
        }
    }
</script>

<style scoped>

</style>