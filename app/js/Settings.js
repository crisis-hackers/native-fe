const platformModule = require('tns-core-modules/platform');

export default {
    getUUID() {
        return platformModule.device.uuid;
    }
}