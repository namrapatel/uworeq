import { gotScraping, Response } from "got-scraping";
import cheerio from "cheerio";

interface Course {
    name: string;
    category: string;
    url: string;
    credits: number;
    description: string;
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
    

    $('.container').children().each(function (index, element) {
        $(element).find('tbody').children().each(function (index, element1) {
            // Add name and category to the subjects array
            subjects[index].name = $(element1).find('td').eq(0).text().trim();
            subjects[index].category = $(element1).find('td').eq(1).text().trim();
        }
        );
    })
    
    const moreDetails = await Promise.all(subjects.map(async course => {
        const response = await gotScraping('https://westerncalendar.uwo.ca/Courses.cfm?Subject=ACTURSCI&SelectedCalendar=Live&ArchiveID=');
        const html = response.body;
        const $ = cheerio.load(html);

        $('a:contains("More details")').each(function (index, element) {
            var subUrl = $(element).attr('href')
            // Concatenate westerncalendar.uwo.ca/ to each URL
            var fullUrl = "https://westerncalendar.uwo.ca/" + subUrl;
            // add fullUrl to courses in subjects array
            subjects[index].courses.push({
                name: "",
                category: "",
                url: fullUrl,
                credits: 0,
                description: ""
            }); 
        });
    }));
    console.log(subjects[0].courses[0].url);
}

console.log(getCourses())