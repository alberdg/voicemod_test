import puppeteer, { Browser, Page } from 'puppeteer';
import { addUser, removeTestUser } from '../../../test/utils';
let browser: Browser, page: Page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto('localhost:3000/signup');
  await page.waitForSelector('#name-input');
});


it('Has voicemod signup title', async (done) => {
  const text = await page.$eval('#title', el => el.innerHTML);
  expect(text).toEqual('Voicemod create a new account');
  done();
})

it('Has voicemod signup subtitle', async () => {
  const text = await page.$eval('#subtitle', el => el.innerHTML);
  expect(text).toEqual('Please fill in all the fields.');
});

it('Has an input field for user name', async () => {
  const length = await page.$$eval('#name-input', el => el.length);
  expect(length).toEqual(1);
});

it('Has an input field for last name', async () => {
  const length = await page.$$eval('#lastname-input', el => el.length);
  expect(length).toEqual(1);
});

it('Has an input field for user email', async () => {
  const length = await page.$$eval('#email-input', el => el.length);
  expect(length).toEqual(1);
});

it('Has an input field for user telephone', async () => {
  const length = await page.$$eval('#telephone-input', el => el.length);
  expect(length).toEqual(1);
});

it('Has an input field for user postcode', async () => {
  const length = await page.$$eval('#postcode-input', el => el.length);
  expect(length).toEqual(1);
});

it('Has a create account button', async () => {
  const length = await page.$$eval('button#signup', el => el.length);
  expect(length).toEqual(1);
});

it('Has a back button', async () => {
  const length = await page.$$eval('button#back', el => el.length);
  expect(length).toEqual(1);
});

it('Error message displayed if account exists', async () => {
  await page.focus('#name-input');
  await page.keyboard.type('test');
  await page.focus('#lastname-input');
  await page.keyboard.type('test');
  await page.focus('#email-input');
  await page.keyboard.type('test@test.com');
  await page.focus('#password-input');
  await page.keyboard.type('test');
  await page.focus('#repeat-password-input');
  await page.keyboard.type('test');
  await page.select("select#countries-select", "Albania")
  await page.focus('#telephone-input');
  await page.keyboard.type('test');
  await page.focus('#postcode-input');
  await page.keyboard.type('test');
  await page.click('#signup');

  await page.waitForSelector('#signup-error');
  const text = await page.$eval('span#signup-error', el => el.innerHTML);
  expect(text).toEqual('User already exists');
});

it('Create button is disabled if require fields are not provided', async () => {
  const isDisabled = (await page.$$('button[disabled]#signup')).length !== 0;
  expect(isDisabled).toBeTruthy();
});


it('Error message is provided if invalid email address format is provided', async () => {
  await page.focus('#email-input');
  await page.keyboard.type('test@test.');
  const text = await page.$eval('span#email-error', el => el.innerHTML);
  expect(text).toEqual('Invalid email address format');
});

it('Error message is provided if password length is below 4 characters', async () => {
  await page.focus('#password-input');
  await page.keyboard.type('val');
  const text = await page.$eval('span#password-error', el => el.innerHTML);
  expect(text).toEqual('Password must have between 4 and 20 characters');
});

it('Error message is provided if password length is above 20 characters', async () => {
  await page.focus('#password-input');
  await page.keyboard.type('12345678901234567890123');
  const text = await page.$eval('span#password-error', el => el.innerHTML);
  expect(text).toEqual('Password must have between 4 and 20 characters');
});

it('Error message if email exists', async () => {
  const email: string = `adduser.${new Date().getTime()}@test.com`;
  try {
    await addUser(page, email);
    await page.focus('#name-input');
    await page.keyboard.type('test');
    await page.focus('#lastname-input');
    await page.keyboard.type('test');
    await page.focus('#email-input');
    await page.keyboard.type(email);
    await page.focus('#password-input');
    await page.keyboard.type('test');
    await page.focus('#repeat-password-input');
    await page.keyboard.type('test');
    await page.select("select#countries-select", "Albania")
    await page.focus('#telephone-input');
    await page.keyboard.type('678789098');
    await page.focus('#postcode-input');
    await page.keyboard.type('46762');
    await page.click('#signup');
    const text = await page.$eval('span#email-error', el => el.innerHTML);
    expect(text).toEqual('User already exists');
  } catch (err) {
    console.error(err);
  } finally {
    await removeTestUser(email);
  }

});

it('Displays countries select element', async () => {
  const length = await page.$$eval('#countries-select', el => el.length);
  expect(length).toEqual(1);
})

it('Has 194 countries on the list', async () => {
  await page.waitForSelector('.country');
  const length = await page.$$eval('.country', el => el.length);
  expect(length).toEqual(194);
});

afterEach(() => {
  page.close();
  browser.close();
});
