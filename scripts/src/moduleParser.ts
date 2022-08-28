const jsonData = require('../data/modules.json');
import { ModuleRequirements, RequirementsLine, PartialCourse } from '../../src/types';

function parseModules() {
    const modules: ModuleRequirements[] = [];

    // Loop through the array in jsonData
    for (const module of jsonData) {
        const lines: RequirementsLine[] = [];
        for (const line of module.lines) {
            const courses: PartialCourse[] = [];
            // Loop through the courses in the line
            for (const course of line.courseList) {
                courses.push({
                    courseName: course.courseName,
                    courseNumber: course.courseNumber,
                    courseLetter: course.courseLetter
                });
            }
            lines.push({
                courses: line.courses,
                operator: line.operator,
                courseList: courses,
                subjectToLevelMapping: line.subjectToLevelMapping
            });
        }
        modules.push({
            moduleName: module.moduleName,
            lines: lines
        });
    }
}

parseModules();


// Parse modules from the JSON file
// Store them in a local object
// Insert the object into a Supabase table