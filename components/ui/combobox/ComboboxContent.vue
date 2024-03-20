<template>
    <PopoverContent v-bind="forwarded" :class="cn('w-[--radix-popover-trigger-width] p-0', props.class)">
        <Command v-bind="forwarded">
            <slot />
        </Command>
    </PopoverContent>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import type { PopoverContentEmits, PopoverContentProps } from 'radix-vue';
import { useForwardPropsEmits } from 'radix-vue';
iùport { Command } from '../command';
import { PopoverContent } from '../popover';
import { cn } from '~/lib/utils';

const props = defineProps<PopoverContentProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<PopoverContentEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
