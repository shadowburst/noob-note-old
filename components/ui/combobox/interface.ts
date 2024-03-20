import type {
    AcceptableValue as ComboboxAcceptableValue,
    ComboboxRootEmits,
    ComboboxRootProps,
} from 'radix-vue/dist/Combobox/ComboboxRoot';
import type { HTMLAttributes } from 'vue';

export type AcceptableValue = ComboboxAcceptableValue;

export type ComboboxProps<T extends AcceptableValue> = ComboboxRootProps<T> & { class?: HTMLAttributes['class'] };

export type ComboboxEmits = ComboboxRootEmits;
