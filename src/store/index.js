import { createStore } from 'vuex';

/** 
 * @typedef {Object} FlashMessenger 
 * @property {string} title 
 * @property {string} message
 * */

/** 
 * @typedef {Object} GamePlayer 
 * @property {string} character 
 * @property {string} vehicle
 * @property {string} gameId
 * @property {string} name
 * @property {string} place
 * @property {string} playerId
 * @property {string} vehicle
 * @property {string} score
 * */

/** 
 * @typedef {Object} GameProps 
 * @property {string} date
 * @property {string} class 
 * @property {string} courses
 * @property {string} cpuVehicles
 * @property {string} items
 * @property {string} cpu
 * @property {string} races
 * @property {GamePlayer[]} players
 * */

/**
 * @typedef {Object} Player
 * @property {string} name
 * @property {string} id
 */

export default createStore({
    state: {
        flashMessage: null,

        classes: {
            '50cc': '50cc',
            '100cc': '100cc',
            '150cc': '150cc',
            'mirror': 'Mirror'
        },

        courses: {
            'choose': 'Choose',
            'random': 'Random',
            'inorder': 'In Order'
        },

        cpuVehicles: {
            'all': 'All',
            'karts': 'Karts',
            'bikes': 'Bikes'
        },

        items: {
            'strategic': 'Strategic',
            'balanced': 'Balanced',
            'aggressive': 'Aggressive',
            'none': 'None'
        },

        cpu: {
            'easy': 'Easy',
            'medium': 'Medium',
            'hard': 'Hard',
            'none': 'None'
        },

        races: {
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '8': '8',
            '10': '10',
            '12': '12',
            '16': '16',
            '32': '32'
        },

        characters: {
            'Standard Kart S': 'Standard Kart S',
            'Booster Seat': 'Booster Seat',
            'Mini Beast': 'Mini Beast',
            'Cheep Charger': 'Cheep Charger',
            'Tiny Titan': 'Tiny Titan',
            'Blue Falcon': 'Blue Falcon'
        },

        vehicles: {

        }
    },
    mutations: {
        clearFlashMessage(state) {
            state.flashMessage = null;
        },

        /**
         * set the FlashMessenger message 
         * 
         * @param {*} state 
         * @param {FlashMessenger} message 
         */
        setFlashMessage(state, message) {
            state.flashMessage = message;
        }
    },
    actions: {

    },
    modules: {

    }
})