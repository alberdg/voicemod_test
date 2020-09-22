import { COUNTRIES } from '../test/setup';

export const redisWrapper = {
  redisGet: jest.fn().mockImplementation(async (key: string) => {
    console.log('Called redis get');
    return COUNTRIES;
  }),
  redisSet: jest.fn().mockImplementation(async (key: string, value: any) => {
    console.log('Called redis set');
  })
};
