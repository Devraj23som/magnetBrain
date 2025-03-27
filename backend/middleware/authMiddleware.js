
import pkg from "jsonwebtoken";
const { verify } = pkg;
import User from "../models/userModel.js";
export const authGuard = async (req, res, next) => {
  const token =req.headers.authorization;

  if (token) {
    try {
      const { id } = verify(token , process.env.JWT_SECRET_KEY);

      console.log(id);

      req.user = id;

      next();
    } catch (error) {
      let err = new Error("Not authorized token failed");

      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized, no token");

    error.statusCode = 401;
    next(error);
  }
};

export const adminGuard = (req, res, next) => {
  if (req.user && req.user.admin) {
    console.log();
    next();
  } else {
    let error = new Error("Not authorized as admin");

    error.statusCode = 401;
    next(error);
  }
};