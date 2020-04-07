import {AQuestionnaire, QType} from "@/js/BasicChatBot";

export class Questionnaire extends AQuestionnaire {
    constants = {
        chatBotName: 'Quarantina'
    };

    steps = [
        {
            key: 'hasFever',
            messages: [
                {
                    text: {
                        sk: 'Dobrý deň!'
                    }
                },
                {
                    text: {
                        sk: `Ja som (${this.constants['chatBotName']})  a pre vyťaženosť zdravotných pracovníkov Vam pomôžem identifikovať, či by ste mohli mať nákazu COVID-19. Všetky informácie, ktoré so mnou zozdieľate, sú dôverné.`
                    }
                },
                {
                    text: {
                        sk: 'Máte zvýšenú teplotu?'
                    }
                }
            ],
            type: QType.BOOLEAN,
            nullable: true,
            substeps: [
                {
                    key: 'fever',
                    messages: [
                        {
                            text: {
                                sk: 'Aká je vaša zvýšená teplota?'
                            }
                        }
                    ],
                    type: QType.RADIO,
                    options: [
                        {
                            label: {
                                sk: '37-38°C',
                                en: '37-38°C'
                            },
                            value: 38.0
                        },
                        {
                            label: {
                                sk: '38-38.5°C',
                                en: '38-38.5°C'
                            },
                            value: 38.5
                        },
                        {
                            label: {
                                sk: '38.5-39°C',
                                en: '38.5-39°C'
                            },
                            value: 39.0
                        },
                        {
                            label: {
                                sk: '39°C +',
                                en: '39°C +'
                            },
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
                    text: {
                        sk: 'Ďakujem. Teraz prejdime k symptómom. Ktorý z týchto symptómov pociťujete?'
                    }
                }
            ],
            type: QType.CHECKBOX,
            options: [
                {
                    label: {
                        sk: 'Suchý kašeľ'
                    },
                    value: 'dryCough'
                },
                {
                    label: {
                        sk: 'Strata chuti'
                    },
                    value: 'lackOfTaste'
                },
                {
                    label: {
                        sk: 'Strata čuchu'
                    },
                    value: 'lackOfSmell'
                },
                {
                    label: {
                        sk: 'Bolesť hrdla'
                    },
                    value: 'soreThroat'
                },
                {
                    label: {
                        sk: 'Slabosť'
                    },
                    value: 'weakness'
                },
                {
                    label: {
                        sk: 'Ťažký kašeľ'
                    },
                    value: 'severeCough'
                },
                {
                    label: {
                        sk: 'Dýchavičnosť'
                    },
                    value: 'dyspnea'
                },
                {
                    label: {
                        sk: 'Ospalosť'
                    },
                    value: 'sleepiness'
                },
                {
                    label: {
                        sk: 'Bolesť v hrudi'
                    },
                    value: 'chestPain'
                }
            ]
        },
        {
            key: 'wasTravelling',
            messages: [
                {
                    text: {
                        sk: 'Ďakujem za priblíženie Vašich symptómov. Boli ste za posledných 14 dní v zahraničí?'
                    }
                }
            ],
            type: QType.BOOLEAN,
            substeps: [
                {
                    key: 'travellingCountry',
                    messages: [
                        {
                            text: {
                                sk: 'V akej krajine ste boli?'
                            }
                        }
                    ],
                    type: QType.TEXT
                }
            ],
            negSubsteps: [
                {
                    key: 'wasWithTravellingPerson',
                    messages: [
                        {
                            text: {
                                sk: 'A boli ste s niekým, kto sa za posledných 14 dní vrátil zo zahraničia?'
                            }
                        }
                    ],
                    type: QType.BOOLEAN,
                    substeps: [
                        {
                            key: 'travellingPersonHasSymptoms',
                            messages: [
                                {
                                    text: {
                                        sk: 'Má tá osoba niektoré z vyššie uvedených symptómov?'
                                    }
                                }
                            ],
                            type: QType.BOOLEAN
                        }
                    ]
                }
            ]
        },
        {
            key: 'wasWithPositivePerson',
            messages: [
                {
                    text: {
                        sk: 'Boli ste v kontakte s niekým, kto má potvrdenú nákazu Covid-19?'
                    }
                }
            ],
            type: QType.BOOLEAN
        },
        {
            key: 'diagnosis',
            messages: [
                {
                    text: {
                        sk: 'Ďakujem, už sme skoro na konci.'
                    }
                },
                {
                    text: {
                        sk: 'Liečite sa na niektorú z týchto diagnóz?'
                    }
                }
            ],
            type: QType.CHECKBOX,
            options: [
                {
                    label: {
                        sk: 'Problémy s obličkami'
                    },
                    value: 'kidneyProblems'
                },
                {
                    label: {
                        sk: 'Problémy so srdcom'
                    },
                    value: 'heartProblems'
                },
                {
                    label: {
                        sk: 'Diabetes'
                    },
                    value: 'diabetes'
                },
                {
                    label: {
                        sk: 'Vysoký krvný tlak'
                    },
                    value: 'highBloodPressure'
                },
                {
                    label: {
                        sk: 'Problémy s pľúcami'
                    },
                    value: 'lungProblems'
                }
            ]
        },
        {
            key: 'symptomsChange',
            messages: [
                {
                    text: {
                        sk: 'Akým smerom sa uberali vaše symptómy za posledných 48 hodín?'
                    }
                }
            ],
            type: QType.RADIO,
            options: [
                {
                    label: {
                        sk: 'Zlepšili sa'
                    },
                    value: -1
                },
                {
                    label: {
                        sk: 'Zhoršili sa'
                    },
                    value: 1
                },
                {
                    label: {
                        sk: 'Bez zmeny'
                    },
                    value: 0
                }
            ]
        },
        {
            key: '',
            messages: [
                {
                    text: {
                        sk: 'Ďakujem za všetky poskytnuté informácie.'
                    }
                },
                {
                    text: {
                        sk: 'Pokračujte prosím kliknutím na tlačítko dole.'
                    }
                }
            ],
            type: null
        }
    ];
}