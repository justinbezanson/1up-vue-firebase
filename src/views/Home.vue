<template>
    <div class="ml-20 mr-20 mt-20 mb-10 p-10 bg-white rounded-md shadow-lg">
        <div class="relative overflow-x-auto">
            <FormTitle title="Statistics" />

            <div v-for="stat in stats" class="columns-1 gap-4" style="float: left;">
                <div class="mb-1 mr-1 h-8 w-32 break-inside-avoid rounded-md bg-blue-100 p-1 text-gray-800">
                    <strong>{{ stat.name }}</strong>
                </div>
                <div class="mb-1 mr-1 h-8 w-32 break-inside-avoid rounded-md bg-blue-100 p-1 text-gray-800">
                    Games: {{  stat.games }}
                </div>
                <div class="mb-1 mr-1 h-8 w-32 break-inside-avoid rounded-md bg-blue-100 p-1 text-gray-800">
                    1st: {{  stat['1'] }}
                </div>
                <div class="mb-1 mr-1 h-8 w-32 break-inside-avoid rounded-md bg-blue-100 p-1 text-gray-800">
                    2nd: {{  stat['2'] }}
                </div>
                <div class="mb-1 mr-1 h-8 w-32 break-inside-avoid rounded-md bg-blue-100 p-1 text-gray-800">
                    3rd: {{  stat['3'] }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../firebase/index.js';
import { collection, getDocs } from "firebase/firestore";

export default {
    data() {
        return {
            stats: []
        }
    },

    async mounted() {
        const results = await getDocs(collection(db, 'stats'));
        
        results.forEach(result => {
            this.stats.push({
                name: result.data().name, 
                games: result.data().games,
                '1': result.data()['1'],
                '2': result.data()['2'],
                '3': result.data()['3']
            });
        });

        this.stats.sort(function(a, b) {
            if(a['1'] === b['1']) {
                if(a['2'] === b['2']) {
                    if(a['3'] === b['3']) {
                        return a['games'] < b['games'] ? 1 : -1;
                    }

                    return a['3'] < b['3'] ? 1 : -1;
                }

                return a['2'] < b['2'] ? 1 : -1;
            }

            return a['1'] < b['1'] ? 1 : -1;
        });
    }
}
</script>