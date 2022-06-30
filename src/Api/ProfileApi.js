import express from "express";
import {postProfile,
		updateProfile,
		getProfile,
} from "../Controllers/ProfileController.js";

const router = express.Router();

router.post("/", postProfile);
router.put("/", updateProfile);
router.get("/:id", getProfile);

export default router;