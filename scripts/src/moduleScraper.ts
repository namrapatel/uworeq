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

// courseScraper v1, first & last scrape of the site was at 12:11AM on Monday August 22, 2022
async function getModules(upload: boolean) {
    const url = "https://www.westerncalendar.uwo.ca/Modules.cfm?ModuleID=21006&SelectedCalendar=Live&ArchiveID=";
    const response = await gotScraping(url);
    const html = response.body;
    const $ = cheerio.load(html);

    $('.moduleInfo').children().last().each(function (index, element) {
        // Find strong tags and get the text
        $(element).find('strong').each(function (index, element1) {

            var fromCheck = false;
            var orCheck = false;


            var text = $(element1).text();
            // Get float from text
            var float = parseFloat(text);
            // Convert float (0.5, 1.0, 1.5, etc) to integer (1, 2, 3, etc)
            var creditsRequired = float / 0.5;
            // Check if text contains "from" or "or"
            if (text.includes("from")) {
                fromCheck = true;
            } else if (text.includes("or")) {
                orCheck = true;
            }
        });
    });
}

getModules(false)