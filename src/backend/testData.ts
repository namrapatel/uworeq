import { Course } from "../types";

export const testRequirements = {
    moduleRequirements: {
        moduleName: "MINOR IN COMPUTER SCIENCE",
        lines: [
            {
                completed: false,
                coursesRemaining: 3.0,
                operator: "OR",
                courses: 3.0,
                courseList: [
                    {
                        courseName: 'MATH',
                        courseNumber: 101,
                        courseLetter: "A",
                        completed: false,
                    },
                    {
                        courseName: 'MATH',
                        courseNumber: 102,
                        courseLetter: "A",
                        completed: false,
                    },
                    {
                        courseName: 'MATH',
                        courseNumber: 103,
                        courseLetter: "A",
                        completed: false,
                    },
                ],
                subjectToLevelMapping: [
                    {
                      subjectCode: "COMPSCI",
                      level: "3100-3199",
                      completed: false
                    }
                ],
            }
        ],
        completed: false
    },
    generalRequirements: {
        moduleName: "General",
        requirements: [
            {
                completed: false,
                coursesRemaining: 1.0,
                operator: "OR",
                category: "A",
                courses: 1.0
            },
            {
                completed: false,
                coursesRemaining: 1.0,
                operator: "OR",
                category: "B",
                courses: 1.0
            },
            {
                completed: false,
                coursesRemaining: 1.0,
                operator: "OR",
                category: "C",
                courses: 1.0
            }
        ]
    }
}

export const testCompletedCourses = [
    {
        formalSubjectName: "COMPSCI",
        courseNumber: 3000,
        courseWeight: 1,
        breadthCategory: "A",
        name: "MATH 101",
        courseLetter: "A",
        url: "www.google.com"
    } as Course,
]