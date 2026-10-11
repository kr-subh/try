import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import auth from "../middleware/auth.js"
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", auth, (req, res) => {
    res.json(req.user);
});

export default router;
