<template>
    <Button row="1" class="m-button m-helpline-button" @tap="callHelpLine" :text="'buttons.callHelpline'|L" />
</template>

<script lang="ts">
    import * as TNSPhone from "nativescript-phone";
    import Strings from '@/components/mixins/Strings.vue'

    export default {
        name: "CallHelplineButton",
        mixins: [
            Strings
        ],
        methods: {
            callHelpLine() {
                TNSPhone.dial(this.num.helpline, true);
            },
        }
    }
</script>

<style scoped>

</style>