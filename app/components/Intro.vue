<template>
    <Page actionBarHidden="true">
        <GridLayout rows="*, 90" columns="*">
            <Tabs row="0" col="0" :selectedIndex="currentPage" @selectedIndexChanged="tabChanged">
                <TabContentItem v-for="page in pages" class="m-tab-view-item">
                    <FlexboxLayout flexDirection="column" justifyContent="space-around"
                                   alignItems="center" :paddingLeft="layout.mainXPadding" :paddingRight="layout.mainXPadding">
                        <Label class="title h1" textWrap="true">{{ page.title }}</Label>
                        <Label class="subtitle h3" textWrap="true">{{ page.subtitle }}</Label>
                    </FlexboxLayout >
                </TabContentItem>
            </Tabs>
            <GridLayout row="1" col="0" columns="2*,3*,2*">
                <Button col="0" class="-outline no-bg-button" @tap="skip">Skip</Button>
                <FlexboxLayout flexDirection="row" justifyContent="space-around">

                </FlexboxLayout>
                <Button col="2" class="-outline no-bg-button" @tap="nextPage">Next</Button>
            </GridLayout>
        </GridLayout>
    </Page>
</template>

<script>
    import TOS from './TOS'

    export default {
        name: "Intro",
        data() {
            return {
                currentPage: 0,
                pages: [
                    {
                        title: 'Quick Diagnosis',
                        subtitle: 'Help prevent the spread of Coronavirus in Slovakia'
                    },
                    {
                        title: 'Track Your Neighbourhood',
                        subtitle: 'Identify high risk areas and how fast the virus is spreading'
                    },
                    {
                        title: 'Get Alerts',
                        subtitle: 'You will be alerted if you come in close proximity of a COVID 19 patient'
                    }
                ],
                layout: {
                    mainXPadding: '64dp'
                }
            }
        },
        methods: {
            nextPage() {
                if (this.currentPage + 2 > this.pages.length) {
                    this.skip();
                    return;
                }
                this.currentPage++;
            },
            skip() {
                this.$navigateTo(TOS, {
                    clearHistory: true
                })
            },
            tabChanged(args) {
                this.currentPage = args.newIndex;
            }
        }
    }
</script>

<style scoped>
    .title {
        text-transform: uppercase;
        text-align: center;
    }

    .subtitle {
        text-align: center;
    }

    .no-bg-button {
        border-width: 0px;
        android-elevation: 0;
        text-transform: uppercase;
    }

    .m-tab-view-item {
        border-width: 0px;
        android-elevation: 0;
    }

    .bold-text {
        font-weight: bolder;
    }
</style>