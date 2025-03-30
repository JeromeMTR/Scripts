import puppeteer from 'puppeteer';

async function trackFollowers(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('span[class="followers-count-class"]'); 
        await page.click('span[class="followers-count-class"]'); 
        await page.waitForSelector('div[class="followers-list-class"]'); 
        const followers = await page.evaluate(() => {
            const elements = document.querySelectorAll('div[class="follower-item-class"]'); 
            return Array.from(elements).map(el => el.textContent.trim());
        });

        console.log('Followers:', followers);
    } catch (error) {
        console.error('Error scraping followers:', error);
    } finally {
        await browser.close();
    }
}
// Example usage
trackFollowers('https://www.threads.net/@');
