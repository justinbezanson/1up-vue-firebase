<template>
    <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">{{ title || 'Success'}}:</span> {{message}}
    </div>
</template>

<script>
export default {
    props: ['title', 'message']
}
</script>