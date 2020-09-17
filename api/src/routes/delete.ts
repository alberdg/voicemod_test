import { Request, Response, Router } from 'express';
import 'express-async-errors';
import { User } from '../models/user';
const router = Router();

/**
 * Service to delete a single user by id
 * @function
 * @param path Route path
 * @param callback Router implementation
 */
router.delete(
  '/api/users/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await User.deleteOne({ _id: id });

    res.status(200).send(result);
  }
);

export { router as deleteRouter };
