import cheerio from "cheerio";
import { Subject, Course } from "./types";
import { gotScraping } from "got-scraping";
import { createClient } from '@supabase/supabase-js';

require('dotenv').config({ path: '../../.env' })

// Init supabase client
const supabaseUrl = 'https://uzimejpydlbynjhxkinq.supabase.co';
var supabaseKey: string = "";
if (process.env.SUPABASE_KEY) {
     supabaseKey = process.env.SUPABASE_KEY
}
const supabase = createClient(supabaseUrl, supabaseKey)

// courseScraper v1, first & last scrape of the site was at 12:11AM on Monday August 22, 2022
export const courses = async function getCourses(upload: boolean) {
    const response = await gotScraping("https://westerncalendar.uwo.ca/Courses.cfm?SelectedCalendar=Live&ArchiveID=");
    const html = response.body;
    const $ = cheerio.load(html);

    // Get URLs for each subject in the table
    const subUrls = $("div.col-lg-12 tr td a").map((el: any) => $(el).attr("href")).get();
    
    // Concatenate westerncalendar.uwo.ca/ to each URL
    const fullUrls = subUrls.map((url: string) => "https://westerncalendar.uwo.ca/" + url);

    // Create an array of Subjects and store the the fullUrls in the url property
    const subjects: Subject[] = fullUrls.map((url: string) => ({
        name: "",
        category: "",
        url: url,
        courses: []
    }));
    
    // Get subject name and subject category for each subject in the table
    $('.container').children().each(function (element: any) {
        $(element).find('tbody').children().each(function (index: any, element1: any) {
            // Add name and category to the subjects array
            subjects[index].name = $(element1).find('td').eq(0).text().trim();
            subjects[index].category = $(element1).find('td').eq(1).text().trim();
        }
        );
    })

    // Get the course list for each subject in the table
    for (var i = 0; i < subjects.length; i++) {
        const response1 = await gotScraping(subjects[i].url);
        const html1 = response1.body;
        const $1 = cheerio.load(html1);

        $1('a:contains("More details")').each(function (index: any, element: any) {
            var subUrl = $(element).attr('href')
            
            // Concatenate westerncalendar.uwo.ca/ to each URL
            var fullUrl = "https://westerncalendar.uwo.ca/" + subUrl;
            
            // add fullUrl to courses in subjects array
            subjects[i].courses[index] = ({
                name: "",
                courseNumber: 0,
                courseLetter: "",
                breadthCategory: "",
                url: fullUrl,
                courseWeight: 0,
                formalSubjectName: ""
            });
        });
    }

    // Get course name, course category, course credits, and course description for each course in the course array
    // TODO: my god clean this script this is disgusting with all the undefined checks 
    var today = new Date();
    for (var i = 0; i < subjects.length; i++) {
        console.log("Started scraping: " + subjects[i].name + " at " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
        for (var j = 0; j < subjects[i].courses.length; j++) {
            const response2 = await gotScraping(subjects[i].courses[j].url);
            const html2 = response2.body;
            const $2 = cheerio.load(html2);
            
            // Find div with id CourseInformationDiv and get its last child's text
            const courseInfo = $2('div#CourseInformationDiv').children().last().text();
 
            // Match text "Course Weight:" and get the number after the colon
            const courseWeightMatch = courseInfo.match(/Course Weight: (\d+\.\d+)/);
            if (courseWeightMatch) {
                subjects[i].courses[j].courseWeight = parseFloat(courseWeightMatch[1]);
            }
            
            // Match text "CATEGORY" and get letter after the whitespace
            const categoryLetterMatch = courseInfo.match(/CATEGORY (\w)/);
            if (categoryLetterMatch) {
                subjects[i].courses[j].breadthCategory = categoryLetterMatch[0];
            }    

            // Match text "Subject Code:" and get the text after the colon
            const subjectCodeMatch = courseInfo.match(/Subject Code: (\w+)/);
            if (subjectCodeMatch) {
                subjects[i].courses[j].formalSubjectName = subjectCodeMatch[1];
            }

            // Find div with id CourseInformationDiv and get the h3's text from within its first child
            subjects[i].courses[j].name = $2('div#CourseInformationDiv > div.col-md-12 > h3').text();

            const preCourseNumber = $2('div#CourseInformationDiv > div.col-md-12 > h2').text();
            // Split the preCourseNumber string into an array of strings
            const temp1 = preCourseNumber.split(" ");
            // Get the string that starts with a number from courseNumber array
            const courseNumberString = temp1.find((string: string) => /^\d+/.test(string));
            if (courseNumberString) {
                // Get the first four chars of the courseNumberString
                subjects[i].courses[j].courseNumber = parseInt(courseNumberString.substring(0, 4));
                // Get everything except the first four chars of the courseNumberString
                const courseLetter = courseNumberString.substring(4);
                // Match all letters in courseLeter and put each in an array
                const letters = courseLetter.match(/[a-zA-Z]+/g);
                if (letters) {
                    subjects[i].courses[j].courseLetter = letters;
                }
            }
        }
        console.log("Finished scraping: " + subjects[i].name + " at " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
    }

    console.log("Finished scraping: "+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());

    if (upload) {
        // POST subjects to supabase
        for (var i = 0; i < subjects.length; i++) {
            const { data, error } = await supabase
            .from('subjects')
            .insert([{ 
                name: subjects[i].name, 
                breadthCategory: subjects[i].category, 
                url: subjects[i].url,
                courses: subjects[i].courses },
            ]);
        }
    }
}

console.log(courses(false))