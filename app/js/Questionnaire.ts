import {AQuestionnaire, QType} from "@/js/BasicChatBot";

export class Questionnaire extends AQuestionnaire {
    constants = {
        chatBotName: 'Quarantina'
    };

    steps = [
        {
            key: 'age',
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
                        sk: 'Prosím vyplňte Váš vek.'
                    }
                },
            ],
            type: QType.NUMBER
        },
        {
            key: 'symptoms',
            messages: [
                {
                    text: {
                        sk: 'Ďakujem. Teraz prejdime k symptómom. Prejavujú sa u Vás  niektoré z nasledujúcich symptómov?'
                    }
                }
            ],
            type: QType.CHECKBOX,
            options: [
                {
                    label: {
                        sk: 'Kašeľ (novo vyniknutý, neustávajúci a suchý)'
                    },
                    value: 'dryCough'
                },
                {
                    label: {
                        sk: 'Horúčka'
                    },
                    value: 'fever'
                },
                {
                    label: {
                        sk: 'Strata čuchu a/alebo chuti'
                    },
                    value: 'lackOfSmell'
                },
                {
                    label: {
                        sk: 'Ťažkosti s dýchaním'
                    },
                    value: 'breathingDifficulty'
                },
                {
                    label: {
                        sk: 'Žiadne z uvedených'
                    },
                    value: 'none'
                }
            ],
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
                                sk: '< 38°C',
                                en: '< 38°C'
                            },
                            value: 'low'
                        },
                        {
                            label: {
                                sk: '> 38°C',
                                en: '> 38°C'
                            },
                            value: 'high'
                        },
                        {
                            label: {
                                sk: 'Neviem presný údaj.',
                                en: "I don't know."
                            },
                            value: 'idk'
                        }
                    ]
                }
            ]
        },
        {
            key: 'hasSecondarySymptoms',
            messages: [
                {
                    text: {
                        sk: 'Máte aj nejaké iné symptómy?'
                    }
                }
            ],
            type: QType.BOOLEAN,
            substeps: [
                {
                    key: 'secondarySymptoms',
                    messages: [
                        {
                            text: {
                                sk: 'Ktoré z uvedených symptómov vás trápia?'
                            }
                        }
                    ],
                    type: QType.CHECKBOX,
                    options: [
                        {
                            label: {
                                sk: 'Bolesť hlavy'
                            },
                            value: 'headache'
                        },
                        {
                            label: {
                                sk: 'Bolesť hrdla'
                            },
                            value: 'soreThroat'
                        },
                        {
                            label: {
                                sk: 'Celková slabosť'
                            },
                            value: 'weakness'
                        },
                        {
                            label: {
                                sk: 'Bolesť na hrudi'
                            },
                            value: 'chestPain'
                        },
                        {
                            label: {
                                sk: 'Zimnica/triaška'
                            },
                            value: 'chills'
                        },
                        {
                            label: {
                                sk: 'Upchatý nos'
                            },
                            value: 'stuffyNose'
                        },
                        {
                            label: {
                                sk: 'Výtok z nosa'
                            },
                            value: 'runnyNose'
                        },
                        {
                            label: {
                                sk: 'Hnačka'
                            },
                            value: 'diarrhea'
                        },
                        {
                            label: {
                                sk: 'Iný symptóm'
                            },
                            value: 'otherSymp'
                        }
                    ],
                    substeps: [
                        {
                            key: 'otherSymp',
                            messages: [
                                {
                                    text: {
                                        sk: 'Aké iné symptómy ešte máte?'
                                    }
                                }
                            ],
                            type: QType.TEXT,
                        }
                    ]
                }
            ]
        },
        {
            key: 'condition',
            messages: [
                {
                    text: {
                        sk: 'Ďakujem, už mám len pár otázok.'
                    }
                },
                {
                    text: {
                        sk: 'Máte niektoré z chronických ochorení spomenutých nižšie?'
                    }
                }
            ],
            type: QType.CHECKBOX,
            options: [
                {
                    label: {
                        sk: 'Kardiovaskulárne'
                    },
                    value: 'cardio'
                },
                {
                    label: {
                        sk: 'Respiračné'
                    },
                    value: 'respiratory'
                },
                {
                    label: {
                        sk: 'Cukrovka'
                    },
                    value: 'diabetes'
                },
                {
                    label: {
                        sk: 'Rakovina'
                    },
                    value: 'cancer'
                },
                {
                    label: {
                        sk: 'chronické ochorenie obličiek'
                    },
                    value: 'kidneyProblems'
                },
                {
                    label: {
                        sk: 'Chronické ochorenie pečene'
                    },
                    value: 'liverProblems'
                },
                {
                    label: {
                        sk: 'Znížená imunita'
                    },
                    value: 'imunodeficiency'
                },
                {
                    label: {
                        sk: 'Žiadne z uvedených'
                    },
                    value: 'none'
                }
            ],
        },
        {
            key: 'smoker',
            messages: [
                {
                    text: {
                        sk: 'Ste fajčiar/ka?'
                    }
                }
            ],
            type: QType.BOOLEAN
        },
        {
            key: 'travelled',
            messages: [
                {
                    text: {
                        sk: 'Boli ste za posledných 14 dní v zahraničí?'
                    }
                }
            ],
            type: QType.BOOLEAN
        },
        {
            key: 'exposed',
            messages: [
                {
                    text: {
                        sk: 'Boli ste v kontakte s niekým, kto má potvrdenú nákazu Covid-19 alebo je pre podozrenie v karanténe?'
                    }
                }
            ],
            type: QType.BOOLEAN
        },
        {
            key: 'tested',
            messages: [
                {
                    text: {
                        sk: 'Bol/a ste testovaný/á na COVID-19?'
                    }
                }
            ],
            type: QType.BOOLEAN,
            substeps: [
                        {
                            key: 'testDate',
                            messages: [
                                {
                                    text: {
                                        sk: 'Kedy vám bol odobraný test?'
                                    }
                                }
                            ],
                            type: QType.DATE,
                        },
                        {
                            key: 'testResult',
                            messages: [
                                {
                                    text: {
                                        sk: 'Aký bol výsledok testu?'
                                    }
                                }
                            ],
                            type: QType.CHECKBOX,
                            options: [
                                {
                                    label: {
                                        sk: 'Pozitívny'
                                    },
                                    value: 'positive'
                                },
                                {
                                    label: {
                                        sk: 'Negatívny'
                                    },
                                    value: 'negative'
                                },
                                {
                                    label: {
                                        sk: 'Ešte neviem, čakám na výsledok testu.'
                                    },
                                    value: 'notKnown'
                                }
                            ]
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
                        sk: 'Ozvite sa ak by sa váš stav zmenil.'
                    }
                }
            ],
            type: null
        }
    ];
}