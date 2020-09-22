import moxios from 'moxios';
import { deleteUser, updateUser } from '../users';
import { createUser, buildUserObject } from '../../test/utils';
import { User } from '../../interfaces/user';

let user: User;

beforeAll(async (done: Function) => {
  const email = `edit-user.${new Date().getTime()}@test.com`;
  const userObject: User = buildUserObject(email);
  user = await createUser(userObject);
  done();
});

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('/api/users/:id', {
    status: 200,
    response: user
  });
});

afterEach(() => {
  moxios.uninstall();
});

afterAll(async () => await deleteUser(user.id));

it('Updates the given user', async () => {
  console.log('Test 1');
  const editedName: string = `${user.lastname}_edited`;
  const editedLastName: string = `${user.lastname}_edited`;
  const editedEmail: string = `edited_${user.email}`;
  const editedCountry: string = `123456543212345678909876`;
  const editedTelephone: string = '546453567';
  const editedPostcode: string = '25673';
  console.log('Test updating user');
  const response = await updateUser(
    user.id,
    editedName,
    editedLastName,
    editedEmail,
    editedCountry,
    editedTelephone,
    editedPostcode
  );
  console.log('Test updating user asserting');
  expect(response).not.toBeNull();
  expect(response.data).not.toBeNull();
  expect(response.data.id).toEqual(user.id);
  expect(response.data.name).toEqual(editedName);
  expect(response.data.lastname).toEqual(editedLastName);
  expect(response.data.country).toEqual(editedCountry);
  expect(response.data.telephone).toEqual(editedTelephone);
  expect(response.data.email).toEqual(editedEmail);
  expect(response.data.postcode).toEqual(editedPostcode);
});
