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
    
    // Get subject name and subject category for each subject in the table
    $('.container').children().each(function (index, element) {
        $(element).find('tbody').children().each(function (index, element1) {
            // Add name and category to the subjects array
            subjects[index].name = $(element1).find('td').eq(0).text().trim();
            subjects[index].category = $(element1).find('td').eq(1).text().trim();
        }
        );
    })

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
                category: "",
                url: fullUrl,
                credits: 0,
                description: ""
            });
        });
    }
}

console.log(getCourses())