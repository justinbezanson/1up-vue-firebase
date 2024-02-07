<template>
    <a href="javascript:void(0)" :title="title" :class="buttonClass" @click="click">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
            <path 
                fill-rule="evenodd" 
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm4-7a.75.75 0 0 0-.75-.75h-6.5a.75.75 0 0 0 0 1.5h6.5A.75.75 0 0 0 12 8Z" 
                clip-rule="evenodd" 
            />
        </svg>
    </a>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false
        },
        float: {
            type: String, 
            required: false
        },
        click: {
            type: Function,
            required: true
        }
    },

    computed: {
        buttonFloat() {
            return this.float ? (`float-${this.float}`) : '';
        },

        buttonClass() {
            return `text-blue-600 ${this.buttonFloat}`;
        }
    }
}
</script>