const puppeteer = require('puppeteer');
const HTMLParser = require('node-html-parser');
const Utility = require('../scrape-utilities.js');



const scrape = async () => {

    const browser = await Utility.launchBrowser();
    let events = [];
    let errors = [];
        
    try{
        const page = await browser.newPage();
        await page.goto('https://dayton.novusagenda.com/agendapublic/meetingsresponsive.aspx', { waitUntil: 'networkidle2' });
        // For the selector, use '.' for css class (e.g. '.content') or '#' for id (e.g. '#playerBtn12345')
        const tableHtml = await page.$eval('#meetings table tbody', (element) => {
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
            if(eventValues[1]){
                //console.log(eventValues[1]?.text);
                const linkElement = row.querySelector("a");
                
                
                if (linkElement) {
                    //console.log(linkElement.getAttribute("onclick"));
                    const partialLink = linkElement.getAttribute("onclick").split(',')[0].split("'")[1];
                    //console.log(partialLink);
                    
                    link = "https://dayton.novusagenda.com/agendapublic/" + partialLink;
                }
                
                let meetingTime = await Utility.getTimeFromURL(link,browser);
                date = eventValues[1].text;
                title = eventValues[2].text.split('\n')[3].trim()
               

                let event = {
                    Name: title,
                    Date: `${date} ${meetingTime}`,
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


//  let result = scrape().then(r => {
//      console.log(r);
//  });
