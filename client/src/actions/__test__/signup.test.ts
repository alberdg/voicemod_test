import moxios from 'moxios';
import { signup } from '../signup';
import { removeTestUser } from '../../test/utils';
let email: string;


beforeEach(() => {
  email = `signuptest.${new Date().getTime()}@test.com`;
  moxios.install();
  moxios.stubRequest('/api/users/signup', {
    status: 201,
    response: {
      id: '123456789012123456765431',
      name: 'Jonh',
      lastname: 'Doe',
      country: '123456788765431234567123',
      telephone: '+34678787654',
      email: email,
      postcode: '46019'
    }
  });
});

afterEach(async () => {
  moxios.uninstall();
  await removeTestUser(email);
});

it('Signs user up with with valid details', async () => {

  const userSignedUp = await signup('Jonh',
    'Doe',
    email,
    '1234',
    '678574731',
    '123456788765431234567123',
    '46019');
  expect(userSignedUp).not.toBeNull();
  expect(userSignedUp).not.toBeNull();
  expect(userSignedUp.data).not.toBeNull();
  expect(userSignedUp.data.id).toEqual('123456789012123456765431');
  expect(userSignedUp.data.name).toEqual('Jonh');
  expect(userSignedUp.data.lastname).toEqual('Doe');
  expect(userSignedUp.data.country).toEqual('123456788765431234567123');
  expect(userSignedUp.data.telephone).toEqual('+34678787654');
  expect(userSignedUp.data.email).toEqual(email);
  expect(userSignedUp.data.postcode).toEqual('46019');
});
