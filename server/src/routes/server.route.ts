import { Router } from "express";
import controller from "../controllers/server.controller";

const router = Router();

router.route('/')
  .post(controller.createServer);

router.route('/:serverId')
  .get(controller.findServer);

export default router;