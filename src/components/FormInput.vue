<template>
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {{label}}
    </label>
    
    <input 
        :class="classes"
        type="text" 
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input-updated', $event)"
    >
    
    <p v-if="errorMessage?.length > 0" class="text-red-500 text-md italic">{{errorMessage}}</p>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: false,
        },
        errorMessage: {
            type: String,
            required: false,
        },
    },

    emits: ['input-updated'],

    data() {
        return {
            
        }
    },

    computed: {
        classes() {
            let classes = 'appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white';

            if(this.errorMessage?.length > 0) {
                classes += ' border-red-500';
            }

            return classes;
        }
    }
}
</script>