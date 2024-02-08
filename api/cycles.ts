import { invoke } from '@tauri-apps/api/tauri';
import type { Cycle } from '@/types';

export function fetchAll(): Promise<Cycle[]> {
    return invoke<Cycle[]>('get_cycles', { values: [] });
}
