const platformModule = require('tns-core-modules/platform');
const appSettings = require('tns-core-modules/application-settings');

export default {
    getUUID() {
        return platformModule.device.uuid;
    },

    saveResult(result) {
        let results = this.getResults();
        results.push(result);
        appSettings.setString('results', JSON.stringify(results));
    },

    getResults() {
        return JSON.parse(appSettings.getString('results', '[]'));
    }
}