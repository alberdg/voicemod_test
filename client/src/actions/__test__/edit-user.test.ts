import moxios from 'moxios';
import { SERVER_URL } from '../../constants';
import { fetchUserById } from '../users';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest(`${SERVER_URL}/api/users/:id`, {
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

it('Can fetch user by id', async () => {
  const response = await fetchUserById('123456789012123456765431');
  expect(response).not.toBeNull();
  expect(response.data).not.toBeNull();
  expect(response.data.id).toEqual('123456789012123456765431');
  expect(response.data.name).toEqual('Jonh');
  expect(response.data.lastname).toEqual('Doe');
  expect(response.data.country).toEqual('123456788765431234567123');
  expect(response.data.telephone).toEqual('+34678787654');
  expect(response.data.email).toEqual('jonh.doe@test.com');
  expect(response.data.postcode).toEqual('46019');
});
