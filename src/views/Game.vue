<template>
    <div class="flex flex-col justify-center items-center py-16 mt-1">
        <div class="mt-0 mb-10 p-10 bg-white rounded-md shadow-lg w-full max-w-4xl">

            <ErrorAlert title="Failed" :message="error" />

            <FormTitle :title="formTitle" />

            <div
                v-if="loading"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-lg" 
            >
                Loading...
            </div>

            <form class="w-full">
                <fieldset class="border border-solid border-gray-300 p-3 pb-0 rounded-md">
                    <legend class="text-sm font-bold text-gray-600">Game Settings</legend>
            
                    <div class="flex flex-wrap -mx-2 mb-0">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <FormInput 
                                label="Date" 
                                type="date"
                                :value="form?.date" 
                                :errorMessage="errors?.date" 
                                @input-updated="e => form.date = e.target.value" 
                            />
                        </div>
                        
                        <div class="w-full md:w-1/3 px-3">
                            <FormSelect
                                label="Class"
                                v-model="form.class"
                                :options="classes"
                                :errorMessage="errors?.class"
                            />
                        </div>

                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <FormSelect
                                label="Courses"
                                v-model="form.courses"
                                :options="courses"
                                :errorMessage="errors?.courses"
                            />
                        </div>
                    </div>

                    <div class="flex flex-wrap -mx-2 mb-0">
                        <div class="w-full md:w-1/3 px-3">
                            <FormSelect
                                label="Cpu Vehicles"
                                v-model="form.cpuVehicles"
                                :options="cpuVehicles"
                                :errorMessage="errors?.cpuVehicles"
                            />
                        </div>

                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <FormSelect
                                label="Items"
                                v-model="form.items"
                                :options="items"
                                :errorMessage="errors?.items"
                            />
                        </div>  
                        
                        <div class="w-full md:w-1/3 px-3">
                            <FormSelect
                                label="Cpu"
                                v-model="form.cpu"
                                :options="cpu"
                                :errorMessage="errors?.cpu"
                            />
                        </div>
                    </div>

                    <div class="flex flex-wrap -mx-2 mb-0">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <FormSelect
                                label="Race Count"
                                v-model="form.races"
                                :options="races"
                                :errorMessage="errors?.races"
                            />
                        </div>  
                    </div>
                </fieldset>

                <fieldset class="border border-solid border-gray-300 p-3 mt-4 rounded-md">
                    <legend class="text-sm font-bold text-gray-600">Players</legend>

                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-white uppercase bg-blue-600">
                            <th scope="col" class="px-6 py-3">
                            Player
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Character
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Vehicle
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Place
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Score
                            </th>
                            <th scope="col" class="px-6 py-3"></th>
                        </thead>
                        <tbody>
                            <tr v-for="(player, index) in form.players" :key="'player_'+player.playerId">
                                <td class="p-2">
                                    <FormSelect
                                        label=""
                                        v-model="player.playerId"
                                        :options="playerSelectOptions"
                                        @update:model-value="updatedPlayer($event, index)"
                                        :errorMessage="errors?.players[index].name"
                                    />
                                </td>
                                <td class="p-2">
                                    <FormSelect
                                        label=""
                                        v-model="player.character"
                                        :options="characters"
                                        :errorMessage="errors?.players[index].character"
                                    />
                                </td>
                                <td class="p-2">
                                    <FormSelect
                                        label=""
                                        v-model="player.vehicle"
                                        :options="vehicles"
                                        :errorMessage="errors?.players[index].vehicle"
                                    />
                                </td>
                                <td class="p-2 w-8">
                                    <FormInput 
                                        label=""
                                        :value="player.place" 
                                        @input-updated="e => form.players[index].place = e.target.value" 
                                        :errorMessage="errors?.players[index].place"
                                    />
                                </td>
                                <td class="p-2 w-8">
                                    <FormInput 
                                        label=""
                                        :value="player.score"
                                        @input-updated="e => form.players[index].score = e.target.value"
                                        :errorMessage="errors?.players[index].score"
                                    />
                                </td>
                                <td class="p-2 w-4">
                                    <div v-if="form.players.length > 1">
                                        <MinusButton :title="'Remove player ' + index" :click="e => this.removePlayerRow(index)" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div>
                        <PlusButton float="right" title="Add player" :click="e => this.addPlayerRow()" />
                    </div>
                </fieldset>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <Button @click="save" label="Save" />
                    </div>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { db } from '../firebase/index.js';
import { collection, addDoc, doc, getDoc, updateDoc, getDocs, serverTimestamp, query, where, orderBy, deleteDoc, limit } from "firebase/firestore";
import router from '../router';
import FormSelect from '../components/FormSelect.vue';
import Validation from '../validation';

