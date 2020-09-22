import { COUNTRIES } from '../test/setup';

export const redisWrapper = {
  redisGet: jest.fn().mockImplementation(async (key: string) => {
    return COUNTRIES;
  }),
  redisSet: jest.fn().mockImplementation(async (key: string, value: any) => {
  })
};
