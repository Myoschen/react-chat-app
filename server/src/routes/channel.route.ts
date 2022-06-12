import { Router } from "express";
import controller from '../controllers/channle.controller'

const router = Router();

router.route('/')
  .post(controller.createChannel);

export default router;