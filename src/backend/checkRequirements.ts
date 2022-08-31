import { Requirements, Course } from "../types";
import { testRequirements, testCompletedCourses } from "../backend/testData";

export function checkRequirements(requirements: Requirements, completedCourses: Course[]) {
    // Check for match in General Requirements
    // if (requirements.generalRequirements) {
    //     requirements.generalRequirements.requirements.forEach(line => {
    //         if (!line.completed) {
    //             // Check courseList for a match
    //             if (line.category.includes(selectedCourse.breadthCategory)) {
    //                 line.coursesRemaining - selectedCourse.courseWeight;
    //                 matchFound = true;
    //                 if (line.coursesRemaining === 0) {
    //                     line.completed = true;
    //                 }
    //             }
    //         }
    //     });
    // }
}

// TODO: Does subjectToLevelMapping need the completed field?
export function checkCourseMatch(selectedCourse: Course, requirements: Requirements, add: boolean): [Requirements, boolean] {

    var matchFound = false;

    // Check for match in Module Requirements
    if (requirements.moduleRequirements) {
        requirements.moduleRequirements.lines.forEach(line => {
            if (!line.completed) {
                // Check courseList for a match
                line.courseList.forEach(course => {
                    if (course.courseName === selectedCourse.formalSubjectName && course.courseNumber === selectedCourse.courseNumber) {
                        console.log("Match found in courseList");
                        matchFound = true;
                        if (add) {  
                            course.completed = true;
                            line.coursesRemaining - selectedCourse.courseWeight;
                            if (line.coursesRemaining === 0) {
                                line.completed = true;
                            }
                        } else {
                            // Handle remove case where a course is being removed from the completed list
                            course.completed = false
                            line.coursesRemaining + selectedCourse.courseWeight;
                            line.completed = false;
                        }
                    }
                });
                // If did not find match in courseList, check subjectToLevelMapping for a match
                if (!matchFound && line.subjectToLevelMapping) {
                    line.subjectToLevelMapping.forEach(subject => {
                        if (subject.subjectCode === selectedCourse.formalSubjectName) {
                            // Handle case where level is abcd-wxyz format
                            if (subject.level[4] === '-') {
                                var first = parseInt(subject.level.substring(0, 4));
                                var second = parseInt(subject.level.substring(5));
                                if (selectedCourse.courseNumber >= first && selectedCourse.courseNumber <= second) {
                                    // subject.completed = true;
                                    matchFound = true;
                                    console.log("Match found in subjectToLevelMapping: abcd-wxyz case");
                                    if (add) {
                                        line.coursesRemaining - selectedCourse.courseWeight;
                                        if (line.coursesRemaining === 0) {
                                            line.completed = true;
                                        }
                                    } else {
                                        line.coursesRemaining + selectedCourse.courseWeight;
                                        line.completed = false;
                                    }
                                }
                            } else {
                                var level = parseInt(subject.level.substring(0,3))
                                if (selectedCourse.courseNumber > level) {
                                    // subject.completed = true;
                                    console.log("Match found in subjectToLevelMapping: abcd+ case");
                                    matchFound = true;
                                    if (add) {
                                        line.coursesRemaining - selectedCourse.courseWeight;
                                        if (line.coursesRemaining === 0) {
                                            line.completed = true;
                                        }
                                    } else {
                                        line.coursesRemaining + selectedCourse.courseWeight;
                                        line.completed = false;
                                    }
                                }
                            }
                        }
                    });
                }
            }
        });
    }
    return [requirements, matchFound];
}

console.log(checkCourseMatch(testCompletedCourses[0], testRequirements, true));