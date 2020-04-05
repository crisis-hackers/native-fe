import axios from 'axios';
import settings from './Settings'

export default {
    sendSelfTestResult(result) {
        result['user_id'] = settings.getUUID();
        console.dir(result);
        return axios.post('https://us-central1-hackthevirus.cloudfunctions.net/insert_location_test', result)
            .then((response) => {
                settings.saveResult(result);
                return Promise.resolve(response);
            })
    }
}