import type { Student } from './Student';
import type { Test } from './Test';

export type TestResult = {
    student_id: number;
    test_id: number;
    blue_count: number;
    green_count: number;
    yellow_count: number;
    red_count: number;
    student?: Student;
    test?: Test;
};
