import express, { Request, Response } from 'express';
import { User, UserDoc } from '../models/user';

const router = express.Router();

/**
 * Sign in route
 * @function
 * @param path Sign in path
 * @param rules Validation rules
 * @param validateRequest Validate request middleware
 * @param callback Route body
 */
router.get(
  '/api/users',
  async (req: Request, res: Response) => {
    const users: UserDoc[] = await User.find({});
    res.status(200).send(users);
  }
);

export { router as usersRouter };
