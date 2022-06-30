import express from "express";
import {renderLogin, renderRegister, renderHome} from "../Controllers/UserController.js";
import {renderMyProfile, renderUpdateProfile, renderProfile} from "../Controllers/ProfileController.js";
import {renderAbsen} from "../Controllers/AbsenController.js";
import {auth} from "../Middlewares/Auth.js";

const router = express.Router();


router.get("/login", renderLogin);
router.get("/register", renderRegister);

router.get("/myprofile", [auth], renderMyProfile);
router.get("/myprofile/update", [auth], renderUpdateProfile);
router.get("/profile/:id", renderProfile);

router.get("/home", [auth], renderHome);

router.get("/absen", [auth], renderAbsen);

export default router;