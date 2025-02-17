import express from 'express';
import { UserController } from './UserController';

const router = express.Router();

// post route to create and store user
router.post('/auth/register', UserController.createUser);

export const UserRoute = router;
