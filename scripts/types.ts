export interface Course {
    name: string;
    courseNumber: number;
    courseLetter: string[] | string;
    breadthCategory: string;
    url: string;
    courseWeight: number;
    formalSubjectName: string;

}

export interface Subject {
    name: string;
    category: string;
    url: string;
    courses: Course[];
}