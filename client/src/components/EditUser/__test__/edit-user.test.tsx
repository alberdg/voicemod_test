import puppeteer, { Browser, Page } from 'puppeteer';
import { removeTestUser, buildUserObject, createUser, getInputTextValue, findUserByEmail } from '../../../test/utils';
import { fetchUserById } from '../../../actions/users';
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
  await page.goto(`http://localhost/users/${user.id}`);
  await page.waitForSelector('#name-input');
});


it.skip('Has voicemod edit user title', async () => {
  const text = await page.$eval('#title', el => el.innerHTML);
  expect(text).toEqual('Voicemod edit user');
})

it.skip('Displays an error if the user to be edited does not exit', async () => {

});

it.skip('Has an input field for user name with user first name', async () => {
  const length = await page.$$eval('#name-input', el => el.length);
  expect(length).toEqual(1);
  const value = await getInputTextValue(page, '#name-input');
  expect(value).toEqual('test name');
});

it.skip('Has an input field for last name with user last name', async () => {
  const length = await page.$$eval('#lastname-input', el => el.length);
  expect(length).toEqual(1);
  const value = await getInputTextValue(page, '#lastname-input');
  expect(value).toEqual('test lastname');
});

it.skip('Has an input field for user email', async () => {
  const length = await page.$$eval('#email-input', el => el.length);
  expect(length).toEqual(1);
  const value = await getInputTextValue(page, '#email-input');
  expect(value).toEqual(userEmail);
});

it.skip('Has an input field for user telephone', async () => {
  const length = await page.$$eval('#telephone-input', el => el.length);
  expect(length).toEqual(1);
  const value = await getInputTextValue(page, '#telephone-input');
  expect(value).toEqual('687787654');
});

it.skip('Has an input field for user postcode', async () => {
  const length = await page.$$eval('#postcode-input', el => el.length);
  expect(length).toEqual(1);
  const value = await getInputTextValue(page, '#postcode-input');
  expect(value).toEqual('46787');
});

it.skip('Has a edit user button', async () => {
  const length = await page.$$eval('button#edit', el => el.length);
  expect(length).toEqual(1);
});

it.skip('Error message displayed if account exists', async () => {

  const secondUserEmail: string = `edituser.${new Date().getTime()}@test.com`;
  try {
    let secondUser: User = buildUserObject(secondUserEmail);
    secondUser = await createUser(secondUser);

    await page.focus("#email-input")
    await page.$eval("#email-input", (el: any) => el.setSelectionRange(0, el.value.length))
    await page.keyboard.type(secondUserEmail);
    await page.click('#edit');

    await page.waitForSelector('#edit-error');
    const text = await page.$eval('span#edit-error', el => el.innerHTML);
    expect(text).toEqual('User already exists');
  } catch (err) {
    console.error(err);
  } finally {
    await removeTestUser(secondUserEmail);
  }
});

it.skip('Edit button is disabled if require fields are not provided', async () => {
  await page.focus("#name-input")
  await page.$eval("#name-input", (el: any) => el.setSelectionRange(0, el.value.length))
  await page.keyboard.press('Backspace')
  const isDisabled = (await page.$$('button[disabled]#edit')).length !== 0;
  expect(isDisabled).toBeTruthy();
});


it.skip('Error message is provided if invalid email address format is provided', async () => {
  await page.focus('#email-input');
  await page.keyboard.type('test@test.');
  const text = await page.$eval('span#email-error', el => el.innerHTML);
  expect(text).toEqual('Invalid email address format');
});

it.skip('Error message is provided if password length is below 4 characters', async () => {
  await page.focus('#password-input');
  await page.keyboard.type('val');
  const text = await page.$eval('span#password-error', el => el.innerHTML);
  expect(text).toEqual('Password must have between 4 and 20 characters');
});

it.skip('Error message is provided if password length is above 20 characters', async () => {
  await page.focus('#password-input');
  await page.keyboard.type('12345678901234567890123');
  const text = await page.$eval('span#password-error', el => el.innerHTML);
  expect(text).toEqual('Password must have between 4 and 20 characters');
});

it.skip('Error message if email exists', async () => {
  // User does not exist add it for the very first time
  const email: string = `edituser.${new Date().getTime()}@test.com`;
  try {
    let secondUser: User = buildUserObject(email);
    secondUser = await createUser(secondUser);

    await page.focus("#email-input")
    await page.$eval("#email-input", (el: any) => el.setSelectionRange(0, el.value.length))
    await page.keyboard.type(email);


    await page.waitForSelector('span#edit-error');
    const text = await page.$eval('span#edit-error', el => el.innerHTML);
    expect(text).toEqual('User already exists');
  } catch (err) {
    console.error(err);
  } finally {
    await removeTestUser(email);
  }
});

it.skip('Displays countries select element', async () => {
  const length = await page.$$eval('#countries-select', el => el.length);
  expect(length).toEqual(1);
})

it.skip('Has 194 countries on the list', async () => {
  await page.waitForSelector('.country');
  const length = await page.$$eval('.country', el => el.length);
  expect(length).toEqual(194);
});

it.skip('Displays success message upon user edited', async () => {
    await page.focus('#name-input');
    await page.keyboard.type('test name edited');
    await page.click('#edit');

    await page.waitForSelector('#edit-success');
    const text = await page.$eval('#edit-success', el => el.innerHTML);
    expect(text).toEqual('User successfully edited');
});

it.skip('Does not clean up all fields after successfully adding a new user', async () => {
  let value = await getInputTextValue(page, '#name-input');
  expect(value).toEqual(user.name);
  value = await getInputTextValue(page, '#lastname-input');
  expect(value).toEqual(user.lastname);
  value = await getInputTextValue(page, '#email-input');
  expect(value).toEqual(user.email);
  value = await getInputTextValue(page, '#telephone-input');
  expect(value).toEqual(user.telephone);
  value = await getInputTextValue(page, '#postcode-input');
  expect(value).toEqual(user.postcode);
});

afterEach(async () => {
  page.close();
  browser.close();
  await removeTestUser(userEmail);
});
