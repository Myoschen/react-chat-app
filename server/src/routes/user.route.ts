import { Router } from "express";
import controller from '../controllers/user.controller';

const router = Router();

router.route('/')
  .post(controller.createUser);

router.route('/:userId')
  .get(controller.findUser);

router.post('/login', controller.login);

export default router;