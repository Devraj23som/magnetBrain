
import User from "../models/userModel.js";
import mongoose from "mongoose";
import { sendToken } from "../utils/jwtToken.js";

const registerUser = async (req, res, next) => {
  try {
    const {name,email,password} =req.body;

    // check if the user is already exist
    let user = await User.findOne({email});

    if (user) {
      throw new Error("user have already registered");
    }


    user = await User.create({
      name,
      email,
      password,
    }
    );
    user.save();
  
    return sendToken(user, 201, res);


    
  } catch (err) {
    // return res.status(500).json({ message: "somthing went wrong" });
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    console.log(user)

    if (!user) {
      // throw new Error("Email not found");
      res.status(404).json({ message: 'Email not found' });
    }

    if (await user.comparePassword(password)) {
      sendToken(user, 201, res);
    } else {
      // res.status(404).json({ message: 'Invalid email or password' });
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).populate('tasks');

    if (user) {
      return res.status(201).json({
     id:user._id,
        name: user.name,
        email: user.email,
        tasks: user.tasks,
     
      });
    } else {
      let error = new Error("User not found");

      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};


export {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
};