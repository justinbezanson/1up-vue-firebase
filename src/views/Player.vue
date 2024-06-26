<template>

    <div class="flex flex-col justify-center items-center py-16 mt-1">
        <div class="mt-0 mb-10 p-10 bg-white rounded-md shadow-lg w-full max-w-lg">

            <ErrorAlert title="Failed" :message="error" />

            <FormTitle :title="formTitle" />

            <form class="w-full">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <FormInput 
                            label="Name" 
                            placeholder="Name" 
                            :value="form?.name" 
                            :errorMessage="errors?.name" 
                            @input-updated="e => form.name = e.target.value" 
                        />
                    </div>                
                </div>
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
import { mapMutations } from 'vuex'
import { db } from '../firebase/index.js';
import { collection, addDoc, doc, getDoc, updateDoc, getDocs, query, where } from "firebase/firestore";
import router from '../router';

export default {
    data() {
        return {
            errors: {
                name: ''
            },
            form: {
                name: ''
            },
            messages: {
                name: 'Please enter a name'
            },
            error: '',
            success: '',
            player: ''
        }
    },

    async mounted() {
        if(this.$route.params.id?.length > 0) {
            this.player = this.$route.params.id.toString();
            const results = await getDoc(doc(db, 'players', this.player));
            this.form.name = results.data().name
        }
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
        formTitle() {
            if(this.player.length > 0) {
                return 'Edit Player';
            }
            
            return 'Add Player';
        },

        
    },

    methods: {
        ...mapMutations(['setFlashMessage']),

        async save() {
            if(this.validate()) {
                try {
                    /** @type {import('../store').FlashMessenger} */
                    const message = {
                        title: 'Success',
                        message: `Player "${this.form.name}" was `
                    };

                    if(this.player.length > 0) {
                        await updateDoc(doc(db, "players", this.player), {
                            name: this.form.name
                        });

                        //update name on stats record
                        const q = query(collection(db, 'stats'), where('player_id', '==', this.player))
                        const results = await getDocs(q);

                        results.forEach(async stat => {
                            await updateDoc(doc(db, "stats", stat.id), {
                                name: this.form.name
                            });
                        });

                        message.message += 'updated';
                    } else {
                        const playerRef = await addDoc(collection(db, "players"), {
                            name: this.form.name
                        });

                        const newStats = {
                            player_id: playerRef.id, 
                            name: this.form.name, 
                            games: 0,
                            '1': 0,
                            '2': 0,
                            '3': 0
                        };

                        await addDoc(collection(db, "stats"), newStats);

                        message.message += 'added';
                    }

                    this.setFlashMessage(message);
                    router.push('/players');
                }
                catch(e) {
                    this.error = 'Could not save new player';
                    console.error(e);
                }
            }
        },

        validate() {
            let valid = true;
            this.errors = {
                name: ''
            };

            if(this.form.name.length === 0) {
                this.errors.name = this.messages.name;
                valid = false;
            }

            return valid;
        }
    }
}
</script>