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
    completed: boolean;
}

export interface RequirementsLine {
    courses: number;
    operator: string;
    courseList: PartialCourse[];
    subjectToLevelMapping: {   
        subjectCode: string;
        level: string;
        completed: boolean;
    }[] | null;
    completed: boolean;
}

export interface ModuleRequirements {
    moduleName: string;
    lines: RequirementsLine[];
    completed: boolean;
}

export interface RequirementsCompletionData {
    requirements: Requirements;

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