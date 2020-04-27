import * as appSettings from "tns-core-modules/application-settings";
import {SelfTestResult} from "@/js/BE";
import {generateUUIDv4} from "@/js/utils/Random";

export type Location = {
    latitude: number,
    longitude: number
}

export type Language = 'sk' | 'en'

export let Settings = {
    getUUID(): string {
        let uuid = appSettings.getString('uuid4', null);
        if (uuid) {
            return uuid;
        }
        uuid = generateUUIDv4();
        appSettings.setString('uuid4', uuid);
        appSettings.flush();
        return uuid;
    },

    saveResult(result: SelfTestResult): void {
        let results = this.getResults();
        results.push(result);
        appSettings.setString('results', JSON.stringify(results));
        appSettings.flush();
    },

    getResults(): SelfTestResult[] {
        return JSON.parse(appSettings.getString('results', '[]'));
    },

    saveLocation(lat: number, lon: number): void {
        appSettings.setString('lastLocation', JSON.stringify({
            latitude: lat,
            longitude: lon
        }));
        appSettings.flush();
    },

    getLastLocation(): Location {
        return JSON.parse(appSettings.getString('lastLocation', null)) as Location;
    },

    getLanguageToUse(): Language {
        //TODO
        return 'sk';
    },

    getDateTimeLocale(): string {
        return 'sk-SK';
    },

    clearAll() {
        appSettings.clear();
        appSettings.flush();
    },

    saveNumber(key: string, number: number): void {
        appSettings.setNumber(key, number);
    },

    getNumber(key: string, defaultValue?: number): number {
        return appSettings.getNumber(key, defaultValue);
    }
};