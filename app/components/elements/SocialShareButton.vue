<template>
    <Button class="m-button m-helpline-button" @tap="shareApp" :text="'buttons.shareApp'|L" />
</template>

<script lang="ts">
    import * as SocialShare from "nativescript-social-share";

    export default {
        name: "SocialShareButton",
        data() {
            return {
                links: {
                    ios: 'https://apps.apple.com/in/app/covidtracker/sl',
                    android: 'https://play.google.com/store/apps/details?covidtracker/sl'
                }
            }
        },
        methods: {
            shareApp() {
                SocialShare.shareText('I recommend Q-Tracker App to fight against COVID-19. Please download and share it' +
                    ' using this link\n' +
                    `iOS: ${this.links.ios}\nAndroid: ${this.links.android}`);
            }
        }
    }
</script>

<style scoped>

</style>