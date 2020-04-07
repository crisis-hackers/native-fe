import * as appSettings from "tns-core-modules/application-settings";
import * as platformModule from "tns-core-modules/platform";

export type Location = {
    latitude: number,
    longitude: number
}

export type Language = 'sk' | 'en'

export let Settings = {
    getUUID(): string {
        return platformModule.device.uuid;
    },

    saveResult(result) {
        let results = this.getResults();
        results.push(result);
        appSettings.setString('results', JSON.stringify(results));
    },

    getResults(): object[] {
        return JSON.parse(appSettings.getString('results', '[]'));
    },

    saveLocation(lat: number, lon: number) {
        appSettings.setString('lastLocation', JSON.stringify({
            latitude: lat,
            longitude: lon
        }));
    },

    getLastLocation(): Location {
        return JSON.parse(appSettings.getString('lastLocation', null)) as Location;
    },

    getLanguageToUse(): Language {
        //TODO
        return 'sk';
    }
};