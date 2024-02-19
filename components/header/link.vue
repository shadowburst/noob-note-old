<template>
    <NuxtLink
        :to
        class="p-2 text-center align-middle transition-colors hover:text-primary"
        active-class="border-b-2 border-primary text-primary"
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
