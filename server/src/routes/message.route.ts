import { Router } from "express";
import controller from '../controllers/message.controller'

const router = Router();

router.route('/')
  .get(controller.findAllMessage);

export default router;