const puppeteer = require('puppeteer');
const HTMLParser = require('node-html-parser');
const Utility = require('../scrape-utilities.js');

// Database updated

 const scrape = async () => {

    debugger;

    const browser = await Utility.launchBrowser();

    let events = [];
    let errors = [];


    try {

        const page = await browser.newPage();
        await page.goto('https://abilenetx.civicclerk.com/web/home.aspx', { waitUntil: 'networkidle2' });

        const tableHtml = await page.$eval('#aspxroundpanelCurrent_pnlDetails_grdEventsCurrent_DXMainTable', (element) => {
            return element.innerHTML
        });

        let root = HTMLParser.parse(tableHtml);
        let rows = root.querySelectorAll('.dxgvDataRow_CustomThemeModerno');
        let title;
        let meetingTime;
        let date;
        let link;

        debugger;

        for (let i = 0; i < rows.length; i++) {
			
            const row = rows[i].querySelectorAll('td');
			
			title = row[0].querySelector('a').text;
			
			date = row[1].text.trim();
			
			link = eval(row[0].querySelector('a').getAttribute('href').replace('javascript:',''));
			
            let event = {
                Name: title,
                Date: date,
                AgendaUrl: link
            };

            events.push(event);


        }
    } catch (err) {
		console.log(err)
    } finally {
        await browser.close();
    }

    return {
        Events: events,
        Errors: errors
    };

};

function LaunchPlayer(id, key, mod, mk, nov) {
	
	var src = 'https://abilenetx.civicclerk.com/web/Player.aspx?id=' + id + '&key=' + key + '&mod=' + mod + '&mk=' + mk + '&nov=' + nov;
	
	return src;

}

module.exports = scrape;

// let result = scrape().then(r => {

//     console.log(r);
// });