export default {
    data() {
        return {
            firstValidation: true,
            rows: 0,
            /** @type {import('../store').GameProps} */
            errors: {
                date: '',
                class: '',
                courses: '',
                cpuVehicles: '',
                items: '',
                cpu: '',
                races: '',
                players: []
            },
            /** @type {import('../store').GameProps} */
            form: {
                date: '',
                class: '',
                courses: '',
                cpuVehicles: '',
                items: '',
                cpu: '',
                races: '',
                players: []
            },
            /** @type {import('../store').GamePropsMessages} */
            messages: {
                date: 'Please select a date',
                class: 'Please select a class',
                courses: 'Please select a course type',
                cpuVehicles: 'Please select cpu vehicles',
                items: 'Please select items',
                cpu: 'Please select a cpu difficulty',
                races: 'Please select number of races',
                players: {
                    name: 'Please select a player',
                    character: 'Please select a character',
                    vehicle: 'Please select a vehicle',
                    place: 'Please enter a place',
                    score: 'Please enter a score'
                }
            },
            error: '',
            success: '',
            game: {},

            /** @type {import('../store').Player[]} */
            players: [],

            loading: true,
        };
    },
    async mounted() {
        await this.getAvailablePlayers();

        if (this.hasGameId) {
            const results = await getDoc(doc(db, 'games', this.gameId));
            this.form.date = results.data().date;
            this.form.class = results.data().class;
            this.form.courses = results.data().courses;
            this.form.cpuVehicles = results.data().cpu_vehicles;
            this.form.items = results.data().items;
            this.form.cpu = results.data().cpu;
            this.form.races = results.data().races;

            const q = query(collection(db, 'games_players'), where('game_id' , '==', this.gameId), orderBy('place', 'asc'))
            const playerResults = await getDocs(q);
            playerResults.forEach(row => {
                /** @type {import('../store').GamePlayer} */
                const player = {
                    gameId: this.gameId, 
                    character: row.data().character,
                    name: row.data().name,
                    playerId: row.data().player_id,
                    place: row.data().place,
                    score: row.data().score,
                    vehicle: row.data().vehicle
                };

                this.form.players.push(player);
            });
        } else {
            this.form.date = new Date().toLocaleDateString('en-CA');
            if(!this.loadRecentGame()) {
                this.addPlayerRow();
            }
        }

        this.loading = false;
    },
    watch: {
        form: {
            handler(val) {
                this.validate();
            },
            deep: true
        }
    },
    computed: {
        ...mapState(['classes', 'courses', 'cpuVehicles', 'items', 'cpu', 'races', 'vehicles', 'characters']),

        formTitle() {
            if (this.game.length > 0) {
                return 'Edit Game';
            }
            return 'Add Game';
        },

        hasGameId() {
            return this.$route.params.id?.length > 0;
        },

        gameId() {
            return this.hasGameId ? this.$route.params.id.toString() : '';
        },

        playerSelectOptions() {
            const obj = {};
            this.players.forEach(player => obj[player.id] = player.name);
            return obj;
        }
    },
    methods: {
        ...mapMutations(['setFlashMessage']),

        /**
         * load data from most recent game as starting point
         * @returns {Promise<boolean>}
         */
        async loadRecentGame() {
            const gameQuery = query(collection(db, 'games'), orderBy('created', 'desc'), limit(1))
            const results = await getDocs(gameQuery);

            if(results.docs.length > 0) {
                const game = results.docs[0].data();

                this.form.class = game.class;
                this.form.courses = game.courses;
                this.form.cpuVehicles = game.cpu_vehicles;
                this.form.items = game.items;
                this.form.cpu = game.cpu;
                this.form.races = game.races;

                const q = query(collection(db, 'games_players'), where('game_id' , '==', results.docs.at(0).id), orderBy('place', 'asc'))
                const playerResults = await getDocs(q);
                playerResults.forEach(row => {
                    /** @type {import('../store').GamePlayer} */
                    const player = {
                        gameId: '', 
                        character: row.data().character,
                        name: row.data().name,
                        playerId: row.data().player_id,
                        place: '',
                        score: '',
                        vehicle: row.data().vehicle
                    };

                    this.form.players.push(player);
                });
                    
                return true;
            }

            return false;
        },

        /**
         * 
         */
        updatedPlayer(e, index) {
            //update name
            for(const player of this.players) {
                if(this.form.players[index].playerId === player.id) {
                    this.form.players[index].name = player.name;
                    break;
                }
            }
        },

        addPlayerRow() {
            this.form.players.push(this.emptyGamePlayer());
            this.errors.players.push(this.emptyGamePlayerError());
        },

        removePlayerRow(index) {
            this.form.players.splice(index, 1);
            this.errors.players.splice(index, 1);
        },

        /**
         * get available players
         */
        async getAvailablePlayers() {
            const players = await getDocs(collection(db, 'players'));
            players.forEach(player => { this.players.push({ id: player.id, name: player.data().name }); });
            this.players.sort((a, b) => { return a.name > b.name ? 1: -1; })
        },

        /**
         * clear current errors
         */
        clearErrors() {
            let playerErrors = [];

            this.form.players.forEach(player => {
                const row = {};

                for(const key in player) {
                    row[key] = '';
                }

                playerErrors.push(row);
            });

            this.errors = {
                date: '',
                class: '',
                courses: '',
                cpuVehicles: '',
                items: '',
                cpu: '',
                races: '',
                players: playerErrors
            };
        },

        /**
         * save the game
         */
        async save() {
            if (this.validate()) {
                try {
                    /** @type {import('../store').FlashMessenger} */
                    const message = {
                        title: 'Success',
                        message: 'Game was '
                    };
                    if(this.hasGameId) {                        
                        //delete existing game_players
                        const q = query(collection(db, 'games_players'), where('game_id' , '==', this.gameId), orderBy('place', 'asc'))
                        const playerResults = await getDocs(q);
                        playerResults.forEach(row => {
                            deleteDoc(doc(db, 'games_players', row.id));
                        });

                        await updateDoc(doc(db, "games", this.gameId), {
                            date: this.form.date,
                            class: this.form.class,
                            courses: this.form.courses,
                            cpu_vehicles: this.form.cpuVehicles,
                            items: this.form.items,
                            cpu: this.form.cpu,
                            races: this.form.races,
                            created: serverTimestamp()
                        });

                        for(const player of this.form.players) {
                            //TODO: update stats
                            await addDoc(collection(db, "games_players"), {
                                created: serverTimestamp(),
                                game_id: this.gameId,
                                character: player.character,
                                name: player.name,
                                player_id: player.playerId,
                                place: player.place,
                                score: player.score,
                                vehicle: player.vehicle
                            })
                        }
                        
                        message.message += 'updated';
                    } else {
                        const gameRef = await addDoc(collection(db, "games"), {
                            date: this.form.date,
                            class: this.form.class,
                            courses: this.form.courses,
                            cpu_vehicles: this.form.cpuVehicles,
                            items: this.form.items,
                            cpu: this.form.cpu,
                            races: this.form.races,
                            created: serverTimestamp()
                        });

                        for(const player of this.form.players) {
                            //TODO update stats
                            await addDoc(collection(db, "games_players"), {
                                created: serverTimestamp(),
                                game_id: gameRef.id,
                                character: player.character,
                                name: player.name,
                                player_id: player.playerId,
                                place: player.place,
                                score: player.score,
                                vehicle: player.vehicle
                            });
                        }

                        message.message += 'added';
                    }
                    this.setFlashMessage(message);
                    router.push('/feed');
                }
                catch (e) {
                    this.error = 'Could not save game';
                    console.error(e);
                }
            }
        },
        
        /**
         * validate the form
         * 
         * @returns {boolean}
         */
        validate() {
            if(this.firstValidation) {
                this.firstValidation = false;
                return true;
            }

            let valid = true;
            
            this.clearErrors();

            valid = Validation.isNotEmpty('date', this);
            valid = Validation.isNotEmpty('class', this);
            valid = Validation.isNotEmpty('courses', this);
            valid = Validation.isNotEmpty('cpuVehicles', this);
            valid = Validation.isNotEmpty('items', this);
            valid = Validation.isNotEmpty('cpu', this);
            valid = Validation.isNotEmpty('races', this);

            this.form.players.forEach((player, index) => {
                valid = Validation.isNotEmpty({ data: 'players', index: index, property: 'name' }, this);
                valid = Validation.isNotEmpty({ data: 'players', index: index, property: 'character' }, this);
                valid = Validation.isNotEmpty({ data: 'players', index: index, property: 'vehicle' }, this);
                valid = Validation.isNotEmpty({ data: 'players', index: index, property: 'place' }, this);
                valid = Validation.isNotEmpty({ data: 'players', index: index, property: 'score' }, this);
            })
            
            return valid;
        },

        /**
         * get an empty game player object
         * @returns {import('../store').GamePlayer}
         */
        emptyGamePlayer() {
            return {
                character: '',
                vehicle: '',
                gameId: this.gameId,
                name: this.players[0].name,
                place: '',
                score: '',
                playerId: this.players[0].id
            }
        },

        /**
         * get an empty game player error object
         * @returns {import('../store').GamePlayer}
         */
         emptyGamePlayerError() {
            return {
                character: '',
                vehicle: '',
                gameId: '',
                name: '',
                place: '',
                score: '',
                playerId: ''
            }
        },
    },
    components: { FormSelect }
}
</script>