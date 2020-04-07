import * as geolocation from 'nativescript-geolocation';
import {Accuracy} from 'tns-core-modules/ui/enums';
import {Settings} from './Settings';

export default {
    getPreciseLocation(timeout: number): Promise<geolocation.Location> {
        return this.getLocation(Accuracy.high, timeout)
    },

    getCoarseLocation(timeout: number): Promise<geolocation.Location> {
        return this.getLocation(Accuracy.any, timeout)
    },

    getLocation(accuracy, timeout: number): Promise<geolocation.Location> {
        return geolocation.getCurrentLocation({
            desiredAccuracy: accuracy,
            timeout: timeout
        })
            .then((location) => {
                Settings.saveLocation(location.latitude, location.longitude);
                return Promise.resolve(location);
            })
    }
}