import { Subject, Course } from '../src/types';
import { createClient } from '@supabase/supabase-js';

require('dotenv').config({ path: '../.env' })

// Init supabase client
const supabaseUrl = 'https://uzimejpydlbynjhxkinq.supabase.co';
var supabaseKey: string = "";
if (process.env.SUPABASE_KEY) {
     supabaseKey = process.env.SUPABASE_KEY
}
const supabase = createClient(supabaseUrl, supabaseKey)

// INSERT A ROW
async function testInsert() {

    const course: Course = {
        name: 'Test Course',
        courseNumber: 123,
        courseLetter: 'A',
        breadthCategory: 'Breadth',
        url: 'https://westerncalendar.uwo.ca/Courses.cfm?SelectedCalendar=Live&ArchiveID=',
        courseWeight: 1,
        formalSubjectName: 'Test Subject'
    }

    const course2: Course = {
        name: 'Test Course 3',
        courseNumber: 1234,
        courseLetter: 'B',
        breadthCategory: 'Breadth3',
        url: 'https://westerncalendar.uwo.ca/Courses.cfm?SelectedCalendar=Live&ArchiveID=',
        courseWeight: 30,
        formalSubjectName: 'Test Subject3'
    }

    const { data, error } = await supabase
        .from('subjects')
        .insert([{ name: 'test3', breadthCategory: 'otherValue', url: 'someUrl', courses: [course, course2] },
    ])

    return error;

}

// READ A ROW
async function testRead() {
    let { data: subjects, error } = await supabase
        .from('subjects')
        .select('name,courses')
    if (subjects) {
        subjects.forEach(subject => {
            subject.courses.forEach(course => {
                console.log(course.name)
                console.log(course.breadthCategory)
                console.log(course.url)
                console.log(course.courseWeight)
                console.log(course.formalSubjectName)

        })});
    }
}

console.log(
    testInsert()
)