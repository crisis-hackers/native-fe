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

//const url = 'https://europe-west3-hackthevirus.cloudfunctions.net';
const url = 'http://0.0.0.0:5000';

function createUserData(result: QResult): PostUser {
    var user = {
        customer_id: Settings.getUUID(),
        age: result["age"],
        cardiovascular: result["underlyingConditions"].includes("cardiovascular"),
        respiratory: result["underlyingConditions"].includes("respiratory"),
        smoker: result["smoker"] || false,
        diabetes: result["underlyingConditions"].includes("diabetes"),
        cancer: result["underlyingConditions"].includes("cancer"),
        kidney_problems: result["underlyingConditions"].includes("kidneyProblems"),
        liver_problems: result["underlyingConditions"].includes("liverProblems"),
        immunodeficiency: result["underlyingConditions"].includes("immunodeficiency")
    };

    return user;
}

function prepareQResult(result: QResult): PostSelfTest {
    var symptoms_report = {
        customer_id: Settings.getUUID(),
    }
    // 2a. Main symptoms
    symptoms_report["dry_cough"] = result["symptoms"].includes("dryCough") || false;
    symptoms_report["fever"] = result["symptoms"].includes("fever");
    // temperature_under_38 = content.get("temperature_under_38", None)
    // temperature_idk = content.get("temperature_idk", None)
    // temperature_over_38 = content.get("temperature_over_38", None)
    symptoms_report["taste_and_smell_loss"] = result["symptoms"].includes("lackOfSmell");
    symptoms_report["difficulty_breathing"] = result["symptoms"].includes("breathingDifficulty");
    
    // // 3. Other important information
    symptoms_report["exposure_abroad"] = result["travelled"];
    symptoms_report["exposure_to_quarantined_or_sick"] = result["exposed"];
    symptoms_report["test_time"] = result["testDate"];
    symptoms_report["test_result"] = result["testResult"];
    // // 4. Other symptoms not mentioned
    symptoms_report["other_symptoms"] = result["otherSymp"] || false;
    
    if (result["hasSecondarySymptoms"]) {
        // ADD 2b. Other symptoms
        symptoms_report["headache"] = result["secondarySymptoms"].includes("headache");
        symptoms_report["sore_throat"] = result["secondarySymptoms"].includes("soreThroat");
        symptoms_report["weakness"] = result["secondarySymptoms"].includes("weakness");
        symptoms_report["chest_pain"] = result["secondarySymptoms"].includes("chestPain");
        symptoms_report["chills"] = result["secondarySymptoms"].includes("chills");
        symptoms_report["sweating"] = result["secondarySymptoms"].includes("sweating");
        symptoms_report["stuffy_nose"] = result["secondarySymptoms"].includes("stuffyNose");
        symptoms_report["runny_nose"] = result["secondarySymptoms"].includes("runnyNose");
        symptoms_report["diarrhea"] = result["secondarySymptoms"].includes("diarrhea");
        symptoms_report["watery_itchy_eyes"] = result["secondarySymptoms"].includes("wateryItchyEyes");
    }

    symptoms_report["lat"] = result.lat;
    symptoms_report["lon"] = result.lon;

    console.log(symptoms_report);
    //lat & lon from SelfTest.vue
    return symptoms_report as PostSelfTest;
}

export default {
    sendSelfTestResult(result: QResult): Promise<AxiosResponse<SelfTestResult>> {
        return axios.post(`${url}/user`, createUserData(result))
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