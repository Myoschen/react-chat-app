import { Router } from "express";

const userRouter = Router();

userRouter.route('/')
  .get((req, res) => {
    res.send('User Route');
  });

export default userRouter;