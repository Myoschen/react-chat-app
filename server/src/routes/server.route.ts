import { Router } from "express";

const serverRouter = Router();

serverRouter.route('/')
  .get((req, res) => {
    res.send('Server Route');
  });

export default serverRouter;