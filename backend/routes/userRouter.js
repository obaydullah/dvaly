import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import tokenGenerator from "../utils.js";

const userRouter = express.Router();

userRouter.post("/signin", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: tokenGenerator(user),
      });
      return;
    }
  }
  res.status(401).send({ msg: "email and password is not valid" });
});

export default userRouter;
