import { invoke } from '@tauri-apps/api';
import type { Classroom } from '@/types';

export function fetchAll(): Promise<Classroom[]> {
    return invoke<Classroom[]>('get_classrooms', { values: [] });
}
