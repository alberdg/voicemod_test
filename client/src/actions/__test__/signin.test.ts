import moxios from 'moxios';
import { SERVER_URL } from '../../constants';
import { signin } from '../signin';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest(`${SERVER_URL}/api/users/signin`, {
    status: 200,
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

it('Can request signin', async () => {
  const userSignedIn = await signin('jonh.doe@test.com', '1234');
  expect(userSignedIn).not.toBeNull();
  expect(userSignedIn.data).not.toBeNull();
  expect(userSignedIn.data.id).toEqual('123456789012123456765431',)
  expect(userSignedIn.data.name).toEqual('Jonh');
  expect(userSignedIn.data.lastname).toEqual('Doe');
  expect(userSignedIn.data.country).toEqual('123456788765431234567123');
  expect(userSignedIn.data.telephone).toEqual('+34678787654');
  expect(userSignedIn.data.email).toEqual('jonh.doe@test.com');
  expect(userSignedIn.data.postcode).toEqual('46019');
});
