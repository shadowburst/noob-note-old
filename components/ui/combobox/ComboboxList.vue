<template>
    <CommandList v-bind="forwarded">
        <slot />
    </CommandList>
</template>

<script setup lang="ts">
import { CommandList } from '../command';
import { type HTMLAttributes } from 'vue';
import type { ComboboxContentEmits, ComboboxContentProps } from 'radix-vue';
import { useForwardPropsEmits } from 'radix-vue';

const props = defineProps<ComboboxContentProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<ComboboxContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
