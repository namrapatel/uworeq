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
    
    // Read course information from each course's URL
    // const courseInfo = await Promise.all(courses.map(async course => {
    //     const response = await gotScraping(course.url);
    //     const html = response.body;
    //     const $ = cheerio.load(html);
    //     const info = $('.container').children().eq(1).find('tbody').children().eq(0).find('td').eq(0).text().trim();
    //     console.log(info)
    // }));
    // console.log(courseInfo)

    // Get the URL for the More details button from each course in the subject URL
    // const response1 = await gotScraping(subjects[0].url);
    // const html1 = response1.body;
    // const $1 = cheerio.load(html1); 
    // const courseurls = $("div.col-md-12 div.panel-group div.panel div.panel-heading div.panel-collapse div.panel-body a").map((i, el) => $(el).attr("href")).get();
    // console.log(courseurls)

    const moreDetails = await Promise.all(subjects.map(async course => {
        const urls = []
        console.log(course.url)
        const response = await gotScraping(course.url);
        const html = response.body;
        const $ = cheerio.load(html);
        // console.log($('.container').children().length)

        var category = $('a').filter(function(i, el) {
            return $(this).text().trim() === 'More details';
          }).attr('href');
        console.log(category)
        // console.log($('.container').children().find('.btn btn-sm btn-info hidden-print').attr('href'))
        // .children().find('div').eq(0).children().length)
        // .children().find('div').eq(1)
        // .children().find('div').eq(1)
        // .children().find('div').eq(0)
        // .children().find('div').eq(0)
        // .children().length)

        // $('.container').children().each(function (index, element) {
        //     $(element).find('col-md-12').children().each(function (index, element1) {
        //         // Find More details button href
        //         const details = $(element1).find('a').attr('href');
        //         urls.push(details)
        //         // console.log(details);

        //     //     $(element1).find('a').children().each(function (index, element2) {
        //     //         console.log($(element2).text().trim())
        //     //         if ($(element2).text().trim() === "More details") {
        //     //             console.log($(element2).attr("href").trim())
        //     //         }
        //     //     }
        //     // )
        //     });
        // });

        return urls;
    }));

    // console.log(moreDetails)
    // console.log(courses);
}

console.log(getCourses())