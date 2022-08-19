import { gotScraping } from "got-scraping";
import cheerio from "cheerio";

async function getCourses() {
    const response = await gotScraping("https://westerncalendar.uwo.ca/Courses.cfm?SelectedCalendar=Live&ArchiveID=");
    const html = response.body;
    const $ = cheerio.load(html);

    $('.container').children().each(function (index, element) {
        $(element).find('tbody').children().each(function (index, element1) {
            $(element1).find('td').each(function (index, element2) {
                console.log($(element2).text())

            })
        }
        );
    })
}


console.log(await getCourses());