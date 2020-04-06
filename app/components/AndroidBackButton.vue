<template>
    
</template>

<script>
    import {isAndroid} from 'tns-core-modules/platform'
    import {AndroidApplication} from "tns-core-modules/application";

    export default {
        name: "AndroidBackButton",
        props: {
            prevent: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                hooked: false
            }
        },
        watch: {
            prevent (newVal, oldVal) {
                if (newVal === oldVal) { return }
                if (newVal) {
                    this.setHook();
                } else {
                    this.clearHook();
                }
            }
        },
        render () {},
        mounted () {
            if (this.prevent) { this.setHook() }
        },
        beforeDestroy () {
            this.clearHook();
        },
        methods: {
            onBackEvent (data) {
                this.$emit('tap', data);
                data.cancel = true // prevents default back button behavior
            },
            setHook () {
                if (!isAndroid || this.hooked) { return }
                android.on(AndroidApplication.activityBackPressedEvent, this.onBackEvent);
                this.hooked = true
            },
            clearHook () {
                if (!isAndroid || !this.hooked) { return }
                android.off(AndroidApplication.activityBackPressedEvent, this.onBackEvent);
            }
        }
    }
</script>

<style scoped>

</style>