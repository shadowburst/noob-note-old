export { type Classroom } from './Classroom';
export { type Cycle } from './Cycle';
export { type Grade } from './Grade';
export { type Student } from './Student';
export { type Subject } from './Subject';
export { type Term } from './Term';
export { type Test } from './Test';
export { type TestResult } from './TestResult';

// export type Classroom = {
//     id: number;
//     name: string;
//     grade_id: number;
//     grade?: Grade;
// };
//
// export type Cycle = {
//     id: number;
//     name: string;
// };
//
// export type Grade = {
//     id: number;
//     name: string;
//     cycle_id: number;
//     cycle?: Cycle;
// };
//
// export type Student = {
//     id: number;
//     first_name: string;
//     last_name: string;
//     classroom_id: number;
//     classroom?: Classroom;
// };
//
// export type Subject = {
//     id: number;
//     name: string;
// };
//
// export type Term = {
//     id: number;
//     start_date: string;
//     end_date: string;
// };
//
// export type Test = {
//     id: number;
//     date: string;
//     term_id: number;
//     classroom_id: number;
//     subject_id: number;
//     term?: Term;
//     classroom?: Classroom;
//     subject?: Subject;
// };
//
// export type TestResult = {
//     student_id: number;
//     test_id: number;
//     blue_count: number;
//     green_count: number;
//     yellow_count: number;
//     red_count: number;
//     student?: Student;
//     test?: Test;
// };
