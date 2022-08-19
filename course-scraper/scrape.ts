import { gotScraping, Response } from "got-scraping";
import cheerio from "cheerio";

interface Course {
    name: string;
    category: string;
    url: string;
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

    // Create an array of Courses and store the the fullUrls in the url property
    const courses: Course[] = fullUrls.map(url => ({
        name: "",
        category: "",
        url: url
    }));
    

    $('.container').children().each(function (index, element) {
        $(element).find('tbody').children().each(function (index, element1) {
            // Add name and category to the course array
            courses[index].name = $(element1).find('td').eq(0).text().trim();
            courses[index].category = $(element1).find('td').eq(1).text().trim();
        }
        );
    })
    
    // Get all courses info for each subject
    console.log(courses);
}

console.log(getCourses())