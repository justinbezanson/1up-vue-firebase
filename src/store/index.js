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
            'Small': {
                'Baby Mario': 'Baby Mario',
                'Baby Peach': 'Baby Peach',
                'Toad': 'Toad',
                'Koopa Troopa': 'Koopa Troopa',
                'Baby Luigi': 'Baby Luigi',
                'Baby Daisy': 'Baby Daisy',
                'Toadette': 'Toadette',
                'Dry Bones': 'Dry Bones',
            },
            'Medium': {
                'Mario': 'Mario',
                'Luigi': 'Luigi',
                'Peach': 'Peach',
                'Yoshi': 'Yoshi',
                'Daisy': 'Daisy',
                'Birdo': 'Birdo',
                'Diddy Kong': 'Diddy Kong',
                'Bowser Jr.': 'Bowser Jr.',
            },
            'Large': {
                'Wario': 'Wario',
                'Waluigi': 'Waluigi',
                'Donkey Kong': 'Donkey Kong',
                'Bowser': 'Bowser',
                'King Boo': 'King Boo',
                'Rosalina': 'Rosalina',
                'Funky Kong': 'Funky Kong',
                'Dry Bowser': 'Dry Bowser',
            },
            'Other': {
                'Mii Outfit A': 'Mii Outfit A',
                'Mii Outfit B': 'Mii Outfit B',
            },
        },

        vehicles: {
            'Small Bikes' : {
                'Standard Bike S': 'Standard Bike S',
                'Bullet Bike': 'Bullet Bike',
                'Bit Bike': 'Bit Bike',
                'Quacker': 'Quacker',
                'Magikruiser': 'Magikruiser',
                'Jet Bubble': 'Jet Bubble',
            },
            'Medium Bikes': {
                'Standard Bike M': 'Standard Bike M',
                'Mach Bike': 'Mach Bike',
                'Sugarscoot': 'Sugarscoot',
                'Zip Zip': 'Zip Zip',
                'Sneakster': 'Sneakster',
                'Dolphin Dasher': 'Dolphin Dasher',
            },
            'Large Bikes': {
                'Standard Bike L': 'Standard Bike L',
                'Flame Runner': 'Flame Runner',
                'Wario Bike': 'Wario Bike',
                'Shooting Star': 'Shooting Star',
                'Spear': 'Spear',
                'Phantom': 'Phantom',
            },
            'Small Karts': {
                'Standard Kart S': 'Standard Kart S',
                'Booster Seat': 'Booster Seat',
                'Mini Beast': 'Mini Beast',
                'Cheep Charger': 'Cheep Charger',
                'Tiny Titan': 'Tiny Titan',
                'Blue Falcon': 'Blue Falcon',
            },
            'Medium Karts': {
                'Standard Kart M': 'Standard Kart M',
                'Classic Dragster': 'Classic Dragster',
                'Wild Wing': 'Wild Wing',
                'Super Blooper': 'Super Blooper',
                'Daytripper': 'Daytripper',
                'Sprinter': 'Sprinter',
            }, 
            'Large Karts': {
                'Standard Kart L': 'Standard Kart L',
                'Offroader': 'Offroader',
                'Flame Flyer': 'Flame Flyer',
                'Piranha Prowler': 'Piranha Prowler',
                'Jetsetter': 'Jetsetter',
                'Honeycoupe': 'Honeycoupe',
            },
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