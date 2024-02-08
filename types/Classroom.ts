import type { Grade } from './Grade';

export type Classroom = {
    id: number;
    name: string;
    grade_id: number;
    grade?: Grade;
};
