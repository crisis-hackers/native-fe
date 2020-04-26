const i18n = {
    'app.name': "Sympt.io",
    buttons: {
        startSelfTest: "Start Test",
        shareApp: 'Share The App',
        callHelpline: 'COVID-19 HELPLINE',
        next: 'Next',
        skip: 'Skip',
        send: 'Send',
        agree: 'I Agree',
        done: 'Done'
    },
    dashboard: {
        tabs: {
            home: 'Home',
            profile: 'Profile',
            faq: 'FAQ',
            tracking: 'Tracking'
        },
        heatmap: {
            tags: {
                fever: {
                    title: 'Fever'
                },
                dryCough: {
                    title: 'Dry Cough'
                }
            }
        },
        tracking: {
            totalTests: 'Total tests'
        },
        home: {
            text1: 'First calculations of symptomatic COVID in each area across the Slovakia',
            explore: 'Explore COVID-19 cases near you',
            header2: 'Covid Tracker',
            header3: 'World Covid Tracker',
            cards: {
                newCasesLabel: 'Suspected new cases',
                mortalityLabel: 'Mortality rate'
            },
            symptResults: {
                1: 'Marked Safe',
                2: 'Moderate Risk',
                3: 'High Risk'
            },
            symptTable: {
                byAge: 'By Age',
                bySex: 'By Gender'
            }
        }
    },
    nearMe: {
        title: 'Near Me'
    },
    intro: {
        _1: {
            title: 'Quick Diagnosis',
            subtitle: 'Help prevent the spread of Coronavirus in Slovakia'
        },
        _2: {
            title: 'Track Your Neighbourhood',
            subtitle: 'Identify high risk areas and how fast the virus is spreading'
        },
        _3: {
            title: 'Get Alerts',
            subtitle: 'You will be alerted if you come in close proximity of a COVID 19 patient'
        }
    },
    testResults: {
        safe: {
            title: 'You are safe!',
            text1: 'Stay home and help prevent the spread of COVID-19'
        },
        risk: {
            title: 'You are at high risk!',
            text1: 'Isolate yourself and your immediate family members'
        },
        danger: {
            title: 'Get yourself tested now!',
            text1: 'Isolate yourself and your immediate family members'
        },

        thankYou: 'Thank you for your time.',
        reminder: 'Please check the app regularly to stay updated.',

        testAgain: 'Test Again',
        dashboard: 'Track Your Neighborhood'
    },
    tos: {
        tos: 'Terms of Service and Policy',
        _1: {
            title: 'Device Location',
            text: 'It is recommended that you set your location sharing to \'Always\'. You can change this anytime later.'
        },
        _2: {
            title: 'Data Sharing',
            text: 'Your data will only be shared with certified health professionals and scientists for research purposes.'
        }
    }
};

module.exports = i18n;