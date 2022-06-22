import express from "express";
import {insertUser, loginUser} from "../Controllers/UserController.js";

const router = express.Router();

router.post("/signup", insertUser);
router.post("/signin", loginUser);

export default router;