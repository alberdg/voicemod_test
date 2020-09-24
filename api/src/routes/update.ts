import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
const router = Router();

router.put(
  '/api/users/:id',
  requireAuth,
  [
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name must be valid'),
    body('lastname')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Last name must be valid'),
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('country')
      .trim()
      .isLength({ min: 12, max: 24 }) // Mongodb _id format
      .withMessage('Country must be valid'),
    body('telephone')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Telephone must be valid'),
    body('postcode')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Postcode must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      name,
      lastname,
      email,
      country,
      telephone,
      postcode,
    } = req.body;

    const { id } = req.params;
    const existingUser = await User.findOne({ _id: { $ne: id }, email });
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = {
      name,
      lastname,
      email,
      country,
      telephone,
      postcode,
    };
    await User.updateOne({ _id: id }, { $set: user });

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id,
        email
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

export { router as updateRouter };
