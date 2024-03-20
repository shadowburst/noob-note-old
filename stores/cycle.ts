import { defineStore } from 'pinia';
import { invoke } from '@tauri-apps/api';
import type { Cycle } from '~/types';

const useCycleStore = defineStore('cycle', () => {
    const pending = ref(false);
    const items = ref<Cycle[]>([]);
    const item = ref<Cycle | null>(null);

    async function get(): Promise<Cycle[]> {
        pending.value = true;
        items.value = await invoke<Cycle[]>('get_cycles', { values: [] });
        pending.value = false;

        return items.value;
    }

    async function find(id: number): Promise<Cycle> {
        pending.value = true;
        item.value = await invoke<Cycle>('get_cycle', { id });
        pending.value = false;

        return item.value;
    }

    async function create(data: Omit<Cycle, 'id' | 'grade'>): Promise<Cycle> {
        pending.value = true;
        item.value = await invoke<Cycle>('create_cycle', { ...data });
        pending.value = false;

        return item.value;
    }

    async function update(id: number, data: Omit<Cycle, 'id' | 'grade'>): Promise<Cycle> {
        pending.value = true;
        item.value = await invoke<Cycle>('update_cycle', { id, ...data });
        pending.value = false;

        return item.value;
    }

    async function destroy(id: number): Promise<void> {
        pending.value = true;
        await invoke<Cycle>('delete_cycle', { id });
        pending.value = false;
    }

    return {
        pending,
        items,
        item,
        get,
        find,
        create,
        update,
        destroy,
    };
});

export default useCycleStore;
