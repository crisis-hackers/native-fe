import axios from 'axios';
import {Settings} from './Settings'

export default {
    sendSelfTestResult(result) {
        result['user_id'] = Settings.getUUID();
        console.dir(result);
        return axios.post('https://us-central1-hackthevirus.cloudfunctions.net/insert_location_test', result)
            .then((response) => {
                Settings.saveResult(result);
                return Promise.resolve(response);
            })
    }
}