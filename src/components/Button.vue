<template>
    <button 
        :type="buttonType"
        :class="buttonClass"
    >
        {{label}}
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: false
        },
        label: {
            type: String,
            required: true
        },
        margin: {
            type: String,
            required: false
        },
        padding: {
            type: String,
            required: false
        }
    },

    computed: {
        buttonType() {
            return this.type || 'button';
        },

        buttonClass() {
            const padding = this.padding || 2;
            const margin = this.margin || 4;
            return `flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded m-${margin} mr-0 p-${padding} transition duration-150 ease-in`;
        }
    }
}
</script>