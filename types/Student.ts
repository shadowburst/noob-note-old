import type { Classroom } from './Classroom';

export type Student = {
    id: number;
    first_name: string;
    last_name: string;
    classroom_id: number;
    classroom?: Classroom;
};
