export default class  {
    steps = [
        {
            key: 'hasFever',
            messages: [
                {
                    text: 'Dobrý deň!'
                },
                {
                    text: 'Ja som (možno meno bota) a pre vyťaženosť zdravotných pracovníkov Vam pomôžem identifikovať, či by ste mohli mať nákazu COVID-19. Všetky informácie, ktoré so mnou zozdieľate, sú dôverné.'
                },
                {
                    text: 'Máte zvýšenú teplotu?'
                }
            ],
            type: 'boolean',
            nullable: true,
            substeps: [
                {
                    key: 'fever',
                    messages: [
                        {
                            text: 'Aká je vaša zvýšená teplota?'
                        }
                    ],
                    type: 'radio',
                    options: [
                        {
                            label: '37-38°C',
                            value: 38.0
                        },
                        {
                            label: '38-38.5°C',
                            value: 38.5
                        },
                        {
                            label: '38.5-39°C',
                            value: 39.0
                        },
                        {
                            label: '39°C +',
                            value: 40.0
                        }
                    ]
                }
            ]
        },
        {
            key: 'symptoms',
            messages: [
                {
                    text: 'Ďakujem. Teraz prejdime k symptómom. Ktorý z týchto symptómov pociťujete?'
                }
            ],
            type: 'checkbox',
            options: [
                {
                    label: 'Suchý kašeľ',
                    value: 'dryCough'
                },
                {
                    label: 'Strata chuti',
                    value: 'lackOfTaste'
                },
                {
                    label: 'Strata čuchu',
                    value: 'lackOfSmell'
                },
                {
                    label: 'Bolesť hrdla',
                    value: 'soreThroat'
                },
                {
                    label: 'Slabosť',
                    value: 'weakness'
                },
                {
                    label: 'Ťažký kašeľ',
                    value: 'severeCough'
                },
                {
                    label: 'Dýchavičnosť',
                    value: 'dyspnea'
                },
                {
                    label: 'Ospalosť',
                    value: 'sleepiness'
                },
                {
                    label: 'Bolesť v hrudi',
                    value: 'chestPain'
                }
            ]
        },
        {
            key: 'wasTravelling',
            messages: [
                {
                    text: 'Ďakujem za priblíženie Vašich symptómov. Boli ste za posledných 14 dní v zahraničí?'
                }
            ],
            type: 'boolean',
            substeps: [
                {
                    key: 'travellingCountry',
                    messages: [
                        {
                            text: 'V akej krajine ste boli?'
                        }
                    ],
                    type: 'text'
                }
            ],
            negSubsteps: [
                {
                    key: 'wasWithTravellingPerson',
                    messages: [
                        {
                            text: 'A boli ste s niekým, kto sa za posledných 14 dní vrátil zo zahraničia?'
                        }
                    ],
                    type: 'boolean',
                    substeps: [
                        {
                            key: 'travellingPersonHasSymptoms',
                            messages: [
                                {
                                    text: 'Má tá osoba niektoré z vyššie uvedených symptómov?'
                                }
                            ],
                            type: 'boolean'
                        }
                    ]
                }
            ]
        },
        {
            key: 'wasWithPositivePerson',
            messages: [
                {
                    text: 'Boli ste v kontakte s niekým, kto má potvrdenú nákazu Covid-19?'
                }
            ],
            type: 'boolean'
        },
        {
            key: 'diagnosis',
            messages: [
                {
                    text: 'Ďakujem, už sme skoro na konci.'
                },
                {
                    text: 'Liečite sa na niektorú z týchto diagnóz?'
                }
            ],
            type: 'checkbox',
            options: [
                {
                    label: 'Problémy s obličkami',
                    value: 'kidneyProblems'
                },
                {
                    label: 'Problémy so srdcom',
                    value: 'heartProblems'
                },
                {
                    label: 'Diabetes',
                    value: 'diabetes'
                },
                {
                    label: 'Vysoký krvný tlak',
                    value: 'highBloodPressure'
                },
                {
                    label: 'Problémy s pľúcami',
                    value: 'lungProblems'
                }
            ]
        },
        {
            key: 'symptomsChange',
            messages: [
                {
                    text: 'Akým smerom sa uberali vaše symptómy za posledných 48 hodín?'
                }
            ],
            type: 'radio',
            options: [
                {
                    label: 'Zlepšili sa',
                    value: -1
                },
                {
                    label: 'Zhoršili sa',
                    value: 1
                },
                {
                    label: 'Bez zmeny',
                    value: 0
                }
            ]
        },
        {
            key: '',
            messages: [
                {
                    text: 'Ďakujem za všetky poskytnuté informácie.'
                },
                {
                    text: 'Pokračujte prosím kliknutím na tlačítko dole.'
                }
            ],
            type: null
        }
    ];
    responses = {};
    stepStack = [];

    constructor() {
        this.stepStack.push(...this.steps.reverse());
        //dummy for first pop
        this.stepStack.push({});
    }

    getNextStep(response) {
        let topItem = this.stepStack.pop();
        if (response && topItem.key) {
            this.responses[topItem.key] = response.answer;
        }
        let substeps = [];
        if (topItem.substeps && response && response.answer) {
            substeps = topItem.substeps;
        } else if (topItem.negSubsteps && response) {
            substeps = topItem.negSubsteps;
        }
        this.stepStack.push(...substeps.reverse());
        if (this.stepStack.length === 0) {
            return null;
        }
        return this.topItem();
    }

    topItem() {
        return this.stepStack[this.stepStack.length - 1];
    }

    getResult() {
        return this.responses;
    }
}