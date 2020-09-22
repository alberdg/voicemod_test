import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User, UserDoc } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
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
  [
    body('page')
      .notEmpty()
      .isNumeric()
      .withMessage('Page must be provided')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { page, limit = 10 } = req.body;
    const skip = (page - 1) * limit;
    const users: UserDoc[] = await User.find({})
      .skip(skip)
      .limit(limit)
      .populate('country');
    res.status(200).send(users);
  }
);

export { router as usersRouter };
