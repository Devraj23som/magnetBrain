// @ts-nocheck
import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  userProfile

} from "../controllers/userController.js";
import { authGuard } from "../middleware/authMiddleware.js";


const router = express.Router();
router.get("/",function(req,res){
  res.send("hello")
} );
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authGuard, logoutUser);
router.get("/profile", authGuard, userProfile);



export default router;
