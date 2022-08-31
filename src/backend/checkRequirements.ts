import { listeners } from "process";
import { ModuleRequirements, GeneralRequirements, Requirements, Course } from "../types";

export function checkRequirements(requirements: Requirements, completedCourses: Course[]) {

}

export function checkCourseMatch(selectedCourse: Course, requirements: Requirements): [Requirements, boolean] {

    var matchFound = false;

    // Check for match in Module Requirements
    if (requirements.moduleRequirements) {
        requirements.moduleRequirements.lines.forEach(line => {
            if (!line.completed) {
                // Check courseList for a match
                var foundMatchInCourseList = false;
                line.courseList.forEach(course => {
                    if (course.courseName === selectedCourse.formalSubjectName && course.courseNumber === selectedCourse.courseNumber) {
                        matchFound = true;
                        course.completed = true;
                        line.coursesRemaining - selectedCourse.courseWeight;
                        foundMatchInCourseList = true;
                        if (line.coursesRemaining === 0) {
                            line.completed = true;
                        }
                    }
                });
                // If did not find match in courseList, check subjectToLevelMapping for a match
                if (!foundMatchInCourseList && line.subjectToLevelMapping) {
                    line.subjectToLevelMapping.forEach(subject => {
                        if (subject.subjectCode === selectedCourse.formalSubjectName) {
                            // Handle case where level is abcd-wxyz format
                            if (subject.level[3] === '-') {
                                var first = parseInt(subject.level.substring(0, 3));
                                var second = parseInt(subject.level.substring(4));
                                if (selectedCourse.courseNumber >= first && selectedCourse.courseNumber <= second) {
                                    // subject.completed = true;
                                    matchFound = true;
                                    line.coursesRemaining - selectedCourse.courseWeight;
                                    if (line.coursesRemaining === 0) {
                                        line.completed = true;
                                    }
                                }
                            } else {
                                var level = parseInt(subject.level.substring(0,3))
                                if (selectedCourse.courseNumber > level) {
                                    // subject.completed = true;
                                    matchFound = true;
                                    line.coursesRemaining - selectedCourse.courseWeight;
                                    if (line.coursesRemaining === 0) {
                                        line.completed = true;
                                    }
                                }
                            }
                        }
                    });
                }
            }
        });
    }


    // Check for match in General Requirements
    if (requirements.generalRequirements) {
        requirements.generalRequirements.requirements.forEach(line => {
            if (!line.completed) {
                // Check courseList for a match
                if (line.category.includes(selectedCourse.breadthCategory)) {
                    line.coursesRemaining - selectedCourse.courseWeight;
                    matchFound = true;
                    if (line.coursesRemaining === 0) {
                        line.completed = true;
                    }
                }
            }
        });
    }
    return [requirements, matchFound];
}