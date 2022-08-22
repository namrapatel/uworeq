import { gotScraping } from "got-scraping";
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

    for (var i = 0; i < 3; i++) {
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
            const courseNumberString = temp1.find(string => /^\d+/.test(string));
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
    console.log(subjects);
    console.log(1)
    console.log(subjects[2])
    console.log(2)
    console.log(subjects[2].courses[2])
}

console.log(getCourses())