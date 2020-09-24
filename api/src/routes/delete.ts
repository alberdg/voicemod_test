import { Request, Response, Router } from 'express';
import 'express-async-errors';
import { User, UserDoc } from '../models/user';
import { requireAuth } from '../middlewares/require-auth';
const router = Router();

/**
 * Service to delete a single user by id
 * @function
 * @param path Route path
 * @param callback Router implementation
 */
router.delete(
  '/api/users/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { limit = 10 } = req.body;
    await User.deleteOne({ _id: id });

    const usersCount: number = await User.find({}).countDocuments();
    const users: UserDoc[] = await User.find({})
      .limit(limit)
      .populate('country');
    res.status(200).send({
      usersCount,
      users
    });
  }
);

export { router as deleteRouter };
