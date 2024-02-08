import type { Classroom } from './Classroom';
import type { Subject } from './Subject';
import type { Term } from './Term';

export type Test = {
    id: number;
    date: string;
    term_id: number;
    classroom_id: number;
    subject_id: number;
    term?: Term;
    classroom?: Classroom;
    subject?: Subject;
};
