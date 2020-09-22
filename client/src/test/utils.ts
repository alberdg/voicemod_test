import { Page } from 'puppeteer';
import { fetchUsers, deleteUser } from '../actions/users';
import { signup } from '../actions/signup';
import { User } from '../interfaces/user';


/**
 * Creates a user using the api
 * @function
 * @param user User object
 * @returns user User created
 */
export const createUser = async (user: User) : Promise<User> => {
  const response = await signup(user.name, user.lastname, user.email,
    user.password!, user.telephone, user.country.id, user.postcode);
  return (response && response.status === 201) ? response.data : null;
}

/**
 * Adds a new user
 * @function
 * @returns email Email of the user added
 */
export const addUser = async (page: any, email: string) : Promise<void> => {
  await page.focus('#name-input');
  await page.keyboard.type('Jonh');
  await page.focus('#lastname-input');
  await page.keyboard.type('Doe');
  await page.focus('#email-input');
  await page.keyboard.type(email);
  await page.focus('#password-input');
  await page.keyboard.type('Jonh');
  await page.focus('#repeat-password-input');
  await page.keyboard.type('Jonh');
  await page.focus('#telephone-input');
  await page.keyboard.type('678789082');
  await page.focus('#postcode-input');
  await page.keyboard.type('46578');
  await page.select("select#countries-select", "Albania")
  await page.click('#signup');
}

/**
 * Builds a user object
 * @function
 * @param email User email
 * @returns user User object
 */
export const buildUserObject = (email: string) : User => {
  return {
    id: '',
    name: 'test name',
    lastname: 'test lastname',
    email,
    password: 'testpassword',
    country: { id: '123456789012345678901234', name: 'Test' },
    telephone: '687787654',
    postcode: '46787'
  };
}

/**
 * Removes test user from the database
 * @function
 * @param email
 */
export const removeTestUser = async (email: string) => {
  const user = await findUserByEmail(email);
  if (user) {
    await deleteUser(user.id);
  }
}

/**
 * Finds a user by email
 * @function
 * @param email User email to find
 * @returns user User found
 */
export const findUserByEmail = async (email: string): Promise<User> => {
  const response = await fetchUsers(1, 999999);
  if (response && response.status === 200) {
    const user: User = response.data.find((item: User) => item.email === email);
    return user;
  }
  return null as any;
}

/**
 * Reads given input text value
 * @function
 * @param page Puppeteer page
 * @param id Input text id
 * @returns value Value read
 */
export const getInputTextValue = async (page: Page, id: string) : Promise<string> => {
  const text = await page.$eval(id, (el: any) => el.value);
  return text;
}
