import { Request, Response, Router } from 'express';
import { body, param } from 'express-validator';
import 'express-async-errors';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { Password } from '../services/password';
const router = Router();


router.put(
  '/api/users/:id/password',
  requireAuth,
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

    res.status(200).send(user);
  }
);

export { router as updatePasswordRouter };
