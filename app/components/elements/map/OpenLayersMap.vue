<template>
    <WebView style="height: 100%" ref="webView" />
</template>

<script lang="ts">
    import PageLoaded from "@/components/mixins/PageLoaded.vue";
    import {WebViewInterface} from 'nativescript-webview-interface';
    import {WebView} from 'tns-core-modules/ui/web-view/web-view';
    import {GeoJson, HeatMap} from "@/js/Map";


    export default {
        name: "OpenLayersMap",
        mixins: [PageLoaded],
        props: {
            showRealMap: {
                type: Boolean,
                required: false,
                default: true
            },
            disableInteractions: {
                type: Boolean,
                required: false,
                default: false
            },
            heatmap: {
                type: Object as () => HeatMap,
                required: false
            },
            geoJson: {
                type: Object as () => GeoJson,
                required: false
            }
        },
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
                // let dryCoughData = [{'lat': 48.373606, 'lng': 21.83895}, {'lat': 48.398794, 'lng': 21.923079}, {'lat': 48.426951, 'lng': 16.994058}, {'lat': 48.606273, 'lng': 21.373201}, {'lat': 47.616161, 'lng': 18.674631}, {'lat': 49.031002, 'lng': 21.648734}, {'lat': 48.093997, 'lng': 17.864693}, {'lat': 48.744916, 'lng': 22.251724}, {'lat': 48.470146, 'lng': 20.219833}, {'lat': 48.755612, 'lng': 17.451699}, {'lat': 48.288746, 'lng': 17.741896}, {'lat': 48.45672, 'lng': 17.719505}, {'lat': 48.680575, 'lng': 17.652725}, {'lat': 48.463313, 'lng': 19.138178}, {'lat': 48.610223, 'lng': 21.595733}, {'lat': 48.418822, 'lng': 19.01365}, {'lat': 48.641014, 'lng': 20.389604}, {'lat': 48.867398, 'lng': 18.52686}, {'lat': 49.061428, 'lng': 18.607926}, {'lat': 48.534829, 'lng': 18.636501}, {'lat': 48.410753, 'lng': 18.757327}] as HeatMap;
                this.webView.on('loadFinished', (args) => {
                    if(!args.error) {
                        this.webViewInterface.emit('setup', {
                            showMap: this.showRealMap,
                            disableInteractions: this.disableInteractions
                        });
                        if (this.geoJson) {
                            this.webViewInterface.emit('addGeoJSON', this.geoJson);
                        }
                        if (this.heatmap) {
                            this.webViewInterface.emit('setHeatMapLayer', this.heatmap);
                        }

                    }
                })
            },


        }
    }
</script>

<style scoped>

</style>