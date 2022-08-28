const jsonData = require('../data/modules.json');
import { ModuleRequirements, RequirementsLine, PartialCourse } from '../../src/types';

function parseModules() {
    const modules: ModuleRequirements[] = [];

    // Loop through each key in jsonData
    for (const key in jsonData) {
        // Create a new module for each key
        const module: ModuleRequirements = {
            moduleName: jsonData[key],
            lines: []
        };
        // Loop through each line in the module
        for (const line in jsonData[key]) {
            // Create a new RequirementsLine for each line
            const requirementsLine: RequirementsLine = {
                courses: jsonData[key][line].courses,
                operator: jsonData[key][line].operator,
                courseList: [],
                subjectToLevelMapping: []
            };
            // Loop through each course in the line
            for (const course in jsonData[key][line].courseList) {
                // Create a new PartialCourse for each course
                const partialCourse: PartialCourse = {
                    courseName: jsonData[key][line].courseList[course].courseName,
                    courseNumber: jsonData[key][line].courseList[course].courseNumber,
                    courseLetter: jsonData[key][line].courseList[course].courseLetter
                };
                // Add the PartialCourse to the RequirementsLine
                requirementsLine.courseList.push(partialCourse);
            }
            // Loop through each subject in the line
            for (const subject in jsonData[key][line].subjectToLevelMapping) {
                // Create a new subjectToLevelMapping for each subject
                const subjectToLevelMapping: {
                    subjectCode: string;
                    level: string;
                } = {
                    subjectCode: jsonData[key][line].subjectToLevelMapping[subject].subjectCode,
                    level: jsonData[key][line].subjectToLevelMapping[subject].level
                };
                // Add the subjectToLevelMapping to the RequirementsLine
                requirementsLine.subjectToLevelMapping.push(subjectToLevelMapping);
            }
            // Add the RequirementsLine to the module
            module.lines.push(requirementsLine);
        }
        modules.push(module);
    }
    console.log(modules[0].moduleName)
    console.log(modules[0].lines[0])
}

parseModules();


// Parse modules from the JSON file
// Store them in a local object
// Insert the object into a Supabase table
