import cheerio from "cheerio";
import { Subject, Course } from "../../src/types";
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

async function getModules(upload: boolean) {
    const url = "https://www.westerncalendar.uwo.ca/Modules.cfm?ModuleID=20952&SelectedCalendar=Live&ArchiveID=";
    const response = await gotScraping(url);
    const html = response.body;
    const $ = cheerio.load(html);

    $('.moduleInfo').children().each(function (index, element) {

        // Start block by finding the strong tag
        // Loop through each next element to find a tags, until another strong tag is found, then start new block

        var arrOfOrs = [];
        var arrOfAnds = [];
        var arrOfNormal = [];

        $(element).children().find('strong').each(function (index, element2) {
            console.log("Found strong tag");

            // Find <a> tags and check for AND or OR
            $(element2).next().each(function (index, element3) {
                if ($(element3).attr('href').includes("Courses.cfm") && !$(element3).next().text().includes("or") && !$(element3).next().text().includes("and")) {
                    console.log("Found a normal tag");
                    arrOfNormal.push($(element3).attr('href'));
                } else if ($(element3).attr('href').includes("Courses.cfm") && $(element3).next().text().includes("or")) {
                    console.log("Found an or tag");
                    arrOfOrs.push($(element3).attr('href'));
                } else if ($(element3).attr('href').includes("Courses.cfm") && $(element3).next().text().includes("and")) {
                    console.log("Found an and tag");
                    arrOfAnds.push($(element3).attr('href'));
                }
            });
        });
    });
}


async function getModulesFromTable() {
    const url = "https://www.westerncalendar.uwo.ca/Modules.cfm";
    const response = await gotScraping(url);
    const html = response.body;
    const $ = cheerio.load(html);

    var moduleUrls = [];

    $('a:contains("")').each(function (index, element) {
        if ($(element).attr('href').includes("Modules.cfm")) {
            var subUrl = $(element).attr('href')

            // Concatenate westerncalendar.uwo.ca/ to each URL
            var fullUrl = "https://westerncalendar.uwo.ca/" + subUrl;
            
            // add fullUrl to courses in subjects array
            moduleUrls.push(fullUrl);
        } 
    });

    return moduleUrls;
}

getModules(false)