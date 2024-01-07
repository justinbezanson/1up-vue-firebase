<template>

    <div class="flex flex-row-reverse items-end mx-20">
        <button 
            @click="addPlayer"
            class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded m-4 mr-0 p-2 transition duration-150 ease-in"
        >
            Add Player
        </button>
    </div>
    
    <div class="ml-20 mr-20 mt-0 mb-10 p-10 bg-white rounded-md shadow-lg">
        <div class="relative overflow-x-auto">
            <h1 class="mb-3 font-bold text-xl text-gray-800">Players</h1>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-white uppercase bg-blue-600">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3" width="100">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="!loading" v-for="player in players">
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-800">
                            <td class="p-2">{{ player.name }}</td>
                            <td class="p-2">
                                <div class="flex flex-row-reverse items-end">
                                    <button 
                                        class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded m-1 mr-0 p-1 transition duration-150 ease-in"
                                    >
                                        Edit
                                    </button>

                                    <button 
                                        class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded m-1 mr-0 p-1 transition duration-150 ease-in"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </template>

                    <template v-else>
                        <tr>
                            <td 
                                colspan="2" 
                                align="center"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-lg" 
                            >
                                Loading...
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>

import { db } from '../firebase/index.js';
import { collection, getDocs } from "firebase/firestore";
import router from '../router';

export default {
    data() {
        return {
            players: [],
            loading: true,
        }
    },

    async mounted() {
        let players = await getDocs(collection(db, 'players'));
        
        players.forEach(player => this.players.push({ id: player.id, name: player.data().name}));
        this.loading = false;
    },

    methods: {
        addPlayer(e) {
            router.push('/add-player');
        },
    }
}

</script>