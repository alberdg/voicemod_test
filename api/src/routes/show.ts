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
  '/api/users/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user: UserDoc = await User.findById({ _id: id }) as any;
    res.status(200).send(user);
  }
);

export { router as showRouter };