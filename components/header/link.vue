<template>
    <NuxtLink
        :to
        class="p-2 text-center align-middle transition-colors hover:text-primary-500"
        active-class="border-b-2 border-primary-500 text-primary-500 hover:text-primary-600"
    >
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
type Props = {
    to: string;
};

defineProps<Props>();
</script>
