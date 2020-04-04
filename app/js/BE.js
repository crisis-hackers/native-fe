import axios from 'axios';
import settings from './Settings'

export default {
    sendSelfTestResult(result) {
        result['user_id'] = settings.getUUID();
        //TODO save result after receiving response. This is dummy now
        console.dir(result);
        settings.saveResult(result);
        return axios.post('https://us-central1-hackthevirus.cloudfunctions.net/insert_location_test', result)
    }
}