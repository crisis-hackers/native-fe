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


export type HeatMapData = any

export type DashboardData = {
    // skMap: AxiosResponse<SkMapData>,
    // skTable: AxiosResponse<SkTableData>,
    // worldMap: AxiosResponse<WorldMapData>,
    // worldTable: AxiosResponse<WorldTableData>,
    // cards: AxiosResponse<DashboardCardsData>
    countriesData: AxiosResponse<CountriesData>
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
    getSlovakiaMapData(): Promise<AxiosResponse<SkMapData>> {
        return axios.get('https://postman-echo.com/get?data=skmap');
    },
    getWorldMapData(): Promise<AxiosResponse<WorldMapData>> {
        return axios.get('https://postman-echo.com/get?data=wmap');
    },
    getSlovakiaTableData(): Promise<AxiosResponse<SkTableData>> {
        return axios.get('https://postman-echo.com/get?data=sktable');
    },
    getWorldTableData(): Promise<AxiosResponse<WorldTableData>> {
        return axios.get('https://postman-echo.com/get?data=wtable');
    },
    //i.e. suspected new cases and mortality rate
    getDashboardCardsData(): Promise<AxiosResponse<DashboardCardsData>> {
        return axios.get('https://postman-echo.com/get?data=cards');
    },

    getAllDashboardData(): Promise<DashboardData> {
        return axios.all([
            // this.getSlovakiaMapData(),
            // this.getSlovakiaTableData(),
            // this.getWorldMapData(),
            // this.getWorldTableData(),
            // this.getDashboardCardsData()
            this.getCountriesData()
        ])
            .then(axios.spread((...responses: AxiosResponse[]) => {
                return Promise.resolve({
                    // skMap: responses[0],
                    // skTable: responses[1],
                    // worldMap: responses[2],
                    // worldTable: responses[3],
                    // cards: responses[4]
                    countriesData: responses[0]
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