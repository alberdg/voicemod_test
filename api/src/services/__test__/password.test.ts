import { Password } from '../password';

it('Hashes a password', async () => {
  const password: string = 'unhashedpassword';
  const hashedPassword: string = await Password.toHash(password);
  expect(hashedPassword).not.toEqual(password);
  expect(hashedPassword.length).toBeGreaterThan(0);
});

it('Compares a valid password hashed', async () => {
  const password: string = 'unhashedpassword';
  const hashedPassword: string = await Password.toHash(password);
  expect(hashedPassword).not.toEqual(password);
  expect(hashedPassword.length).toBeGreaterThan(0);
  const verificationResult: boolean = await Password.compare(hashedPassword, password);
  expect(verificationResult).toBeTruthy();
});


it('Compares an invalid password hashed', async () => {
  const password: string = 'unhashedpassword';
  const hashedPassword: string = await Password.toHash(password);
  expect(hashedPassword).not.toEqual(password);
  expect(hashedPassword.length).toBeGreaterThan(0);
  const verificationResult: boolean = await Password.compare(hashedPassword, 'another-invalid_password');
  expect(verificationResult).toBeFalsy();
});
