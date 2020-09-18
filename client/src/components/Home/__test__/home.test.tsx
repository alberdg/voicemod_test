import puppeteer, { Browser, Page } from 'puppeteer';
const HEADER = '#header'

let browser: Browser, page: Page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();

  /**
   * FIXME: Bear in mind we will have to perform login first
   * once authorization is needed for navigation
   */
  await page.goto('localhost:3000/home');
  await page.waitForSelector(HEADER);
});


it('Displays a title', async () => {
  const text = await page.$eval('#title', el => el.innerHTML);
  expect(text).toEqual('Voicemode users administration panel');
})

it('Displays a header', async () => {
  const length = await page.$$eval(HEADER, el => el.length);
  expect(length).toEqual(1);
});

it('Users table', async () => {
  const length = await page.$$eval('#users-table', el => el.length);
  expect(length).toEqual(1);
});

afterEach(() => {
  page.close();
  browser.close();
});
