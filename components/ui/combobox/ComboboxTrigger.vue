<template>
    <PopoverTrigger as-child>
        <ComboboxTrigger v-bind="delegatedProps" :class="props.class">
            <slot>
                <TagsInput v-if="multiple">
                    <TagsInputItem v-for="(tag, index) in tags" :value="tag">
                        <TagsInputItemText />
                        <TagsInputItemDelete @click="(model as Array<T>).splice(index, 1)" />
                    </TagsInputItem>
                </TagsInput>
                <Button v-else>
                    <div>
                        {{ model }}
                    </div>
                    <ArrowUpDown class="size-5" />
                </Button>
            </slot>
        </ComboboxTrigger>
    </PopoverTrigger>
</template>

<script setup lang="ts" generic="T">
import { ComboboxTrigger, type ComboboxTriggerProps } from 'radix-vue';
import { PopoverTrigger } from '../popover';
import type { HTMLAttributes } from 'vue';
import { injectComboboxRootContext } from 'radix-vue/dist/Combobox/ComboboxRoot';
import { TagsInput } from '../tags-input';
import { Button } from '../button';
import type { ArrowUpDown } from 'lucide-vue-next';

const props = defineProps<ComboboxTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const rootContext = injectComboboxRootContext();

const multiple = computed(() => rootContext.multiple.value);

const model = computed(() => rootContext.modelValue.value);
const tags = computed(() => rootContext.modelValue.value);
</script>
