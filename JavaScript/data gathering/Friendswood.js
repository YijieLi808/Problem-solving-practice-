const puppeteer = require('puppeteer');
const HTMLParser = require('node-html-parser');
const Utility = require('../scrape-utilities.js');



const scrape = async () => {

    const browser = await Utility.launchBrowser();
    let events = [];
    let errors = [];
    try{
        const page = await browser.newPage();
        await page.goto('https://friendswoodtx.civicclerk.com/web/home.aspx', { waitUntil: 'networkidle2' });
        // For the selector, use '.' for css class (e.g. '.content') or '#' for id (e.g. '#playerBtn12345')
        const tableHtml = await page.$eval('#aspxroundpanelCurrent_pnlDetails_grdEventsCurrent_DXMainTable', (element) => {
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
            //console.log(eventValues[1]?.text);
        

            const linkElement = eventValues[1]?.querySelector("a");

            if (linkElement) {
                const hrefVariable = linkElement.getAttribute("href");
                const hrefBreakdown = hrefVariable.substring(24).slice(0,-2);
                const [id,key,mod,mk,nov] = hrefBreakdown.split(",");
                //console.log(id,key);
                //console.log(hrefBreakdown);
                link = `https://friendswoodtx.civicclerk.com/Web/Player.aspx?id=${id}&key=${key}&mod=${mod}&mk=${mk}&nov=${nov}` 
            
            }
            
            title = eventValues[1]?.text.trim();
            
            if(title && title != "Loading…"){
                date = eventValues[2]?.text.trim();


                let event = {
                    Name: title,
                    Date: date,
                    AgendaUrl: link
            };

            events.push(event);
            }
            


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


// let result = scrape().then(r => {
//     console.log(r);
// });
