import puppeteer, { Browser, Page } from 'puppeteer';
import { removeTestUser, buildUserObject, createUser } from '../../../test/utils';
const LOGIN_BUTTON = '#login'

let browser: Browser, page: Page, email: string;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto('http://localhost');
  email = `logintest.${new Date().getDate()}@test.com`;
  let user = buildUserObject(email);
  await createUser(user);
  await page.waitForSelector(LOGIN_BUTTON);
});



it('Has voicemod test title', async (done) => {
  const text = await page.$eval('#title', el => el.innerHTML);
  expect(text).toEqual('Voicemod coding challenge');
  done();
})

it('Has voice mod subtitle', async () => {
  const text = await page.$eval('#subtitle', el => el.innerHTML);
  expect(text).toEqual('Please enter your credentials to sign in.');
});

it('Has an input test for user email', async () => {
  const length = await page.$$eval('#email-input', el => el.length);
  expect(length).toEqual(1);
});

it('Has an input test for user password', async () => {
  const length = await page.$$eval('input[type=password]', el => el.length);
  expect(length).toEqual(1);
});

it('Has a create account link', async () => {
  const length = await page.$$eval('a#signup', el => el.length);
  expect(length).toEqual(1);
});

it('Create account link navigates to /signup', async () => {
  await page.click('#signup');
  const url = page.url();
  expect(url).toContain('/signup');
});

it('Has a login button', async () => {
  const length = await page.$$eval('button#login', el => el.length);
  expect(length).toEqual(1);
});

it('Login button is disabled if invalid email and password are provided', async () => {
  const isDisabled = (await page.$$('button[disabled]#login')).length !== 0;
  expect(isDisabled).toBeTruthy();
});

it('Login button is disabled if invalid email provided', async () => {
  await page.focus('#password-input');
  await page.keyboard.type('validpassword');

  const isDisabled = (await page.$$('button[disabled]#login')).length !== 0;
  expect(isDisabled).toBeTruthy();
});

it('Login button is disabled if invalid password provided', async () => {
  await page.focus('#email-input');
  await page.keyboard.type('test@test.com');
  const isDisabled = (await page.$$('button[disabled]#login')).length !== 0;
  expect(isDisabled).toBeTruthy();
});

it('Login button is enabled if email and password are valid', async () => {
  await page.focus('#email-input');
  await page.keyboard.type('test@test.com');
  await page.focus('#password-input');
  await page.keyboard.type('validpassword');
  const isEnabled = (await page.$$('button[disabled]#login')).length === 0;
  expect(isEnabled).toBeTruthy();
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

it('Error message for invalid credentials', async () => {
  await page.focus('#email-input');
  await page.keyboard.type('test@test.com');
  await page.focus('#password-input');
  await page.keyboard.type('1234');
  await page.click('#login');
  await page.waitForSelector('#signin-error');
});

it('User navigates to users page upon valid credentials provided', async () => {

  await page.focus('#email-input');
  await page.keyboard.type(email);
  await page.focus('#password-input');
  await page.keyboard.type('testpassword');
  await page.click('#login');
  await page.waitForSelector('#header');
  const url = page.url();
  expect(url).toContain('/users');
});

afterEach(async () => {
  page.close();
  browser.close();
  await removeTestUser(email);
});
