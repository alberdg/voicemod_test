import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User, UserDoc } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';
const router = express.Router();


/**
 * Users route
 * @function
 * @param path Sign in path
 * @param rules Validation rules
 * @param validateRequest Validate request middleware
 * @param callback Route body
 */
router.post(
  '/api/users',
  requireAuth,
  [
    body('page')
      .notEmpty()
      .isNumeric()
      .withMessage('Page must be provided')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { page, limit = 10 } = req.body;
    const skip = page * limit;
    const usersCount: number = await User.find({}).countDocuments();
    const users: UserDoc[] = await User.find({})
      .skip(skip)
      .limit(limit)
      .populate('country');
    res.status(200).send({
      usersCount,
      users,
    });
  }
);

export { router as usersRouter };
