import mongoose, { Schema, model } from "mongoose";
// import * as bcrypt from "bcryptjs"
import pkg from "bcrypt";
const { compare, hash } = pkg;
// import { compare ,hash } from "bcrypt";
import jwt from "jsonwebtoken";
// import { compare } from "bcryptjs";

const UserSchema = new Schema(
  {
    
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks:[{
      type:mongoose.Schema.ObjectId,
      ref:"Task"
    }]


  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    next();
  }
  next();
});

UserSchema.methods.getJwtToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password)
};

const User = model("User", UserSchema);
export default User;