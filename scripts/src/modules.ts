import { createClient } from '@supabase/supabase-js';
import { ModuleRequirements, RequirementsLine, PartialCourse } from '../../src/types';

const jsonData = require('../data/moduleRequirements.json');
require('dotenv').config({ path: '../../.env' })

// Init supabase client
const supabaseUrl = 'https://uzimejpydlbynjhxkinq.supabase.co';
var supabaseKey: string = "";
if (process.env.SUPABASE_KEY) {
     supabaseKey = process.env.SUPABASE_KEY
}
const supabase = createClient(supabaseUrl, supabaseKey)

function moduleManager() {
    const modules: ModuleRequirements[] = parseModules();
    const postResult = postModules(modules);
}

function parseModules(): ModuleRequirements[] {
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

    return modules;
}

async function postModules(modules: ModuleRequirements[]) {
    for (var i = 0; i < modules.length; i++) {
        const { data, error } = await supabase
        .from('modules')
        .insert([{ 
            moduleName: modules[i].moduleName, 
            lines: modules[i].lines, 
            },
        ]);
    }
}

moduleManager();