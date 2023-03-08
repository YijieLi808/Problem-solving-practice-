const puppeteer = require('puppeteer');
const HTMLParser = require('node-html-parser');
const Utility = require('../scrape-utilities.js');
const scrapeUtilities = require('../scrape-utilities.js');



const scrape = async () => {

    const browser = await Utility.launchBrowser();
    let events = [];
    let errors = [];
    try{
        const page = await browser.newPage();
        await page.goto('https://www.forneytx.gov/AgendaCenter/City-Council-1', { waitUntil: 'networkidle2' });
        // For the selector, use '.' for css class (e.g. '.content') or '#' for id (e.g. '#playerBtn12345')
        const tableHtml = await page.$eval('#table1', (element) => {
            return element.innerHTML
        });
        let root = HTMLParser.parse(tableHtml);
        let rows = root.querySelectorAll('tr');

        let title;
        let date;
        let link;

        debugger;

        for (let i = 1; i < rows.length; i++) {
        // Scrape for title name, date, and agenda link here
            const row = rows[i];  
            const eventValues = row.querySelectorAll("td")
            

            const linkElement = eventValues[0].querySelectorAll("a");

            if (linkElement) {
                link = "https://www.forneytx.gov" + linkElement[1].getAttribute("href");
            }

            let meetingTime = await Utility.getTimeFromURL(link, browser);
            date = Utility.processNamedMonthDate(eventValues[0].text.split("\n")[4].trim());
            title = eventValues[0].text.split("\n")[9].trim();
            
            let event = {
                Name: title,
                Date: `${date} ${meetingTime}`,
                AgendaUrl: link
            };

            events.push(event);


        }
    } catch (err) {
        console.log(err);
    } finally {
        await browser.close();
    }

    return {
        Events: events,
        Errors: errors
    };

};

module.exports = scrape;


//  let result = scrape().then(r => {
//      console.log(r);
//  });
