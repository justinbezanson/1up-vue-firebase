<template>
    <SuccessAlert v-if="flashMessage !== null && flashMessage.message.length > 0" :message="flashMessage.message" :title="flashMessage.title" />
</template>

<script>
import SuccessAlert from './SuccessAlert.vue';

export default {
    computed: {
        flashMessage() {
            return this.$store.state.flashMessage;
        }
    },
    components: { SuccessAlert }
}
</script>