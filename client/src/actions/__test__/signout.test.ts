import moxios from 'moxios';
import { signup } from '../signup';
import { signout } from '../signout';
import { removeTestUser } from '../../test/utils';
import { SIGNED_IN_USER } from '../../constants';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('/api/users/signup', {
    status: 201,
    response: {
      id: '123456789012123456765431',
      name: 'Jonh',
      lastname: 'Doe',
      country: '123456788765431234567123',
      telephone: '+34678787654',
      email: 'jonh.doe@test.com',
      postcode: '46019'
    }
  });
});

afterEach(() => {
  moxios.uninstall();
});

it.only('Signs user up with with valid details', async () => {
  const email = `signuptest.${new Date().getTime()}@test.com`;
  await signup('Jonh',
    'Doe',
    email,
    '1234',
    '678574731',
    '123456788765431234567123',
    '46019');
  expect(localStorage.getItem(SIGNED_IN_USER)).not.toBeNull();
  await signout();
  expect(localStorage.getItem(SIGNED_IN_USER)).toBeNull();
  await removeTestUser(email);
});
