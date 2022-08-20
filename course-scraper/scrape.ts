import { gotScraping, Response } from "got-scraping";
import cheerio from "cheerio";

interface Course {
    name: string;
    courseNumber: number;
    courseLetter: string[] | string;
    breadthCategory: string;
    url: string;
    courseWeight: number;
    formalSubjectName: string;

}

interface Subject {
    name: string;
    category: string;
    url: string;
    courses: Course[];
}

async function getResponse() {
    const response = await gotScraping("https://westerncalendar.uwo.ca/Courses.cfm?SelectedCalendar=Live&ArchiveID=");
    return response;
}

async function getCourses() {
    const response = await getResponse();
    const html = response.body;
    const $ = cheerio.load(html);

    // Get URLs for each subject in the table
    const subUrls = $("div.col-lg-12 tr td a").map((i, el) => $(el).attr("href")).get();
    
    // Concatenate westerncalendar.uwo.ca/ to each URL
    const fullUrls = subUrls.map(url => "https://westerncalendar.uwo.ca/" + url);

    // Create an array of Subjects and store the the fullUrls in the url property
    const subjects: Subject[] = fullUrls.map(url => ({
        name: "",
        category: "",
        url: url,
        courses: []
    }));
    
    // Get subject name and subject category for each subject in the table
    $('.container').children().each(function (index, element) {
        $(element).find('tbody').children().each(function (index, element1) {
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

        $1('a:contains("More details")').each(function (index, element) {
            var subUrl = $(element).attr('href')
            
            // Concatenate westerncalendar.uwo.ca/ to each URL
            var fullUrl = "https://westerncalendar.uwo.ca/" + subUrl;
            
            // add fullUrl to courses in subjects array
            subjects[i].courses[index] = ({
                name: "",
                courseNumber: null,
                courseLetter: "",
                breadthCategory: "",
                url: fullUrl,
                courseWeight: 0,
                formalSubjectName: ""
            });
        });
    }

    // Get course name, course category, course credits, and course description for each course in the course array

    // for (var i = 0; i < subjects.length; i++) {
    //     for (var j = 0; j < subjects[i].courses.length; j++) {
            const response2 = await gotScraping("https://westerncalendar.uwo.ca/Courses.cfm?CourseAcadCalendarID=MAIN_022436_1&SelectedCalendar=Live&ArchiveID=");
            const html2 = response2.body;
            const $2 = cheerio.load(html2);
            
            // Find div with id CourseInformationDiv and get its last child's text
            const courseWeight = $2('div#CourseInformationDiv').children().last().text();
            
            // Match text "Course Weight:" and get the number after the colon
            const courseWeightMatch = courseWeight.match(/Course Weight: (\d+\.\d+)/);
            // console.log(courseWeightMatch[0]);
            if (courseWeightMatch) {
                console.log(courseWeightMatch[1]);
                subjects[0].courses[0].courseWeight = parseInt(courseWeightMatch[1]);
            }
            
            // Match text "Breadth:" and get the text after the colon
            const breadthMatch = courseWeight.match(/Breadth: (.*)/);
            if (breadthMatch) {
                console.log("breadth1: "+breadthMatch[1]);
                console.log("breadth0: "+breadthMatch[0])
                subjects[0].courses[0].breadthCategory = breadthMatch[1];
            }

            // Match text "Subject Code:" and get the text after the colon
            const subjectCodeMatch = courseWeight.match(/Subject Code: (\w+)/);
            if (subjectCodeMatch) {
                subjects[0].courses[0].formalSubjectName = subjectCodeMatch[1];
            }

            // Find div with id CourseInformationDiv and get the h3's text from within its first child
            subjects[0].courses[0].name = $2('div#CourseInformationDiv > div.col-md-12 > h3').text();

            const preCourseNumber = $2('div#CourseInformationDiv > div.col-md-12 > h2').text();
            // Split the preCourseNumber string into an array of strings
            const temp1 = preCourseNumber.split(" ");
            // Get the string that starts with a number from courseNumber array
            const courseNumberString = temp1.find(string => /^\d+/.test(string));
            // Get the first four chars of the courseNumberString
            subjects[0].courses[0].courseNumber = parseInt(courseNumberString.substring(0, 4));
            // Get everything except the first four chars of the courseNumberString
            const courseLetter = courseNumberString.substring(4);
            // Match all letters in courseLeter and put each in an array
            const letters = courseLetter.match(/[a-zA-Z]+/g);
            if (letters) {
                subjects[0].courses[0].courseLetter = letters;
            }
    //     }
    // }
    console.log(subjects[0].courses[0].name);
    console.log(subjects[0].courses[0].courseLetter);
    console.log(subjects[0].courses[0].courseNumber);
    console.log(subjects[0].courses[0].courseWeight);
    console.log(subjects[0].courses[0].breadthCategory);
}

console.log(getCourses())