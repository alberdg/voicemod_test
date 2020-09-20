import moxios from 'moxios';
import { SERVER_URL } from '../../constants';
import { fetchCountries } from '../countries';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest(`${SERVER_URL}/api/countries`, {
    status: 200,
    response: [
    {
        "name": "Afganistán",
        "id": "5f6210077ac32300135998cd"
    },
    {
        "name": "Albania",
        "id": "5f6210077ac32300135998ce"
    },
    {
        "name": "Alemania",
        "id": "5f6210077ac32300135998cf"
    },
    {
        "name": "Andorra",
        "id": "5f6210077ac32300135998d0"
    },
    {
        "name": "Angola",
        "id": "5f6210077ac32300135998d1"
    },
    {
        "name": "Antigua y Barbuda",
        "id": "5f6210077ac32300135998d2"
    },
    ]
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('Can fetch countries', async () => {
  const countriesResponse: any = await fetchCountries();
  expect(countriesResponse).not.toBeNull();
  expect(countriesResponse.data).not.toBeNull();
  expect(countriesResponse.data.length).toEqual(6);
});
