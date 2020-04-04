<template>
    <Page>
        <GridLayout rows="*,auto" columns="*">
            <FlexboxLayout row="0" col="0" dock="top" flexDirection="column" justifyContent="space-around">
                <StackLayout v-for="item in items" orientation="horizontal">
                    <Switch width="60" v-model="item.checked"></Switch>
                    <Label verticalAlignment="center">{{ item.label }}</Label>
                </StackLayout>
            </FlexboxLayout>
            <Button row="1" col="0" @tap="agreed" dock="bottom" class="-primary" :isEnabled="allItemsChecked">I Agree</Button>
        </GridLayout>

    </Page>
</template>

<script>
    import App from './App'
    import * as geolocation from 'nativescript-geolocation';

    export default {
        name: "TOS",
        data() {
            return {
                items: [
                    {
                        checked: false,
                        label: 'asd'
                    },
                    {
                        checked: false,
                        label: 'abdsc'
                    }
                ]
            }
        },
        computed: {
            allItemsChecked() {
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
                        this.navigateToApp();
                        return undefined;
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
                console.log("lol");
                this.$navigateTo(App);
            }
        }
    }
</script>

<style scoped>

</style>