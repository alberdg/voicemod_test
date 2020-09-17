import { isValidEmail, isValidPassword } from '../utils';

it('Validates a valid email', () => {
  const email: string = 'albertogodar81@gmail.com';
  expect(isValidEmail(email)).toBeTruthy();
});

it('Validates a non valid email', () => {
  const email: string = 'albertogodar81@gmail.';
  expect(isValidEmail(email)).toBeFalsy();
});

it('Validates a valid password', () => {
  const password: string = "mypassword"
  expect(isValidPassword(password)).toBeTruthy();
});

it('Validates a short password', () => {
  const password: string = "myp"
  expect(isValidPassword(password)).toBeFalsy();
});

it('Validates an empty password', () => {
  const password: string = ""
  expect(isValidPassword(password)).toBeFalsy();
});


it('Validates a long password', () => {
  const password: string = "12345678901234567890123";
  expect(isValidPassword(password)).toBeFalsy();
});
