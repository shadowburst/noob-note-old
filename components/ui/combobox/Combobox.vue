<template>
    <Popover v-bind="forwarded">
        <PopoverTrigger as-child>
            <Button variant="outline" class="w-full">
                test
                <ChevronsUpDownIcon class="size-4" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[--radix-popover-trigger-width] p-0">
            <Command>
                <CommandInput />
                <CommandEmpty>
                    <slot name="empty"> Aucun résultat </slot>
                </CommandEmpty>
                <CommandList>
                    <CommandGroup> </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts" generic="T extends AcceptableValue">
import { useForwardPropsEmits } from 'radix-vue';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import type { AcceptableValue, ComboboxEmits, ComboboxProps } from './interface';
import type { Arrayable } from '@vueuse/core';
import { Button } from '../button';
import type { ChevronsUpDownIcon } from 'lucide-vue-next';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '../command';

const props = withDefaults(defineProps<ComboboxProps<T>>(), {});

const emits = defineEmits<ComboboxEmits>();

const delegatedProps = computed(() => {
    const { open, defaultOpen } = props;

    return { open, defaultOpen };
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const model = defineModel<T>();
</script>

<script lang="ts">
export const COMBOBOX_STATE_KEY = 'ComboboxState';

export type ComboboxState = {
    model: Ref<Arrayable<AcceptableValue>>;
    labels: Ref<string[]>;
};
</script>
