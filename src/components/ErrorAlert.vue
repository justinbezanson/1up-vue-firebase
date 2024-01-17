<template>
    <div 
        v-if="message && message.length > 0"
        class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
        role="alert"
    >
        <span class="font-medium">{{ title || 'Error'}}:</span> {{message}}
    </div>
</template>

<script>
export default {
    props: ['title', 'message']
}
</script>