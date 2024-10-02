import express from "express";
import { login, register, users } from "../Controllers/user.js";

const router = express.Router();
//register user
router.post("/register", register);
//login user
router.post("/login", login);
//get all users
router.get("/allUsers", users);
export default router;
