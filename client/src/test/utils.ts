import { fetchUsers, deleteUser } from '../actions/users';
import { User } from '../interfaces/user';

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
 * Removes test user from the database
 * @function
 * @param email
 */
export const removeTestUser = async (email: string) => {
  const response = await fetchUsers();
  if (response && response.status === 200) {
    const user: User = response.data.find((item: User) => item.email === email);
    if (user) {
      await deleteUser(user.id);
    }
  }
}
