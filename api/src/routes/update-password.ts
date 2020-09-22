import { Request, Response, Router } from 'express';
import { body, param } from 'express-validator';
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { Password } from '../services/password';
const router = Router();


router.put(
  '/api/users/:id/password',
  [
    param('id')
      .notEmpty()
      .withMessage('User id must be provided'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),

  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      password
    } = req.body;

    const { id } = req.params;
    const existingUser = await User.findOne({ _id: id });
    if (!existingUser) {
      throw new BadRequestError('Invalid user');
    }

    //Have to hash password here since isModified in pre save won't work
    const hashedPassword: string = await Password.toHash(password);
    await User.updateOne({ _id: id }, { $set: { password: hashedPassword } });

    const user: any = await User.findById({ _id: id });
    console.log('user updated', user);
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(200).send(user);
  }
);

export { router as updatePasswordRouter };