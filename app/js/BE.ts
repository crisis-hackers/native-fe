import axios, {AxiosResponse} from 'axios';
import {Settings} from './Settings'
import {QResult} from "@/js/BasicChatBot";

export type PostUser = {
    customer_id: string,
    [key: string]: any
}
export type PostSelfTest = {
    customer_id: string,
    lat: number,
    lon: number,
    [key: string]: any
}
export type SelfTestResult = number

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
export type MortalityRateData = number;
export type SymptCasesAgeData = { [key: string]: object}
export type SymptCasesSexData = { [key: string]: object }
export type SymptCasesRiskData = { [key: string]: number }

export type HeatMapData = any

export type DashboardData = {
    countriesData: AxiosResponse<CountriesData>,
    symptCasesLocationDistrictData: AxiosResponse<SymptCasesLocationDistrictData>,
    symptCasesLocationMunicipalityData: AxiosResponse<SymptCasesLocationMunicipalityData>,
    mortalityRate: AxiosResponse<MortalityRateData>,
    symptCasesAgeData: AxiosResponse<SymptCasesAgeData>,
    symptCasesSexData: AxiosResponse<SymptCasesSexData>,
    symptCasesRiskData: AxiosResponse<SymptCasesRiskData>
}

export type NearMeData = {
    heatMap: AxiosResponse<HeatMapData>
}

const url = 'https://europe-west3-hackthevirus.cloudfunctions.net';

function createUserData(): PostUser {
    return {
        customer_id: Settings.getUUID()
    }
}

function prepareQResult(result: QResult): PostSelfTest {
    result['customer_id'] = Settings.getUUID();
    //lat & lon from SelfTest.vue
    return result as PostSelfTest;
}

export default {
    sendSelfTestResult(result: QResult): Promise<AxiosResponse<SelfTestResult>> {
        return axios.post(`${url}/user`, createUserData())
            .then((response: AxiosResponse) => {
                return axios.post(`${url}/user-report_symptoms`, prepareQResult(result));
            })
            .then((response: AxiosResponse) => {
                return axios.get(`${url}/user-estimate_risk`, {
                    params: {
                        customer_id: Settings.getUUID()
                    }
                })
            })
            .then((response: AxiosResponse<SelfTestResult>) => {
                Settings.saveResult(response.data);
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
    getSymptCasesAgeData(): Promise<AxiosResponse<SymptCasesAgeData>> {
        return axios.get(`${url}/stats-symptomatic_cases_age`);
    },
    getSymptCasesSexData(): Promise<AxiosResponse<SymptCasesSexData>> {
        return axios.get(`${url}/stats-symptomatic_cases_sex`);
    },
    getSymptCasesRiskData(): Promise<AxiosResponse<SymptCasesRiskData>> {
        return axios.get(`${url}/stats-symptomatic_cases_risk`);
    },
    getMortalityRate(): Promise<AxiosResponse<MortalityRateData>> {
        return axios.get(`${url}/stats-mortality_rate`);
    },

    getAllDashboardData(): Promise<DashboardData> {
        return axios.all([
            this.getCountriesData(),
            this.getSymptCasesLocationDistrictData(),
            this.getSymptCasesLocationMunicipalityData(),
            this.getMortalityRate(),
            this.getSymptCasesAgeData(),
            this.getSymptCasesSexData(),
            this.getSymptCasesRiskData()
        ])
            .then(axios.spread((...responses: AxiosResponse[]) => {
                return Promise.resolve({
                    countriesData: responses[0],
                    symptCasesLocationDistrictData: responses[1],
                    symptCasesLocationMunicipalityData: responses[2],
                    mortalityRate: responses[3],
                    symptCasesAgeData: responses[4],
                    symptCasesSexData: responses[5],
                    symptCasesRiskData: responses[6]
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