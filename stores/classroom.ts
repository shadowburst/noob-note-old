import { defineStore } from 'pinia';
import { invoke } from '@tauri-apps/api';
import type { Classroom } from '~/types';

const useClassroomStore = defineStore('classroom', () => {
    const pending = ref(false);
    const items = ref<Classroom[]>([]);
    const item = ref<Classroom | null>(null);

    async function get(): Promise<Classroom[]> {
        pending.value = true;
        items.value = await invoke<Classroom[]>('get_classrooms', { values: [] });
        pending.value = false;

        return items.value;
    }

    async function find(id: number): Promise<Classroom> {
        pending.value = true;
        item.value = await invoke<Classroom>('get_classroom', { id });
        pending.value = false;

        return item.value;
    }

    async function create(data: Omit<Classroom, 'id' | 'grade'>): Promise<Classroom> {
        pending.value = true;
        item.value = await invoke<Classroom>('create_classroom', { ...data });
        pending.value = false;

        return item.value;
    }

    async function update(id: number, data: Omit<Classroom, 'id' | 'grade'>): Promise<Classroom> {
        pending.value = true;
        item.value = await invoke<Classroom>('update_classroom', { id, ...data });
        pending.value = false;

        return item.value;
    }

    async function destroy(id: number): Promise<void> {
        pending.value = true;
        await invoke<Classroom>('delete_classroom', { id });
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

export default useClassroomStore;
