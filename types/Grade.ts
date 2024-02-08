import type { Cycle } from './Cycle';

export type Grade = {
    id: number;
    name: string;
    cycle_id: number;
    cycle?: Cycle;
};
