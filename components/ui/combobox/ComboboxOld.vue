<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                role="combobox"
                :class="cn('w-full justify-between', !selectedOption && 'text-muted-foreground')"
            >
                <div>
                    {{ selectedOption?.[labelProp] ?? '' }}
                </div>
                <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[--radix-popover-trigger-width] p-0">
            <Command v-bind="forwarded">
                <CommandInput placeholder="Trouver un niveau..." />
                <CommandEmpty>Aucun niveau trouvé</CommandEmpty>
                <CommandList>
                    <CommandGroup v-for="group in optionGroups" :key="group.heading" :heading="group.heading">
                        <CommandItem
                            v-for="option in group.options"
                            :key="option[labelProp]"
                            :value="option[labelProp]"
                            @select="model = option[valueProp]"
                        >
                            <Check
                                :class="
                                    cn(
                                        'mr-2 size-4',
                                        option[valueProp] === selectedOption?.[valueProp] ? 'opacity-100' : 'opacity-0'
                                    )
                                "
                            />
                            {{ option[labelProp] }}
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { Button } from '../button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../command';
import { Popover, PopoverTrigger, PopoverContent } from '../popover';
import { Check, ChevronsUpDown } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import type { ComboboxGroup, ComboboxProps, ComboboxEmits } from './interface';
import { useForwardPropsEmits } from 'radix-vue';

const props = withDefaults(defineProps<ComboboxProps>(), {
    groupProp: 'group',
    labelProp: 'label',
    valueProp: 'value',
});

const emit = defineEmits<ComboboxEmits>();

const model = defineModel<typeof props.modelValue>();

const delegatedProps = computed(() => {
    const { class: _, groupProp, labelProp, valueProp, ...delegated } = props;

    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const selectedOption = computed(() => {
    return model.value != null ? props.options.find((option) => option[props.valueProp] === model.value) : undefined;
});

const optionGroups = computed(() => {
    const groups: ComboboxGroup[] = [];

    let groupIndex = -1;
    props.options.forEach((option, index) => {
        if (index === 0 || option[props.groupProp] !== groups[groupIndex].heading) {
            groups.push({ heading: option[props.groupProp], options: [] });
            groupIndex++;
        }

        groups[groupIndex].options.push(option);
    });

    return groups;
});
</script>
