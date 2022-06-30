import express from "express";
import {postAbsen} from "../Controllers/AbsenController.js";
import {auth} from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/", [auth], postAbsen);

export default router;