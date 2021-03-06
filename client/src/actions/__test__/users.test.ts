import moxios from 'moxios';

import { fetchUsers, deleteUser } from '../users';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('/api/users', {
    status: 200,
    response: {
        usersCount: 2,
        users: [{
          id: '123456789012123456765431',
          name: 'Jonh',
          lastname: 'Doe',
          country: '123456788765431234567123',
          telephone: '+34678787654',
          email: 'jonh.doe@test.com',
          postcode: '46019'
        },{
          id: '123456789012123456765432',
          name: 'Mary',
          lastname: 'Smith',
          country: '123456788765431234567113',
          telephone: '+34678787652',
          email: 'mary.smith@test.com',
          postcode: '36019'
        }
      ]
    }
  });

  moxios.stubRequest('/api/user/:id', {
    status: 200,
    response: [{
      id: '123456789012123456765432',
      name: 'Mary',
      lastname: 'Smith',
      country: '123456788765431234567113',
      telephone: '+34678787652',
      email: 'mary.smith@test.com',
      postcode: '36019'
    }]
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('Can fetch users', async () => {
  const response = await fetchUsers(1, 2);
  expect(response).not.toBeNull();
  expect(response.data).not.toBeNull();
  expect(response.data.users?.length).toEqual(2)
  expect(response.data.users[0]?.name).toEqual('Jonh');
  expect(response.data.users[1]?.name).toEqual('Mary');
  expect(response.data.usersCount).toEqual(2);
});

//FIXME
it.skip('Removes a user', async () => {
  const response = await fetchUsers(1, 1);
  const id: string = response.data[0].id;
  const result = await deleteUser(id);
  expect(result).not.toBeNull();
  expect(result.data).not.toBeNull();
  expect(result.data.length).toEqual(1);
  expect(response.data[0].id).toEqual('123456789012123456765432');
})
