<template>
    <label v-if="label.length > 0" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {{label}}
    </label>

    <select 
        :class="classes"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
    >
        <template v-for="(text, val) in options">
            <template v-if="typeof text === 'object'">
                <optgroup :label="val">
                    <option v-for="(text2, val2) in text" :value="val2">{{ text2 }}</option>
                </optgroup>
            </template>
            <template v-else>
                <option :value="val">{{ text }}</option>
            </template>
        </template>
    </select>
    
    <p v-if="errorMessage?.length > 0" class="text-red-500 text-md italic">{{errorMessage}}</p>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            required: false
        },
        label: {
            type: String,
            required: true,
        },
        errorMessage: {
            type: String,
            required: false,
        },
        options: {
            type: Object,
            required: true
        }
    },

    emits: ['update:modelValue'],

    data() {
        return {
            
        }
    },

    computed: {
        classes() {
            let classes = 'block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white';

            if(this.errorMessage?.length > 0) {
                classes += ' border-red-500';
            }

            return classes;
        }
    }
}
</script>