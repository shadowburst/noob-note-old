import { defineStore } from 'pinia';
import { invoke } from '@tauri-apps/api';
import type { Grade } from '~/types';

const useGradeStore = defineStore('grade', () => {
    const pending = ref(false);
    const items = ref<Grade[]>([]);
    const item = ref<Grade | null>(null);

    async function get(): Promise<Grade[]> {
        pending.value = true;
        items.value = await invoke<Grade[]>('get_grades', { values: [] });
        pending.value = false;

        return items.value;
    }

    async function find(id: number): Promise<Grade> {
        pending.value = true;
        item.value = await invoke<Grade>('get_grade', { id });
        pending.value = false;

        return item.value;
    }

    async function create(data: Omit<Grade, 'id' | 'grade'>): Promise<Grade> {
        pending.value = true;
        item.value = await invoke<Grade>('create_grade', { ...data });
        pending.value = false;

        return item.value;
    }

    async function update(id: number, data: Omit<Grade, 'id' | 'grade'>): Promise<Grade> {
        pending.value = true;
        item.value = await invoke<Grade>('update_grade', { id, ...data });
        pending.value = false;

        return item.value;
    }

    async function destroy(id: number): Promise<void> {
        pending.value = true;
        await invoke<Grade>('delete_grade', { id });
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

export default useGradeStore;
