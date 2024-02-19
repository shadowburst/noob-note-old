import type { HTMLAttributes } from 'vue';
import type { ComboboxRootEmits, ComboboxRootProps } from 'radix-vue';

export type ComboboxOption = Record<string, string>;
export type ComboboxGroup = {
    heading?: string;
    options: ComboboxOption[];
};

export type ComboboxProps = ComboboxRootProps & {
    class?: HTMLAttributes['class'];
    filterFunction: (options: ComboboxOption[], query: string) => ComboboxOption[];
    modelValue: string;
    options: ComboboxOption[];
    groupProp?: keyof ComboboxOption;
    labelProp: keyof ComboboxOption;
    valueProp: keyof ComboboxOption;
};

export type ComboboxEmits = ComboboxRootEmits;
