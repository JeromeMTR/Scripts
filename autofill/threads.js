import puppeteer from 'puppeteer';

async function loginToThreads(page, username, password) {
    try {
        await page.goto('https://www.threads.net/login', { waitUntil: 'networkidle2' });
        await page.waitForSelector('input[autocomplete="username"]');
        await page.waitForSelector('input[autocomplete="current-password"]');
        await page.type('input[autocomplete="username"]', username, { delay: 100 });
        await page.type('input[autocomplete="current-password"]', password, { delay: 100 });
        await page.click('text=Log in');

        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('Logged in successfully!');
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

async function scrapeFollowers(url) {
    const browser = await puppeteer.launch({ headless: true, userDataDir: './user-data' });
    const page = await browser.newPage();

    try {
        // Log in to Threads
        await page.setDefaultNavigationTimeout(0)
        // Navigate to the Threads profile page
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.screenshot({ path: 'ss.png', fullPage: true });

        // Wait for the followers count element to load
        await page.waitForSelector('text=followers'); // Replace with the actual class

        // Click on the followers count
        await page.click('text=followers'); // Replace with the actual class
        await page.screenshot({ path: 'ss.png', fullPage: true });
        // Wait for the followers list to load
        await page.waitForSelector('text=Following', { visible: true, timeout: 60000 });

        // Extract the followers' data
        const followers = await page.evaluate(() => {

            const elements = document.querySelectorAll('span[class="x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft"]'); // Replace with the actual class
            return Array.from(elements).map(el => el.textContent.trim());
        });

        console.log('Followers:', followers);
    } catch (error) {
        console.error('Error scraping followers:', error);

        await page.screenshot({ path: 'ss2.png', fullPage: true });


    } finally {
        await browser.close();
    }
}

// Example usage
scrapeFollowers('https://www.threads.net/@');
