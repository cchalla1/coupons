import * as profileController from '../controllers/profileController';
import express from 'express';
const router = express.Router();

router.post(
  '/register',
  profileController.auth.optional,
  profileController.register
);

router.post('/login', profileController.auth.optional, profileController.login);

export default router;
