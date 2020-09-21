import puppeteer, { Browser, Page } from 'puppeteer';
import { removeTestUser, buildUserObject, createUser, getInputTextValue } from '../../../test/utils';
import { User } from '../../../interfaces/user';
let browser: Browser, page: Page, userEmail: string, user: User;



beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  userEmail = `edituser.${new Date().getTime()}@test.com`;
  user = buildUserObject(userEmail);
  user = await createUser(user);
  await page.goto(`http://localhost:3000/users/${user.id}`);
  await page.waitForSelector('#name-input');
});


it('Has voicemod edit user password title', async () => {
  const text = await page.$eval('#title', el => el.innerHTML);
  expect(text).toEqual('Voicemod edit user password');
});


it('Has a save user button', async () => {
  const length = await page.$$eval('button#edit-password-btn', el => el.length);
  expect(length).toEqual(1);
});

it.only('Edit button is disabled if require fields are not provided', async () => {
  const isDisabled = (await page.$$('button[disabled]#edit-password-btn')).length !== 0;
  expect(isDisabled).toBeTruthy();
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

it('Displays success message upon user password edited', async () => {
    await page.focus('#password-input');
    await page.keyboard.type('test password edited');
    await page.focus('#repeat password-input');
    await page.keyboard.type('test password edited');
    await page.click('#edit-password-btn');

    await page.waitForSelector('#edit-password-success');
    const text = await page.$eval('#edit-password-success', el => el.innerHTML);
    expect(text).toEqual('User password successfully edited');
});

it('Cleans up all password fields after successfully editing password', async () => {
  let value = await getInputTextValue(page, '#password-input');
  expect(value).toEqual('');
  value = await getInputTextValue(page, '#repeat-password-input');
  expect(value).toEqual('');
});

afterEach(async () => {
  page.close();
  browser.close();
  await removeTestUser(userEmail);
});
