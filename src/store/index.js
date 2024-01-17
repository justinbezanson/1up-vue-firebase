import { createStore } from 'vuex';

/** 
 * @typedef {Object} FlashMessenger 
 * @property {string} title 
 * @property {string} message
 * */

export default createStore({
    state: {
        flashMessage: null
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