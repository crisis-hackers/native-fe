<template>
    <Page>
        <GridLayout rows="1*,2*,auto" columns="*">
            <DockLayout row="0" stretchLastChild="false">
                <Label class="h2" dock="bottom" textAlignment="center" :text="'tos.tos'|L" />
            </DockLayout>
            <FlexboxLayout row="1" col="0" dock="top" flexDirection="column" justifyContent="center">
                <StackLayout v-for="item in items" class="item" orientation="horizontal">
                    <Switch width="60" v-model="item.checked"></Switch>
                    <StackLayout orientation="vertical">
                        <Label class="h3 title" :textWrap="true" :text="`tos.${item.key}.title`|L" />
                        <Label :textWrap="true" :text="`tos.${item.key}.text`|L" />
                    </StackLayout>
                </StackLayout>
            </FlexboxLayout>
            <Button row="2" col="0" @tap="agreed" class="m-button m-green-button" :isEnabled="allItemsChecked" :text="'buttons.agree'|L" />
        </GridLayout>

    </Page>
</template>

<script lang="ts">
    import App from '@/components/pages/App.vue'
    import * as geolocation from 'nativescript-geolocation';

    export default {
        name: "TOS",
        data() {
            return {
                items: [
                    {
                        checked: false,
                        key: '_1'
                    },
                    {
                        checked: false,
                        key: '_2'
                    }
                ]
            }
        },
        computed: {
            allItemsChecked(): boolean {
                return this.items.every((item) => item.checked);
            }
        },
        methods: {
            agreed() {
                this.askPermissions();

            },
            askPermissions() {
                geolocation.isEnabled()
                .then((enabled) => {
                    if (enabled) {
                        return Promise.resolve();
                    } else {
                        return geolocation.enableLocationRequest();
                    }
                })
                .then(() => {
                    if (geolocation.isEnabled()) {
                        this.navigateToApp();
                    } else {
                        throw new Error('GeoLocation not permitted');
                    }
                })
                .catch((err) => {
                    console.error(err)
                });
            },
            navigateToApp() {
                this.$navigateTo(App, {
                    clearHistory: true
                });
            }
        }
    }
</script>

<style scoped>
    .title {
        font-weight: bold;
    }

    .item {
        margin-top: 12dp;
        margin-bottom: 12dp;
    }
</style>