<template>
    <WebView style="height: 100%" ref="webView" />
</template>

<script lang="ts">
    import PageLoaded from "@/components/mixins/PageLoaded.vue";
    import {WebViewInterface} from 'nativescript-webview-interface';
    import {WebView} from 'tns-core-modules/ui/web-view/web-view';
    import WorldGeoJson from "../../geojson/world.json";

    export default {
        name: "WorldMap",
        mixins: [PageLoaded],
        data() {
            return {
                webView: null as WebView,
                webViewInterface: null
            }
        },
        methods: {
            onPageLoaded() {
                this.setupWebView();
            },

            setupWebView() {
                this.webView = this.$refs.webView.nativeView;
                this.webViewInterface = new WebViewInterface(this.webView, '~/www/olMap.html');
                this.webView.on('loadFinished', (args) => {
                    if(!args.error) {
                        this.webViewInterface.emit('mapData', WorldGeoJson)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>