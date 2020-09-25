import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
const router = Router();

router.post(
  '/api/users/signup',
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
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
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
      password,
      country,
      telephone,
      postcode,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({
      name,
      lastname,
      email,
      password,
      country,
      telephone,
      postcode,
    });
    await user.save();

    if (!req.session?.jwt) {
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
    }

    res.status(201).send(user);
  }
);

export { router as signupRouter };
