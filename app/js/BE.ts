import axios, {AxiosResponse} from 'axios';
import {Settings} from './Settings'

export type SelfTestResult = any

export type SkMapData = any
export type SkTableData = any
export type WorldMapData = any
export type WorldTableData = any
export type DashboardCardsData = any

export type CountryData = {
    cases: number,
    countriesandterritories: string,
    countryterritorycode: string,
    day: number,
    deaths: number,
    geoid: string,
    id: number,
    month: number,
    population2018: number,
    total_cases: number,
    total_deaths: number,
    updated_at: string,
    year: number
};
export type CountriesData = CountryData[];

export type SymptCasesLocationDistrictData = { [key: string]: number }

export type SymptCasesLocationMunicipalityData = { [key: string]: number }

export type HeatMapData = any

export type DashboardData = {
    countriesData: AxiosResponse<CountriesData>,
    symptCasesLocationDistrictData: AxiosResponse<SymptCasesLocationDistrictData>,
    symptCasesLocationMunicipalityData: AxiosResponse<SymptCasesLocationMunicipalityData>
}

export type NearMeData = {
    heatMap: AxiosResponse<HeatMapData>
}

const url = 'https://europe-west3-hackthevirus.cloudfunctions.net';

export default {
    sendSelfTestResult(result): Promise<AxiosResponse<SelfTestResult>> {
        result['user_id'] = Settings.getUUID();
        return axios.post('https://us-central1-hackthevirus.cloudfunctions.net/insert_location_test', result)
            .then((response: AxiosResponse<SelfTestResult>) => {
                Settings.saveResult(result);
                return Promise.resolve(response);
            })
    },
    getCountriesData(): Promise<AxiosResponse<CountriesData>> {
        return axios.get(`${url}/stats-countries`);
    },
    getSymptCasesLocationDistrictData(): Promise<AxiosResponse<SymptCasesLocationDistrictData>> {
        return axios.get(`${url}/stats-symptomatic_cases_location`, {
            params: {
                level: 'city'
            }
        });
    },
    getSymptCasesLocationMunicipalityData(): Promise<AxiosResponse<SymptCasesLocationMunicipalityData>> {
        return axios.get(`${url}/stats-symptomatic_cases_location`, {
            params: {
                level: 'suburb'
            }
        });
    },

    getAllDashboardData(): Promise<DashboardData> {
        return axios.all([
            this.getCountriesData(),
            this.getSymptCasesLocationDistrictData(),
            this.getSymptCasesLocationMunicipalityData()
        ])
            .then(axios.spread((...responses: AxiosResponse[]) => {
                return Promise.resolve({
                    countriesData: responses[0],
                    symptCasesLocationDistrictData: responses[1],
                    symptCasesLocationMunicipalityData: responses[2]
                } as DashboardData);
            }))
    },

    getHeatMapData(): Promise<AxiosResponse<HeatMapData>> {
        return axios.get('https://postman-echo.com/get?data=nearme');
    },

    getNearMeData(): Promise<NearMeData> {
        return axios.all([
            this.getHeatMapData()
        ])
            .then(axios.spread((...responses: AxiosResponse[]) => {
                return Promise.resolve({
                    heatMap: responses[0]
                });
            }))
    }
}