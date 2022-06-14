import jwt from "jsonwebtoken";

const tokenGenerator = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default tokenGenerator;
