// General Types
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

export interface Requirements {
    generalRequirements: GeneralRequirements;
    moduleRequirements: ModuleRequirements;
}

// Module Requirements Types
export interface PartialCourse {
    courseName: string;
    courseNumber: number;
    courseLetter: string[] | string;
}

export interface RequirementsLine {
    courses: number;
    operator: string;
    courseList: PartialCourse[];
    subjectToLevelMapping: {   
        subjectCode: string;
        level: string;
    }[] | null;
}

export interface ModuleRequirements {
    moduleName: string;
    lines: RequirementsLine[];
}

// General Requirements Types
export interface GeneralRequirements {
    moduleName: string;
    requirements: GeneralRequirementLine[] | GeneralRequirementLine;
}

export interface GeneralRequirementLine {
    courses: number;
    operator: string;
    category: string[] | string;
}