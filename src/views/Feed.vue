<template>
    <div class="flex flex-row-reverse items-end mx-20">
        <button 
            @click="addGame"
            class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded m-4 mr-0 p-2 transition duration-150 ease-in"
        >
            Add Game
        </button>

        <button 
            @click="playerList"
            class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded m-4 mr-0 p-2 transition duration-150 ease-in"
        >
            Players
        </button>
    </div>

    <div class="ml-20 mr-20 mt-0 mb-10 p-10 bg-white rounded-md shadow-lg">
        <div class="relative overflow-x-auto">
            <FormTitle title="Games Played" />
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-white uppercase bg-blue-600">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Game
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Player
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Place
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Score
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="!loading" v-for="(game, gameIndex) in games">
                        <template v-for="(player, playerIndex) in sortedPlayers(game)">
                            <tr v-if="playerIndex === 0" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-800">
                                <td 
                                    scope="row" 
                                    style="width: 325px;"
                                    class="p-2 font-medium text-gray-800 whitespace-nowrap dark:text-white" 
                                    :title="getGameColumnTitle(game)"
                                    :rowspan="game.players.length"
                                    valign="top"
                                >
                                    <div class="font-bold text-lg mb-1">{{ game.created.toDate().toDateString() }}</div>
                                    <div v-for="column in columns" class="columns-1 gap-4" style="float: left;">
                                        <div class="mb-1 mr-1 h-8 w-32 break-inside-avoid rounded-md bg-blue-100 p-1 text-gray-800">
                                            {{ column.label }}: {{ game[column.column] }}
                                        </div>
                                    </div>
                                    
                                    <div style="clear:both;" class="pt-1 flex flex-row">
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
                                <td class="p-2">
                                    {{ player.name }}
                                </td>
                                <td class="p-2">
                                    {{ player.place }}
                                </td>
                                <td class="p-2">
                                    {{ player.score }}
                                </td>
                            </tr>
                            <tr v-else class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-800">
                                <td class="p-2">
                                    {{ player.name }}
                                </td>
                                <td class="p-2">
                                    {{ player.place }}
                                </td>
                                <td class="p-2">
                                    {{ player.score }}
                                </td>
                            </tr>
                        </template>
                    </template>

                    <template v-else>
                        <tr>
                            <td 
                                colspan="4" 
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
            games: [],
            loading: true,
            columns: [
                {column: 'class', label: 'Class'}, 
                {column: 'courses', label: 'Courses'}, 
                {column: 'cpu_vehicles', label: 'Cpu Vehicles'},
                {column: 'items', label: 'Items'},
                {column: 'cpu', label: 'Cpu'},
                {column: 'races', label: 'Race Count'}
            ]
        }
    },

    async mounted() {
        let games = await getDocs(collection(db, 'games'));
        let players = await getDocs(collection(db, 'games_players'));

        games.forEach((game) => {
            let gameObj = {
                created: game.data().created,
                class: game.data().class,
                courses: game.data().courses,
                cpu_vehicles: game.data().cpu_vehicles,
                items: game.data().items,
                cpu: game.data().cpu, 
                races: game.data().races,
                players: []
            }

            players.forEach((player) => {
                if(player.data().game_id === game.id) {
                    gameObj.players.push({
                        name: player.data().name,
                        score: player.data().score,
                        place: player.data().place
                    });
                }
            })

            this.games.push(gameObj);
        });

        this.loading = false;
    },
    
    methods: {
        addGame(e) {
            router.push('/game');
        },

        playerList(e) {
            router.push('/players');
        },

        sortedPlayers(game) {
            game.players.sort(function(a, b) {
                return a.place > b.place ? 1 : -1;
            });

            return game.players;
        },

        getGameColumnTitle(game) {
            return "All the data"
        }
    }
}


</script>