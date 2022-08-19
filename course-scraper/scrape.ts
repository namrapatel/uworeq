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
    const subjectUrls = $("div.col-lg-12 tr td a").map((i, el) => $(el).attr("href")).get();
    
    // Concatenate westerncalendar.uwo.ca/ to each URL
    const fullUrls = subjectUrls.map(url => "https://westerncalendar.uwo.ca/" + url);

    // Get the name of each subject
    const subjectNames = $("div.col-lg-12 tr td a").map((i, el) => $(el).text()).get();
    console.log(subjectNames);
    
    // console.log(fullUrls);

    $('.container').children().each(function (index, element) {
        $(element).find('tbody').children().each(function (index, element1) {
            $(element1).find('td').each(function (index, element2) {
                // console.log($(element2).text())
            })
        }
        );
    })

    // Map fullUrls to course name and category
    

    // Get all courses info for each subject
}


console.log(await getCourses());