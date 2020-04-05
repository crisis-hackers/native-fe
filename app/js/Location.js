import * as geolocation from 'nativescript-geolocation';
import {Accuracy} from 'tns-core-modules/ui/enums';
import settings from './Settings';

export default {
    getPreciseLocation(timeout) {
        return this.getLocation(Accuracy.high, timeout)
    },

    getCoarseLocation(timeout) {
        return this.getLocation(Accuracy.any, timeout)
    },

    getLocation(accuracy, timeout) {
        return geolocation.getCurrentLocation({
            desiredAccuracy: accuracy,
            timeout: timeout
        })
            .then((location) => {
                settings.saveLocation(location.latitude, location.longitude);
                return Promise.resolve(location);
            })
    }
}