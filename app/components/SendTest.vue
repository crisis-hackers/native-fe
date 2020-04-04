<template>
    <Page>
        <Button @tap="send">Send</Button>
    </Page>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "SendTest",
        methods: {
            send() {
                // TODO 
                // 1. get user data from the questionaire 
                // 2. Correct endpoint later on
                axios.post('https://us-central1-hackthevirus.cloudfunctions.net/insert_location_test', {
                    "user_id": "12356789",
                    "lat": 13.813040,
                    "lon": 100.536450,
                    "cough": true,
                    "temperature": true
                }  )
                .then(function (response) {
                    console.log(response['data']);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>